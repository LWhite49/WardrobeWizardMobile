import { Asset } from "expo-asset";

export const cacheImages = async (outfitFeed, setCacheLoopup) => {
	console.log("Caching Images");

	// Create promises for each outfit
	const promises = [];
	outfitFeed.outfits.forEach(async (outfit) => {
		promises.push(
			Asset.fromURI(
				outfitFeed.pallet[outfit.top].top.productImg
			).downloadAsync()
		);

		setCacheLoopup((prev) => ({
			...prev,
			[outfitFeed.pallet[outfit.top].top._id]: prev.length,
			length: prev.length + 1,
		}));

		promises.push(
			Asset.fromURI(
				outfitFeed.pallet[outfit.bottom].bottom.productImg
			).downloadAsync()
		);

		setCacheLoopup((prev) => ({
			...prev,
			[outfitFeed.pallet[outfit.bottom].bottom._id]: prev.length,
			length: prev.length + 1,
		}));

		promises.push(
			Asset.fromURI(
				outfitFeed.pallet[outfit.shoe].shoes.productImg
			).downloadAsync()
		);

		setCacheLoopup((prev) => ({
			...prev,
			[outfitFeed.pallet[outfit.shoe].shoes._id]: prev.length,
			length: prev.length + 1,
		}));
	});

	// Wait for all promises to resolve
	const resolvedPromises = await Promise.all(promises);

	return resolvedPromises;
};
