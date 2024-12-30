import { Asset } from "expo-asset";

export const cacheImages = async (outfitFeed) => {
	console.log("Caching Images");
	console.log("Resetting Cache");

	// Create promises for each outfit
	const promises = outfitFeed.outfits.map(async (outfit) => ({
		top: await Asset.fromURI(
			outfitFeed.pallet[outfit.top].top.productImg
		).downloadAsync(),
		bottom: await Asset.fromURI(
			outfitFeed.pallet[outfit.bottom].bottom.productImg
		).downloadAsync(),
		shoes: await Asset.fromURI(
			outfitFeed.pallet[outfit.shoe].shoes.productImg
		).downloadAsync(),
	}));

	// Wait for all promises to resolve
	const resolvedPromises = await Promise.all(promises);

	return resolvedPromises;
};
