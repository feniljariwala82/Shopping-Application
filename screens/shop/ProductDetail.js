import React from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import DefaultText from "../../components/Reusable/DefaultText";
import Normalize from "../../components/Reusable/Normalize";
import CustomButton from "../../components/layout/CustomButton";
import ThemeBasedColors from "../../src/themes/Colors";
import { Icon } from "react-native-elements";
import * as cartActions from "../../store/actions/cartAct";
import Toast from "react-native-simple-toast";

const { height, width } = Dimensions.get("window");
const Colors = ThemeBasedColors();

const ProductDetail = (props) => {
  const prodId = props.navigation.getParam("productId");
  const availProducts = useSelector(
    (state) => state.products.availableProducts
  );
  const productData = availProducts.find((product) => product._id === prodId);
  const dispatch = useDispatch();
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: productData.imageUrl }} />
      </View>
      {/* Product name */}
      <DefaultText
        fontStyle={{
          fontSize: Normalize(20),
          padding: Normalize(10),
          fontFamily: "open-sans-bold",
          color: Colors.primary,
        }}
      >
        {productData.title}
      </DefaultText>
      {/* Description */}
      <View>
        <DefaultText
          fontStyle={{
            fontSize: Normalize(16),
            paddingLeft: Normalize(10),
            paddingRight: Normalize(10),
            marginVertical: Normalize(6),
            textAlign: "justify",
            fontFamily: "open-sans",
            color: Colors.textLight,
          }}
        >
          {productData.description}
        </DefaultText>
      </View>
      {/* Price and add more */}
      <View style={styles.price}>
        <DefaultText
          fontStyle={{
            fontSize: Normalize(18),
            marginVertical: Normalize(6),
            paddingLeft: Normalize(10),
            paddingRight: Normalize(10),
            textAlign: "justify",
            fontFamily: "open-sans-bold",
            color: Colors.textDark,
          }}
        >
          ${productData.price.toFixed(2)}
        </DefaultText>
      </View>
      {/* Buttons */}
      <View style={styles.buttons}>
        {/* heart symbol */}
        <TouchableOpacity>
          <Icon
            name="favorite"
            type="materialicons"
            size={Normalize(26)}
            color={Colors.primary}
            onPress={() => console.log("Fav!!")}
          />
        </TouchableOpacity>
        {/* add to cart */}
        <CustomButton
          buttonContainer={styles.buttonContainer}
          title="Add To Cart"
          iconName="shoppingcart"
          type="antdesign"
          color="white"
          size={Normalize(18)}
          onUserPress={() => {
            dispatch(cartActions.addToCart(productData));
            dispatch(cartActions.countTotalAmount());
            Toast.showWithGravity(
              `${productData.title} has been added to cart`,
              Toast.LONG,
              Toast.BOTTOM
            );
          }}
        />
        {/* Go back */}
        <CustomButton
          buttonContainer={styles.buttonContainer}
          buttonContainer={{ backgroundColor: Colors.accent }}
          title="Go Back"
          iconName="back"
          type="antdesign"
          color="white"
          size={Normalize(18)}
          onUserPress={() => props.navigation.pop()}
        />
      </View>
    </ScrollView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    marginTop: Normalize(10),
  },
  image: {
    height: height * 0.4,
    width: width * 0.8,
  },
  screen: {
    backgroundColor: Colors.backgroundColor,
    height: "100%",
  },
  text: {
    fontSize: Normalize(16),
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: Normalize(10),
  },
  buttonContainer: {
    width: Normalize(100),
  },
  price: {
    flexDirection: "row",
    alignItems: "center",
  },
});
