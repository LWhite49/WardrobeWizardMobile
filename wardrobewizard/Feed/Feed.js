import { useState, useEffect } from "react";
import { FeedStyles } from "./FeedStyles";
import { MotiView } from "moti";
import { Text, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";

// Feed Component will display outfits sourced from backend in a horizontal scrollable field
// Each outfit will be embedded with a like and dislike button, as well as an option to save the outfit
// Will need to figure out how to conditionally display interactive loading spinner while fetching outfits

export const Feed = () => {
	// Source focus state
	const isFocused = useIsFocused();
	const [animationState, setAnimationState] = useState({ translateX: -100 });

	// Set Animation State on Render
	useEffect(() => {
		if (isFocused) {
			setAnimationState({ translateX: 0 });
		} else {
			setAnimationState({ translateX: 100 });
		}
	}, [isFocused]);

	return (
		<MotiView
			from={{ translateX: 100 }}
			animate={animationState}
			exit={{ translateX: -100 }}
			style={FeedStyles.container}>
			<Text style={FeedStyles.text}>Feed</Text>
		</MotiView>
	);
};
