import { Text, View, TouchableOpacity, Image } from "react-native";
import { AccountSettingsStyles } from "./AccountSettingsStyles";
import { useContext } from "react";
import { AppContext } from "../../utils/AppContext";

export const AccountSettings = (props) => {
	// Source from context
	const { deleteUserMutation } = useContext(AppContext);

	const handleSignOut = props.signOutFn;
	const userId = props.userId;
	return (
		<View style={AccountSettingsStyles.container}>
			<Image
				style={AccountSettingsStyles.image}
				source={require("../../assets/WardrobeWizSettings.png")}
				priority="high"
				loadingP></Image>
			<TouchableOpacity
				onPress={handleSignOut}
				style={AccountSettingsStyles.button}
				activeOpacity={0.8}>
				<Text style={AccountSettingsStyles.text}>Sign Out</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={AccountSettingsStyles.button}
				onPress={() => {
					deleteUserMutation.mutate(userId);
					handleSignOut();
				}}
				activeOpacity={0.8}>
				<Text style={AccountSettingsStyles.text}>Delete Account</Text>
			</TouchableOpacity>
		</View>
	);
};
