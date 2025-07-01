import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, View, ActivityIndicator } from "react-native";
import { getIsWatching, toggleWatchState } from "../../services/user";
import { FIREBASE_AUTH } from "../../../firebaseConfig";

interface WatchButtonProps {
  userId: string;
  onWatchStateChange?: (isWatching: boolean) => void;
}

/**
 * WatchButton component for following/unfollowing users
 * Handles the watch/unwatch functionality with real-time state updates
 */
export default function WatchButton({ userId, onWatchStateChange }: WatchButtonProps) {
  const [isWatching, setIsWatching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const currentUserId = FIREBASE_AUTH.currentUser?.uid;

  // Don't show watch button for own profile
  if (!currentUserId || currentUserId === userId) {
    return null;
  }

  useEffect(() => {
    const checkWatchingStatus = async () => {
      try {
        setIsLoading(true);
        const watchingStatus = await getIsWatching(userId);
        setIsWatching(watchingStatus);
      } catch (error) {
        console.error("Error checking watching status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkWatchingStatus();
  }, [userId]);

  const handleWatchToggle = async () => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);
      const success = await toggleWatchState(userId, isWatching);
      
      if (success) {
        const newWatchingState = !isWatching;
        setIsWatching(newWatchingState);
        onWatchStateChange?.(newWatchingState);
      }
    } catch (error) {
      console.error("Error toggling watch state:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#007AFF" />
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={[
        styles.watchButton,
        isWatching ? styles.watchingButton : styles.notWatchingButton,
      ]}
      onPress={handleWatchToggle}
      disabled={isProcessing}
    >
      {isProcessing ? (
        <ActivityIndicator size="small" color={isWatching ? "#FFFFFF" : "#0080C6"} />
      ) : (
        <Text
          style={[
            styles.watchButtonText,
            isWatching ? styles.watchingButtonText : styles.notWatchingButtonText,
          ]}
        >
          {isWatching ? "Watching" : "Watch"}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = {
  loadingContainer: {
    padding: 10,
    alignItems: "center" as const,
  },
  watchButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 16,
    marginVertical: 8,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    minWidth: 100,
    height: 40,
  },
  notWatchingButton: {
    backgroundColor: "#007AFF",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  watchingButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  watchButtonText: {
    fontSize: 16,
    fontWeight: "600" as const,
  },
  notWatchingButtonText: {
    color: "#FFFFFF",
  },
  watchingButtonText: {
    color: "#007AFF",
  },
}; 