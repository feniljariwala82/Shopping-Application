import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import CustomButton from "../../components/layout/CustomButton";
import Normalize from "../Reusable/Normalize";
import DefaultText from "../Reusable/DefaultText";
import ThemeBasedColors from "../../src/themes/Colors";
import { useDispatch } from "react-redux";
import * as cartActions from "../../store/actions/cartAct";
import Toast from "react-native-simple-toast";

const { height } = Dimensions.get("window");
const Colors = ThemeBasedColors();

const ProductItem = (props) => {
  const { title, imageUrl, price, id } = props;

  var TouchableComp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComp = TouchableNativeFeedback;
  }

  const dispatch = useDispatch();

  const onViewDetail = (props) => {
    props.navigation.navigate({
      routeName: "ProductDetail",
      params: {
        productId: id,
        productTitle: title,
      },
    });
  };

  const onAddToCart = (product) => {
    dispatch(cartActions.addToCart(product));
    dispatch(cartActions.countTotalAmount());
    Toast.showWithGravity(
      `${product.title} has been added to cart`,
      Toast.LONG,
      Toast.BOTTOM
    );
  };

  return (
    <View style={styles.product}>
      <TouchableComp onPress={onViewDetail.bind(this, props)}>
        <View style={{ height: "100%", borderRadius: Normalize(10) }}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: imageUrl }} />
          </View>
          <View style={styles.detail}>
            <DefaultText fontStyle={styles.title}>{title}</DefaultText>
            <DefaultText fontStyle={styles.price}>
              ${price.toFixed(2)}
            </DefaultText>
          </View>
          <View style={styles.actionButtons}>
            <CustomButton
              title="View Details"
              onUserPress={onViewDetail.bind(this, props)}
              iconName="info"
              type="feather"
              color="white"
              size={Normalize(18)}
            />
            <CustomButton
              title="Add To Cart"
              buttonContainer={styles.button}
              onUserPress={onAddToCart.bind(this, props.product)}
              iconName="shoppingcart"
              type="antdesign"
              color="white"
              size={Normalize(18)}
            />
          </View>
        </View>
      </TouchableComp>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  product: {
    elevation: 8,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 7,
    shadowOpacity: 0.26,
    borderRadius: Normalize(10),
    backgroundColor: Colors.backgroundColor,
    margin: Normalize(18),
    height: height * 0.5,
    borderColor: Platform.OS === "android" ? "transparent" : Colors.borderColor,
    borderWidth: 0.4,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  imageContainer: {
    height: "60%",
    width: "100%",
    borderTopLeftRadius: Normalize(10),
    borderTopRightRadius: Normalize(10),
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  detail: {
    alignItems: "center",
    height: "15%",
    padding: Normalize(10),
  },
  title: {
    fontSize: Normalize(16),
    color: Colors.textDark,
  },
  price: {
    fontSize: Normalize(14),
    color: Colors.textLight,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: Normalize(5),
    height: "25%",
  },
  button: {
    backgroundColor: Colors.accent,
  },
});
