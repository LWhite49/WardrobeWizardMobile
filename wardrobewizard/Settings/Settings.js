import { SettingsStyles } from "./SettingsStyles";
import { Text, View } from "react-native";

// Settings Component will allow users to adjust their size and color pallet preferences
// Includes option to change password, delete account, and log out will be included in this component

export const Settings = () => {
	return (
		<View style={SettingsStyles.container}>
			<Text style={SettingsStyles.text}>Settings</Text>
		</View>
	);
};
