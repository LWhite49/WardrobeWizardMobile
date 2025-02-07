import { useState, useEffect, useContext } from "react";
import { AppContext } from "../utils/AppContext";
import { SettingsStyles } from "./SettingsStyles";
import { Text, View } from "react-native";
import { MotiView } from "moti";
import { useIsFocused } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

// Settings Component will allow users to adjust their size and color pallet preferences
// Includes option to change password, delete account, and log out will be included in this component

export const Settings = () => {
	// Source from context
	const {
		topSizeButtonState,
		toggleTopSizeButton,
		setPalletSize,
		setOutfitCount,
		refetchFeed,
		setResetFeed,
		setOutfitFeed,
		setCachedImages,
		setCacheLookup,
	} = useContext(AppContext);

	// Source focus state
	const isFocused = useIsFocused();
	const [animationState, setAnimationState] = useState({ translateY: -70 });

	// Set Animation State on Render
	useEffect(() => {
		if (isFocused) {
			setAnimationState({ translateY: 0 });
		} else {
			setAnimationState({ translateY: 70 });
		}
	}, [isFocused]);
	return (
		<MotiView
			from={{ translateY: 70 }}
			animate={animationState}
			exit={{ translateY: -70 }}
			style={SettingsStyles.container}>
			<Text style={SettingsStyles.text}>Settings</Text>
			<Text style={SettingsStyles.text}>Top Sizes:</Text>
			<View style={SettingsStyles.topButtonContainer}>
				<TouchableOpacity
					style={
						topSizeButtonState.XS
							? SettingsStyles.topButtonSelected
							: SettingsStyles.topButtonUnselected
					}
					onPress={() => {
						toggleTopSizeButton("XS");
					}}>
					<Text>XS</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={
						topSizeButtonState.S
							? SettingsStyles.topButtonSelected
							: SettingsStyles.topButtonUnselected
					}
					onPress={() => {
						toggleTopSizeButton("S");
					}}>
					<Text>S</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={
						topSizeButtonState.M
							? SettingsStyles.topButtonSelected
							: SettingsStyles.topButtonUnselected
					}
					onPress={() => {
						toggleTopSizeButton("M");
					}}>
					<Text>M</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={
						topSizeButtonState.L
							? SettingsStyles.topButtonSelected
							: SettingsStyles.topButtonUnselected
					}
					onPress={() => {
						toggleTopSizeButton("L");
					}}>
					<Text>L</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={
						topSizeButtonState.XL
							? SettingsStyles.topButtonSelected
							: SettingsStyles.topButtonUnselected
					}
					onPress={() => {
						toggleTopSizeButton("XL");
					}}>
					<Text>XL</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={
						topSizeButtonState.XXL
							? SettingsStyles.topButtonSelected
							: SettingsStyles.topButtonUnselected
					}
					onPress={() => {
						toggleTopSizeButton("XXL");
					}}>
					<Text>XXL</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={
						topSizeButtonState.all
							? SettingsStyles.topButtonSelected
							: SettingsStyles.topButtonUnselected
					}
					onPress={() => {
						toggleTopSizeButton("all");
					}}>
					<Text>All</Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity
				onPress={() => {
					setResetFeed(true);
					setPalletSize(50);
					setOutfitCount(10);
					setOutfitFeed({
						outfits: [],
						pallet: [],
						currIndex: 0,
						length: 0,
						wasRandom: false,
					});
					setCachedImages([]);
					setCacheLookup({ length: 0 });
					refetchFeed();
				}}
				style={SettingsStyles.generateButton}>
				<Text>Generate Feed</Text>
			</TouchableOpacity>
		</MotiView>
	);
};
