import React, { useState } from "react";
import { Text, TextInput, Button, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { ClerkSignUpStyles } from "./ClerkSignUpStyles";

export const ClerkSignUp = (prop) => {
	const setLogInProcess = prop.setLogInProcess;
	const { isLoaded, signUp, setActive } = useSignUp();
	const router = useRouter();

	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	const [pendingVerification, setPendingVerification] = useState(false);
	const [code, setCode] = useState("");
	const [errorMsg, setErrorMsg] = useState("");

	// Define dictionary mapping error codes to error messages
	const errorMessages = {
		"email_address must be a valid email address.":
			"Invalid email address.",
		"Passwords must be 8 characters or more.":
			"Password must be at least 8 characters.",
		"Password has been found in an online data breach. For account safety, please use a different password.":
			"Insecure password, please try another.",
		"That email address is taken. Please try another.":
			"Email address is already in use.",
		"Incorrect code": "Incorrect verification code.",
	};
	// Handle submission of sign-up form
	const onSignUpPress = async () => {
		if (!isLoaded) return;

		// Start sign-up process using email and password provided
		try {
			await signUp.create({
				emailAddress,
				password,
			});

			// Send user an email with verification code
			await signUp.prepareEmailAddressVerification({
				strategy: "email_code",
			});

			// Set 'pendingVerification' to true to display second form
			// and capture OTP code
			setPendingVerification(true);
			setErrorMsg("");
		} catch (err) {
			// See https://clerk.com/docs/custom-flows/error-handling
			// for more info on error handling
			setErrorMsg(errorMessages[err.message] || err.message);
		}
	};

	// Handle submission of verification form
	const onVerifyPress = async () => {
		if (!isLoaded) return;

		try {
			// Use the code the user provided to attempt verification
			const signUpAttempt = await signUp.attemptEmailAddressVerification({
				code,
			});

			// If verification was completed, set the session to active
			// and redirect the user
			if (signUpAttempt.status === "complete") {
				await setActive({ session: signUpAttempt.createdSessionId });
				router.replace("/");
			} else {
				// If the status is not complete, check why. User may need to
				// complete further steps.
				console.error(JSON.stringify(signUpAttempt, null, 2));
			}
		} catch (err) {
			// See https://clerk.com/docs/custom-flows/error-handling
			// for more info on error handling
			setErrorMsg(errorMessages[err.message] || err.message);
		}
	};

	// Handler to update verification code state
	const onCodeChange = (text) => {
		if (!isNaN(text) && text.length <= 6) {
			setCode(text);
		}
	};

	if (pendingVerification) {
		return (
			<>
				<Text>Verify your email</Text>
				<Text>Code sent to {emailAddress}</Text>
				<TextInput
					value={code}
					placeholder="Enter your verification code"
					onChangeText={onCodeChange}
				/>
				<Text>{errorMsg}</Text>
				<Button title="Verify" onPress={onVerifyPress} />
			</>
		);
	}

	return (
		<View>
			<Text
				onPress={() => {
					setLogInProcess(0);
				}}>
				Back
			</Text>
			<>
				<Text>Sign up</Text>
				<TextInput
					autoCapitalize="none"
					value={emailAddress}
					placeholder="Enter email"
					onChangeText={(email) => setEmailAddress(email)}
				/>
				<TextInput
					value={password}
					placeholder="Enter password"
					secureTextEntry={true}
					onChangeText={(password) => setPassword(password)}
				/>
				<Text>{errorMsg}</Text>
				<Button title="Continue" onPress={onSignUpPress} />
				<View>
					<Text>Already have an account?</Text>
					<Text
						onPress={() => {
							setLogInProcess(2);
						}}>
						Sign in
					</Text>
				</View>
			</>
		</View>
	);
};
