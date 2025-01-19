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
				<Text>No Outfits Saved</Text>
			) : (
				<View style={SavedOutfitsStyles.container}>
					{savedOutfits.length > 0 ? (
						<View style={SavedOutfitsStyles.displayOne}>
							<SingleDisplay
								lockout={0 * 300}
								topSrc={
									cachedSavedImages[
										cacheLookupSaved[
											savedOutfits[0].top._id
										]
									].localUri
								}
								bottomSrc={
									cachedSavedImages[
										cacheLookupSaved[
											savedOutfits[0].bottom._id
										]
									].localUri
								}
								shoesSrc={
									cachedSavedImages[
										cacheLookupSaved[
											savedOutfits[0].shoes._id
										]
									].localUri
								}
								top={savedOutfits[0].top}
								bottom={savedOutfits[0].bottom}
								shoes={savedOutfits[0].shoes}></SingleDisplay>
						</View>
					) : (
						<Text>No saved outfits</Text>
					)}
					{savedOutfits.length > 1 ? (
						<View style={SavedOutfitsStyles.displayTwo}>
							<SingleDisplay
								lockout={1 * 300}
								topSrc={
									cachedSavedImages[
										cacheLookupSaved[
											savedOutfits[1].top._id
										]
									].localUri
								}
								bottomSrc={
									cachedSavedImages[
										cacheLookupSaved[
											savedOutfits[1].bottom._id
										]
									].localUri
								}
								shoesSrc={
									cachedSavedImages[
										cacheLookupSaved[
											savedOutfits[1].shoes._id
										]
									].localUri
								}
								top={savedOutfits[1].top}
								bottom={savedOutfits[1].bottom}
								shoes={savedOutfits[1].shoes}></SingleDisplay>
						</View>
					) : null}
					{savedOutfits.length > 2 ? (
						<View style={SavedOutfitsStyles.displayThree}>
							<SingleDisplay
								lockout={2 * 300}
								topSrc={
									cachedSavedImages[
										cacheLookupSaved[
											savedOutfits[2].top._id
										]
									].localUri
								}
								bottomSrc={
									cachedSavedImages[
										cacheLookupSaved[
											savedOutfits[2].bottom._id
										]
									].localUri
								}
								shoesSrc={
									cachedSavedImages[
										cacheLookupSaved[
											savedOutfits[2].shoes._id
										]
									].localUri
								}
								top={savedOutfits[2].top}
								bottom={savedOutfits[2].bottom}
								shoes={savedOutfits[2].shoes}></SingleDisplay>
						</View>
					) : null}
					{savedOutfits.length > 3 ? (
						<View style={SavedOutfitsStyles.displayFour}>
							<SingleDisplay
								lockout={3 * 300}
								topSrc={
									cachedSavedImages[
										cacheLookupSaved[
											savedOutfits[3].top._id
										]
									].localUri
								}
								bottomSrc={
									cachedSavedImages[
										cacheLookupSaved[
											savedOutfits[3].bottom._id
										]
									].localUri
								}
								shoesSrc={
									cachedSavedImages[
										cacheLookupSaved[
											savedOutfits[3].shoes._id
										]
									].localUri
								}
								top={savedOutfits[3].top}
								bottom={savedOutfits[3].bottom}
								shoes={savedOutfits[3].shoes}></SingleDisplay>
						</View>
					) : null}
				</View>
			)}
		</View>
	);
};
