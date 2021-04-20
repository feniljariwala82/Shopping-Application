import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useSelector } from "react-redux";
import DefaultText from "../../components/Reusable/DefaultText";
import Normalize from "../../components/Reusable/Normalize";
import ThemeBasedColors from "../../src/themes/Colors";
import CustomButton from "../../components/layout/CustomButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import CartItem from "../../components/Shop/CartItem";

const Colors = ThemeBasedColors();

const Cart = (props) => {
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    var itemArray = [];
    for (const key in state.cart.cartItems) {
      itemArray.push(state.cart.cartItems[key]);
    }
    return itemArray;
  });

  const renderProduct = (itemData) => {
    return <CartItem item={itemData.item} />;
  };

  return (
    <ScrollView style={{ backgroundColor: Colors.backgroundColor }}>
      <View style={styles.screen}>
        {cartItems.length > 0 ? (
          <View>
            <View style={styles.amountContainer}>
              <DefaultText fontStyle={styles.text}>
                Total :{"  "}
                <Text
                  style={{
                    fontFamily: "open-sans-bold",
                    fontSize: Normalize(16),
                    color: Colors.accent,
                  }}
                >
                  ${totalAmount}
                </Text>
              </DefaultText>
              <CustomButton
                title="Buy Now"
                iconName="shopping-bag"
                type="feather"
                color="white"
                size={Normalize(18)}
                buttonContainer={styles.button}
              />
            </View>

            <FlatList
              renderItem={renderProduct}
              keyExtractor={(item) => item.id}
              data={cartItems}
            />
          </View>
        ) : (
          <View
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          >
            <MaterialCommunityIcons
              name="emoticon-sad-outline"
              size={Normalize(50)}
              color={Colors.accent}
            />
            <Text
              style={{
                fontFamily: "open-sans-bold",
                fontSize: Normalize(20),
                color: Colors.accent,
              }}
            >
              No Items In The Cart
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: Normalize(14),
    borderWidth: Normalize(2),
    borderRadius: Normalize(10),
    borderColor: Colors.accent,
    margin: Normalize(12),
  },
  text: {
    fontSize: Normalize(16),
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    backgroundColor: Colors.accent,
  },
});
