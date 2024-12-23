import { useState, useEffect } from "react";
import { FeedStyles } from "./FeedStyles";
import { MotiView } from "moti";
import { Text, View, Image } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { AppContext } from "../WrappedApp";
import { useContext } from "react";

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

	// Source from context
	const { outfitFeed, isFeedLoading } = useContext(AppContext);
	return (
		<MotiView
			from={{ translateX: 100 }}
			animate={animationState}
			exit={{ translateX: -100 }}
			style={FeedStyles.container}>
			<Text style={FeedStyles.text}>Feed</Text>
			{isFeedLoading ? (
				<Text>Loading...</Text>
			) : (
				<Text>{outfitFeed.outfits.length}</Text>
			)}
			<Text>{isFeedLoading}</Text>
		</MotiView>
	);
};
