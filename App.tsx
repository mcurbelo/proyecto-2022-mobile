import HomeScreen from "./src/screen/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Registrar from "./src/screen/RegistrarScreen";
import MisCompras from "./src/screen/MisComprasScreen";
import Navigator from './src/navigator/Navigator'

// Stacks



export default function App() {
  return (

    <Navigator/>
  
  );
}
