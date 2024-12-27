import { FeedDisplayStyles } from "./FeedDisplayStyles";
import { Text, View } from "react-native";
import { AppContext } from "../../WrappedApp";
import { useContext } from "react";
import { OutfitDisplay } from "../OutfitDisplay/OutfitDisplay";
export const FeedDisplay = (props) => {
	const index = props.index;
	const buffer = props.buffer || false;
	const rateOutfit = props.rateFn;

	// Source outfits from context
	const { outfitFeed } = useContext(AppContext);

	const top = outfitFeed.pallet[index].top;
	const bottom = outfitFeed.pallet[index].bottom;
	const shoe = outfitFeed.pallet[index].shoes;

	// Send outfit at current index into outfit display
	return (
		<View style={FeedDisplayStyles.container}>
			<Text
				onPress={() => {
					rateOutfit(top, bottom, shoe, 1);
				}}>
				Like
			</Text>
			<OutfitDisplay item={top} buffer={buffer} />
			<OutfitDisplay item={bottom} buffer={buffer} />
			<OutfitDisplay item={shoe} buffer={buffer} />
			<Text
				onPress={() => {
					rateOutfit(top, bottom, shoe, 0);
				}}>
				Dislike
			</Text>
		</View>
	);
};
