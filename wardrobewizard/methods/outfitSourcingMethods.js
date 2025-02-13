import axios from "axios";
import { cacheImages } from "../utils/CacheImages";

// Define path for API calls
const API_URL = "http://10.226.239.54:10000";

// Define function for making API call to source outfits
export const fetchOutfits = async (
	size,
	gender,
	palletSize,
	outfitCount,
	reset,
	setFn,
	loadSetFn,
	cacheSetFn,
	cacheLoopupSetFn
) => {
	try {
		console.log("Fetching outfits...");
		const url = `${API_URL}/generateOutfitFeed?size=${JSON.stringify(
			size
		)}&brand=${JSON.stringify([])}&topGender=${gender.top}&bottomGender=${
			gender.bottom
		}&shoeGender=${
			gender.shoe
		}&outfitCount=${outfitCount}&palletSize=${palletSize}`;
		loadSetFn(true);
		const res = await axios.get(url, {
			method: "GET",
			credentials: "include",
		});

		const data = res.data;
		console.log("Outfits Fetched");
		if (reset) {
			cacheSetFn([]);
			setFn({
				outfits: data.outfits,
				pallet: data.pallet,
				currIndex: 0,
				length: data.outfits.length,
				wasRandom: data.wasRandom,
			});
			console.log("Resetting Cache");
			await new Promise((resolve) => setTimeout(resolve, 100));
			cacheLoopupSetFn({ length: 0 });
			await cacheSetFn(await cacheImages(data, cacheLoopupSetFn));
		} else {
			setFn((prev) => {
				const prevLen = prev.pallet.length;

				const newOutfits = data.outfits.map((item) => {
					return {
						top: item.top + prevLen,
						bottom: item.bottom + prevLen,
						shoe: item.shoe + prevLen,
					};
				});

				if (reset) {
					return prev;
				}
				return {
					outfits: prev.outfits.concat(newOutfits),
					pallet: prev.pallet.concat(data.pallet),
					currIndex: prev.currIndex,
					length: prev.length + data.outfits.length,
					wasRandom: data.wasRandom,
				};
			});
			await new Promise((resolve) => setTimeout(resolve, 100));
			const cache = await cacheImages(data, cacheLoopupSetFn);
			cacheSetFn((prev) => {
				const temp = prev.concat(cache);
				return temp;
			});
		}
		await new Promise((resolve) => setTimeout(resolve, 400));
		loadSetFn(false);
		return 0;
	} catch (err) {
		console.log("Error fetching outfits: ", err);
		return err;
	}
};

export const rateOutfit = async (args) => {
	try {
		console.log("Rating outfit...");
		let res = await axios.post(
			`${API_URL}/rateOutfit`,
			{
				p1: args.p1,
				p2: args.p2,
				p3: args.p3,
				id1: args.id1,
				id2: args.id2,
				id3: args.id3,
				rating: args.rating,
				userId: args.userId,
			},
			{ method: "POST", credentials: "include" }
		);
		console.log("Outfit Rated");
		return res.data;
	} catch (err) {
		console.log("Error rating outfit: ", err);
		return err;
	}
};

export const deleteItem = async (args) => {
	try {
		console.log("Deleting Item...");
		let res = await axios.post(
			`${API_URL}/deleteItem`,
			{
				id: args.id,
				collection: args.collection,
				item: args.item,
			},
			{ method: "POST", credentials: "include" }
		);
		console.log("Item Deleted");
		return res.data;
	} catch (err) {
		console.log("Trouble Deleting Outfit: ", err);
		return err;
	}
};
