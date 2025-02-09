import { Text, View, Animated } from "react-native";
import { LoadingStyles } from "./LoadingStyles";
export const Loading = () => {
	return (
		<View style={LoadingStyles.container}>
			<Text style={LoadingStyles.text}>Loading...</Text>
			<Animated.Image
				source={require("../../assets/whiteStar.png")}
				style={LoadingStyles.image}
			/>
		</View>
	);
};
