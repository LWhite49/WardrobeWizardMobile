import { OutfitDisplayStyles } from "./OutfitDisplayStyles";
import { View } from "react-native";
import { Image } from "expo-image";
export const OutfitDisplay = (props) => {
	// Source item from props
	const item = props.item;
	const src = props.img;

	return (
		<View style={OutfitDisplayStyles.container}>
			<Image
				style={OutfitDisplayStyles.image}
				source={src == "0" ? item.productImg : src}
				priority="high"
			/>
		</View>
	);
};
