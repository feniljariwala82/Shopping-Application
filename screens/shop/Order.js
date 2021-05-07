import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Normalize from "../../components/Reusable/Normalize";
import { Ionicons } from "@expo/vector-icons";
import ThemeBasedColors from "../../src/themes/Colors";
import OrderItem from "../../components/Shop/OrderItem";
import * as orderActions from "../../store/actions/orderAct";
import Spinner from "../../components/layout/Spinner";

const Colors = ThemeBasedColors();

const Order = (props) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      await dispatch(orderActions.fetchOrders());
    } catch (error) {
      setError(useSelector((state) => state.order.error));
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    loadData();
  }, []);

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

  // fetching orders from the store
  const orderedData = useSelector((state) => state.order.orders);

  const renderData = (itemData) => {
    return (
      <OrderItem
        id={itemData.item.items._id}
        items={itemData.item.items}
        amount={itemData.item.totalAmount}
        date={itemData.item.orderedDate}
        key={itemData.item.items._id}
      />
    );
  };

  if (isLoading) {
    return <Spinner />;
  }

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
