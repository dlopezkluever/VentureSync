import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Linking, Modal, FlatList, LayoutAnimation, UIManager, Platform } from "react-native";
import { Avatar } from "react-native-paper";
import { buttonStyles } from "../../../styles";
import styles from "./styles";
import { RootState } from "../../../redux/store";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/main";
import { FIREBASE_AUTH } from "../../../../firebaseConfig";
import { useFollowing } from "../../../hooks/useFollowing";
import { Feather } from "@expo/vector-icons";
import { useFollowingMutation } from "../../../hooks/useFollowingMutation";
import WatchButton from "../watch-button";
import MessageButton from "../message-button";

// Enable LayoutAnimation for Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

/**
 * Enhanced ProfileHeader component for VentureSync
 * Renders the header of the user profile with expandable professional details
 * and handles all of the actions within it like follow, unfollow and
 * routing to the user settings.
 *
 * @param {Object} props
 * @param {Object} props.user information of the user to display
 * @returns
 */
export default function ProfileHeader({
  user,
}: {
  user: RootState["auth"]["currentUser"];
}) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [followersCount, setFollowersCount] = useState(
    user?.followersCount || 0,
  );

  // Enhanced Profile View states
  const [isExpanded, setIsExpanded] = useState(false);
  const [showUserListModal, setShowUserListModal] = useState(false);
  const [userListType, setUserListType] = useState<'network' | 'circle' | 'watching'>('network');

  useEffect(() => {
    setFollowersCount(user?.followersCount || 0);
  }, [user]);

  const followingData = useFollowing(
    FIREBASE_AUTH.currentUser?.uid ?? null,
    user?.uid ?? null,
  );
  const isFollowing =
    FIREBASE_AUTH.currentUser?.uid && user?.uid && followingData.data
      ? followingData.data
      : false;

  const isFollowingMutation = useFollowingMutation();

  // Debug logging to verify user identification
  console.log("🔍 ProfileHeader Debug:");
  console.log("Auth User ID:", FIREBASE_AUTH.currentUser?.uid);
  console.log("Profile User ID:", user?.uid);
  console.log("IDs Match:", FIREBASE_AUTH.currentUser?.uid === user?.uid);

  const toggleExpanded = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  const openURL = async (url: string) => {
    try {
      // Ensure URL has protocol
      const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
      const canOpen = await Linking.canOpenURL(formattedUrl);
      if (canOpen) {
        await Linking.openURL(formattedUrl);
      } else {
        console.log("Cannot open URL:", formattedUrl);
      }
    } catch (error) {
      console.error("Error opening URL:", error);
    }
  };

  const openUserListModal = (type: 'network' | 'circle' | 'watching') => {
    setUserListType(type);
    setShowUserListModal(true);
  };

  // Dummy data for user lists (as specified in requirements)
  const getDummyUserList = () => {
    const baseUsers = [
      { id: '1', name: 'Alice Johnson', designation: 'Talent', photoURL: null },
      { id: '2', name: 'Bob Smith', designation: 'Visionary', photoURL: null },
      { id: '3', name: 'Carol Davis', designation: 'Investor', photoURL: null },
      { id: '4', name: 'David Wilson', designation: 'Talent', photoURL: null },
      { id: '5', name: 'Eva Brown', designation: 'Visionary', photoURL: null },
    ];

    switch (userListType) {
      case 'network':
        return baseUsers.slice(0, 4);
      case 'circle':
        return baseUsers.slice(0, 2);
      case 'watching':
        return baseUsers.slice(0, 3);
      default:
        return baseUsers;
    }
  };

  const renderFollowButton = () => {
    return (
      <TouchableOpacity
        style={
          isFollowing
            ? buttonStyles.grayOutlinedButton
            : buttonStyles.filledButton
        }
        onPress={() => {
          isFollowingMutation.mutate({
            otherUserId: user?.uid ?? "",
            isFollowing,
          });

          if (isFollowing) {
            setFollowersCount((prev) => prev - 1);
          } else {
            setFollowersCount((prev) => prev + 1);
          }
        }}
      >
        <Text
          style={
            isFollowing
              ? buttonStyles.grayOutlinedButtonText
              : buttonStyles.filledButtonText
          }
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderUserListModal = () => (
    <Modal
      visible={showUserListModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowUserListModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {userListType === 'network' ? 'Network' : 
               userListType === 'circle' ? 'Inner Circle' : 'Watching'}
            </Text>
            <TouchableOpacity onPress={() => setShowUserListModal(false)}>
              <Feather name="x" size={24} color="#002A5C" />
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={getDummyUserList()}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.userListItem}>
                <Avatar.Icon size={40} icon="account" style={{ backgroundColor: "#FFC20E" }} />
                <View style={styles.userListInfo}>
                  <Text style={styles.userListName}>{item.name}</Text>
                  <Text style={styles.userListDesignation}>{item.designation}</Text>
                </View>
              </View>
            )}
            style={styles.userList}
          />
        </View>
      </View>
    </Modal>
  );

  return (
    user && (
      <View style={styles.container}>
        {user.photoURL ? (
          <Image style={styles.avatar} source={{ uri: user.photoURL }} />
        ) : (
          <Avatar.Icon size={80} icon={"account"} style={{ backgroundColor: "#FFC20E" }} />
        )}
        
        <Text style={styles.displayNameText}>{user.displayName || user.email}</Text>
        
        {/* Professional Info */}
        {user.designation && (
          <Text style={styles.designationText}>{user.designation}</Text>
        )}
        {user.specialty && (
          <Text style={styles.specialtyText}>{user.specialty}</Text>
        )}
        {user.bio && (
          <Text style={styles.bioText} numberOfLines={isExpanded ? 0 : 2}>
            {user.bio}
          </Text>
        )}

        {/* Network Metrics */}
        <View style={styles.counterContainer}>
          <TouchableOpacity 
            style={styles.counterItemContainer}
            onPress={() => openUserListModal('circle')}
          >
            <Text style={styles.counterNumberText}>{user.circleCount || 0}</Text>
            <Text style={styles.counterLabelText}>Circle</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.counterItemContainer}
            onPress={() => openUserListModal('network')}
          >
            <Text style={styles.counterNumberText}>{user.networkCount || followersCount}</Text>
            <Text style={styles.counterLabelText}>Network</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.counterItemContainer}
            onPress={() => openUserListModal('watching')}
          >
            <Text style={styles.counterNumberText}>{user.watchingCount || user.followingCount || 0}</Text>
            <Text style={styles.counterLabelText}>Watching</Text>
          </TouchableOpacity>
        </View>

        {/* Expandable Details Toggle */}
        {(user.workExperience?.length > 0 || user.education?.length > 0 || 
          user.topSkills?.length > 0 || user.externalURLs?.length > 0) && (
          <TouchableOpacity 
            style={styles.expandToggle}
            onPress={toggleExpanded}
          >
            <Text style={styles.expandToggleText}>
              {isExpanded ? "Show Less" : "Show More"}
            </Text>
            <Feather 
              name={isExpanded ? "chevron-up" : "chevron-down"} 
              size={20} 
              color="#0080C6" 
            />
          </TouchableOpacity>
        )}

        {/* Expandable Details Section */}
        {isExpanded && (
          <View style={styles.expandedContent}>
            
            {/* Work Experience */}
            {user.workExperience && user.workExperience.length > 0 && (
              <View style={styles.detailSection}>
                <Text style={styles.detailSectionTitle}>Work Experience</Text>
                {user.workExperience.map((exp, index) => (
                  <View key={exp.id || index} style={styles.experienceItem}>
                    <Text style={styles.experienceTitle}>{exp.position}</Text>
                    <Text style={styles.experienceSubtitle}>{exp.company}</Text>
                    <Text style={styles.experienceDate}>
                      {exp.startDate} - {exp.endDate || "Present"}
                    </Text>
                    {exp.description && (
                      <Text style={styles.experienceDescription}>{exp.description}</Text>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Education */}
            {user.education && user.education.length > 0 && (
              <View style={styles.detailSection}>
                <Text style={styles.detailSectionTitle}>Education</Text>
                {user.education.map((edu, index) => (
                  <View key={edu.id || index} style={styles.experienceItem}>
                    <Text style={styles.experienceTitle}>{edu.degree}</Text>
                    <Text style={styles.experienceSubtitle}>
                      {edu.field} • {edu.institution}
                    </Text>
                    <Text style={styles.experienceDate}>
                      {edu.startDate} - {edu.endDate || "Present"}
                    </Text>
                    {edu.description && (
                      <Text style={styles.experienceDescription}>{edu.description}</Text>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Top Skills */}
            {user.topSkills && user.topSkills.length > 0 && (
              <View style={styles.detailSection}>
                <Text style={styles.detailSectionTitle}>Top Skills</Text>
                <View style={styles.skillsContainer}>
                  {user.topSkills.map((skill, index) => (
                    <View key={index} style={styles.skillTag}>
                      <Text style={styles.skillText}>{skill}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* External Links */}
            {user.externalURLs && user.externalURLs.length > 0 && (
              <View style={styles.detailSection}>
                <Text style={styles.detailSectionTitle}>Links</Text>
                {user.externalURLs.map((url, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.linkItem}
                    onPress={() => openURL(url)}
                  >
                    <Feather name="external-link" size={16} color="#0080C6" />
                    <Text style={styles.linkText} numberOfLines={1}>
                      {url}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}

        {/* Action Buttons */}
        {FIREBASE_AUTH.currentUser?.uid === user.uid ? (
          <TouchableOpacity
            style={buttonStyles.grayOutlinedButton}
            onPress={() => navigation.navigate("editProfile")}
          >
            <Text style={buttonStyles.grayOutlinedButtonText}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.actionButtonsContainer}>
            <WatchButton userId={user.uid} />
            <MessageButton userId={user.uid} />
          </View>
        )}

        {/* User List Modal */}
        {renderUserListModal()}
      </View>
    )
  );
}
