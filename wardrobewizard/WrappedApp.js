import { NavigationContainer } from "@react-navigation/native";
import { ClerkLoaded, useAuth } from "@clerk/clerk-expo";
import { useState, useEffect, cache } from "react";
import { AppContext } from "./utils/AppContext";
import { HomeDisplay } from "./HomeDisplay/HomeDisplay";
import { LogIn } from "./LogIn/LogIn";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
	initializeUser,
	deleteUser,
	saveOutfit,
} from "./methods/clerkUserMethods";
import {
	fetchOutfits,
	rateOutfit,
	deleteItem,
} from "./methods/outfitSourcingMethods";

export const WrappedApp = () => {
	// Establish signed in state, used to conditionally render Clerk components
	const { isSignedIn } = useAuth();

	// State to decide whether to initialize user after sign in
	const [initializeUserBool, setInitializeUserBool] = useState(false);

	// State for the feed of outfits to display
	const [outfitFeed, setOutfitFeed] = useState({
		outfits: [],
		pallet: [],
		currIndex: 0,
		length: 0,
		wasRandom: false,
	});

	// State for cached images of feed
	const [cachedImages, setCachedImages] = useState([]);

	// State for cache loopup table
	const [cacheLookup, setCacheLookup] = useState({ length: 0 });

	// State for the feed of saved outfits
	const [savedOutfits, setSavedOutfits] = useState([]);

	// State for saved outfits cache
	const [cachedSavedImages, setCachedSavedImages] = useState([]);

	// State for lookup table for saved outfits cache
	const [cacheLookupSaved, setCacheLookupSaved] = useState({ length: 0 });

	// State for loading saved outfits
	const [isSavedImagesLoading, setIsSavedImagesLoading] = useState(false);

	// Method for incrementing and decrementing outfit index
	const incrementFeed = async () => {
		if (outfitFeed.currIndex + 15 > outfitFeed.length && !isFeedLoading) {
			setResetFeed(false);
			setPalletSize(60);
			setOutfitCount(20);
			await new Promise((resolve) => setTimeout(resolve, 100));
			refetchFeed();
		}

		setOutfitFeed((prev) => ({
			...prev,
			currIndex: prev.currIndex + 1,
		}));
	};

	const decrementFeed = () => {
		if (outfitFeed.currIndex === 0) {
			return;
		}

		setOutfitFeed((prev) => ({
			...prev,
			currIndex: prev.currIndex - 1,
		}));
	};

	// State for user's local sizing information
	const [size, setSize] = useState({
		topSizes: [],
		bottomSizes: [],
		shoeSizes: [],
	});

	// State for user's waste size
	const [waistSize, setWaistSize] = useState("---");

	// State for user's local gender information
	const [gender, setGender] = useState({
		top: "male",
		bottom: "male",
		shoe: "male",
	});

	// Function to update gender state to be used as listener for sliders
	const updateGender = (gender, target) => {
		switch (target) {
			case "top":
				if (gender === "male") {
					setGender((prev) => {...prev, top: "female"});
				}
				else {
					setGender((prev) => {...prev, top: "male"});
				}
				break;
			case "bottom":
				if (gender === "male") {
					setGender((prev) => {...prev, bottom: "female"});
				}
				else {
					setGender((prev) => {...prev, bottom: "male"});
				}
				break;
			case "shoe":
				if (gender === "male") {
					setGender((prev) => {...prev, shoe: "female"});
				}
				else {
					setGender((prev) => {...prev, shoe: "male"});
				}
		}
	};

	// Define state for visual state of size setting buttons, refereced to render size button styles
	const [topSizeButtons, setTopSizeButtons] = useState({
		all: true,
		XS: false,
		S: false,
		M: false,
		L: false,
		XL: false,
		XXL: false,
	});

	const [bottomSizeButtons, setBottomSizeButtons] = useState({
		all: true,
		XS: false,
		S: false,
		M: false,
		L: false,
		XL: false,
		XXL: false,
	});

	// Method for toggling top size button, accepts a string size and toggles it
	const updateTopSize = (size) => {
		if (size === "all") {
			if (topSizeButtons.all == false) {
				setTopSizeButtons({
					all: true,
					XS: false,
					S: false,
					M: false,
					L: false,
					XL: false,
					XXL: false,
				});
				setSize((prev) => {...prev, topSizes: []});
			}
		}
		else {
			if (topSizeButtons[size] === false) {
				setTopSizeButtons((prev) => ({...prev, all: false, [size]: true}));
				setSize((prev) => {...size, topSizes: [...prev.topSizes, size]});		
			}; else {
				if (size.topSizes.length > 1) {
					setTopSizeButtons((prev) => ({...prev, all: false, [size]: false}));
					setSize((prev) => {...size, topSizes: [prev.topSizes.filter((s) => s !== size)]});
				}; else {
					setTopSizeButtons({
						all: true,
						XS: false,
						S: false,
						M: false,
						L: false,
						XL: false,
						XXL: false,
					});
					setSize((prev) => {...prev, topSizes: []});
				}
			}
			}
		}
	};

	// Method for toggling bottom size button, accepts a string size and toggles it
	const updateBottomSize = (size) => {
		if (size === "all") {
			if (bottomSizeButtons.all == false) {
				setBottomSizeButtons({
					all: true,
					XS: false,
					S: false,
					M: false,
					L: false,
					XL: false,
					XXL: false,
				});
				setSize((prev) => {...prev, bottomSizes: []});
			}
		}
		else {
			if (bottomSizeButtons[size] === false) {
				setBottomSizeButtons((prev) => ({...prev, all: false, [size]: true}));
				setSize((prev) => {...size, bottomSizes: [...prev.bottomSizes, size]});		
			}; else {
				if (size.bottomSizes.length > 1) {
					setBottomSizeButtons((prev) => ({...prev, all: false, [size]: false}));
					setSize((prev) => {...size, bottomSizes: [prev.bottomSizes.filter((s) => s !== size)]});
				}; else {
					setBottomSizeButtons({
						all: true,
						XS: false,
						S: false,
						M: false,
						L: false,
						XL: false,
						XXL: false,
					});
					setSize((prev) => {...prev, bottomSizes: []});
				}
			}
		}

		if (waistSize !== "---") {
			setSize((prev) => ({...prev, bottomSizes: [size]}));
			setWaistSize("---");
		}
	};

	// Method for updating waste size, accepts a boolean to increment or decrement
	const updateWaistSize = (bool) => {
		if ( (waistSize === 24 && bool === 0) || (waistSize === 44 && bool === 1) ) {
			return;
		}
		if (bool === 1) {
			if (waistSize === "---") {
				setWaistSize(32);
				setSize((prev) => ({...prev, bottomSizes: [String(32)]}));
				setBottomSizeButtons({
					all: false,
					XS: false,
					S: false,
					M: false,
					L: false,
					XL: false,
					XXL: false,
				});
			} else {
				setWaistSize((prev) => prev + 2);
				setSize((prev) => ({...prev, bottomSizes: [String(waistSize + 2)]}));
			}
		} else {
			if (waistSize === "---") {
				setWaistSize(32);
				setSize((prev) => ({...prev, bottomSizes: [String(32)]}));
				setBottomSizeButtons({
					all: false,
					XS: false,
					S: false,
					M: false,
					L: false,
					XL: false,
					XXL: false,
				});
			} else {
				setWaistSize((prev) => prev - 2);
				setSize((prev) => ({...prev, bottomSizes: [String(waistSize - 2)]}));
			}
		}
	};

	// Define outfitCount and palletSize states, as well as resetFeed bool
	const [palletSize, setPalletSize] = useState(50);
	const [outfitCount, setOutfitCount] = useState(10);
	const [resetFeed, setResetFeed] = useState(true);

	// Local state for fetch loading
	const [isFeedLoading, setIsFeedLoading] = useState(false);
	// Query for fetching outfit feed from backend
	const { refetch: refetchFeed } = useQuery({
		queryKey: [
			"outfitFeed",
			size,
			gender,
			palletSize,
			outfitCount,
			resetFeed,
			setOutfitFeed,
			setIsFeedLoading,
			setCachedImages,
			setCacheLookup,
		],
		queryFn: () =>
			fetchOutfits(
				size,
				gender,
				palletSize,
				outfitCount,
				resetFeed,
				setOutfitFeed,
				setIsFeedLoading,
				setCachedImages,
				setCacheLookup
			),
		enabled: false,
	});

	// Mutation to rate outfit
	const rateOutfitMutation = useMutation({
		mutationKey: "rateOutfit",
		mutationFn: rateOutfit,
	});

	// Mutation to save outfit
	const saveOutfitMutation = useMutation({
		mutationKey: "saveOutfit",
		mutationFn: saveOutfit,
	});

	// Mutation to initialize user
	const initializeUserMutation = useMutation({
		mutationKey: "initializeUser",
		mutationFn: initializeUser,
	});

	// Mutation to delete user
	const deleteUserMutation = useMutation({
		mutationKey: "deleteUser",
		mutationFn: deleteUser,
	});

	// Mutation to delete item
	const deleteItemMutation = useMutation({
		mutationKey: "deleteItem",
		mutationFn: deleteItem,
	});

	// useEffect to source original outfit feed
	useEffect(() => {
		console.log("Sourcing Initial Feed");
		setPalletSize(40);
		setOutfitCount(10);
		refetchFeed();
	}, []);

	return (
		<AppContext.Provider
			value={{
				deleteUserMutation,
				initializeUserMutation,
				setInitializeUserBool,
				initializeUserBool,
				outfitFeed,
				incrementFeed,
				decrementFeed,
				isFeedLoading,
				setPalletSize,
				setOutfitCount,
				refetchFeed,
				rateOutfitMutation,
				saveOutfitMutation,
				savedOutfits,
				setSavedOutfits,
				cachedImages,
				cacheLookup,
				gender,
				deleteItemMutation,
				cachedSavedImages,
				setCachedSavedImages,
				isSavedImagesLoading,
				setIsSavedImagesLoading,
				cacheLookupSaved,
				setCacheLookupSaved,
				updateGender,
				updateTopSize,
				updateBottomSize,
			}}>
			<NavigationContainer>
				{isSignedIn ? (
					<HomeDisplay />
				) : (
					<ClerkLoaded>
						<LogIn />
					</ClerkLoaded>
				)}
			</NavigationContainer>
		</AppContext.Provider>
	);
};
