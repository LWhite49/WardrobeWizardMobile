import { FeedDisplayStyles } from "./FeedDisplayStyles";
import { Text, View } from "react-native";
import { AppContext } from "../../utils/AppContext";
import { useContext } from "react";
import { OutfitDisplay } from "../OutfitDisplay/OutfitDisplay";
import { Loading } from "../Loading/Loading";
import { LinearGradient } from "expo-linear-gradient";

export const FeedDisplay = (props) => {
	const index = props.index;
	const saveOutfit = props.saveFn;

	// Source outfits from context
	const { outfitFeed, cachedImages, cacheLookup, gender } =
		useContext(AppContext);

	const top = outfitFeed.pallet[outfitFeed.outfits[index].top].top;
	const bottom = outfitFeed.pallet[outfitFeed.outfits[index].bottom].bottom;
	const shoe = outfitFeed.pallet[outfitFeed.outfits[index].shoe].shoes;

	const topScr = cachedImages[cacheLookup[top._id]];
	const bottomScr = cachedImages[cacheLookup[bottom._id]];
	const shoeScr = cachedImages[cacheLookup[shoe._id]];

	if (!topScr || !bottomScr || !shoeScr) {
		return <Loading />;
	}
	// Send outfit at current index into outfit display
	return (
		<LinearGradient
			colors={["#5E2478", "#9021A1FF", "#1E1E60"]}
			style={
				index == outfitFeed.currIndex
					? FeedDisplayStyles.container
					: { display: "none" }
			}>
			<Text onPress={() => saveOutfit(top, bottom, shoe)}>Save</Text>
			<OutfitDisplay
				item={top}
				img={topScr.localUri}
				collection={gender.top == "male" ? 0 : 3}
				deleteFn={props.deleteFn}
				BGColorState={props.BGColorState}
			/>
			<OutfitDisplay
				item={bottom}
				img={bottomScr.localUri}
				collection={gender.bottom == "male" ? 1 : 4}
				deleteFn={props.deleteFn}
				BGColorState={props.BGColorState}
			/>
			<OutfitDisplay
				item={shoe}
				img={shoeScr.localUri}
				collection={gender.shoe == "male" ? 2 : 5}
				deleteFn={props.deleteFn}
				BGColorState={props.BGColorState}
			/>
		</LinearGradient>
	);
};
