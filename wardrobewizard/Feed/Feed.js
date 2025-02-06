import React, { useState, useEffect, useRef, useContext } from "react";
import { FeedStyles } from "./FeedStyles";
import { MotiView, useAnimationState } from "moti";
import { Easing } from "react-native-reanimated";
import { useUser } from "@clerk/clerk-react";
import { Text, View, TouchableOpacity, Animated } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { AppContext } from "../utils/AppContext";
import { FeedDisplay } from "./FeedDisplay/FeedDisplay";
import TinderCard from "react-tinder-card";
import { Asset } from "expo-asset";

// Feed Component will display outfits sourced from backend in a horizontal scrollable field
// Each outfit will be embedded with a like and dislike button, as well as an option to save the outfit
// Will need to figure out how to conditionally display interactive loading spinner while fetching outfits

export const Feed = () => {
	// Source focus state
	const isFocused = useIsFocused();
	const [animationState, setAnimationState] = useState({ translateX: -100 });

	// Set Animation State on Render
	useEffect(() => {
		BGColorState.transitionTo("neutral");
		if (isFocused) {
			setAnimationState({ translateX: 0 });
		} else {
			setAnimationState({ translateX: 100 });
		}
	}, [isFocused]);

	// State for BG color
	const BGColorState = useAnimationState(
		{
			neutral: { backgroundColor: "#F8D7F8" },
			like: { backgroundColor: "#6ADC7F" },
			dislike: { backgroundColor: "#E25960" },
			deciding: { backgroundColor: "#BC7CDE" },
		},
		"neutral"
	);

	// Flag used to track state transitions
	let didBGColorStateChange = false;
	// Handler for clicking Feed to decide
	const BGColorHandler = () => {
		BGColorState.transitionTo("deciding", {
			type: "timing",
			duration: 250,
		});
		didBGColorStateChange = false;
		setTimeout(() => {
			if (!didBGColorStateChange) {
				BGColorState.transitionTo("neutral", {
					type: "timing",
					duration: 250,
				});
			}
		}, 3000);
	};

	// Source from context
	const {
		outfitFeed,
		isFeedLoading,
		incrementFeed,
		rateOutfitMutation,
		saveOutfitMutation,
		setSavedOutfits,
		deleteItemMutation,
		cachedImages,
		setCachedSavedImages,
		setIsSavedImagesLoading,
		setCacheLookupSaved,
		cacheLookupSaved,
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

		// Store new images in cache

		setIsSavedImagesLoading(true);

		const cache = [];
		cache.push(Asset.fromURI(top.productImg).downloadAsync());
		cache.push(Asset.fromURI(bottom.productImg).downloadAsync());
		cache.push(Asset.fromURI(shoe.productImg).downloadAsync());

		setCacheLookupSaved((prev) => {
			return {
				...prev,
				[top._id]: prev.length,
				[bottom._id]: prev.length + 1,
				[shoe._id]: prev.length + 2,
				length: prev.length + 3,
			};
		});

		console.log("Updated cacheLookup");

		const processedCache = await Promise.all(cache);

		setCachedSavedImages((prev) => [...prev, ...processedCache]);

		// Update saved outfits state
		setSavedOutfits((prev) => {
			if (prev == undefined) {
				return [
					{
						top: top,
						bottom: bottom,
						shoes: shoe,
					},
				];
			}
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

		setIsSavedImagesLoading(false);
	};

	// Delete Item handler
	const deleteItem = async (id, collection, item, setVis) => {
		// Structure mutation arguments
		const args = {
			id: id,
			collection: collection,
			item: item,
		};

		// Invoke mutation
		await deleteItemMutation.mutate(args);

		setVis(false);
	};

	// Handler for swiping TinderCard
	const handleSwipe = (direction, index) => {
		const top = outfitFeed.pallet[index].top;
		const bottom = outfitFeed.pallet[index].bottom;
		const shoe = outfitFeed.pallet[index].shoes;

		didBGColorStateChange = true;

		if (direction === "right") {
			rateOutfit(top, bottom, shoe, 1);
			BGColorState.transitionTo("like", {
				type: "timing",
				duration: 250,
			});
		} else if (direction === "left") {
			rateOutfit(top, bottom, shoe, 0);
			BGColorState.transitionTo("dislike", {
				type: "timing",
				duration: 250,
			});
		}
		setTimeout(() => {
			BGColorState.transitionTo("neutral", {
				type: "timing",
				duration: 250,
			});
		}, 700);
		return;
	};

	// BG Rotation Animation
	const BGRotationCWValue = useRef(new Animated.Value(0)).current;

	// Funciton to start infinite rotation
	const startCWRotation = () => {
		Animated.loop(
			Animated.timing(BGRotationCWValue, {
				toValue: 1,
				duration: 4000,
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
	const BGRotationCW = BGRotationCWValue.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "360deg"],
	});

	const BGRotationCC = BGRotationCWValue.interpolate({
		inputRange: [0, 1],
		outputRange: ["0deg", "-360deg"],
	});

	return (
		<MotiView
			from={{ translateX: 100 }}
			animate={animationState}
			exit={{ translateX: -100 }}
			style={FeedStyles.container}
			state={BGColorState}
			onHover={() => {
				BGColorState.transitionTo("like", {
					type: "timing",
					duration: 250,
				});
			}}>
			<Animated.Image
				source={require("../assets/whiteStar.png")}
				style={{
					...FeedStyles.star1,
					transform: [{ rotate: BGRotationCC }],
				}}
			/>
			<Animated.Image
				source={require("../assets/whiteStar.png")}
				style={{
					...FeedStyles.star2,
					transform: [{ rotate: BGRotationCC }],
				}}
			/>
			<Animated.Image
				source={require("../assets/whiteStar.png")}
				style={{
					...FeedStyles.star3,
					transform: [{ rotate: BGRotationCC }],
				}}
			/>
			<Animated.Image
				source={require("../assets/whiteStar.png")}
				style={{
					...FeedStyles.star1,
					transform: [{ rotate: BGRotationCC }],
				}}
			/>
			<Animated.Image
				source={require("../assets/whiteStar.png")}
				style={{
					...FeedStyles.star2,
					transform: [{ rotate: BGRotationCC }],
				}}
			/>
			<Animated.Image
				source={require("../assets/whiteStar.png")}
				style={{
					...FeedStyles.star3,
					transform: [{ rotate: BGRotationCC }],
				}}
			/>
			<Animated.Image
				source={require("../assets/whiteStar.png")}
				style={{
					...FeedStyles.star4,
					transform: [{ rotate: BGRotationCW }],
				}}
			/>
			<Animated.Image
				source={require("../assets/whiteStar.png")}
				style={{
					...FeedStyles.star5,
					transform: [{ rotate: BGRotationCW }],
				}}
			/>
			<Animated.Image
				source={require("../assets/whiteStar.png")}
				style={{
					...FeedStyles.star6,
					transform: [{ rotate: BGRotationCW }],
				}}
			/>
			{(isFeedLoading && outfitFeed.currIndex + 2 >= outfitFeed.length) ||
			cachedImages.length < 3 * (outfitFeed.currIndex + 1) ? (
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
							preventSwipe={[]}
							swipeRequirementType="position"
							swipeThreshold={50}>
							<TouchableOpacity
								onPressIn={() => {
									BGColorHandler();
								}}
								activeOpacity={1}>
								<FeedDisplay
									index={outfitFeed.currIndex}
									saveFn={saveOutfit}
									deleteFn={deleteItem}
									BGColorState={BGColorHandler}
								/>
							</TouchableOpacity>
						</TinderCard>
					}
				</View>
			)}
		</MotiView>
	);
};
