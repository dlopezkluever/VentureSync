import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  image: {
    backgroundColor: "#8f8f8f",
    height: 60,
    aspectRatio: 1,
    borderRadius: 30,
    marginRight: 16,
  },
  userDisplayName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#002A5C",
  },
  lastMessage: {
    fontSize: 13,
    color: "#8f8f8f",
  },
});

export default styles;
