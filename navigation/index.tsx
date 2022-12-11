/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import {
  CheckoutFlowList,
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";

import { useState } from "react";
import LogOrSign from "../screens/LogOrSign";
import SignScreen from "../screens/SignScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import CheckoutFlowScreen from "../screens/CheckoutFlowScreen";
import ReviewOrderScreen from "../screens/ReviewOrderScreen";
import AddressSelectionScreen from "../screens/AddressSelectionScreen";
import AddCreditCardScreen from "../screens/AddCreditCardScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddAddressScreen from "../screens/AddAddressScreen";
import ListAddressScreen from "../screens/ListAddressScreen";
import MisReclamos from "../screens/MisReclamos";
import CambiarContraseña from "../screens/CambiarContraseña";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();
const CheckoutStack = createNativeStackNavigator<CheckoutFlowList>();

function RootNavigator() {
  return (
    <Stack.Navigator id="root">
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Screen name="AddCard" component={AddCreditCardScreen} />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
        <Stack.Screen name="LogOrSign" component={LogOrSign} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignScreen" component={SignScreen} />
        <Stack.Screen
          name="ProductDetailsScreen"
          component={ProductDetailsScreen}
        />
        <Stack.Screen name="MisReclamos" component={MisReclamos} />
        <Stack.Screen name="CambiarContraseña" component={CambiarContraseña} />
      </Stack.Group>

      <Stack.Group>
        <CheckoutStack.Screen
          name="SelectCard"
          component={CheckoutFlowScreen}
        />
        <CheckoutStack.Screen
          name="ReviewOrder"
          component={ReviewOrderScreen}
        />
        <CheckoutStack.Screen
          name="AddressSelection"
          component={AddressSelectionScreen}
        />
        <Stack.Screen name="AddAddress" component={AddAddressScreen} />
        <Stack.Screen name="ListAddress" component={ListAddressScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

type State = string | null;
function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  let count = 0;
  // TODO: Cambiar los usestate a otro lado tal vez no se
  const CheckLogged = async () => {
    let token = await AsyncStorage.getItem("@token");
    setToken(token);
  };

  React.useEffect(() => {
    CheckLogged();
    count++;
  });

  const [token, setToken] = useState(null as State);

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      {token && (
        <BottomTab.Screen
          name="HomeScreen"
          // component={HomeScreen}
          children={(props) => (
            <HomeScreen
              reset={count}
              navigation={props.navigation}
              route={props.route}
            />
          )}
          options={({ navigation }: RootTabScreenProps<"HomeScreen">) => ({
            title: "Mis Compras",
            unmountOnBlur: true,
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="shopping-bag" color={color} />
            ),
          })}
        />
      )}

      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<"TabOne">) => ({
          title: "Productos",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="shopping-cart" color={color} />
          ),
        })}
      />

      <BottomTab.Screen
        name="TabTwo"
        children={(props) => (
          <TabTwoScreen
            extraProps={!!token}
            route={props.route}
            navigate={props.navigation}
            CheckLogged={CheckLogged}
          />
        )}
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
