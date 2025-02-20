import { Text, View, Animated } from "react-native";
import { useRef, useEffect } from "react";
import { Easing } from "react-native-reanimated";
import { LoadingStyles } from "./LoadingStyles";
export const Loading = () => {
	// Create rotating animation for loading spinned
	const LoadingAnimationValue = useRef(new Animated.Value(0)).current;

	// Define rotation animation
	const startCWRotation = () => {
		Animated.loop(
			Animated.timing(LoadingAnimationValue, {
				toValue: 1,
				duration: 2500,
				easing: Easing.linear,
				useNativeDriver: true,
			})
		).start();
	};

	// Start rotation on render
	useEffect(() => {
		startCWRotation();
	}, []);

	// Interpolate value
	const LoadingAnimation = LoadingAnimationValue.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "360deg"],
	});

	return (
		<View style={LoadingStyles.container}>
			<Text style={LoadingStyles.text}>Generating Outfits...</Text>
			<Animated.Image
				source={require("../../assets/loadingSpinner.png")}
				style={{
					...LoadingStyles.image,
					transform: [{ rotate: LoadingAnimation }],
				}}
			/>
		</View>
	);
};
