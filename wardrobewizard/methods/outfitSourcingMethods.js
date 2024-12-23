import axios from "axios";

// Define path for API calls
const API_URL = "http://192.168.0.157:10000";

// Define function for making API call to source outfits
export const fetchOutfits = async (
	size,
	gender,
	palletSize,
	outfitCount,
	reset,
	setFn,
	loadSetFn
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
			setFn({
				outfits: data.outfits,
				currIndex: 0,
				length: data.outfits.length,
				wasRandom: data.wasRandom,
			});
		} else {
			setFn((prev) => ({
				outfits: prev.outfits.concat(data.outfits),
				currIndex: prev.currIndex,
				length: prev.length + data.outfits.length,
				wasRandom: data.wasRandom,
			}));
		}
		loadSetFn(false);
		return 0;
	} catch (err) {
		console.log("Error fetching outfits: ", err);
		return err;
	}
};
