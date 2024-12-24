import "react-native-reanimated";
import "react-native-gesture-handler";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "./utils/cache";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { WrappedApp } from "./WrappedApp";

// Root Component will have wrappers for Clerk, and React Query

const queryClient = new QueryClient();

export default function App() {
	// Source env vars
	const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

	console.log(clerkPublishableKey);

	return (
		<ClerkProvider
			tokenCache={tokenCache}
			publishableKey={clerkPublishableKey}>
			<QueryClientProvider client={queryClient}>
				<GestureHandlerRootView>
					<WrappedApp />
				</GestureHandlerRootView>
			</QueryClientProvider>
		</ClerkProvider>
	);
}
