import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/main";
import { getWatchingUsers } from "../../services/user";
import { SearchUser } from "../../../types";
import { FIREBASE_AUTH } from "../../../firebaseConfig";

/**
 * WatchingList component displays the list of users that the current user is watching
 * Only shown on the current user's own profile
 */
export default function WatchingList({ currentUserId }: { currentUserId: string }) {
  const [watchingUsers, setWatchingUsers] = useState<SearchUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Only show watching list on current user's own profile
  const authUserId = FIREBASE_AUTH.currentUser?.uid;
  if (!authUserId || !currentUserId || authUserId !== currentUserId) {
    return null;
  }

  useEffect(() => {
    const fetchWatchingUsers = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const users = await getWatchingUsers();
        setWatchingUsers(users);
      } catch (err) {
        console.error("Error fetching watching users:", err);
        setError("Failed to load watching list");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWatchingUsers();
  }, [currentUserId]);

  const navigateToProfile = (userId: string) => {
    navigation.navigate("profileOther", { initialUserId: userId });
  };

  const renderWatchingUser = ({ item }: { item: SearchUser }) => (
    <TouchableOpacity
      style={styles.userItem}
      onPress={() => navigateToProfile(item.id)}
    >
      {item.photoURL ? (
        <Image style={styles.userAvatar} source={{ uri: item.photoURL }} />
      ) : (
        <Avatar.Icon size={50} icon="account" style={{ backgroundColor: "#FFC20E" }} />
      )}
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.displayName || item.email}</Text>
        {item.designation && (
          <Text style={styles.userDesignation}>{item.designation}</Text>
        )}
        {item.specialty && (
          <Text style={styles.userSpecialty}>{item.specialty}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Watching</Text>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#007AFF" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Watching</Text>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (watchingUsers.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Watching</Text>
        <Text style={styles.emptyText}>You're not watching anyone yet</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Watching ({watchingUsers.length})</Text>
      <FlatList
        data={watchingUsers}
        renderItem={renderWatchingUser}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = {
  container: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold" as const,
    marginBottom: 12,
    color: "#002A5C",
  },
  loadingContainer: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    paddingVertical: 20,
  },
  loadingText: {
    marginLeft: 8,
    color: "#8f8f8f",
  },
  errorText: {
    color: "#FF4444",
    textAlign: "center" as const,
    paddingVertical: 20,
  },
  emptyText: {
    color: "#8f8f8f",
    textAlign: "center" as const,
    paddingVertical: 20,
    fontStyle: "italic" as const,
  },
  userItem: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#002A5C",
    marginBottom: 2,
  },
  userDesignation: {
    fontSize: 14,
    color: "#0080C6",
    marginBottom: 1,
  },
  userSpecialty: {
    fontSize: 12,
    color: "#8f8f8f",
  },
}; 