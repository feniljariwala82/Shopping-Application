import React from "react";
import { StyleSheet, Text, View } from "react-native";

const DefaultText = (props) => {
  return (
    <View>
      <Text style={{ ...styles.fontStyle, ...props.fontStyle }}>
        {props.children}
      </Text>
    </View>
  );
};

export default DefaultText;

const styles = StyleSheet.create({
  fontStyle: {
    fontFamily: "open-sans",
  },
});
