import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "../layout/CustomButton";
import Normalize from "../Reusable/Normalize";
import ThemeBasedColors from "../../src/themes/Colors";

const Colors = ThemeBasedColors();

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${props.amount}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          title={showDetails ? "Hide Details" : "Show Details"}
          onUserPress={() => {
            setShowDetails((prevState) => !prevState);
          }}
          iconName={showDetails ? "upcircleo" : "downcircleo"}
          type={showDetails ? "antdesign" : "antdesign"}
          color="white"
          size={Normalize(18)}
        />
        {showDetails && (
          <View style={styles.viewDetail}>
            {props.items.map((cartItem) => (
              <Text
                key={cartItem.id}
                style={{ fontFamily: "open-sans", fontSize: Normalize(14) }}
              >
                {cartItem.title}
                {"   "}
                {cartItem.price}
              </Text>
            ))}
          </View>
        )}
      </View>
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
  totalAmount: {
    fontSize: Normalize(16),
    fontFamily: "open-sans-bold",
  },
  date: {
    fontSize: Normalize(16),
    fontFamily: "open-sans",
  },
  buttonContainer: {
    width: "100%",
    padding: Normalize(12),
    alignItems: "center",
  },
  viewDetail: {
    marginTop: Normalize(12),
  },
});
