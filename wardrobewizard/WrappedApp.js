import { NavigationContainer } from "@react-navigation/native";
import { ClerkLoaded, userAuth, useAuth } from "@clerk/clerk-expo";
import { createContext } from "react";
import { HomeDisplay } from "./HomeDisplay/HomeDisplay";
import { LogIn } from "./LogIn/LogIn";

// Establish context
export const AppContext = createContext();

export const WrappedApp = () => {
	// Establish signed in state, used to conditionally render Clerk components
	const { isSignedIn } = useAuth();

	return (
		<AppContext.Provider value={{}}>
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
