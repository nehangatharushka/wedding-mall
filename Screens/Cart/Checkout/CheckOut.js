import React, { useEffect, useState, useContext } from "react";
import { Text, View, Button, ScrollView } from "react-native";
import { Item, Picker, Toast } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AuthGlobal from "../../../Context/store/AuthGlobal";

import FormContainer from "../../../Shared/Form/FormContainer";
import Input from "../../../Shared/Form/Input";

import { connect } from "react-redux";

const countries = require("../../../assets/data/countries.json");

const Checkout = (props) => {
  const context = useContext(AuthGlobal);

  const [orderItems, setOrderItems] = useState();
  const [address, setAddress] = useState();
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [zip, setZip] = useState();
  const [country, setCountry] = useState();
  const [phone, setPhone] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    setOrderItems(props.cartItems);

    if (context.stateUser.isAuthenticated) {
      setUser(context.stateUser.user.sub);
    } else {
      props.navigation.navigate("Cart");
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Please Login to Checkout",
        text: "",
      });
    }

    return () => {
      setOrderItems();
    };
  }, []);

  const checkOut = () => {
    let order = {
      city,
      country,
      dateOrdered: Date.now(),
      orderItems,
      phone,
      shippingAddress1: address,
      shippingAddress2: address2,
      status: "3",
      user,
      zip,
    };
    props.navigation.navigate("Payment", { order: order });
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={"Booking Address"}>
        <Input
          placeholder={"Phone"}
          name={"Phone"}
          value={phone}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={"Booking Address 1"}
          name={"Booking Address 1"}
          value={address}
          //keyboardType={"numeric"}
          onChangeText={(text) => setAddress(text)}
        />
        <Input
          placeholder={"Booking Address 2"}
          name={"Booking Address 2"}
          value={address2}
          //keyboardType={"numeric"}
          onChangeText={(text) => setAddress2(text)}
        />
        <Input
          placeholder={"City"}
          name={"City"}
          value={city}
          //keyboardType={"numeric"}
          onChangeText={(text) => setCity(text)}
        />
        <Input
          placeholder={"Zip"}
          name={"Zip"}
          value={zip}
          keyboardType={"numeric"}
          onChangeText={(text) => setZip(text)}
        />

        <Item picker>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" color={"#007aff"} />}
            style={{ width: undefined }}
            selectedValue={country}
            placeholder="Select your country"
            placeholderStyle={{ color: "#007aff" }}
            placeholderIconColor="#007aff"
            onValueChange={(e) => setCountry(e)}
          >
            {countries.map((c) => {
              return <Picker.Item key={c.code} label={c.name} value={c.name} />;
            })}
          </Picker>
        </Item>
        <View></View>
        <View style={{ width: "80%", alignItems: "center" }}>
          <Button title="Confirm" onPress={() => checkOut()} />
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};
export default connect(mapStateToProps)(Checkout);
