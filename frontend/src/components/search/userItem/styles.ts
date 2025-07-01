import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    backgroundColor: "#fff",
  },
  avatarContainer: {
    marginRight: 16,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  defaultAvatar: {
    backgroundColor: "#FFC20E",
  },
  infoContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#002A5C",
    marginBottom: 4,
  },
  designationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  designationText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#0080C6",
  },
  specialtyText: {
    fontSize: 14,
    color: "#8f8f8f",
  },
  bioText: {
    fontSize: 14,
    color: "#8f8f8f",
    lineHeight: 18,
  },
});

export default styles;
