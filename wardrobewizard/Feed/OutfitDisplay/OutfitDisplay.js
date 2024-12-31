import { OutfitDisplayStyles } from "./OutfitDisplayStyles";
import { View } from "react-native";
import { Image } from "expo-image";
export const OutfitDisplay = (props) => {
	// Source item from props
	const item = props.item;
	const src = props.img;

	const length = item.productColors.length;
	return (
		<View style={OutfitDisplayStyles.container}>
			<View style={OutfitDisplay.palletDisplay}>
				<View
					style={{
						...OutfitDisplayStyles.colorDisplay,
						backgroundColor:
							length > 0
								? "#" + item.productColors[0][0]
								: "blue",
					}}></View>
				<View
					style={{
						...OutfitDisplayStyles.colorDisplay,
						backgroundColor:
							length > 1 ? "#" + item.productColors[1][0] : "red",
					}}></View>
				<View
					style={{
						...OutfitDisplayStyles.colorDisplay,
						backgroundColor:
							length > 2
								? "#" + item.productColors[2][0]
								: "yellow",
					}}></View>
				<View
					style={{
						...OutfitDisplayStyles.colorDisplay,
						backgroundColor:
							length > 3
								? "#" + item.productColors[3][0]
								: "green",
					}}></View>
			</View>
			<Image
				style={OutfitDisplayStyles.image}
				source={src == "0" ? item.productImg : src}
				priority="high"
			/>
		</View>
	);
};
