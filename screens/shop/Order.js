import React from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import { useSelector } from "react-redux";
import DefaultText from "../../components/Reusable/DefaultText";
import Normalize from "../../components/Reusable/Normalize";
import { Ionicons } from "@expo/vector-icons";
import ThemeBasedColors from "../../src/themes/Colors";
import OrderItem from "../../components/Shop/OrderItem";

const Colors = ThemeBasedColors();

const Order = () => {
  const orderedData = useSelector((state) => state.order.orders);
  // console.log("Ordered data", orderedData);

  const renderData = (itemData) => {
    return <OrderItem id={itemData.item.id} items={itemData.item.items} />;
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={orderedData}
        keyExtractor={(item) => item.id}
        renderItem={renderData}
      />
    </View>
  );
};

Order.navigationOptions = (navData) => {
  return {
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

export default Order;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
});
