import { FeedDisplayStyles } from "./FeedDisplayStyles";
import { Text, View } from "react-native";
import { AppContext } from "../../utils/AppContext";
import { useContext } from "react";
import { OutfitDisplay } from "../OutfitDisplay/OutfitDisplay";
export const FeedDisplay = (props) => {
	const index = props.index;
	const saveOutfit = props.saveFn;

	// Source outfits from context
	const { outfitFeed, cachedImages, cacheLookup, gender } =
		useContext(AppContext);

	const top = outfitFeed.pallet[outfitFeed.outfits[index].top].top;
	const bottom = outfitFeed.pallet[outfitFeed.outfits[index].bottom].bottom;
	const shoe = outfitFeed.pallet[outfitFeed.outfits[index].shoe].shoes;

	// Send outfit at current index into outfit display
	return (
		<View
			style={
				index == outfitFeed.currIndex
					? FeedDisplayStyles.container
					: { display: "none" }
			}>
			<Text onPress={() => saveOutfit(top, bottom, shoe)}>Save</Text>
			<OutfitDisplay
				item={top}
				img={
					index == 0
						? "0"
						: cachedImages[cacheLookup[top._id]].localUri
				}
				collection={gender.top == "male" ? 0 : 3}
				deleteFn={props.deleteFn}
			/>
			<OutfitDisplay
				item={bottom}
				img={
					index == 0
						? "0"
						: cachedImages[cacheLookup[bottom._id]].localUri
				}
				collection={gender.bottom == "male" ? 1 : 4}
				deleteFn={props.deleteFn}
			/>
			<OutfitDisplay
				item={shoe}
				img={
					index == 0
						? "0"
						: cachedImages[cacheLookup[shoe._id]].localUri
				}
				collection={gender.shoe == "male" ? 2 : 5}
				deleteFn={props.deleteFn}
			/>
		</View>
	);
};
