import { NavigationContainer } from "@react-navigation/native";
import { ClerkLoaded, useAuth } from "@clerk/clerk-expo";
import { useState, createContext } from "react";
import { HomeDisplay } from "./HomeDisplay/HomeDisplay";
import { LogIn } from "./LogIn/LogIn";
import { useMutation } from "@tanstack/react-query";
import { initializeUser, deleteUser } from "./methods/clerkUserMethods";

// Establish context
export const AppContext = createContext();

export const WrappedApp = () => {
	// Establish signed in state, used to conditionally render Clerk components
	const { isSignedIn } = useAuth();

	// State to decide whether to initialize user after sign in
	const [initializeUserBool, setInitializeUserBool] = useState(false);

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

	return (
		<AppContext.Provider
			value={{
				deleteUserMutation,
				initializeUserMutation,
				setInitializeUserBool,
				initializeUserBool,
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
