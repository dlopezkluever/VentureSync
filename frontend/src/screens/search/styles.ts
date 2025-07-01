import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#002A5C",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#8f8f8f",
    lineHeight: 22,
  },
  searchContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  searchInput: {
    height: 40,
    backgroundColor: "#F8F9FA",
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#002A5C",
    marginHorizontal: 20,
    marginVertical: 16,
  },
  resultsContainer: {
    flex: 1,
  },
  resultsList: {
    flex: 1,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noResultsText: {
    fontSize: 16,
    color: "#8f8f8f",
    textAlign: "center",
    fontWeight: "500",
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: "#8f8f8f",
    textAlign: "center",
    lineHeight: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#8f8f8f",
    textAlign: "center",
  },
  messageContainer: {
    padding: 20,
    alignItems: "center",
  },
  placeholderText: {
    textAlign: "center",
    color: "#8f8f8f",
    fontSize: 16,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
});

export default styles;
