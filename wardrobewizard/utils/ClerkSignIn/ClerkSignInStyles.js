import { SignedIn } from "@clerk/clerk-expo";
import { StyleSheet } from "react-native";

export const ClerkSignInStyles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "column",
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
		width: "100%",
	},
	backButton: {
		backgroundColor: "#7E00E4FF",
		padding: 16,
		borderRadius: 30,
		borderStyle: "solid",
		borderWidth: 2,
		borderColor: "#000000FF",
		position: "absolute",
		top: 100,
		left: 40,
	},
	back: {
		fontSize: 18,
		color: "#FFFFFFFF",
		textAlign: "center",
		textShadowColor: "#6C018DFF",
		textShadowRadius: 2,
		textShadowOffset: { width: 1, height: 1 },
	},
	header: {
		fontSize: 36,
		fontWeight: "bold",
		color: "#FFFFFFFF",
		textShadowColor: "#07303BFF",
		textShadowRadius: 5,
		textShadowOffset: { width: 2, height: 2 },
		position: "relative",
		top: -40,
	},
	text: {
		fontSize: 24,
		fontWeight: "bold",
	},
	textField: {
		backgroundColor: "#E2B6FFFF",
		borderRadius: 20,
		padding: 10,
		width: 320,
		height: 60,
		marginTop: 20,
		borderStyle: "solid",
		borderWidth: 3,
		borderColor: "#000000FF",
		color: "#000000FF",
		fontSize: 16,
		paddingLeft: 15,
	},
	error: {
		color: "#FF0000FF",
		fontSize: 16,
		textAlign: "center",
		textShadowColor: "#6C018DFF",
		textShadowRadius: 2,
		textShadowOffset: { width: 1, height: 1 },
		marginBottom: 10,
	},
	signInButton: {
		backgroundColor: "#7E00E4FF",
		marginTop: 0,
		padding: 20,
		paddingTop: 14,
		paddingBottom: 14,
		borderRadius: 20,
		width: 160,
		borderStyle: "solid",
		borderWidth: 2,
		borderColor: "#000000FF",
	},
	signInText: {
		color: "#FFFFFFFF",
		fontSize: 26,
		textAlign: "center",
		textShadowColor: "#6C018DFF",
		textShadowRadius: 2,
		textShadowOffset: { width: 1, height: 1 },
	},
	signUp: {
		backgroundColor: "#E2B6FF00",
		borderRadius: 20,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		padding: 10,
		gap: 6,
		position: "absolute",
		bottom: 100,
	},
	signUpPrompt: {
		color: "#FFFFFFFF",
		fontSize: 16,
		textAlign: "center",
		textShadowColor: "#6C018DFF",
		textShadowRadius: 2,
		textShadowOffset: { width: 1, height: 1 },
	},
	signUpText: {
		color: "#D49FFFFF",
		fontSize: 18,
		textAlign: "center",
		textShadowColor: "#000000FF",
		textShadowRadius: 2,
		textShadowOffset: { width: 1, height: 1 },
	},
});
