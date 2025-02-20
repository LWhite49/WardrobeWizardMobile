import { StyleSheet } from "react-native";

export const FeedDisplayStyles = StyleSheet.create({
	container: {
		display: "flex",
		position: "relative",
		top: 70,
		gap: 8,
		padding: 10,
		borderRadius: 20,
		borderStyle: "double",
		borderColor: "black",
		borderWidth: 2,
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "col",
		backgroundColor: "purple",
	},
	saveFlex: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		width: "100%",
		gap: 6,
		maxWidth: 150,
	},
	saveText: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#FFFFFFFF",
		textShadowColor: "black",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 2,
		marginBottom: 0,
		paddingBottom: 0,
	},
	saveImage: {
		width: 20,
		height: 20,
	},
});
