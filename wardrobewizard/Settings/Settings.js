import { useState, useEffect, useContext } from "react";
import { AppContext } from "../utils/AppContext";
import { SettingsStyles } from "./SettingsStyles";
import { Text, View, Image, Switch } from "react-native";
import { MotiView } from "moti";
import { useIsFocused } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { CustomMarker } from "./CustomMarker";
import { LinearGradient } from "expo-linear-gradient";

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
		settingsAnimation,
	} = useContext(AppContext);

	// Source focus state
	const isFocused = useIsFocused();
	const [animationState, setAnimationState] = useState({ translateY: -70 });

	// Set Animation State on Render
	useEffect(() => {
		if (isFocused) {
			if (settingsAnimation == "feed") {
				setAnimationState({ translateX: 0 });
			} else if (settingsAnimation == "wardrobe") {
				setAnimationState({ translateX: 0 });
			}
		} else {
			if (settingsAnimation == "feed") {
				setAnimationState({ translateX: -100 });
			} else if (settingsAnimation == "wardrobe") {
				setAnimationState({ translateX: 100 });
			}
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
			<LinearGradient
				style={SettingsStyles.container}
				colors={["#5E2478", "#9021A1FF", "#1E1E60"]}>
				<MotiView
					from={{ translateY: 70 }}
					animate={animationState}
					exit={{ translateY: -70 }}
					style={SettingsStyles.settingsWrapper}>
					<View style={SettingsStyles.genderContainer}>
						<Text style={SettingsStyles.sectionHeader}>
							Gender Styles:
						</Text>
						<View style={SettingsStyles.sliderContainer}>
							<View style={SettingsStyles.singleSliderContainer}>
								<Text style={SettingsStyles.sliderHeader}>
									Top:
								</Text>
								<Switch
									ios_backgroundColor={"#003AAEFF"}
									trackColor={{
										false: "#003AAEFF",
										true: "#F865D3FF",
									}}
									thumbColor={"#F7E0FEFF"}
									value={gender.top == "female"}
									onValueChange={() =>
										toggleGender("top")
									}></Switch>
								<Image
									source={
										gender.top == "male"
											? require("../assets/menIcon.png")
											: require("../assets/womenIcon.png")
									}
									style={
										gender.top == "male"
											? SettingsStyles.genderIcon
											: SettingsStyles.genderIcon2
									}
								/>
							</View>
							<View style={SettingsStyles.singleSliderContainer}>
								<Text style={SettingsStyles.sliderHeader}>
									Bottom:
								</Text>
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
									style={
										gender.bottom == "male"
											? SettingsStyles.genderIcon
											: SettingsStyles.genderIcon2
									}
								/>
							</View>
							<View style={SettingsStyles.singleSliderContainer}>
								<Text style={SettingsStyles.sliderHeader}>
									Shoes:
								</Text>
								<Switch
									ios_backgroundColor={"#003AAEFF"}
									trackColor={{
										false: "#003AAEFF",
										true: "#F865D3FF",
									}}
									thumbColor={"#F7E0FEFF"}
									value={gender.shoe == "female"}
									onValueChange={() =>
										toggleGender("shoe")
									}></Switch>
								<Image
									source={
										gender.shoe == "male"
											? require("../assets/menIcon.png")
											: require("../assets/womenIcon.png")
									}
									style={
										gender.shoe == "male"
											? SettingsStyles.genderIcon
											: SettingsStyles.genderIcon2
									}
								/>
							</View>
						</View>
					</View>
					<View style={SettingsStyles.topSizeContainer}>
						<Text style={SettingsStyles.sectionHeader}>
							Top Sizes:
						</Text>
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
								<Text
									style={
										topSizeButtonState.XS
											? SettingsStyles.topTextSelected
											: SettingsStyles.topTextUnselected
									}>
									XS
								</Text>
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
								<Text
									style={
										topSizeButtonState.S
											? SettingsStyles.topTextSelected
											: SettingsStyles.topTextUnselected
									}>
									S
								</Text>
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
								<Text
									style={
										topSizeButtonState.M
											? SettingsStyles.topTextSelected
											: SettingsStyles.topTextUnselected
									}>
									M
								</Text>
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
								<Text
									style={
										topSizeButtonState.L
											? SettingsStyles.topTextSelected
											: SettingsStyles.topTextUnselected
									}>
									L
								</Text>
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
								<Text
									style={
										topSizeButtonState.XL
											? SettingsStyles.topTextSelected
											: SettingsStyles.topTextUnselected
									}>
									XL
								</Text>
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
								<Text
									style={
										topSizeButtonState.XXL
											? SettingsStyles.topTextSelected
											: SettingsStyles.topTextUnselected
									}>
									XXL
								</Text>
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
								<Text
									style={
										topSizeButtonState.all
											? SettingsStyles.topTextSelected
											: SettingsStyles.topTextUnselected
									}>
									All
								</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View style={SettingsStyles.bottomSizeContainer}>
						<Text style={SettingsStyles.sectionHeader}>
							Bottom Sizes:
						</Text>
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
								<Text
									style={
										bottomSizeButtonState.XS
											? SettingsStyles.topTextSelected
											: SettingsStyles.topTextUnselected
									}>
									XS
								</Text>
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
								<Text
									style={
										bottomSizeButtonState.S
											? SettingsStyles.topTextSelected
											: SettingsStyles.topTextUnselected
									}>
									S
								</Text>
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
								<Text
									style={
										bottomSizeButtonState.M
											? SettingsStyles.topTextSelected
											: SettingsStyles.topTextUnselected
									}>
									M
								</Text>
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
								<Text
									style={
										bottomSizeButtonState.L
											? SettingsStyles.topTextSelected
											: SettingsStyles.topTextUnselected
									}>
									L
								</Text>
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
								<Text
									style={
										bottomSizeButtonState.XL
											? SettingsStyles.topTextSelected
											: SettingsStyles.topTextUnselected
									}>
									XL
								</Text>
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
								<Text
									style={
										bottomSizeButtonState.XXL
											? SettingsStyles.topTextSelected
											: SettingsStyles.topTextUnselected
									}>
									XXL
								</Text>
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
								<Text
									style={
										bottomSizeButtonState.all
											? SettingsStyles.topTextSelected
											: SettingsStyles.topTextUnselected
									}>
									All
								</Text>
							</TouchableOpacity>
						</View>
						<Text style={SettingsStyles.sectionHeader}>
							Waist Size:
						</Text>
						<View style={SettingsStyles.topButtonContainer}>
							<View
								style={SettingsStyles.waistInterfaceContainer}>
								<TouchableOpacity
									onPress={() => updateWaistSize(0)}
									activeOpacity={0.8}>
									<Image
										source={require("../assets/leftArrow.png")}
										style={SettingsStyles.waistImage}
									/>
								</TouchableOpacity>
								<Text
									style={{
										...SettingsStyles.text,
										width: 30,
									}}>
									{waistSize}
								</Text>
								<TouchableOpacity
									onPress={() => updateWaistSize(1)}
									activeOpacity={0.8}>
									<Image
										source={require("../assets/leftArrow.png")}
										style={SettingsStyles.waistImageRev}
									/>
								</TouchableOpacity>
							</View>
						</View>
					</View>
					<View style={SettingsStyles.shoeSizeContainer}>
						<Text style={SettingsStyles.sectionHeader}>
							Shoe Sizes:
						</Text>
						<MultiSlider
							min={6}
							max={15}
							step={0.5}
							containerStyle={SettingsStyles.shoeSliderContainer}
							values={[6, 15]}
							sliderLength={270}
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
							setShowFeedUpdated(true);
							setTimeout(() => {
								setShowFeedUpdated(false);
							}, 2500);
							refetchFeed();
						}}
						activeOpacity={0.4}
						style={SettingsStyles.generateButton}>
						<Text style={SettingsStyles.generateFeedText}>
							Generate Feed
						</Text>
					</TouchableOpacity>
				</MotiView>
			</LinearGradient>
		</>
	);
};
