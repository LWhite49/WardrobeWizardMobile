import { LogInStyles } from "./LogInStyles";
import { View, Text, Button } from "react-native";
import { ClerkSignUp } from "../utils/ClerkSignUp/ClerkSignUp";
import { ClerkSignIn } from "../utils/ClerkSignIn/ClerkSignIn";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
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
						<Text
							style={LogInStyles.text}
							onPress={() => {
								setLogInProcess(2);
							}}>
							Sign In
						</Text>
						<Text
							style={LogInStyles.text}
							onPress={() => {
								setLogInProcess(1);
							}}>
							Sign Up
						</Text>
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
