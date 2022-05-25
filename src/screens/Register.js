import React, { useState } from "react";
import {
	StyleSheet,
	View,
	Image,
	KeyboardAvoidingView,
	Keyboard,
	Platform,
	ToastAndroid,
	Text,
	SafeAreaView,
	TouchableOpacity,
} from "react-native";

import { createUserWithEmailAndPassword } from "firebase/auth";

import { AuthButton, AuthTextInput } from "../components";
import { auth } from "../firebase";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";

const Register = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const signUpToast = () => {
		ToastAndroid.show(
			"Sign Up successfully completed!",
			ToastAndroid.SHORT
		);
	};

	const missingFieldsToast = () => {
		ToastAndroid.show(
			"Missing fields, please try again!",
			ToastAndroid.SHORT
		);
	};

	const samePasswordToast = () => {
		ToastAndroid.show("Password must be the same!", ToastAndroid.SHORT);
	};

	const signUpHandler = () => {
		if (email.length === 0 || password.length === 0) {
			missingFieldsToast();
			return;
		}

		if (password != confirmPassword) {
			samePasswordToast();
			return;
		}

		return createUserWithEmailAndPassword(auth, email, password)
			.then((userCredentials) => {
				const user = userCredentials.user;

				// To show the user object returned
				console.log(user);

				restoreForm();
				signUpToast();
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;

				console.error("[signUpHandler]", errorCode, errorMessage);
			});
	};

	const restoreForm = () => {
		setEmail("");
		setPassword("");
		Keyboard.dismiss();
	};

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : null}
			>
				<View style={styles.container}>
					<Image
						style={styles.logo}
						source={require("../../assets/logo_transparent.png")}
					/>

					<Text style={styles.header}> Register </Text>

					<AuthTextInput
						value={email}
						placeholder="Email."
						textHandler={setEmail}
						keyboardType="email-address"
						icon={
							<MaterialIcons
								name="alternate-email"
								size={20}
								color="#666"
								style={styles.authImg}
							/>
						}
					/>

					<AuthTextInput
						value={password}
						placeholder="Password."
						textHandler={setPassword}
						inputType="password"
						icon={
							<Ionicons
								name="ios-lock-closed-outline"
								size={20}
								color="#666"
								style={styles.authImg}
							/>
						}
					/>

					<AuthTextInput
						value={confirmPassword}
						placeholder="Confirm Password."
						textHandler={setConfirmPassword}
						inputType="password"
						icon={
							<Ionicons
								name="ios-lock-closed-outline"
								size={20}
								color="#666"
								style={styles.authImg}
							/>
						}
					/>

					<AuthButton
						onPressHandler={signUpHandler}
						title={"Register"}
					/>

					<View
						style={{
							flexDirection: "row",
						}}
					>
						<Text style={{ marginRight: 5 }}>
							Already have an account?
						</Text>
						<TouchableOpacity
							onPress={() => {
								navigation.navigate("Login");
							}}
						>
							<Text style={styles.textButton}>Login</Text>
						</TouchableOpacity>
					</View>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#E8EAED",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 25,
	},

	logo: {
		width: 300,
		height: 300,
		marginBottom: 10,
	},

	fields: {
		alignSelf: "flex-start",
		flexDirection: "row",
		borderBottomColor: "#ccc",
		borderBottomWidth: 1,
		paddingBottom: 5,
		marginBottom: 25,
	},

	authInput: {
		flex: 1,
		paddingVertical: 0,
	},
	authImg: {
		marginRight: 5,
	},

	header: {
		fontSize: 28,
		fontWeight: "500",
		color: "#333",
		marginBottom: 30,
		alignSelf: "flex-start",
	},

	textButton: {
		color: "#006ee6",
		fontWeight: "700",
	},
});

export default Register;
