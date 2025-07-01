import { useEffect, useMemo, useState } from "react";
import { View, Text, Image, TouchableOpacity, Alert, Share } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import { Post, User } from "../../../../../types";
import { useDispatch, useSelector } from "react-redux";
import { throttle } from "throttle-debounce";
import { getLikeById, updateLike } from "../../../../services/posts";
import { AppDispatch, RootState } from "../../../../redux/store";
import { openCommentModal } from "../../../../redux/slices/modalSlice";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../../navigation/main";
import { Avatar } from "react-native-paper";

/**
 * Function that renders a component meant to be overlapped on
 * top of the post with the post info like user's display name and avatar
 * and the post's description
 *
 * @param {User} user that created the post
 * @param {Post} post object
 */
export default function PostSingleOverlay({
  user,
  post,
}: {
  user: User;
  post: Post;
}) {
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);
  const dispatch: AppDispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [currentLikeState, setCurrentLikeState] = useState({
    state: false,
    counter: post.likesCount,
  });
  const [currentCommentsCount, setCurrentCommentsCount] = useState(
    post.commentsCount,
  );
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (currentUser) {
      getLikeById(post.id, currentUser.uid).then((res) => {
        setCurrentLikeState({
          ...currentLikeState,
          state: res,
        });
      });
    }
  }, []);

  /**
   * Handles the like button action.
   *
   * In order to make the action more snappy the like action
   * is optimistic, meaning we don't wait for a response from the
   * server and always assume the write/delete action is successful
   */
  const handleUpdateLike = useMemo(
    () =>
      throttle(500, (currentLikeStateInst: typeof currentLikeState) => {
        setCurrentLikeState({
          state: !currentLikeStateInst.state,
          counter:
            currentLikeStateInst.counter +
            (currentLikeStateInst.state ? -1 : 1),
        });
        if (currentUser) {
          updateLike(post.id, currentUser.uid, currentLikeStateInst.state);
        }
      }),
    [],
  );

  const handleUpdateCommentCount = () => {
    setCurrentCommentsCount((prevCount) => prevCount + 1);
  };

  /**
   * Handles the message user action
   */
  const handleMessageUser = () => {
    if (currentUser?.uid === user.uid) {
      Alert.alert("Cannot message yourself", "You cannot send a message to yourself.");
      return;
    }
    
    navigation.navigate("chatSingle", {
      contactId: user.uid,
    });
  };

  /**
   * Handles the share post action
   */
  const handleSharePost = async () => {
    try {
      const shareContent = {
        message: `Check out this post by ${user.displayName || user.email}: ${post.description}`,
        url: post.media[0], // Share the video URL
      };
      
      await Share.share(shareContent);
    } catch (error) {
      console.log("Error sharing post:", error);
    }
  };

  /**
   * Handles the bookmark post action
   */
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // TODO: Implement actual bookmark functionality with Firebase
    console.log(`Post ${isBookmarked ? 'removed from' : 'added to'} bookmarks`);
  };

  /**
   * Handles the thumbs down action (dislike)
   */
  const handleThumbsDown = () => {
    // This is private feedback to the algorithm
    console.log("Thumbs down - telling algorithm to show less of this content");
    Alert.alert(
      "Feedback Recorded", 
      "We'll show you less content like this.",
      [{ text: "OK" }]
    );
  };

  /**
   * Handles the SLOP button action (report poor quality content)
   */
  const handleSlopReport = () => {
    Alert.alert(
      "Report Content as SLOP",
      "This will flag the content as low-quality and report it for moderation. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Report",
          style: "destructive",
          onPress: () => {
            // TODO: Implement actual SLOP reporting functionality
            console.log("Content reported as SLOP");
            Alert.alert("Content Reported", "Thank you for helping keep VentureSync professional.");
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.displayName}>{user.displayName || user.email}</Text>
        <Text style={styles.description}>{post.description}</Text>
      </View>
      <View style={styles.leftContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("profileOther", {
              initialUserId: user?.uid ?? "",
            })
          }
        >
          {user.photoURL ? (
            <Image style={styles.avatar} source={{ uri: user.photoURL }} />
          ) : (
            <Avatar.Icon
              style={styles.defaultAvatar}
              size={50}
              icon={"account"}
            />
          )}
        </TouchableOpacity>

        {/* Message User Button */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleMessageUser}
        >
          <Ionicons color="white" size={40} name="chatbubble-outline" />
        </TouchableOpacity>

        {/* Share Button */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleSharePost}
        >
          <Ionicons color="white" size={40} name="share-outline" />
        </TouchableOpacity>

        {/* Bookmark Button */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleBookmark}
        >
          <Ionicons 
            color="white" 
            size={40} 
            name={isBookmarked ? "bookmark" : "bookmark-outline"} 
          />
        </TouchableOpacity>

        {/* Thumbs Up (Like) Button */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleUpdateLike(currentLikeState)}
        >
          <Ionicons
            color="white"
            size={40}
            name={currentLikeState.state ? "heart" : "heart-outline"}
          />
          <Text style={styles.actionButtonText}>
            {currentLikeState.counter}
          </Text>
        </TouchableOpacity>

        {/* Thumbs Down Button */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleThumbsDown}
        >
          <Ionicons color="white" size={40} name="thumbs-down-outline" />
        </TouchableOpacity>

        {/* Comments Button */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() =>
            dispatch(
              openCommentModal({
                open: true,
                data: post,
                modalType: 0,
                onCommentSend: handleUpdateCommentCount,
              }),
            )
          }
        >
          <Ionicons color="white" size={40} name={"chatbubble"} />
          <Text style={styles.actionButtonText}>{currentCommentsCount}</Text>
        </TouchableOpacity>

        {/* SLOP Report Button */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleSlopReport}
        >
          <Ionicons color="#ff4444" size={40} name="flag-outline" />
          <Text style={[styles.actionButtonText, { color: "#ff4444" }]}>SLOP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
