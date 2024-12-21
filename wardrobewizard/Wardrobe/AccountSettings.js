import { Text, View } from "react-native";
import { AccountSettingsStyles } from "./AccountSettingsStyles";
import { useContext } from "react";
import { AppContext } from "../WrappedApp";

export const AccountSettings = (props) => {
	// Source from context
	const { deleteUserMutation } = useContext(AppContext);

	const handleSignOut = props.signOutFn;
	const userId = props.userId;
	return (
		<View style={AccountSettingsStyles.container}>
			<Text style={AccountSettingsStyles.text}>Account Settings</Text>
			<Text style={AccountSettingsStyles.text} onPress={handleSignOut}>
				Sign Out
			</Text>
			<Text
				style={AccountSettingsStyles.text}
				onPress={() => {
					deleteUserMutation.mutate(userId);
					handleSignOut();
				}}>
				Delete Account
			</Text>
		</View>
	);
};
