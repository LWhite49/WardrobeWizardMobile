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
import { fetchOutfits, rateOutfit } from "./methods/outfitSourcingMethods";

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

	// State for the feed of saved outfits
	const [savedOutfits, setSavedOutfits] = useState([]);

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

	// State for user's local gender information
	const [gender, setGender] = useState({
		top: "male",
		bottom: "male",
		shoe: "male",
	});

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
				setCachedImages
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
