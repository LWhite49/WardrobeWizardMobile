import { Text, View, StyleSheet, Image } from "react-native";

const MarkerStyles = StyleSheet.create({
	container: {
		position: "relative",
		bottom: 0,
		display: "flex",
		flex: 1,
		left: 10,
		top: 6,
		width: 100,
		maxHeight: 40,
		borderRadius: 20,
		backgroundColor: "#3C0750FF",
		alignItems: "center",
		justifyContent: "center",
		borderStyle: "solid",
		borderColor: "purple",
		borderWidth: 1,
	},
	container2: {
		position: "relative",
		left: 160,
		borderRadius: 20,
		top: -34,
		display: "flex",
		flex: 1,
		width: 100,
		maxHeight: 40,
		backgroundColor: "#3C0750FF",
		alignItems: "center",
		justifyContent: "center",
		borderStyle: "solid",
		borderColor: "purple",
		borderWidth: 1,
	},
	text: {
		fontSize: 16,
		color: "white",
		textShadowColor: "#7D55D9FF",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 1,
	},
});

export const CustomMarker = (props) => {
	return (
		<>
			<View style={MarkerStyles.container}>
				<Text style={MarkerStyles.text}>
					Min: {props.val1.toFixed(1)}
				</Text>
			</View>
			<View style={MarkerStyles.container2}>
				<Text style={MarkerStyles.text}>
					Max: {props.val2.toFixed(1)}
				</Text>
			</View>
		</>
	);
};
