import React, { useState } from "react";
import { StyleSheet } from "react-native";
import AppLoading from "expo-app-loading";
import * as Fonts from "expo-font";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { enableScreens } from "react-native-screens";
import ThemeBasedColors from "./src/themes/Colors";
import NavigationContainer from "./navigation/NavigationContainer";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

/**
 * Reducers
 */
import productReducer from "./store/reducers/productReduce";
import cartReducer from "./store/reducers/cartReduce";
import orderReducer from "./store/reducers/orderReduce";
import authReducer from "./store/reducers/authReduce";

// calling this function to improve memory and CPU usage
enableScreens();

// Redux configuration
const appReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  order: orderReducer,
  auth: authReducer,
});

// We are doing this to set store data as initialState when user logs out!
const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
);

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
      <NavigationContainer />
    </Provider>
  );
}

const styles = StyleSheet.create({});
