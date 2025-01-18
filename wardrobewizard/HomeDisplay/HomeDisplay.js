import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feed } from "../Feed/Feed";
import { Settings } from "../Settings/Settings";
import { Wardrobe } from "../Wardrobe/Wardrobe";
import { useUser } from "@clerk/clerk-react";
import { AppContext } from "../utils/AppContext";
import { useEffect, useContext } from "react";
import { Asset } from "expo-asset";

export const HomeDisplay = () => {
	// Create Stack Navigator
	const Tab = createBottomTabNavigator();

	// Source from context
	const {
		initializeUserBool,
		initializeUserMutation,
		setInitializeUserBool,
		setSavedOutfits,
		setCachedSavedImages,
		setIsSavedImagesLoading,
		setCacheLookupSaved,
		cacheLookupSaved,
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
		<Tab.Navigator initialRouteName="Feed">
			<Tab.Screen
				name="Feed"
				component={Feed}
				options={{ headerShown: false }}
			/>
			<Tab.Screen
				name="Settings"
				component={Settings}
				options={{ headerShown: false }}
			/>
			<Tab.Screen
				name="Wardrobe"
				component={Wardrobe}
				options={{ headerShown: false }}
			/>
		</Tab.Navigator>
	);
};
