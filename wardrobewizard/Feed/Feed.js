import { useState, useEffect, useRef } from "react";
import { FeedStyles } from "./FeedStyles";
import { MotiView } from "moti";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { Text, View, Image } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { AppContext } from "../WrappedApp";
import { useContext } from "react";
import { FeedDisplay } from "./FeedDisplay/FeedDisplay";
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
	const {
		outfitFeed,
		isFeedLoading,
		incrementFeed,
		decrementFeed,
		preloadedImages,
	} = useContext(AppContext);

	// useRef to ensure only one increment per swipe
	const swipeRef = useRef(false);

	// Define gesture handlers that invoke increment and decrement feed
	const handleSwipeGesture = (event) => {
		if (event.nativeEvent.translationX < -20 && !swipeRef.current) {
			incrementFeed();
			swipeRef.current = true;
		} else if (event.nativeEvent.translationX > 20 && !swipeRef.current) {
			decrementFeed();
			swipeRef.current = true;
		}
	};

	// Reset swipeRef on gesture end
	const handleSwipeEnd = (event) => {
		if (event.nativeEvent.state === State.END) swipeRef.current = false;
	};
	return (
		<PanGestureHandler
			onGestureEvent={handleSwipeGesture}
			onHandlerStateChange={handleSwipeEnd}>
			<MotiView
				from={{ translateX: 100 }}
				animate={animationState}
				exit={{ translateX: -100 }}
				style={FeedStyles.container}>
				<Text style={FeedStyles.text}>Feed</Text>
				{isFeedLoading &&
				outfitFeed.currIndex + 2 >= outfitFeed.length ? (
					<Text>Loading...</Text>
				) : (
					<FeedDisplay index={outfitFeed.currIndex} />
				)}
			</MotiView>
		</PanGestureHandler>
	);
};
