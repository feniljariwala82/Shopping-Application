import React from "react";
import { StyleSheet, Image, View, Dimensions } from "react-native";
import ThemeBasedColors from "../../src/themes/Colors";
import DefaultText from "../Reusable/DefaultText";
import Normalize from "../Reusable/Normalize";
import CustomButton from "../layout/CustomButton";
import * as cartActions from "../../store/actions/cartAct";
import { useDispatch } from "react-redux";

const Colors = ThemeBasedColors();
const { height, width } = Dimensions.get("window");

const CartItem = (props) => {
  const { imageUrl, title, description, id } = props.item;

  const dispatch = useDispatch();

  const deleteItemHandler = (id) => {
    dispatch(cartActions.deleteFromCart(id));
  };

  return (
    <View style={styles.screen}>
      {/* product container */}
      <View style={styles.productContainer}>
        {/* image and text view */}
        <Image style={styles.image} source={{ uri: imageUrl }} />
        <View style={styles.info}>
          <DefaultText fontStyle={styles.headerText}>{title}</DefaultText>
          <DefaultText fontStyle={styles.description}>
            {description}
          </DefaultText>
          <View style={styles.buttons}>
            <CustomButton
              buttonContainer={{
                width: Normalize(40),
                backgroundColor: Colors.danger,
                marginRight: Normalize(10),
              }}
              iconName="delete-outline"
              type="materialicons"
              color="white"
              size={Normalize(18)}
              isIconOnly={true}
              onUserPress={deleteItemHandler.bind(this, id)}
            />

            <CustomButton
              buttonContainer={{ width: Normalize(100) }}
              title="Buy Now"
              iconName="shopping-bag"
              type="feather"
              color="white"
              size={Normalize(18)}
              onUserPress={() => console.log("hey")}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  productContainer: {
    alignItems: "center",
    flexDirection: "row",
    width: width * 0.8,
    height: "80%",
    margin: Normalize(4),
  },
  image: {
    height: "80%",
    width: "40%",
    borderRadius: Normalize(10),
  },
  headerText: {
    fontSize: Normalize(18),
    fontFamily: "open-sans-bold",
  },
  description: {
    color: Colors.textLight,
    fontSize: Normalize(14),
    textAlign: "justify",
    marginVertical: Normalize(6),
  },
  info: {
    padding: Normalize(12),
    width: "80%",
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: Normalize(6),
    justifyContent: "flex-start",
  },
});
