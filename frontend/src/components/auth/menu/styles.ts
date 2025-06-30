import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // White background
  },
  containerMain: {
    padding: 30,
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 25,
    color: "#002A5C", // Navy Blue text
    textAlign: "center",
  },
  providerButton: {
    borderColor: "#0080C6", // Powder Blue for engaging provider buttons
    borderWidth: 1,
    borderStyle: "solid",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF", // White background
  },
  providerButtonText: {
    paddingRight: 20,
    color: "#002A5C", // Navy Blue text
  },
  containerBottomButton: {
    backgroundColor: "#FFFFFF", // White background
    padding: 20,
    alignItems: "center",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#FFC20E", // Yellow border for attention-grabbing bottom button
  },
  bottomButtonText: {
    fontWeight: "bold",
    color: "#00338D", // Royal Blue for primary action
  },
  menuMessage: {
    color: "#0080C6", // Powder Blue for positive messages
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default styles;
