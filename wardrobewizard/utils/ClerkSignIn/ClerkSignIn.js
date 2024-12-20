import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, TextInput, Button, View } from "react-native";
import React, { useState, useCallback } from "react";
import { ClerkSignInStyles } from "./ClerkSignInStyles";

export const ClerkSignIn = (prop) => {
	const setLogInProcess = prop.setLogInProcess;
	const { signIn, setActive, isLoaded } = useSignIn();
	const router = useRouter();

	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");

	// Handle the submission of the sign-in form
	const onSignInPress = useCallback(async () => {
		if (!isLoaded) return;

		// Start the sign-in process using the email and password provided
		try {
			const signInAttempt = await signIn.create({
				identifier: emailAddress,
				password,
			});

			// If sign-in process is complete, set the created session as active
			// and redirect the user
			if (signInAttempt.status === "complete") {
				await setActive({ session: signInAttempt.createdSessionId });
				router.replace("/");
			} else {
				// If the status isn't complete, check why. User might need to
				// complete further steps.
				console.error(JSON.stringify(signInAttempt, null, 2));
			}
		} catch (err) {
			// See https://clerk.com/docs/custom-flows/error-handling
			// for more info on error handling
			console.error(JSON.stringify(err, null, 2));
		}
	}, [isLoaded, emailAddress, password]);

	return (
		<View>
			<Text
				onPress={() => {
					setLogInProcess(0);
				}}>
				Back
			</Text>
			<TextInput
				autoCapitalize="none"
				value={emailAddress}
				placeholder="Enter email"
				onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
			/>
			<TextInput
				value={password}
				placeholder="Enter password"
				secureTextEntry={true}
				onChangeText={(password) => setPassword(password)}
			/>
			<Button title="Sign in" onPress={onSignInPress} />
			<View>
				<Text>Don't have an account?</Text>
				<Text
					onPress={() => {
						setLogInProcess(1);
					}}>
					Sign up
				</Text>
			</View>
		</View>
	);
};
