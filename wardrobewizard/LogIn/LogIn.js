import { LogInStyles } from "./LogInStyles";
import { View, Text, Button } from "react-native";
import { useContext } from "react";
import { AppContext } from "../App";

export const LogIn = () => {
	const { setSignedIn } = useContext(AppContext);

	return (
		<View style={LogInStyles.container}>
			<Text style={LogInStyles.text}>Log In</Text>
			<Button
				title="Sign In"
				onPress={() => {
					setSignedIn(true);
				}}
			/>
		</View>
	);
};
