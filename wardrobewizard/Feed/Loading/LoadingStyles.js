import { StyleSheet } from "react-native";

export const LoadingStyles = StyleSheet.create({
	container: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		height: "100%",
		width: "100%",
	},
	text: {
		fontSize: 20,
		fontWeight: "bold",
	},
	image: {
		marginTop: 40,
		width: 100,
		height: 100,
		transform: [{ rotate: "30deg" }],
	},
});
