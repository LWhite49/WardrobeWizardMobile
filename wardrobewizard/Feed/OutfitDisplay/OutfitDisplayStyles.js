import { StyleSheet } from "react-native";

const componentHeight = 180;
export const OutfitDisplayStyles = StyleSheet.create({
	container: {
		position: "relative",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		height: componentHeight,
		maxHeight: componentHeight,
		borderRadius: 10,
		overflow: "hidden",
		marginTop: 8,
		marginBottom: 8,
		marginLeft: 12,
		marginRight: 12,
	},
	image: {
		width: componentHeight,
		height: componentHeight,
		draggable: false,
		borderBottomRightRadius: 22,
		borderTopRightRadius: 22,
	},
	palletDisplay: {
		display: "flex",
		flexDirection: "column",
		gap: 0,
		margin: 0,
		padding: 0,
		maxWidth: 20,
		width: 20,
		height: componentHeight,
		maxHeight: componentHeight,
	},
	colorDisplay: {
		display: "flex",
		margin: 0,
		padding: 0,
		border: "none",
		width: 20,
		height: componentHeight / 4,
	},
});
