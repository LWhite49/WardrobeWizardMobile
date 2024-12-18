import { FeedStyles } from "./FeedStyles";
import { Text, View } from "react-native";

// Feed Component will display outfits sourced from backend in a horizontal scrollable field
// Each outfit will be embedded with a like and dislike button, as well as an option to save the outfit
// Will need to figure out how to conditionally display interactive loading spinner while fetching outfits

export const Feed = () => {
	return (
		<View style={FeedStyles.container}>
			<Text style={FeedStyles.text}>Feed</Text>
		</View>
	);
};
