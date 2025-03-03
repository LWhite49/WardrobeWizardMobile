import { StyleSheet } from "react-native";

export const SavedOutfitsStyles = StyleSheet.create({
	container: {
		position: "relative",
		width: "100%",
		height: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#1E1E6000",
	},
	noOutfits: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		width: "70%",
		backgroundColor: "#5E2478",
		transform: [{ translateY: -60 }],
		borderRadius: 20,
		borderWidth: 2,
		borderColor: "#000000FF",
		borderStyle: "solid",
	},
	text: {
		fontSize: 24,
		fontWeight: "bold",
		padding: 8,
		margin: 10,
		alignSelf: "center",
		color: "white",
		textShadowColor: "#7D55D9FF",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 1,
	},
	subtext: {
		fontSize: 18,
		padding: 8,
		margin: 10,
		alignSelf: "center",
		textAlign: "center",
		color: "white",
		textShadowColor: "#7D55D9FF",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 1,
	},
	image: {
		width: 70,
		height: 70,
		padding: 10,
	},
	displayOne: {
		position: "absolute",
		top: 10,
		left: 60,
	},
	displayTwo: {
		position: "absolute",
		top: 10,
		right: 60,
	},
	displayThree: {
		position: "absolute",
		bottom: 108,
		left: 60,
	},
	displayFour: {
		position: "absolute",
		bottom: 108,
		right: 60,
	},
});
