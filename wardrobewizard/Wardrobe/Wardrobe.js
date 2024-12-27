import { useState, useEffect } from "react";
import { WardrobeStyles } from "./WardrobeStyles";
import { Text, View } from "react-native";
import { AccountSettings } from "./AccountSettings";
import { SavedOutfits } from "./SavedOutfits";
import { MotiView } from "moti";
import { useIsFocused } from "@react-navigation/native";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { useContext } from "react";
import { AppContext } from "../utils/AppContext";

// Wardrobe Component will display outfits stored in user's Clerk metadata in a horizontal scrollable feed
// Information about the user's rating vector will also be displayed

export const Wardrobe = () => {
	// Source savedOutfits from context
	const { savedOutfits } = useContext(AppContext);

	// Source focus state
	const isFocused = useIsFocused();
	const [animationState, setAnimationState] = useState({ translateX: 100 });

	// Set Animation State on Render
	useEffect(() => {
		if (isFocused) {
			setAnimationState({ translateX: 0 });
		} else {
			setAnimationState({ translateX: -100 });
		}
	}, [isFocused]);

	// State for displaying Saved Outfits / Account Settings
	// -1 == Saved Outfits, 1 == Account Settings
	const [wardrobeState, setWardrobeState] = useState(-1);

	// Source user data and methods
	const { user } = useUser();
	const { signOut } = useClerk();

	// Handler for signing out user
	const handleSignOut = async () => {
		await signOut();
	};

	return (
		<MotiView
			from={{ translateX: -100 }}
			animate={animationState}
			exit={{ translateX: 100 }}
			style={WardrobeStyles.container}>
			<Text style={WardrobeStyles.text}>
				Wardrobe -{" "}
				{wardrobeState == -1 ? "Saved Outfits" : "Account Settings"}
			</Text>
			<Text
				style={WardrobeStyles.text}
				onPress={() => {
					setWardrobeState((prev) => prev * -1);
				}}>
				{wardrobeState == -1
					? "See Account Settings"
					: "See Saved Outfits"}
			</Text>
			<>
				{wardrobeState == -1 ? (
					<SavedOutfits savedOutfits={savedOutfits} />
				) : (
					<AccountSettings
						signOutFn={handleSignOut}
						userId={user.id}
					/>
				)}
			</>
		</MotiView>
	);
};
