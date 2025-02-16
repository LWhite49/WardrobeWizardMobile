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
		backgroundColor: "#7D55D9FF",
		alignItems: "center",
		justifyContent: "center",
		borderStyle: "solid",
		borderColor: "orange",
		borderWidth: 1,
	},
	container2: {
		position: "relative",
		left: 170,
		borderRadius: 20,
		top: -50,
		display: "flex",
		flex: 1,
		width: 100,
		height: 30,
		maxHeight: 60,
		backgroundColor: "#7D55D9FF",
		alignItems: "center",
		justifyContent: "center",
		borderStyle: "solid",
		borderColor: "orange",
		borderWidth: 1,
	},
	text: {
		fontSize: 20,
		color: "white",
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
