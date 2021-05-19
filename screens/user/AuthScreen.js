import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TextInput,
  Keyboard,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import CustomButton from "../../components/layout/CustomButton";
import Normalize from "../../components/Reusable/Normalize";
import ThemeBasedColors from "../../src/themes/Colors";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../../store/actions/authAct";
import Spinner from "../../components/layout/Spinner";
import validator from "validator";

const Colors = ThemeBasedColors();
const { width, height } = Dimensions.get("window");

const AuthScreen = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  useEffect(() => {
    if (error) {
      Alert.alert("Authentication Error", error, [
        {
          text: "Ok",
          style: "cancel",
          onPress: () => dispatch(authActions.clearError()),
        },
      ]);
    }
  }, [error]);

  const submitHandler = async () => {
    setLoading(true);
    // email and password validation
    if (
      !validator.isEmail(email) ||
      !validator.isLength(password, { min: 8 })
    ) {
      Alert.alert(
        "Error",
        "Please enter valid email-address and password must be 8 characters long",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
        ]
      );
      setLoading(false);
      return;
    }
    if (isSignUp) {
      // user opted for sign up
      try {
        await dispatch(authActions.register(email.toLowerCase(), password));
        setLoading(false);
        props.navigation.navigate("Shop");
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    } else {
      // user opted for login
      try {
        await dispatch(authActions.login(email.toLowerCase(), password));
        setLoading(false);
        props.navigation.navigate("Shop");
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    }
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        {loading ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Spinner />
          </View>
        ) : (
          <View style={styles.formContainer}>
            <View style={styles.eachInput}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Your Email Here"
                keyboardType="email-address"
                selectionColor={Colors.primary}
                placeholderTextColor={Colors.textLight}
                autoCorrect
                onChangeText={setEmail}
                value={email}
              />
            </View>
            <View style={styles.eachInput}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Your Password Here"
                keyboardType="default"
                selectionColor={Colors.primary}
                placeholderTextColor={Colors.textLight}
                autoCorrect
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
              />
            </View>
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CustomButton
                title={isSignUp ? "Sign Up" : "Login"}
                buttonContainer={styles.buttonContainer}
                iconName={isSignUp ? "adduser" : "login"}
                type="antdesign"
                color="white"
                size={Normalize(18)}
                onUserPress={submitHandler}
              />
              <CustomButton
                title={isSignUp ? "Switch to Login" : "Switch to Sign Up"}
                buttonContainer={styles.buttonContainer}
                onUserPress={() => setIsSignUp((prevState) => !prevState)}
              />
            </View>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.backgroundColor,
    flex: 1,
  },
  header: {
    fontFamily: "open-sans-bold",
    fontSize: Normalize(22),
    color: Colors.textDark,
  },
  formContainer: {
    alignItems: "center",
    marginTop: Normalize(40),
  },
  input: {
    borderColor: Colors.textDark,
    borderWidth: 1,
    borderRadius: Normalize(10),
    padding: Normalize(10),
    width: width * 0.7,
  },
  label: {
    fontFamily: "open-sans-bold",
    fontSize: Normalize(16),
    marginBottom: Normalize(8),
    color: Colors.primary,
  },
  eachInput: {
    marginVertical: Normalize(4),
  },
  buttonContainer: {
    marginTop: Normalize(10),
    width: Normalize(220),
  },
});
