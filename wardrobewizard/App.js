import "react-native-reanimated";
import "react-native-gesture-handler";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "./utils/cache";
import { createContext } from "react";
import { WrappedApp } from "./WrappedApp";
// Root Component will have wrappers for Navigation, Clerk, and Context

export default function App() {
	// Source env vars
	const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

	console.log(clerkPublishableKey);

	return (
		<ClerkProvider
			tokenCache={tokenCache}
			publishableKey={clerkPublishableKey}>
			<WrappedApp />
		</ClerkProvider>
	);
}
