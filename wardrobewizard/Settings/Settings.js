import { useState, useEffect, useContext } from "react";
import { AppContext } from "../utils/AppContext";
import { SettingsStyles } from "./SettingsStyles";
import { Text, View, Image, Switch } from "react-native";
import { MotiView } from "moti";
import { useIsFocused } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { CustomMarker } from "./CustomMarker";

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
		bottomSizeButtonState,
		toggleButtonSizeBottom,
		waistSize,
		updateWaistSize,
		toggleGender,
		gender,
		shoeSizeRange,
		setShoeSizeRange,
		updateShoeSizeRange,
		size,
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

	// State for showing the "settings updated" message
	const [showFeedUpdated, setShowFeedUpdated] = useState(false);

	return (
		<>
			{showFeedUpdated && (
				<View style={SettingsStyles.updatedContainer}>
					<Text style={SettingsStyles.text}>Settings Updated</Text>
				</View>
			)}
			<MotiView
				from={{ translateY: 70 }}
				animate={animationState}
				exit={{ translateY: -70 }}
				style={SettingsStyles.container}>
				<Text style={SettingsStyles.text}>Settings</Text>
				<Text style={SettingsStyles.text}>Gender Styles:</Text>

				<View style={SettingsStyles.sliderContainer}>
					<View style={SettingsStyles.singleSliderContainer}>
						<Text style={SettingsStyles.text}>Top:</Text>
						<Switch
							ios_backgroundColor={"#003AAEFF"}
							trackColor={{
								false: "#003AAEFF",
								true: "#F865D3FF",
							}}
							thumbColor={"#F7E0FEFF"}
							value={gender.top == "female"}
							onValueChange={() => toggleGender("top")}></Switch>
						<Image
							source={
								gender.top == "male"
									? require("../assets/menIcon.png")
									: require("../assets/womenIcon.png")
							}
							style={SettingsStyles.genderIcon}
						/>
					</View>
					<View style={SettingsStyles.singleSliderContainer}>
						<Text style={SettingsStyles.text}>Bottom:</Text>
						<Switch
							ios_backgroundColor={"#003AAEFF"}
							trackColor={{
								false: "#003AAEFF",
								true: "#F865D3FF",
							}}
							thumbColor={"#F7E0FEFF"}
							value={gender.bottom == "female"}
							onValueChange={() => toggleGender("bottom")}
							thunbImage></Switch>
						<Image
							source={
								gender.bottom == "male"
									? require("../assets/menIcon.png")
									: require("../assets/womenIcon.png")
							}
							style={SettingsStyles.genderIcon}
						/>
					</View>
					<View style={SettingsStyles.singleSliderContainer}>
						<Text style={SettingsStyles.text}>Shoes:</Text>
						<Switch
							ios_backgroundColor={"#003AAEFF"}
							trackColor={{
								false: "#003AAEFF",
								true: "#F865D3FF",
							}}
							thumbColor={"#F7E0FEFF"}
							value={gender.shoe == "female"}
							onValueChange={() => toggleGender("shoe")}></Switch>
						<Image
							source={
								gender.shoe == "male"
									? require("../assets/menIcon.png")
									: require("../assets/womenIcon.png")
							}
							style={SettingsStyles.genderIcon}
						/>
					</View>
				</View>
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
				<Text style={SettingsStyles.text}>Bottom Sizes:</Text>
				<View style={SettingsStyles.topButtonContainer}>
					<TouchableOpacity
						style={
							bottomSizeButtonState.XS
								? SettingsStyles.topButtonSelected
								: SettingsStyles.topButtonUnselected
						}
						onPress={() => {
							toggleButtonSizeBottom("XS");
						}}>
						<Text>XS</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={
							bottomSizeButtonState.S
								? SettingsStyles.topButtonSelected
								: SettingsStyles.topButtonUnselected
						}
						onPress={() => {
							toggleButtonSizeBottom("S");
						}}>
						<Text>S</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={
							bottomSizeButtonState.M
								? SettingsStyles.topButtonSelected
								: SettingsStyles.topButtonUnselected
						}
						onPress={() => {
							toggleButtonSizeBottom("M");
						}}>
						<Text>M</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={
							bottomSizeButtonState.L
								? SettingsStyles.topButtonSelected
								: SettingsStyles.topButtonUnselected
						}
						onPress={() => {
							toggleButtonSizeBottom("L");
						}}>
						<Text>L</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={
							bottomSizeButtonState.XL
								? SettingsStyles.topButtonSelected
								: SettingsStyles.topButtonUnselected
						}
						onPress={() => {
							toggleButtonSizeBottom("XL");
						}}>
						<Text>XL</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={
							bottomSizeButtonState.XXL
								? SettingsStyles.topButtonSelected
								: SettingsStyles.topButtonUnselected
						}
						onPress={() => {
							toggleButtonSizeBottom("XXL");
						}}>
						<Text>XXL</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={
							bottomSizeButtonState.all
								? SettingsStyles.topButtonSelected
								: SettingsStyles.topButtonUnselected
						}
						onPress={() => {
							toggleButtonSizeBottom("all");
						}}>
						<Text>All</Text>
					</TouchableOpacity>
				</View>
				<Text style={SettingsStyles.text}>Waist Size:</Text>
				<View style={SettingsStyles.topButtonContainer}>
					<View style={SettingsStyles.waistInterfaceContainer}>
						<TouchableOpacity onPress={() => updateWaistSize(0)}>
							<Image
								source={require("../assets/whiteStar.png")}
								style={SettingsStyles.waistImage}
							/>
						</TouchableOpacity>
						<Text style={SettingsStyles.text}>{waistSize}</Text>
						<TouchableOpacity onPress={() => updateWaistSize(1)}>
							<Image
								source={require("../assets/whiteStar.png")}
								style={SettingsStyles.waistImage}
							/>
						</TouchableOpacity>
					</View>
				</View>
				<Text style={SettingsStyles.text}>Shoe Sizes:</Text>
				<MultiSlider
					min={6}
					max={15}
					step={0.5}
					containerStyle={SettingsStyles.shoeSliderContainer}
					values={[6, 15]}
					sliderLength={300}
					trackStyle={SettingsStyles.shoeSliderTrack}
					selectedStyle={SettingsStyles.shoeSliderSelected}
					markerStyle={SettingsStyles.shoeSliderMarker}
					enabledTwo={true}
					showSteps={true}
					showStepLabels={true}
					snapped={true}
					enableLabel={true}
					customLabel={() => (
						<CustomMarker
							val1={shoeSizeRange[0]}
							val2={shoeSizeRange[1]}
						/>
					)}
					onValuesChange={(values) => {
						setShoeSizeRange((prev) => values);
						updateShoeSizeRange(shoeSizeRange);
					}}
				/>
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
						setShowFeedUpdated(true);
						setTimeout(() => {
							setShowFeedUpdated(false);
						}, 2500);
						refetchFeed();
					}}
					style={SettingsStyles.generateButton}>
					<Text>Generate Feed</Text>
				</TouchableOpacity>
			</MotiView>
		</>
	);
};
