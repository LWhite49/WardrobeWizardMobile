import { Text, View } from "react-native";
import { SavedOutfitsStyles } from "./SavedOutfitsStyles";

export const SavedOutfits = () => {
	return (
		<View style={SavedOutfitsStyles.container}>
			<Text style={SavedOutfitsStyles.text}>Saved Outfits</Text>
		</View>
	);
};
