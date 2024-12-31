import React, { useState, useEffect, useRef, useContext } from "react";
import { FeedStyles } from "./FeedStyles";
import { MotiView } from "moti";
import { useUser } from "@clerk/clerk-react";
import { Text, View, Image } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { AppContext } from "../utils/AppContext";
import { FeedDisplay } from "./FeedDisplay/FeedDisplay";
import TinderCard from "react-tinder-card";

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
		rateOutfitMutation,
		saveOutfitMutation,
		setSavedOutfits,
		cachedImages,
	} = useContext(AppContext);

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

	// Handler for swiping TinderCard
	const handleSwipe = (direction, index) => {
		const top = outfitFeed.pallet[index].top;
		const bottom = outfitFeed.pallet[index].bottom;
		const shoe = outfitFeed.pallet[index].shoes;

		if (direction === "right") {
			rateOutfit(top, bottom, shoe, 1);
		} else if (direction === "left") {
			rateOutfit(top, bottom, shoe, 0);
		}
		return;
	};

	return (
		<MotiView
			from={{ translateX: 100 }}
			animate={animationState}
			exit={{ translateX: -100 }}
			style={FeedStyles.container}>
			{isFeedLoading && outfitFeed.currIndex + 2 >= outfitFeed.length ? (
				<Text>Loading...</Text>
			) : (
				<View style={FeedStyles.feedWrapper}>
					{
						<TinderCard
							key={
								outfitFeed.pallet[
									outfitFeed.outfits[outfitFeed.currIndex].top
								].top._id +
								outfitFeed.pallet[
									outfitFeed.outfits[outfitFeed.currIndex]
										.bottom
								].bottom._id
							}
							onSwipe={(direction) => {
								handleSwipe(
									direction,
									outfitFeed.outfits[outfitFeed.currIndex].top
								);
								incrementFeed();
							}}
							preventSwipe={["down"]}
							swipeRequirementType="position"
							swipeThreshold={10}>
							<FeedDisplay
								index={outfitFeed.currIndex}
								saveFn={saveOutfit}
							/>
						</TinderCard>
					}
				</View>
			)}
		</MotiView>
	);
};
