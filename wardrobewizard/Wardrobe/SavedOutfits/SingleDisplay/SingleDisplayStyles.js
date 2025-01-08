import { StyleSheet } from "react-native";

export const SingleDisplayStyles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "column",
		gap: 12,
		padding: 14,
		borderRadius: 10,
	},
	image: {
		width: 84,
		height: 84,
		borderRadius: 10,
	},
	gradient: {
		height: "100%",
		width: "100%",
		borderRadius: 20,
	},
});
