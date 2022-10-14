import HomeScreen from "./src/screen/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Registrar from "./src/screen/Registrar";
import MisCompras from "./src/screen/MisCompras";

// Stacks
const Stack = createNativeStackNavigator();

export type TabNavigatorParamList = {
  Home: undefined;
  MisCompras: undefined;
  Registrar: undefined;
};
// Tabbis
const Tab = createMaterialBottomTabNavigator<TabNavigatorParamList>();

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="MisCompras" component={MisCompras} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeTabs" component={HomeTabs} />

        <Stack.Screen name="Registrar" component={Registrar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
