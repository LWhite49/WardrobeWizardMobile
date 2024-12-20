import { Text, View } from "react-native";
import { AccountSettingsStyles } from "./AccountSettingsStyles";

export const AccountSettings = (props) => {
	const handleSignOut = props.signOutFn;
	return (
		<View style={AccountSettingsStyles.container}>
			<Text style={AccountSettingsStyles.text}>Account Settings</Text>
			<Text style={AccountSettingsStyles.text} onPress={handleSignOut}>
				Sign Out
			</Text>
		</View>
	);
};
