import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feed } from "../Feed/Feed";
import { Settings } from "../Settings/Settings";
import { Wardrobe } from "../Wardrobe/Wardrobe";
import { useUser } from "@clerk/clerk-react";

export const HomeDisplay = () => {
	// Create Stack Navigator
	const Tab = createBottomTabNavigator();

	// Source user object
	const { user } = useUser();

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
