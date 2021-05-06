import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import ThemeBasedColors from "../../src/themes/Colors";

const Colors = ThemeBasedColors();

const Spinner = () => {
  return (
    <View style={styles.spinner}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

export default Spinner;

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
