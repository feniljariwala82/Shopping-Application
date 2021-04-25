import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "../layout/CustomButton";
import Normalize from "../Reusable/Normalize";
import ThemeBasedColors from "../../src/themes/Colors";

const Colors = ThemeBasedColors();

const OrderItem = () => {
  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}></Text>
        <Text style={styles.date}></Text>
      </View>
      <CustomButton
        title="View Details"
        onUserPress={() => console.log("object")}
        iconName="info"
        type="feather"
        color="white"
        size={Normalize(18)}
      />
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: Normalize(6),
    elevation: 5,
    borderRadius: Normalize(10),
    backgroundColor: Colors.backgroundColor,
    margin: Normalize(20),
    padding: Normalize(10),
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  totalAmount: {},
  date: {},
});
