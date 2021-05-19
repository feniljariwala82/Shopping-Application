import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { Dimensions, Platform, View, SafeAreaView, Button } from "react-native";
import ProductOverviewScreen from "../screens/shop/ProductOverview";
import ThemeBasedColors from "../src/themes/Colors";
import ProductDetailScreen from "../screens/shop/ProductDetail";
import CartScreen from "../screens/shop/Cart";
import OrderScreen from "../screens/shop/Order";
import AddProductScreen from "../screens/user/AddProduct";
import StartUpScreen from "../screens/StartUpScreen";
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from "react-navigation-drawer";
import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";
import Normalize from "../components/Reusable/Normalize";
import AuthScreen from "../screens/user/AuthScreen";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/authAct";

const Colors = ThemeBasedColors();
const { width } = Dimensions.get("window");

/**
 * Reusing this code for default navigation options
 */
const defaultNavOptions = {
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
};

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
    defaultNavigationOptions: defaultNavOptions,
  }
);

const OrderNavigator = createStackNavigator(
  {
    Order: {
      screen: OrderScreen,
      navigationOptions: {
        title: "My Orders",
      },
    },
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const AddProductNavigator = createStackNavigator(
  {
    Product: {
      screen: AddProductScreen,
      navigationOptions: {
        title: "Add Product",
      },
    },
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const MainShopNavigator = createDrawerNavigator(
  {
    Product: {
      screen: ProductNavigator,
      navigationOptions: {
        title: "Products",
        headerTitleAlign: "center",
        drawerIcon: (drawerConfig) => (
          <View>
            <Entypo
              name="list"
              size={width > 500 ? 24 : Normalize(20)}
              color={drawerConfig.tintColor}
            />
          </View>
        ),
      },
    },
    Order: {
      screen: OrderNavigator,
      navigationOptions: {
        title: "My Orders",
        headerTitleAlign: "center",
        drawerIcon: (drawerConfig) => (
          <View>
            <AntDesign
              name="shoppingcart"
              size={width > 500 ? 24 : Normalize(20)}
              color={drawerConfig.tintColor}
            />
          </View>
        ),
      },
    },
    AddProduct: {
      screen: AddProductNavigator,
      navigationOptions: {
        title: "Add Products",
        headerTitleAlign: "center",
        drawerIcon: (drawerConfig) => (
          <View>
            <Ionicons
              name="add-circle-outline"
              size={width > 500 ? 24 : Normalize(20)}
              color={drawerConfig.tintColor}
            />
          </View>
        ),
      },
    },
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
      inactiveTintColor: Colors.textLight,
    },
    drawerType: "front",
    drawerBackgroundColor: Colors.backgroundColor,
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: Normalize(20) }}>
          <SafeAreaView forceInset={{ top: "window", horizontal: "never" }}>
            <DrawerNavigatorItems {...props} />
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                dispatch(authActions.logout());
                // props.navigation.navigate("Auth");
              }}
            />
          </SafeAreaView>
        </View>
      );
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: {
      screen: AuthScreen,
      navigationOptions: {
        headerTitle: "Authentication",
        headerTitleAlign: "center",
        headerTransparent: true,
        headerTintColor: Colors.accent,
        headerTitleStyle: {
          fontFamily: "open-sans-bold",
          fontSize: Normalize(20),
        },
      },
    },
  },
  { defaultNavigationOptions: defaultNavOptions }
);

const MainSwitchNavigator = createSwitchNavigator({
  StartUp: StartUpScreen,
  Auth: AuthNavigator,
  Shop: MainShopNavigator,
});

export default createAppContainer(MainSwitchNavigator);
