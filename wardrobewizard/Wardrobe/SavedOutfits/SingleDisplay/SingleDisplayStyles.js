import { StyleSheet } from "react-native";

export const SingleDisplayStyles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "column",
		gap: 6,
		padding: 10,
		borderRadius: 10,
	},
	image: {
		width: 84,
		height: 84,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#300D82FF",
		borderStyle: "solid",
		opacity: 1,
	},
	gradient: {
		height: "100%",
		width: "100%",
		borderRadius: 20,
		borderWidth: 1,
		borderColor: "#300D82FF",
		borderStyle: "solid",
	},
});
