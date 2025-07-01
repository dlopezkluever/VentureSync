import React, { useState } from "react";
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/main";
import { FIREBASE_AUTH } from "../../../firebaseConfig";

interface MessageButtonProps {
  userId: string;
}

/**
 * MessageButton component for initiating direct messages with users
 * Navigates to ChatScreen, creating a new chat if one doesn't exist
 */
export default function MessageButton({ userId }: MessageButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const currentUserId = FIREBASE_AUTH.currentUser?.uid;

  // Don't show message button for own profile
  if (!currentUserId || currentUserId === userId) {
    return null;
  }

  const handleMessagePress = async () => {
    if (isProcessing) return;

    try {
      setIsProcessing(true);
      
      // Navigate to chat screen with contactId - the useMessages hook will handle
      // checking if a chat exists or creating a new one
      navigation.navigate("chatSingle", { contactId: userId });
    } catch (error) {
      console.error("Error navigating to chat:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <TouchableOpacity
      style={styles.messageButton}
      onPress={handleMessagePress}
      disabled={isProcessing}
    >
      {isProcessing ? (
        <ActivityIndicator size="small" color="#FFFFFF" />
      ) : (
        <Text style={styles.messageButtonText}>Message</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = {
  messageButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 16,
    marginVertical: 8,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    minWidth: 100,
    height: 40,
    backgroundColor: "#0080C6", // Secondary positive color from theme
    borderWidth: 1,
    borderColor: "#0080C6",
  },
  messageButtonText: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#FFFFFF",
  },
}; 