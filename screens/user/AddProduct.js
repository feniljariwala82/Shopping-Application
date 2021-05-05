import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  ScrollView,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Platform,
  Text,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import ThemeBasedColors from "../../src/themes/Colors";
import Normalize from "../../components/Reusable/Normalize";
import DefaultText from "../../components/Reusable/DefaultText";
import { useDispatch } from "react-redux";
import * as productActions from "../../store/actions/productAct";

const Colors = ThemeBasedColors();

const AddProduct = (props) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [isTitleValid, setIsTitleValid] = useState(false);
  const [isUrlValid, setIsUrlValid] = useState(false);
  const [isPriceValid, setIsPriceValid] = useState(false);
  const [isDescriptionValid, setIsDescriptionValid] = useState(false);

  const addProductHandler = useCallback(() => {
    if (!isTitleValid || !isUrlValid || !isPriceValid || !isDescriptionValid) {
      Alert.alert(
        "Wrong Input!",
        "Please enter all the fields with valid data",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") },
          {
            text: "Go Back To Home",
            onPress: () => props.navigation.navigate("ProductOverview"),
            style: "cancel",
          },
        ]
      );
      return;
    }
    try {
      dispatch(
        productActions.createProduct(title, imageUrl, description, price)
      );
      return;
    } catch (error) {
      console.log(error);
    }
    props.navigation.navigate("ProductOverview");
  }, [dispatch, title, imageUrl, description, price]);

  useEffect(() => {
    props.navigation.setParams({ addProduct: addProductHandler });
  }, [addProductHandler]);

  const titleChangeHandler = (text) => {
    var pattern = RegExp(/^[a-zA-Z ]*$/);
    if (pattern.test(text) && text.trim().length > 0) {
      setIsTitleValid(true);
    } else {
      setIsTitleValid(false);
    }
    setTitle(text);
  };

  const imageUrlChangeHandler = (text) => {
    var pattern = RegExp(
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    );
    if (pattern.test(text)) {
      setIsUrlValid(true);
    } else {
      setIsUrlValid(false);
    }
    setImageUrl(text);
  };

  const priceChangeHandler = (text) => {
    var pattern = RegExp(/^\d+$/);
    if (pattern.test(text) && text.length > 0 && text != 0) {
      setIsPriceValid(true);
    } else {
      setIsPriceValid(false);
    }
    setPrice(text);
  };

  const descriptionHandler = (text) => {
    var pattern = RegExp(/^[a-zA-Z0-9 ]*$/);
    if (pattern.test(text) && text.trim().length > 10) {
      setIsDescriptionValid(true);
    } else {
      setIsDescriptionValid(false);
    }
    setDescription(text);
  };

  return (
    <ScrollView style={styles.screen}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.form}>
          {/* Title */}
          <View style={styles.formControl}>
            <DefaultText fontStyle={styles.label}>Title</DefaultText>
            <TextInput
              selectionColor={Colors.primary}
              style={styles.input}
              onChangeText={titleChangeHandler}
              defaultValue={title}
              placeholder="Insert title here"
              placeholderTextColor={Colors.textLight}
              autoCorrect
            />
            {!isTitleValid && (
              <Text
                style={{
                  fontFamily: "open-sans",
                  color: Colors.danger,
                  paddingHorizontal: Normalize(10),
                  paddingVertical: Normalize(4),
                  fontSize: Normalize(12),
                }}
              >
                Please enter valid title
              </Text>
            )}
          </View>
          {/* Image url */}
          <View style={styles.formControl}>
            <DefaultText fontStyle={styles.label}>Image Url</DefaultText>
            <TextInput
              selectionColor={Colors.primary}
              style={styles.input}
              onChangeText={imageUrlChangeHandler}
              defaultValue={imageUrl}
              placeholder="Insert image url here"
              placeholderTextColor={Colors.textLight}
              autoCorrect
            />
            {!isUrlValid && (
              <Text
                style={{
                  fontFamily: "open-sans",
                  color: Colors.danger,
                  paddingHorizontal: Normalize(10),
                  paddingVertical: Normalize(4),
                  fontSize: Normalize(12),
                }}
              >
                Please enter valid image url
              </Text>
            )}
          </View>
          {/* Price */}
          <View style={styles.formControl}>
            <DefaultText fontStyle={styles.label}>Price</DefaultText>
            <TextInput
              selectionColor={Colors.primary}
              style={styles.input}
              onChangeText={priceChangeHandler}
              defaultValue={price}
              keyboardType="decimal-pad"
              placeholder="Insert price here"
              placeholderTextColor={Colors.textLight}
              autoCorrect
            />
            {!isPriceValid && (
              <Text
                style={{
                  fontFamily: "open-sans",
                  color: Colors.danger,
                  paddingHorizontal: Normalize(10),
                  paddingVertical: Normalize(4),
                  fontSize: Normalize(12),
                }}
              >
                Please enter valid product price
              </Text>
            )}
          </View>
          {/* Description */}
          <View style={styles.formControl}>
            <DefaultText fontStyle={styles.label}>Description</DefaultText>
            <TextInput
              selectionColor={Colors.primary}
              style={styles.input}
              onChangeText={descriptionHandler}
              defaultValue={description}
              placeholder="Insert description here"
              placeholderTextColor={Colors.textLight}
              autoCorrect
            />
            {!isDescriptionValid && (
              <Text
                style={{
                  fontFamily: "open-sans",
                  color: Colors.danger,
                  paddingHorizontal: Normalize(10),
                  paddingVertical: Normalize(4),
                  fontSize: Normalize(12),
                }}
              >
                Please enter valid product description
              </Text>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

AddProduct.navigationOptions = (navData) => {
  const addProduct = navData.navigation.getParam("addProduct");

  let TouchableComp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComp = TouchableNativeFeedback;
  }

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
    headerRight: () => (
      <View style={{ marginRight: Normalize(12) }}>
        <TouchableComp>
          <Feather name="save" size={24} color="black" onPress={addProduct} />
        </TouchableComp>
      </View>
    ),
  };
};

export default AddProduct;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
  form: {
    margin: Normalize(20),
  },
  label: {
    fontSize: Normalize(16),
    marginVertical: Normalize(10),
    color: Colors.textDark,
  },
  formControl: {
    width: "100%",
  },
  input: {
    borderColor: Colors.textLight,
    paddingHorizontal: Normalize(10),
    paddingVertical: Normalize(4),
    borderBottomWidth: 1,
    fontSize: Normalize(14),
  },
});
