import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { Feed } from "../Feed/Feed";
import { Settings } from "../Settings/Settings";
import { Wardrobe } from "../Wardrobe/Wardrobe";
import { useUser } from "@clerk/clerk-react";
import { AppContext } from "../utils/AppContext";
import { useEffect, useContext, useState, memo } from "react";
import { Asset } from "expo-asset";
import { TouchableOpacity, Text, StyleSheet, Image, View } from "react-native";

const homeDisplayStyles = StyleSheet.create({
	tabBarText: {
		color: "white",
		fontSize: 16,
		position: "relative",
		top: 40,
		textShadowColor: "#7D55D9FF",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 1,
		marginTop: 2,
	},
	tabBarTextSelected: {
		color: "#9B79EBFF",
		fontSize: 16,
		position: "relative",
		top: 40,
		textShadowColor: "#7D55D9FF",
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 1,
		marginTop: 2,
	},
	tabBarButton: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	tabBarImage: {
		width: 30,
		height: 30,
		position: "relative",
		top: 40,
	},
});

const MemoWardrobe = memo(Wardrobe);
const MemoFeed = memo(Feed);
const MemoSettings = memo(Settings);

export const HomeDisplay = () => {
	// Create Stack Navigator
	const Tab = createBottomTabNavigator();

	const navigation = useNavigation();

	const [currentPage, setCurrentPage] = useState("Feed");

	// Source from context
	const {
		initializeUserBool,
		initializeUserMutation,
		setInitializeUserBool,
		setSavedOutfits,
		setCachedSavedImages,
		setIsSavedImagesLoading,
		setCacheLookupSaved,
		setSettingsAnimation,
	} = useContext(AppContext);

	// Source user object
	const { user } = useUser();

	useEffect(() => {
		// If initializeUserBool is true, invoke mutation
		if (initializeUserBool) {
			initializeUserMutation.mutate(user.id);
			setInitializeUserBool(false);
		}
	}, []);

	// Access saved outfits and store in state, cache saved outfits

	useEffect(() => {
		setSavedOutfits(user.publicMetadata.saved_outfits);
		setIsSavedImagesLoading(true);

		const temp = async () => {
			const cache = [];

			user.publicMetadata.saved_outfits.forEach((outfit) => {
				cache.push(
					Asset.fromURI(outfit.top.productImg).downloadAsync()
				);
				cache.push(
					Asset.fromURI(outfit.bottom.productImg).downloadAsync()
				);
				cache.push(
					Asset.fromURI(outfit.shoes.productImg).downloadAsync()
				);

				console.log("Updating saved cache...");

				setCacheLookupSaved((prev) => ({
					...prev,
					[outfit.top._id]: prev.length,
					[outfit.bottom._id]: prev.length + 1,
					[outfit.shoes._id]: prev.length + 2,
					length: prev.length + 3,
				}));
			});

			setCachedSavedImages(await Promise.all(cache));

			setIsSavedImagesLoading(false);
		};

		temp();
	}, []);

	// Return Tab Navigator with Feed, Settings, and Wardrobe screens, initialized to Feed
	return (
		<Tab.Navigator
			initialRouteName="Feed"
			screenOptions={{
				tabBarStyle: {
					backgroundColor: "#0A1B3BFF",
				},
			}}>
			<Tab.Screen
				name="Feed"
				component={MemoFeed}
				options={{
					headerShown: false,
					tabBarButton: () => {
						return (
							<TouchableOpacity
								style={{
									...homeDisplayStyles.tabBarButton,
									borderRightStyle: "solid",
									borderRightWidth: 1,
									borderRightColor: "white",
								}}
								onPress={() => {
									setSettingsAnimation("feed");
									setCurrentPage("Feed");
									navigation.navigate("Feed");
								}}>
								<Image
									style={homeDisplayStyles.tabBarImage}
									source={
										currentPage == "Feed"
											? require("../assets/feedSelected.png")
											: require("../assets/feedUnselected.png")
									}
								/>
								<Text
									style={
										currentPage == "Feed"
											? homeDisplayStyles.tabBarTextSelected
											: homeDisplayStyles.tabBarText
									}>
									Feed
								</Text>
								<View style={{ height: 100 }}></View>
							</TouchableOpacity>
						);
					},
				}}
			/>
			<Tab.Screen
				name="Settings"
				component={MemoSettings}
				options={{
					headerShown: false,
					tabBarButton: () => {
						return (
							<TouchableOpacity
								style={{
									...homeDisplayStyles.tabBarButton,
									borderRightStyle: "solid",
									borderRightWidth: 1,
									borderRightColor: "white",
								}}
								onPress={() => {
									setCurrentPage("Settings");
									navigation.navigate("Settings");
								}}>
								<Image
									style={homeDisplayStyles.tabBarImage}
									source={
										currentPage == "Settings"
											? require("../assets/settingSelected.png")
											: require("../assets/settingUnselected.png")
									}
								/>
								<Text
									style={
										currentPage == "Settings"
											? homeDisplayStyles.tabBarTextSelected
											: homeDisplayStyles.tabBarText
									}>
									Settings
								</Text>
								<View style={{ height: 100 }}></View>
							</TouchableOpacity>
						);
					},
				}}
			/>
			<Tab.Screen
				name="Wardrobe"
				component={MemoWardrobe}
				options={{
					headerShown: false,
					tabBarButton: () => {
						return (
							<TouchableOpacity
								style={homeDisplayStyles.tabBarButton}
								onPress={() => {
									setSettingsAnimation("wardrobe");
									setCurrentPage("Wardrobe");
									navigation.navigate("Wardrobe");
								}}>
								<Image
									style={homeDisplayStyles.tabBarImage}
									source={
										currentPage == "Wardrobe"
											? require("../assets/wardrobeSelected.png")
											: require("../assets/wardrobeUnselected.png")
									}
								/>
								<Text
									style={
										currentPage == "Wardrobe"
											? homeDisplayStyles.tabBarTextSelected
											: homeDisplayStyles.tabBarText
									}>
									Wardrobe
								</Text>
								<View style={{ height: 100 }}></View>
							</TouchableOpacity>
						);
					},
				}}
			/>
		</Tab.Navigator>
	);
};
