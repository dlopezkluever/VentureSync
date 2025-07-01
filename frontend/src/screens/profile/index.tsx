import React, { useState, useContext, useEffect } from "react";
import { ScrollView, View, Text, ActivityIndicator } from "react-native";
import styles from "./styles";
import ProfileNavBar from "../../components/profile/navBar";
import ProfileHeader from "../../components/profile/header";
import ProfilePostList from "../../components/profile/postList";
import WatchingList from "../../components/profile/watching-list";
import { SafeAreaView } from "react-native-safe-area-context";
import { CurrentUserProfileItemInViewContext } from "../../contexts/feed-context";
import { FeedStackParamList } from "../../navigation/feed";
import { useUser } from "../../hooks/useUser";
import { getPostsByUserId } from "../../services/posts";
import { Post } from "../../../types";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/main";
import { HomeStackParamList } from "../../navigation/home";
import { FIREBASE_AUTH } from "../../../firebaseConfig";

type ProfileScreenRouteProp =
  | RouteProp<RootStackParamList, "profileOther">
  | RouteProp<HomeStackParamList, "Me">
  | RouteProp<FeedStackParamList, "feedProfile">;

export default function ProfileScreen({
  route,
}: {
  route: ProfileScreenRouteProp;
}) {
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const providerUserId = useContext(CurrentUserProfileItemInViewContext);

  // Safely extract initialUserId from route params
  const initialUserId = (route.params as any)?.initialUserId;

  const userIdToFetch = 
    route.name === "Me" 
      ? FIREBASE_AUTH.currentUser?.uid || null
      : initialUserId || providerUserId.currentUserProfileItemInView || null;

  const userQuery = useUser(userIdToFetch);

  const user = userQuery.data;
  const isLoading = userQuery.isLoading;
  const error = userQuery.error;

  console.log("🔍 ProfileScreen Debug:");
  console.log("Route name:", route.name);
  console.log("Initial User ID:", initialUserId);
  console.log("Auth User ID:", FIREBASE_AUTH.currentUser?.uid);
  console.log("User ID to fetch:", userIdToFetch);
  console.log("Route params:", route.params);
  console.log("Query loading:", isLoading);
  console.log("Query error:", error);
  console.log("Query data:", user);

  useEffect(() => {
    if (!user) {
      return;
    }

    getPostsByUserId(user?.uid).then((posts) => setUserPosts(posts));
  }, [user]);

  // Loading state
  if (isLoading || !userIdToFetch) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#0080C6" />
          <Text style={styles.loadingText}>Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Error state
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>Failed to load profile</Text>
          <Text style={styles.errorSubtext}>{String(error)}</Text>
        </View>
      </SafeAreaView>
    );
  }

  // User not found state
  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>User not found</Text>
          <Text style={styles.errorSubtext}>
            This user may not exist or may have been deleted.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ProfileNavBar user={user} />
      <ScrollView>
        <ProfileHeader user={user} />
        <WatchingList currentUserId={user.uid} />
        <ProfilePostList posts={userPosts} />
      </ScrollView>
    </SafeAreaView>
  );
}
