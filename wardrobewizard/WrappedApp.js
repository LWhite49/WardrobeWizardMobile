import { NavigationContainer } from "@react-navigation/native";
import { ClerkLoaded, useAuth } from "@clerk/clerk-expo";
import { useState, useEffect } from "react";
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

	// State for shoe range
	const [shoeSizeRange, setShoeSizeRange] = useState([6.0, 15.0]);

	// Method for updating shoe range inside size object
	const updateShoeSizeRange = (values) => {
		// Default Case
		if (values[0] === 6 && values[1] === 15) {
			setSize((prev) => ({ ...prev, shoeSizes: [] }));
		} else {
			const tempArr = [];
			let iterator = values[0];
			while (iterator <= values[1]) {
				tempArr.push(iterator.toFixed(1));
				iterator += 0.5;
			}
			setSize((prev) => ({ ...prev, shoeSizes: tempArr }));
		}
	};
	// State for waist size
	const [waistSize, setWaistSize] = useState("---");

	// Method for updating waist size, 1 == increase 0 == decrease
	const updateWaistSize = (bool) => {
		// If waist size is at max or min
		if (waistSize === 24 && bool === 0) {
			return;
		}
		if (waistSize === 44 && bool === 1) {
			return;
		}
		// If incrementing
		if (bool === 1) {
			// If no waist value
			if (waistSize === "---") {
				setWaistSize(32);
				setSize((prev) => ({ ...prev, bottomSizes: ["32"] }));
				setBottomSizeButtonState({
					all: false,
					XS: false,
					S: false,
					M: false,
					L: false,
					XL: false,
					XXL: false,
				});
			} else {
				setWaistSize(waistSize + 2);
				setSize((prev) => ({
					...prev,
					bottomSizes: [String(waistSize + 2)],
				}));
			}
		} else {
			if (waistSize === "---") {
				setWaistSize(32);
				setSize((prev) => ({ ...prev, bottomSizes: ["32"] }));
				setBottomSizeButtonState({
					all: false,
					XS: false,
					S: false,
					M: false,
					L: false,
					XL: false,
					XXL: false,
				});
			} else {
				setWaistSize(waistSize - 2);
				setSize((prev) => ({
					...prev,
					bottomSizes: [String(waistSize - 2)],
				}));
			}
		}
	};

	// Visual States for top and bottom size buttons
	const [topSizeButtonState, setTopSizeButtonState] = useState({
		all: true,
		XS: false,
		S: false,
		M: false,
		L: false,
		XL: false,
		XXL: false,
	});

	// Method for toggling a top size button
	const toggleTopSizeButton = (sizeStr) => {
		if (sizeStr === "all") {
			if (topSizeButtonState.all === false) {
				setTopSizeButtonState({
					all: true,
					XS: false,
					S: false,
					M: false,
					L: false,
					XL: false,
					XXL: false,
				});
				setSize((prev) => ({ ...prev, topSizes: [] }));
			}
		} else {
			if (topSizeButtonState[sizeStr] === false) {
				setTopSizeButtonState((prev) => ({
					...prev,
					all: false,
					[sizeStr]: true,
				}));
				setSize((prev) => ({
					...prev,
					topSizes: [...prev.topSizes, sizeStr],
				}));
			} else {
				if (size.topSizes.length > 1) {
					setTopSizeButtonState((prev) => ({
						...prev,
						all: false,
						[sizeStr]: false,
					}));
					setSize((prev) => ({
						...prev,
						topSizes: prev.topSizes.filter(
							(item) => item !== sizeStr
						),
					}));
				} else {
					setTopSizeButtonState({
						all: true,
						XS: false,
						S: false,
						M: false,
						L: false,
						XL: false,
						XXL: false,
					});
					setSize((prev) => ({ ...prev, topSizes: [] }));
				}
			}
		}
	};

	const [bottomSizeButtonState, setBottomSizeButtonState] = useState({
		all: true,
		XS: false,
		S: false,
		M: false,
		L: false,
		XL: false,
		XXL: false,
	});

	// Method for toggling bottom size button
	const toggleButtonSizeBottom = (sizeStr) => {
		if (sizeStr === "all") {
			if (bottomSizeButtonState.all === false) {
				setBottomSizeButtonState({
					all: true,
					XS: false,
					S: false,
					M: false,
					L: false,
					XL: false,
					XXL: false,
				});
				setSize((prev) => ({ ...prev, bottomSizes: [] }));
			}
		} else {
			if (bottomSizeButtonState[sizeStr] === false) {
				setBottomSizeButtonState((prev) => ({
					...prev,
					all: false,
					[sizeStr]: true,
				}));
				setSize((prev) => ({
					...prev,
					bottomSizes: [...prev.bottomSizes, sizeStr],
				}));
			} else {
				if (size.bottomSizes.length > 1) {
					setBottomSizeButtonState((prev) => ({
						...prev,
						all: false,
						[sizeStr]: false,
					}));
					setSize((prev) => ({
						...prev,
						bottomSizes: prev.bottomSizes.filter(
							(item) => item !== sizeStr
						),
					}));
				} else {
					setBottomSizeButtonState({
						all: true,
						XS: false,
						S: false,
						M: false,
						L: false,
						XL: false,
						XXL: false,
					});
					setSize((prev) => ({
						...prev,
						bottomSizes: [],
					}));
				}
			}
		}

		if (waistSize !== "---") {
			if (sizeStr !== "all") {
				setSize((prev) => ({
					...prev,
					bottomSizes: [sizeStr],
				}));
			}
			setWaistSize("---");
		}
	};

	// State for user's local gender information
	const [gender, setGender] = useState({
		top: "male",
		bottom: "male",
		shoe: "male",
	});

	// Method for toggling gender value
	const toggleGender = (style) => {
		if (style === "top") {
			const newVal = gender.top === "male" ? "female" : "male";
			setGender((prev) => ({
				...prev,
				top: newVal,
			}));
		} else if (style === "bottom") {
			const newVal = gender.bottom === "male" ? "female" : "male";
			setGender((prev) => ({
				...prev,
				bottom: newVal,
			}));
		} else if (style === "shoe") {
			const newVal = gender.shoe === "male" ? "female" : "male";
			setGender((prev) => ({
				...prev,
				shoe: newVal,
			}));
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
				setOutfitFeed,
				outfitFeed,
				incrementFeed,
				decrementFeed,
				isFeedLoading,
				setPalletSize,
				setOutfitCount,
				refetchFeed,
				resetFeed,
				setResetFeed,
				rateOutfitMutation,
				saveOutfitMutation,
				savedOutfits,
				setSavedOutfits,
				cachedImages,
				cacheLookup,
				setCacheLookup,
				setCachedImages,
				gender,
				deleteItemMutation,
				cachedSavedImages,
				setCachedSavedImages,
				isSavedImagesLoading,
				setIsSavedImagesLoading,
				cacheLookupSaved,
				setCacheLookupSaved,
				topSizeButtonState,
				toggleTopSizeButton,
				bottomSizeButtonState,
				toggleButtonSizeBottom,
				waistSize,
				updateWaistSize,
				toggleGender,
				shoeSizeRange,
				setShoeSizeRange,
				updateShoeSizeRange,
				size,
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
