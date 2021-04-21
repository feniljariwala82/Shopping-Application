import React, { useState } from "react";
import { StyleSheet } from "react-native";
import AppLoading from "expo-app-loading";
import * as Fonts from "expo-font";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { enableScreens } from "react-native-screens";
import ThemeBasedColors from "./src/themes/Colors";
import ShopNavigator from "./navigation/ShopNavigator";
/**
 * Reducers
 */
import productReducer from "./store/reducers/productReduce";
import cartReducer from "./store/reducers/cartReduce";
import orderReduce from "./store/reducers/orderReduce";

// calling this function to improve memory and CPU usage
enableScreens();

// Redux configuration
const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  order: orderReduce,
});
const store = createStore(rootReducer, composeWithDevTools());

/**
 * Colors for our application
 */
const Colors = ThemeBasedColors();

const fetchFonts = () => {
  return Fonts.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(error) => console.error(error)}
      />
    );
  }
  return (
    <Provider store={store}>
      {/* <View style={styles.screen}>
        <Text style={styles.text}>Hey</Text>
        <StatusBar style="dark" />
      </View> */}
      <ShopNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.backgroundColor,
  },
  text: {
    color: Colors.textDark,
  },
});
