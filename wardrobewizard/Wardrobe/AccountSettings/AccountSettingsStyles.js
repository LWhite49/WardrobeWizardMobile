import { StyleSheet } from "react-native";

export const AccountSettingsStyles = StyleSheet.create({
	container: {
		height: 60,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "flex-end",
		height: "80%",
		gap: 10,
	},
	text: {
		fontSize: 18,
		padding: 8,
		textAlign: "center",
		color: "#EDE6FEFF",
		textShadowColor: "#37197BFF",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 1,
	},
	button: {
		backgroundColor: "#37197BFF",
		borderColor: "#000000FF",
		borderWidth: 2,
		borderStyle: "solid",
		padding: 4,
		marginTop: 10,
		borderRadius: 40,
		width: 280,
	},
	image: {
		width: 300,
		height: 300,
		position: "relative",
		top: -30,
	},
});
