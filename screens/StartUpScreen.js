import React, { useEffect, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

import Spinner from "../components/layout/Spinner";
import * as authActions from "../store/actions/authAct";

const StartUpScreen = (props) => {
  const dispatch = useDispatch();

  const tryLogin = useCallback(async () => {
    const userData = await AsyncStorage.getItem("userData");
    if (!userData) {
      props.navigation.navigate("Auth");
      return;
    }

    let transformedData = JSON.parse(userData);
    const { token, userDetails, expirationDate } = transformedData;
    const expDate = new Date(expirationDate);

    if (expDate <= new Date() || !token || !userDetails) {
      props.navigation.navigate("Auth");
      return;
    }

    props.navigation.navigate("Shop");
    dispatch(authActions.authenticate(userDetails, token));
  }, [dispatch]);

  useEffect(() => {
    tryLogin();
  }, []);

  return (
    <View style={styles.screen}>
      <Spinner />
    </View>
  );
};

export default StartUpScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
