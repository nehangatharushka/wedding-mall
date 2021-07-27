import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

//screens
import Checkout from "../Screens/Cart/Checkout/CheckOut";
import Payment from "../Screens/Cart/Checkout/Payment";
import Comfirm from "../Screens/Cart/Checkout/Comfirm";

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Checkout" component={Checkout} />
      <Tab.Screen name="Payment" component={Payment} />
      <Tab.Screen name="Comfirm" component={Comfirm} />
    </Tab.Navigator>
  );
}

export default function CheckoutNavigator() {
  return <MyTabs />;
}
