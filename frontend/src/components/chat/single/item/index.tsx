import React from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { useUser } from "../../../../hooks/useUser";
import { generalStyles } from "../../../../styles";
import styles from "./styles";
import { FIREBASE_AUTH } from "../../../../../firebaseConfig";
import { Message } from "../../../../../types";
import { Avatar } from "react-native-paper";

const ChatSingleItem = ({ item }: { item: Message }) => {
  const { data: userData, isLoading } = useUser(item.creator);

  if (isLoading) {
    return <></>;
  }

  const isCurrentUser =
    FIREBASE_AUTH.currentUser && item.creator === FIREBASE_AUTH.currentUser.uid;

  const openMedia = () => {
    if (item.isMedia && item.message) {
      Linking.openURL(item.message);
    }
  };

  const renderMessageContent = () => {
    if (item.isMedia) {
      if (item.mediaType === 'video') {
        return (
          <TouchableOpacity onPress={openMedia} style={styles.mediaContainer}>
            <Video
              source={{ uri: item.message }}
              style={styles.videoMessage}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              shouldPlay={false}
            />
          </TouchableOpacity>
        );
      } else {
        // Image
        return (
          <TouchableOpacity onPress={openMedia} style={styles.mediaContainer}>
            <Image
              source={{ uri: item.message }}
              style={styles.imageMessage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        );
      }
    } else {
      // Text message
      return <Text style={styles.text}>{item.message}</Text>;
    }
  };

  return (
    <View
      style={isCurrentUser ? styles.containerCurrent : styles.containerOther}
    >
      {userData && userData.photoURL ? (
        <Image
          style={generalStyles.avatarSmall}
          source={{ uri: userData.photoURL }}
        />
      ) : (
        <Avatar.Icon size={32} icon={"account"} style={{ backgroundColor: "#FFC20E" }} />
      )}
      <View
        style={
          isCurrentUser
            ? styles.containerTextCurrent
            : styles.containerTextOther
        }
      >
        {renderMessageContent()}
      </View>
    </View>
  );
};

export default ChatSingleItem;
