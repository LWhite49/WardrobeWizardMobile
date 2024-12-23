import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feed } from "../Feed/Feed";
import { Settings } from "../Settings/Settings";
import { Wardrobe } from "../Wardrobe/Wardrobe";
import { useUser } from "@clerk/clerk-react";
import { AppContext } from "../WrappedApp";
import { useContext } from "react";

export const HomeDisplay = () => {
	// Create Stack Navigator
	const Tab = createBottomTabNavigator();

	// Source from context
	const {
		initializeUserBool,
		initializeUserMutation,
		setInitializeUserMutation,
	} = useContext(AppContext);

	// Source user object
	const { user } = useUser();

	// If initializeUserBool is true, invoke mutation
	if (initializeUserBool) {
		initializeUserMutation.mutate(user.id);
		setInitializeUserBool(false);
	}

	// Return Tab Navigator with Feed, Settings, and Wardrobe screens, initialized to Feed
	return (
		<Tab.Navigator initialRouteName="Feed">
			<Tab.Screen
				name="Feed"
				component={Feed}
				options={{ headerShown: false }}
			/>
			<Tab.Screen
				name="Settings"
				component={Settings}
				options={{ headerShown: false }}
			/>
			<Tab.Screen
				name="Wardrobe"
				component={Wardrobe}
				options={{ headerShown: false }}
			/>
		</Tab.Navigator>
	);
};
