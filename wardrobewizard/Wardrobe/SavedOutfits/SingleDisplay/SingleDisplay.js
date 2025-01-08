import { SingleDisplayStyles } from "./SingleDisplayStyles";
import { View } from "react-native";
import { Image } from "expo-image";
import { useState } from "react";

export const SingleDisplay = (props) => {
	const [display, setDisplay] = useState("none");

	setTimeout(() => {
		setDisplay("flex");
	}, props.lockout);
	return (
		<View
			style={{
				...SingleDisplayStyles.container,
				backgroundColor: "#" + props.top.productColors[0][0],
				display: display,
			}}>
			<Image
				style={SingleDisplayStyles.image}
				source={props.topSrc}
				priority="high"
			/>
			<Image
				style={SingleDisplayStyles.image}
				source={props.bottomSrc}
				priority="high"
			/>
			<Image
				style={SingleDisplayStyles.image}
				source={props.shoesSrc}
				priority="high"
			/>
		</View>
	);
};
