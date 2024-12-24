import { OutfitDisplayStyles } from "./OutfitDisplayStyles";
import { View } from "react-native";
import { Image } from "expo-image";
export const OutfitDisplay = (props) => {
	// Source item from props
	const item = props.item;
	const buffer = props.buffer || false;

	return (
		<View
			style={
				buffer ? { display: "none" } : OutfitDisplayStyles.container
			}>
			<Image
				style={buffer ? { display: "none" } : OutfitDisplayStyles.image}
				source={item.productImg}
				priority="high"
			/>
		</View>
	);
};
