import React, { useState, useContext } from "react";
import { Text, TextInput, Button, View, TouchableOpacity } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { ClerkSignUpStyles } from "./ClerkSignUpStyles";
import { AppContext } from "../../utils/AppContext";

export const ClerkSignUp = (prop) => {
	const setLogInProcess = prop.setLogInProcess;
	const { isLoaded, signUp, setActive } = useSignUp();
	const router = useRouter();

	const [emailAddress, setEmailAddress] = useState("");
	const [password, setPassword] = useState("");
	const [pendingVerification, setPendingVerification] = useState(false);
	const [code, setCode] = useState("");
	const [errorMsg, setErrorMsg] = useState("");

	const [isEmailFocused, setIsEmailFocused] = useState(false);
	const [isPasswordFocused, setIsPasswordFocused] = useState(false);
	const [isVerifyFocused, setIsVerifyFocused] = useState(false);

	// Source from context
	const {
		setInitializeUserBool,
		setSavedOutfits,
		setCachedSavedImages,
		setCacheLookupSaved,
	} = useContext(AppContext);
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
			// redirect the user
			if (signUpAttempt.status === "complete") {
				setSavedOutfits([]);
				setCachedSavedImages([]);
				setCacheLookupSaved({ length: 0 });
				setInitializeUserBool(true);
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
			<View style={ClerkSignUpStyles.container}>
				<TouchableOpacity
					style={ClerkSignUpStyles.backButton}
					activeOpacity={0.8}
					onPress={() => {
						setPendingVerification(false);
					}}>
					<Text style={ClerkSignUpStyles.back}>{"<-"} Back</Text>
				</TouchableOpacity>
				<Text style={ClerkSignUpStyles.verifyHeader}>
					Verify your email
				</Text>
				<Text style={ClerkSignUpStyles.verifySubtext}>
					Code sent to{" "}
					<Text
						style={{
							...ClerkSignUpStyles.verifySubtext,
							color: "#E174FCFF",
						}}>
						{" "}
						{emailAddress}
					</Text>
				</Text>
				<TextInput
					style={
						isVerifyFocused
							? {
									...ClerkSignUpStyles.textField,
									borderColor: "#7E00E4FF",
									top: -30,
							  }
							: { ...ClerkSignUpStyles.textField, top: -30 }
					}
					value={code}
					onFocus={() => setIsVerifyFocused(true)}
					onBlur={() => setIsVerifyFocused(false)}
					textAlign="center"
					placeholder="Enter verification code..."
					onChangeText={onCodeChange}
				/>
				<Text style={{ ...ClerkSignUpStyles.error, top: -30 }}>
					{errorMsg}
				</Text>
				<TouchableOpacity
					onPress={onVerifyPress}
					style={{
						...ClerkSignUpStyles.signUpButton,
						width: 200,
						top: -30,
					}}>
					<Text style={ClerkSignUpStyles.signUpText}>
						{" "}
						Verify Email
					</Text>
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<View style={ClerkSignUpStyles.container}>
			<TouchableOpacity
				style={ClerkSignUpStyles.backButton}
				activeOpacity={0.8}
				onPress={() => {
					setLogInProcess(0);
				}}>
				<Text style={ClerkSignUpStyles.back}>{"<-"} Back</Text>
			</TouchableOpacity>

			<Text style={ClerkSignUpStyles.header}>Sign Up</Text>
			<TextInput
				style={
					isEmailFocused
						? {
								...ClerkSignUpStyles.textField,
								borderColor: "#7E00E4FF",
						  }
						: ClerkSignUpStyles.textField
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
								...ClerkSignUpStyles.textField,
								borderColor: "#7E00E4FF",
						  }
						: ClerkSignUpStyles.textField
				}
				value={password}
				onFocus={() => setIsPasswordFocused(true)}
				onBlur={() => setIsPasswordFocused(false)}
				placeholderTextColor={"#000000FF"}
				placeholder="Enter Password..."
				secureTextEntry={true}
				onChangeText={(password) => setPassword(password)}
			/>
			<Text style={ClerkSignUpStyles.error}>{errorMsg}</Text>
			<TouchableOpacity
				activeOpacity={0.8}
				onPress={onSignUpPress}
				style={ClerkSignUpStyles.signUpButton}>
				<Text style={ClerkSignUpStyles.signUpText}>
					{" "}
					Send Verification Code
				</Text>
			</TouchableOpacity>

			<View style={ClerkSignUpStyles.signIn}>
				<Text style={ClerkSignUpStyles.signInPrompt}>
					Already have an account?
				</Text>
				<Text
					style={ClerkSignUpStyles.signInText}
					onPress={() => {
						setLogInProcess(-1);
					}}>
					Log In!
				</Text>
			</View>
		</View>
	);
};
