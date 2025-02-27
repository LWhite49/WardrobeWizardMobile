import { StyleSheet } from "react-native";

export const WardrobeStyles = StyleSheet.create({
	wardobeWrapper: {
		flex: 1,
		position: "relative",
		backgroundColor: "#9B79EBFF",
	},
	container: {
		marginTop: 50,
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
	},
	textHeader: {
		fontSize: 26,
		color: "#EDE6FEFF",
		textShadowColor: "#37197BFF",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 1,
	},
	switchWardrobePage: {
		backgroundColor: "#37197BFF",
		borderColor: "black",
		borderWidth: 2,
		borderStyle: "solid",
		padding: 10,
		marginTop: 10,
		borderRadius: 40,
		width: 220,
	},
	switchText: {
		fontSize: 18,
		color: "#EDE6FEFF",
		textShadowColor: "#37197BFF",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 1,
		textAlign: "center",
	},
});
