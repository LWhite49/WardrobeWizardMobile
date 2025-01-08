import { SingleDisplayStyles } from "./SingleDisplayStyles";
import { View, TouchableOpacity, Linking } from "react-native";
import { Image } from "expo-image";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
export const SingleDisplay = (props) => {
	const [display, setDisplay] = useState("none");

	setTimeout(() => {
		setDisplay("flex");
	}, props.lockout);
	return (
		<LinearGradient
			colors={[
				"#" + props.top.productColors[0][0],
				"#" + props.bottom.productColors[0][0],
				"#" + props.shoes.productColors[0][0],
			]}
			style={SingleDisplayStyles.gradient}>
			<View
				style={{
					...SingleDisplayStyles.container,
					display: display,
				}}>
				<TouchableOpacity
					onPress={() => {
						Linking.openURL(props.top.productListing);
					}}>
					<Image
						style={SingleDisplayStyles.image}
						source={props.topSrc}
						priority="high"
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						Linking.openURL(props.bottom.productListing);
					}}>
					<Image
						style={SingleDisplayStyles.image}
						source={props.bottomSrc}
						priority="high"
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						Linking.openURL(props.shoes.productListing);
					}}>
					<Image
						style={SingleDisplayStyles.image}
						source={props.shoesSrc}
						priority="high"
					/>
				</TouchableOpacity>
			</View>
		</LinearGradient>
	);
};
