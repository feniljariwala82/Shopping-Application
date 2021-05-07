import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Animated,
  Text,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ThemeBasedColors from "../../src/themes/Colors";
import Normalize from "../../components/Reusable/Normalize";
import ProductItem from "../../components/Shop/ProductItem";
import { Icon } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import * as productActions from "../../store/actions/productAct";
import Spinner from "../../components/layout/Spinner";

const Colors = ThemeBasedColors();

const ProductOverview = (props) => {
  // animation state
  const [fadeAnimation, setFadeAnimation] = useState(new Animated.Value(0.5));
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fadeIn = () => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const dispatch = useDispatch();

  // loading data
  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      await dispatch(productActions.getAllProducts());
    } catch (error) {
      setError(useSelector((state) => state.products.error));
    }
    setIsLoading(false);
  }, [setIsLoading, dispatch, setError]);

  useEffect(() => {
    fadeIn();
    loadData();
  }, [dispatch]);

  useEffect(() => {
    let willFocusSubscription = props.navigation.addListener(
      "willFocus",
      () => {
        loadData();
      }
    );
    return () => {
      willFocusSubscription.remove();
    };
  }, [loadData]);

  // available products
  const availProducts = useSelector(
    (state) => state.products.availableProducts
  );

  // rendering products one by one
  const renderProduct = (itemData) => {
    return (
      // <Animated.View style={{ opacity: fadeAnimation }}>
      <ProductItem
        title={itemData.item.title}
        price={itemData.item.price}
        imageUrl={itemData.item.imageUrl}
        id={itemData.item._id}
        product={itemData.item}
        key={itemData.item._id}
        {...props}
      />
      // </Animated.View>
    );
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontFamily: "open-sans-bold", color: Colors.danger }}>
          Error: {error}
        </Text>
      </View>
    );
  }

  // if no products found
  if (!isLoading && availProducts.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>No Products found. Try adding some!</Text>
      </View>
    );
  }
  return (
    <View style={styles.screen}>
      <FlatList
        data={availProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
      />
    </View>
  );
};

export default ProductOverview;

ProductOverview.navigationOptions = (navData) => {
  return {
    headerRight: () => (
      <TouchableOpacity
        onPress={() => navData.navigation.navigate({ routeName: "Cart" })}
      >
        <View style={{ marginRight: Normalize(12) }}>
          <Icon
            name="shoppingcart"
            type="antdesign"
            size={Normalize(20)}
            color={Colors.textDark}
          />
        </View>
      </TouchableOpacity>
    ),
    headerLeft: () => (
      <View style={{ marginLeft: Normalize(12) }}>
        <Ionicons
          name="menu-outline"
          size={24}
          color="black"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </View>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.backgroundColor,
  },
  fontStyle: {
    color: Colors.textDark,
    fontSize: Normalize(16),
  },
  buttonContainer: {
    backgroundColor: Colors.primary,
  },
});
