import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  containerInput: {
    padding: 10,
    flexDirection: "row",
  },
  input: {
    backgroundColor: "#F0F8FF",
    borderColor: "#0080C6",
    borderWidth: 1,
    borderRadius: 4,
    flex: 1,
    marginHorizontal: 10,
    paddingHorizontal: 10,
  },
  uploadButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#F0F8FF",
    borderWidth: 1,
    borderColor: "#0080C6",
  },
});

export default styles;
