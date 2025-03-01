import { LogInStyles } from "./LogInStyles";
import { View, Text, Image, TouchableOpacity, Touchable } from "react-native";
import { ClerkSignUp } from "../utils/ClerkSignUp/ClerkSignUp";
import { ClerkSignIn } from "../utils/ClerkSignIn/ClerkSignIn";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { useState } from "react";

export const LogIn = () => {
	// 0 = neither, 1 = sign up, 2 = sign in
	const [logInProcess, setLogInProcess] = useState(0);

	return (
		<View style={LogInStyles.container}>
			<SignedIn>
				<Text style={LogInStyles.text}>Welcome back, beloved user</Text>
			</SignedIn>
			<SignedOut>
				{logInProcess == 0 ? (
					<>
						<Text style={LogInStyles.header}>Wardrobe Wizard</Text>
						<Image
							source={require("../assets/WardrobeWiz.png")}
							style={LogInStyles.image}
							priority="high"></Image>
						<TouchableOpacity
							onPress={() => {
								setLogInProcess(2);
							}}
							activeOpacity={0.8}
							style={LogInStyles.button}>
							<Text style={LogInStyles.text}>Sign In</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								setLogInProcess(1);
							}}
							activeOpacity={0.8}
							style={LogInStyles.button}>
							<Text style={LogInStyles.text}>Sign Up</Text>
						</TouchableOpacity>
					</>
				) : logInProcess == 1 ? (
					<ClerkSignUp setLogInProcess={setLogInProcess} />
				) : (
					<ClerkSignIn setLogInProcess={setLogInProcess} />
				)}
			</SignedOut>
		</View>
	);
};
