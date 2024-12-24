import { FeedDisplayStyles } from "./FeedDisplayStyles";
import { View } from "react-native";
import { AppContext } from "../../WrappedApp";
import { useContext } from "react";
import { OutfitDisplay } from "../OutfitDisplay/OutfitDisplay";
export const FeedDisplay = (props) => {
	const index = props.index;
	const buffer = props.buffer || false;
	// Source outfits from context
	const { outfitFeed } = useContext(AppContext);

	// Send outfit at current index into outfit display
	return (
		<View style={FeedDisplayStyles.container}>
			<OutfitDisplay
				item={outfitFeed.pallet[index].top}
				buffer={buffer}
			/>
			<OutfitDisplay
				item={outfitFeed.pallet[index].bottom}
				buffer={buffer}
			/>
			<OutfitDisplay
				item={outfitFeed.pallet[index].shoes}
				buffer={buffer}
			/>
		</View>
	);
};
