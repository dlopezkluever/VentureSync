import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Feather } from "@expo/vector-icons";
import { RootState } from "../../../redux/store";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_AUTH } from "../../../../firebaseConfig";

export default function ProfileNavBar({
  user,
}: {
  user: RootState["auth"]["currentUser"];
}) {
  const navigation = useNavigation();
  
  // Check if this is the current user's own profile
  const isOwnProfile = FIREBASE_AUTH.currentUser?.uid === user?.uid;

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    user && (
      <View style={styles.container}>
        <TouchableOpacity onPress={isOwnProfile ? undefined : handleBackPress}>
          <Feather 
            name={isOwnProfile ? "search" : "arrow-left"} 
            size={20} 
            color={isOwnProfile ? "#000" : "#007AFF"}
          />
        </TouchableOpacity>
        <Text style={styles.text}>{user.displayName || user.email}</Text>
        <TouchableOpacity>
          <Feather name="menu" size={24} />
        </TouchableOpacity>
      </View>
    )
  );
}
