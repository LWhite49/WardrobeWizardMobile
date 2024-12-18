import { createStackNavigator } from "@react-navigation/stack";
import { Feed } from "../Feed/Feed";
import { Settings } from "../Settings/Settings";
import { Wardrobe } from "../Wardrobe/Wardrobe";

export const HomeDisplay = () => {
	// Create Stack Navigator
	const Stack = createStackNavigator();

	// Return Stack Navigator with Feed, Settings, and Wardrobe screens, initialized to Feed
	return (
		<Stack.Navigator initialRouteName="Feed">
			<Stack.Screen
				name="Feed"
				component={Feed}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Settings"
				component={Settings}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Wardrobe"
				component={Wardrobe}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
};
