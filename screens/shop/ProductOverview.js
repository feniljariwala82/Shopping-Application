import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useSelector } from "react-redux";
import ThemeBasedColors from "../../src/themes/Colors";
import Normalize from "../../components/Reusable/Normalize";
import ProductItem from "../../components/Shop/ProductItem";
import { Icon } from "react-native-elements";

const Colors = ThemeBasedColors();

const ProductOverview = (props) => {
  // animation state
  const [fadeAnimation, setFadeAnimation] = useState(new Animated.Value(0.5));

  const fadeIn = () => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    fadeIn();
  }, []);

  // available products
  const availProducts = useSelector(
    (state) => state.products.availableProducts
  );

  // rendering products one by one
  const renderProduct = (itemData) => {
    return (
      <Animated.View style={{ opacity: fadeAnimation }}>
        <ProductItem
          title={itemData.item.title}
          price={itemData.item.price}
          imageUrl={itemData.item.imageUrl}
          id={itemData.item.id}
          product={itemData.item}
          {...props}
        />
      </Animated.View>
    );
  };

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
