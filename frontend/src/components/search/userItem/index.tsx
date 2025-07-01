import React from "react";
import { Text, TouchableOpacity, Image, View } from "react-native";
import styles from "./styles";
import { SearchUser } from "../../../../types";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/main";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Avatar } from "react-native-paper";

export default function SearchUserItem({ item }: { item: SearchUser }) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate("profileOther", { initialUserId: item?.id ?? "" })
      }
    >
      <View style={styles.avatarContainer}>
        {item.photoURL ? (
          <Image style={styles.image} source={{ uri: item.photoURL }} />
        ) : (
          <Avatar.Icon size={50} icon={"account"} style={styles.defaultAvatar} />
        )}
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.nameText}>{item.displayName || item.email}</Text>
        
        {item.designation && (
          <View style={styles.designationContainer}>
            <Text style={styles.designationText}>{item.designation}</Text>
            {item.specialty && (
              <Text style={styles.specialtyText}> • {item.specialty}</Text>
            )}
          </View>
        )}
        
        {item.bio && (
          <Text style={styles.bioText} numberOfLines={2}>
            {item.bio}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}
