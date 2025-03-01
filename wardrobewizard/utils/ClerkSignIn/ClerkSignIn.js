import { Clerk, useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import React, { useState, useCallback } from "react";
import { ClerkSignInStyles } from "./ClerkSignInStyles";

export const ClerkSignIn = (prop) => {
	const setLogInProcess = prop.setLogInProcess;
	const { signIn, setActive, isLoaded } = useSignIn();
	const router = useRouter();

	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");

	const [errorMsg, setErrorMsg] = useState("");

	const [isEmailFocused, setIsEmailFocused] = useState(false);
	const [isPasswordFocused, setIsPasswordFocused] = useState(false);

	// Define dictionary mapping error codes to error messages
	const errorMessages = {
		"Identifier is invalid.": "Invalid email address.",
		"Couldn't find your account.":
			"No account found with that email address.",
		"Password is incorrect. Try again, or use another method.":
			"Incorrect password.",
	};
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
			setErrorMsg(errorMessages[err.message] || err.message);
		}
	}, [isLoaded, emailAddress, password]);

	return (
		<View style={ClerkSignInStyles.container}>
			<TouchableOpacity
				style={ClerkSignInStyles.backButton}
				activeOpacity={0.8}
				onPress={() => {
					setLogInProcess(0);
				}}>
				<Text style={ClerkSignInStyles.back}>{"<-"} Back</Text>
			</TouchableOpacity>
			<Text style={ClerkSignInStyles.header}>Log In</Text>
			<TextInput
				style={
					isEmailFocused
						? {
								...ClerkSignInStyles.textField,
								borderColor: "#7E00E4FF",
						  }
						: ClerkSignInStyles.textField
				}
				onFocus={() => setIsEmailFocused(true)}
				onBlur={() => setIsEmailFocused(false)}
				autoCapitalize="none"
				value={emailAddress}
				placeholderTextColor={"#000000FF"}
				placeholder="Enter Email..."
				onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
			/>
			<TextInput
				style={
					isPasswordFocused
						? {
								...ClerkSignInStyles.textField,
								borderColor: "#7E00E4FF",
						  }
						: ClerkSignInStyles.textField
				}
				value={password}
				onFocus={() => setIsPasswordFocused(true)}
				onBlur={() => setIsPasswordFocused(false)}
				placeholderTextColor={"#000000FF"}
				placeholder="Enter Password..."
				secureTextEntry={true}
				onChangeText={(password) => setPassword(password)}
			/>
			<Text style={ClerkSignInStyles.error}>{errorMsg}</Text>
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={onSignInPress}
				style={ClerkSignInStyles.signInButton}>
				<Text style={ClerkSignInStyles.signInText}> Sign In</Text>
			</TouchableOpacity>
			<View style={ClerkSignInStyles.signUp}>
				<Text style={ClerkSignInStyles.signUpPrompt}>
					Don't have an account?
				</Text>
				<Text
					style={ClerkSignInStyles.signUpText}
					onPress={() => {
						setLogInProcess(1);
					}}>
					Sign up!
				</Text>
			</View>
		</View>
	);
};
