import { StyleSheet } from "react-native";

// Enhanced Profile Header Styles for VentureSync
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
  // Enhanced Profile View Styles
  displayNameText: {
    padding: 20,
    color: "#002A5C",
    fontSize: 18,
    fontWeight: "600",
  },
  designationText: {
    color: "#0080C6",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  specialtyText: {
    color: "#666",
    fontSize: 14,
    marginBottom: 10,
  },
  bioText: {
    color: "#444",
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: 20,
    textAlign: "center",
    marginBottom: 15,
  },
  expandToggle: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  expandToggleText: {
    color: "#0080C6",
    fontSize: 14,
    fontWeight: "500",
    marginRight: 5,
  },
  expandedContent: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    marginBottom: 20,
  },
  detailSection: {
    marginBottom: 20,
  },
  detailSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#002A5C",
    marginBottom: 12,
  },
  experienceItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#0080C6",
  },
  experienceTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#002A5C",
    marginBottom: 4,
  },
  experienceSubtitle: {
    fontSize: 13,
    color: "#666",
    marginBottom: 4,
  },
  experienceDate: {
    fontSize: 11,
    color: "#999",
    fontStyle: "italic",
    marginBottom: 6,
  },
  experienceDescription: {
    fontSize: 12,
    color: "#444",
    lineHeight: 16,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skillTag: {
    backgroundColor: "#E3F2FD",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 3,
  },
  skillText: {
    color: "#002A5C",
    fontSize: 12,
    fontWeight: "500",
  },
  linkItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  linkText: {
    color: "#0080C6",
    fontSize: 13,
    marginLeft: 8,
    flex: 1,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    width: "85%",
    maxHeight: "70%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#002A5C",
  },
  userList: {
    maxHeight: 300,
  },
  userListItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  userListInfo: {
    marginLeft: 12,
    flex: 1,
  },
  userListName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#002A5C",
    marginBottom: 2,
  },
  userListDesignation: {
    fontSize: 12,
    color: "#666",
  },
  // Action Buttons Container
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: -16, // Compensate for button margins
  },
});

export default styles;
