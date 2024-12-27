import { Text, View } from "react-native";
import { Image } from "expo-image";
import { SavedOutfitsStyles } from "./SavedOutfitsStyles";

export const SavedOutfits = (props) => {
	const savedOutfits = props.savedOutfits;

	return (
		<View style={SavedOutfitsStyles.container}>
			<View
				style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
				{savedOutfits.map((outfit, i) => (
					<View
						key={i}
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "10px",
						}}>
						<Image
							source={outfit.top.productImg}
							priority="high"
							style={SavedOutfitsStyles.image}
						/>
						<Image
							source={outfit.bottom.productImg}
							priority="high"
							style={SavedOutfitsStyles.image}
						/>
						<Image
							source={outfit.shoes.productImg}
							priority="high"
							style={SavedOutfitsStyles.image}
						/>
					</View>
				))}
			</View>
		</View>
	);
};
