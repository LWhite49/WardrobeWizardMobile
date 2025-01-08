import { StyleSheet } from "react-native";

export const SavedOutfitsStyles = StyleSheet.create({
	container: {
		position: "relative",
		width: "100%",
		height: "100%",
	},
	text: {
		fontSize: 24,
		fontWeight: "bold",
		padding: 8,
	},
	image: {
		width: 70,
		height: 70,
		padding: 10,
	},
	displayOne: {
		position: "absolute",
		top: 30,
		left: 30,
	},
	displayTwo: {
		position: "absolute",
		top: 30,
		right: 30,
	},
	displayThree: {
		position: "absolute",
		bottom: 70,
		left: 30,
	},
	displayFour: {
		position: "absolute",
		bottom: 70,
		right: 30,
	},
});
