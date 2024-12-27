import axios from "axios";
// Define path for API calls
// Desktop: 192.168.0.157
// Laptop: `92.168.0.162
const API_URL = "http://192.168.0.162:10000";

// Define function for making API call to initialize user account
export const initializeUser = async (userId) => {
	try {
		console.log("Initializing user...");
		const res = await axios.post(
			`${API_URL}/initializeUser`,
			{
				id: userId,
			},
			{
				method: "POST",
				credentials: "include",
			}
		);
		console.log("User Initialized");
		return res.data;
	} catch (err) {
		console.log("Error initializing user: ", err);
		return err;
	}
};

// Define function for making API call to delete user account
export const deleteUser = async (userId) => {
	try {
		console.log("Deleting user...");
		const res = await axios.post(
			`${API_URL}/deleteUser`,
			{
				id: userId,
			},
			{
				method: "POST",
				credentials: "include",
			}
		);
		console.log("User Deleted");
		return res.data;
	} catch (err) {
		console.log("Error deleting user: ", err);
		return err;
	}
};

// Define function for making API call to rate an outfit
export const rateOutfit = async (args) => {
	try {
		console.log("Rating outfit...");
		const res = await axios.post(
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
			{
				method: "POST",
				credentials: "include",
			}
		);
		console.log("Outfit Rated");
		return res.data;
	} catch (err) {
		console.log("Error rating outfit: ", err);
		return err;
	}
};
