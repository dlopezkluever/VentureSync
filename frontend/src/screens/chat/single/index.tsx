import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { FlatList, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import styles from "./styles";
import ChatSingleItem from "../../../components/chat/single/item";
import { useMessages } from "../../../hooks/useMessages";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBarGeneral from "../../../components/general/navbar";
import { sendMessage, sendMediaMessage } from "../../../services/chat";
import { RootStackParamList } from "../../../navigation/main";
import { RouteProp } from "@react-navigation/native";
import { Message } from "../../../../types";

const ChatSingleScreen = ({
  route,
}: {
  route: RouteProp<RootStackParamList, "chatSingle">;
}) => {
  const { chatId, contactId } = route.params;
  const [message, setMessage] = useState("");
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);

  const { messages, chatIdInst } = useMessages(chatId, contactId);

  const handleMessageSend = () => {
    if (message.length == 0 || !chatIdInst) {
      return;
    }

    setMessage("");
    sendMessage(chatIdInst, message);
  };

  const handleMediaUpload = async () => {
    if (!chatIdInst || isUploadingMedia) {
      return;
    }

    try {
      // Request permission for media library
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert("Permission required", "Please allow access to your media library to share photos and videos.");
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setIsUploadingMedia(true);
        await sendMediaMessage(chatIdInst, result.assets[0].uri, result.assets[0].type || 'image');
      }
    } catch (error) {
      console.error("Error uploading media:", error);
      Alert.alert("Upload failed", "Failed to upload media. Please try again.");
    } finally {
      setIsUploadingMedia(false);
    }
  };

  const renderItem = ({ item }: { item: Message }) => {
    return <ChatSingleItem item={item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavBarGeneral title="Chat" />
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        inverted
      />
      <View style={styles.containerInput}>
        <TouchableOpacity 
          onPress={handleMediaUpload} 
          style={styles.uploadButton}
          disabled={isUploadingMedia}
        >
          {isUploadingMedia ? (
            <ActivityIndicator size="small" color="#0080C6" />
          ) : (
            <Ionicons name="attach" size={24} color="#0080C6" />
          )}
        </TouchableOpacity>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Send Message..."
          style={styles.input}
        />
        <TouchableOpacity onPress={() => handleMessageSend()}>
          <Ionicons name="arrow-up-circle" size={34} color={"crimson"} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatSingleScreen;
