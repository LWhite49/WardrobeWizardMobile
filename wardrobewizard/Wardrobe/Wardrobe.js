import { WardrobeStyles } from "./WardrobeStyles";
import { Text, View } from "react-native";

// Wardrobe Component will display outfits stored in user's Clerk metadata in a horizontal scrollable feed
// Information about the user's rating vector will also be displayed

export const Wardrobe = () => {
	return (
		<View style={WardrobeStyles.container}>
			<Text style={WardrobeStyles.text}>Wardrobe</Text>
		</View>
	);
};
