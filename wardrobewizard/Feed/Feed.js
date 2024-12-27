import { useState, useEffect, useRef } from "react";
import { FeedStyles } from "./FeedStyles";
import { MotiView } from "moti";
import { useUser } from "@clerk/clerk-react";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { Text, View, Image } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { AppContext } from "../utils/AppContext";
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
		rateOutfitMutation,
		saveOutfitMutation,
		setSavedOutfits,
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

	// Source user id
	const { user } = useUser();

	// Rate outfit handler
	const rateOutfit = async (top, bottom, shoe, rating) => {
		// Structure mutation arguments
		const args = {
			p1: top.productColors,
			p2: bottom.productColors,
			p3: shoe.productColors,
			id1: top._id,
			id2: bottom._id,
			id3: shoe._id,
			rating: rating,
			userId: user.id,
		};

		// Invoke mutation
		await rateOutfitMutation.mutate(args);
	};

	// Save outfit handler
	const saveOutfit = async (top, bottom, shoe) => {
		// Structure mutation arguments
		const args = {
			userId: user.id,
			top: top,
			bottom: bottom,
			shoes: shoe,
		};

		// Invoke mutation
		await saveOutfitMutation.mutate(args);

		// Update saved outfits state
		setSavedOutfits((prev) => {
			if (prev.length == 4) {
				prev.shift();
			}

			return [
				...prev,
				{
					top: top,
					bottom: bottom,
					shoes: shoe,
				},
			];
		});
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
					<FeedDisplay
						index={outfitFeed.currIndex}
						rateFn={rateOutfit}
						saveFn={saveOutfit}
					/>
				)}
			</MotiView>
		</PanGestureHandler>
	);
};
