import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { Dimensions, Platform, View, TouchableOpacity } from "react-native";
import ProductOverviewScreen from "../screens/shop/ProductOverview";
import ThemeBasedColors from "../src/themes/Colors";
import ProductDetailScreen from "../screens/shop/ProductDetail";
import CartScreen from "../screens/shop/Cart";

const Colors = ThemeBasedColors();
const { width } = Dimensions.get("window");

const ProductNavigator = createStackNavigator(
  {
    ProductOverview: {
      screen: ProductOverviewScreen,
      navigationOptions: {
        title: "Products",
      },
    },
    ProductDetail: {
      screen: ProductDetailScreen,
      navigationOptions: {
        title: "Product Details",
      },
    },
    Cart: {
      screen: CartScreen,
      navigationOptions: {
        title: "Cart",
      },
    },
  },
  {
    mode: Platform.OS === "android" ? "card" : "modal",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Colors.backgroundColor,
      },
      headerTintColor: Colors.textDark,
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontSize: width * 0.065,
        fontFamily: "open-sans-bold",
      },
    },
  }
);

export default createAppContainer(ProductNavigator);
