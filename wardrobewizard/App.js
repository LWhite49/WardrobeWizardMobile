import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { createContext } from "react";
import { HomeDisplay } from "./HomeDisplay/HomeDisplay";
import { LogIn } from "./LogIn/LogIn";

// Root Component will have wrappers for Navigation, Clerk, and Context

// Establish context
export const AppContext = createContext();

export default function App() {
	// Source env vars
	const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

	console.log(clerkPublishableKey);
	// Establish signed in state, used to conditionally render Clerk components
	const [signedIn, setSignedIn] = useState(false);

	return (
		<ClerkProvider publishableKey={clerkPublishableKey}>
			<AppContext.Provider value={{ signedIn, setSignedIn }}>
				<NavigationContainer>
					{signedIn ? (
						<HomeDisplay />
					) : (
						<ClerkLoaded>
							<LogIn />
						</ClerkLoaded>
					)}
				</NavigationContainer>
			</AppContext.Provider>
		</ClerkProvider>
	);
}
