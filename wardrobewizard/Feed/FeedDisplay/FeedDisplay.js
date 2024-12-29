import { FeedDisplayStyles } from "./FeedDisplayStyles";
import { Text, View } from "react-native";
import { AppContext } from "../../utils/AppContext";
import { useContext } from "react";
import { OutfitDisplay } from "../OutfitDisplay/OutfitDisplay";
export const FeedDisplay = (props) => {
	const index = props.index;
	const saveOutfit = props.saveFn;
	// Source outfits from context
	const { outfitFeed } = useContext(AppContext);

	const top = outfitFeed.pallet[index].top;
	const bottom = outfitFeed.pallet[index].bottom;
	const shoe = outfitFeed.pallet[index].shoes;

	// Send outfit at current index into outfit display
	return (
		<View
			style={
				index == outfitFeed.currIndex
					? FeedDisplayStyles.container
					: { display: "none" }
			}>
			<Text onPress={() => saveOutfit(top, bottom, shoe)}>Save</Text>
			<OutfitDisplay item={top} />
			<OutfitDisplay item={bottom} />
			<OutfitDisplay item={shoe} />
		</View>
	);
};
