import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: "center",
    paddingHorizontal: 65,
    borderBottomWidth: 1,
    borderColor: "#0080C6",
  },
  counterContainer: {
    paddingBottom: 20,
    flexDirection: "row",
  },
  counterItemContainer: {
    flex: 1,
    alignItems: "center",
  },
  emailText: {
    padding: 20,
    color: "#002A5C",
  },
  counterNumberText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#002A5C",
  },
  counterLabelText: {
    color: "#8f8f8f",
    fontSize: 11,
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
});

export default styles;
