import { StyleSheet } from "react-native";

export const SettingsStyles = StyleSheet.create({
	container: {
		display: "flex",
		flex: 1,
		gap: 12,
		paddingTop: 80,
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		fontSize: 20,
		color: "purple",
	},
	sliderContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		gap: 60,
	},
	singleSliderContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: 10,
	},
	genderIcon: {
		position: "relative",
		bottom: 10,
		width: 40,
		height: 40,
		padding: 0,
		margin: 0,
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
	waistInterfaceContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		gap: 30,
	},
	waistImage: {
		width: 60,
		height: 60,
	},
	generateButton: {
		display: "relative",
		bottom: 60,
		backgroundColor: "purple",
		borderRadius: 20,
		padding: 30,
	},
	customLabel: {
		fontFamily: "Arial",
		fontSize: 10,
	},
	customLabelContainer: {
		width: 80,
		height: 90,
		backgroundColor: "purple",
	},
	shoeSliderContainer: {
		position: "relative",
		bottom: 60,
	},
	shoeSliderTrack: {
		backgroundColor: "grey",
	},
	shoeSliderSelected: {
		backgroundColor: "purple",
	},
	shoeSliderMarker: {
		backgroundColor: "purple",
		borderColor: "white",
		borderWidth: 2,
		borderStyle: "solid",
	},
});
