import { StyleSheet } from "react-native";

const buttonStyles = StyleSheet.create({
  grayOutlinedButton: {
    borderColor: "#FFC20E",
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  grayOutlinedIconButton: {
    borderColor: "#FFC20E",
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 10,
  },
  filledButton: {
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 50,
    backgroundColor: "#00338D",
  },
  filledButtonText: {
    color: "white",
    fontWeight: "700",
  },
  grayOutlinedButtonText: {
    color: "#002A5C",
    fontWeight: "700",
  },
});

export default buttonStyles;
