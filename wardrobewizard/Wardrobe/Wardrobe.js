import { useState, useEffect } from "react";
import { WardrobeStyles } from "./WardrobeStyles";
import { Text, View } from "react-native";
import { MotiView } from "moti";
import { useIsFocused } from "@react-navigation/native";

// Wardrobe Component will display outfits stored in user's Clerk metadata in a horizontal scrollable feed
// Information about the user's rating vector will also be displayed

export const Wardrobe = () => {
	// Source focus state
	const isFocused = useIsFocused();
	const [animationState, setAnimationState] = useState({ translateX: 100 });

	// Set Animation State on Render
	useEffect(() => {
		if (isFocused) {
			setAnimationState({ translateX: 0 });
		} else {
			setAnimationState({ translateX: -100 });
		}
	}, [isFocused]);

	return (
		<MotiView
			from={{ translateX: -100 }}
			animate={animationState}
			exit={{ translateX: 100 }}
			style={WardrobeStyles.container}>
			<Text style={WardrobeStyles.text}>Wardrobe</Text>
		</MotiView>
	);
};
