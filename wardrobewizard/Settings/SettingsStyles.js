import { StyleSheet } from "react-native";

export const SettingsStyles = StyleSheet.create({
	container: {
		display: "flex",
		flex: 1,
		gap: 35,
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		fontSize: 20,
		color: "purple",
	},
	topButtonContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	topButtonSelected: {
		backgroundColor: "purple",
		borderRadius: 20,
		padding: 10,
	},
	topButtonUnselected: {
		backgroundColor: "white",
		borderRadius: 20,
		padding: 10,
	},
	generateButton: {
		backgroundColor: "purple",
		borderRadius: 20,
		padding: 30,
	},
});
