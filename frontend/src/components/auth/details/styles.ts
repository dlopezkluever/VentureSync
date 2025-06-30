import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 20,
    backgroundColor: "#FFFFFF", // White background
  },
  textInput: {
    borderColor: "#0080C6", // Powder Blue for engaging input borders
    borderBottomWidth: 1,
    borderStyle: "solid",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    color: "#002A5C", // Navy Blue text
  },
  button: {
    marginTop: 80,
    borderColor: "#00338D", // Royal Blue border
    borderWidth: 1,
    borderStyle: "solid",
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: "#00338D", // Royal Blue background
  },
  buttonText: {
    color: "#FFFFFF", // White text
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default styles;
