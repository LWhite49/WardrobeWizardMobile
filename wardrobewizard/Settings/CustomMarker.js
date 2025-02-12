import { Text, View, StyleSheet, Image } from "react-native";

const MarkerStyles = StyleSheet.create({
	container: {
		position: "relative",
		bottom: 0,
		display: "flex",
		flex: 1,
		left: 30,
		width: 100,
		height: 30,
		maxHeight: 60,
		borderRadius: 20,
		backgroundColor: "purple",
		alignItems: "center",
		justifyContent: "center",
	},
	container2: {
		position: "relative",
		left: 170,
		borderRadius: 20,
		top: -60,
		display: "flex",
		flex: 1,
		width: 100,
		height: 30,
		maxHeight: 60,
		backgroundColor: "purple",
		alignItems: "center",
		justifyContent: "center",
	},
	text: {
		fontSize: 20,
		color: "white",
	},
});

export const CustomMarker = () => {
	return (
		<>
			<View style={MarkerStyles.container}>
				<Text style={MarkerStyles.text}>Max: 6.0</Text>
			</View>
			<View style={MarkerStyles.container2}>
				<Text style={MarkerStyles.text}>Min: 15.0</Text>
			</View>
		</>
	);
};
