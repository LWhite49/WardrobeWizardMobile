import { useState, useEffect } from "react";
import { SettingsStyles } from "./SettingsStyles";
import { Text, View } from "react-native";
import { MotiView } from "moti";
import { useIsFocused } from "@react-navigation/native";

// Settings Component will allow users to adjust their size and color pallet preferences
// Includes option to change password, delete account, and log out will be included in this component

export const Settings = () => {
	// Source focus state
	const isFocused = useIsFocused();
	const [animationState, setAnimationState] = useState({ translateY: -70 });

	// Set Animation State on Render
	useEffect(() => {
		if (isFocused) {
			setAnimationState({ translateY: 0 });
		} else {
			setAnimationState({ translateY: 70 });
		}
	}, [isFocused]);
	return (
		<MotiView
			from={{ translateY: 70 }}
			animate={animationState}
			exit={{ translateY: -70 }}
			style={SettingsStyles.container}>
			<Text style={SettingsStyles.text}>Settings</Text>
		</MotiView>
	);
};
