import { Text, View } from "react-native";
import { Image } from "expo-image";
import { SavedOutfitsStyles } from "./SavedOutfitsStyles";
import { useContext } from "react";
import { AppContext } from "../../utils/AppContext";
import { SingleDisplay } from "./SingleDisplay/SingleDisplay";

export const SavedOutfits = () => {
	// Source from context
	const {
		savedOutfits,
		isSavedImagesLoading,
		cachedSavedImages,
		cacheLookupSaved,
	} = useContext(AppContext);

	return (
		<View style={SavedOutfitsStyles.container}>
			{isSavedImagesLoading ? (
				<Text>Loading...</Text>
			) : (
				<View
					style={{
						display: "flex",
						flexDirection: "row",
						gap: "20px",
					}}>
					{savedOutfits.map((outfit, i) => (
						<SingleDisplay
							key={i}
							lockout={i * 300}
							topSrc={
								cachedSavedImages[
									cacheLookupSaved[outfit.top._id]
								].localUri
							}
							bottomSrc={
								cachedSavedImages[
									cacheLookupSaved[outfit.bottom._id]
								].localUri
							}
							shoesSrc={
								cachedSavedImages[
									cacheLookupSaved[outfit.shoes._id]
								].localUri
							}
							top={outfit.top}
							bottom={outfit.bottom}
							shoes={outfit.shoes}></SingleDisplay>
					))}
				</View>
			)}
		</View>
	);
};
