import { OutfitDisplayStyles } from "./OutfitDisplayStyles";
import { View, Text, Linking, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Image } from "expo-image";
import OutlinedText from "@kdn0325/react-native-outlined-text";

export const OutfitDisplay = (props) => {
	// Source item from props
	const item = props.item;
	const src = props.img;
	const collection = props.collection;
	const deleteFn = props.deleteFn;
	const BGStateFn = props.BGColorState;

	const [vis, setVis] = useState(true);

	const length = item.productColors.length;
	return vis ? (
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
			<View style={OutfitDisplayStyles.sizeButton}>
				<OutlinedText
					text={item.productSize}
					fontColor={"white"}
					fontSize={20}
					fontWeight={"700"}
					outlineColor={"#261E95FF"}
					outli
				/>
			</View>

			<TouchableOpacity
				style={OutfitDisplayStyles.deleteButton}
				onPress={() => {
					deleteFn(item._id, collection, item, setVis);
				}}>
				<Image
					style={OutfitDisplayStyles.reportImage}
					source={require("../../assets/reportSvg.svg")}></Image>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={() => Linking.openURL(item.productListing)}
				onPressIn={() => BGStateFn()}
				activeOpacity={0.8}>
				<Image
					style={
						vis
							? OutfitDisplayStyles.image
							: OutfitDisplayStyles.invisImage
					}
					source={src == "0" ? item.productImg : src}
					priority="high"
				/>
			</TouchableOpacity>
		</View>
	) : (
		<Text style={{ fontSize: 18, color: "red" }}>XXX</Text>
	);
};
