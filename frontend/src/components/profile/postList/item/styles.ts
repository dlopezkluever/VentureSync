import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1 / 3,
    height: 200,
    backgroundColor: "#f0f0f0",
    margin: 4,
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    flex: 1,
    borderRadius: 8,
  },
});

export default styles;
