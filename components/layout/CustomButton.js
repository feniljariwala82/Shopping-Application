import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
} from "react-native";
import { Icon } from "react-native-elements";

import ThemeBasedColors from "../../src/themes/Colors";
import Normalize from "../Reusable/Normalize";
const Colors = ThemeBasedColors();

const CustomButton = (props) => {
  let TouchableComp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComp = TouchableNativeFeedback;
  }

  return (
    <View style={{ ...styles.buttonContainer, ...props.buttonContainer }}>
      <TouchableComp onPress={props.onUserPress}>
        {props.isIconOnly === true ? (
          <View style={styles.iconContainer}>
            <Icon
              name={props.iconName}
              type={props.type}
              color={props.color}
              size={props.size}
            />
          </View>
        ) : (
          <View style={styles.iconContainer}>
            <Icon
              name={props.iconName}
              type={props.type}
              color={props.color}
              size={props.size}
            />
            <Text style={styles.text}>{props.title}</Text>
          </View>
        )}
      </TouchableComp>
    </View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.primary,
    height: Normalize(34),
    width: Normalize(110),
    overflow:
      Platform.OS === "android" && Platform.Version >= 21
        ? "hidden"
        : "visible",
    borderRadius: Normalize(8),
    alignItems: "center",
    justifyContent: "center",
    elevation: Normalize(7),
    // for IOS
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: Normalize(6),
    shadowOpacity: 0.26,
  },
  text: {
    color: "white",
    textTransform: "capitalize",
    fontSize: Normalize(13),
    fontFamily: "open-sans-bold",
    marginLeft: Normalize(4),
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
  },
});
