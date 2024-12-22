import axios from "axios";
// Define path for API calls
const API_URL = "http://192.168.0.157:10000";

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
