import HomeScreen from './src/screen/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Registrar from './src/screen/Registrar';
import MisCompras from './src/screen/MisCompras';

// Stacks
const Stack = createNativeStackNavigator();

export type TabNavigatorParamList = {
  Home: undefined,
  MisCompras: undefined,
  Registrar: undefined
}
// Tabbis
const Tab = createMaterialBottomTabNavigator<TabNavigatorParamList>();


export default function App() {
  return (

    <NavigationContainer>
      {/* <Stack.Navigator>
        <Stack.Screen name="Home" component= {HomeScreen}/>
      </Stack.Navigator> */}
      {/* Como pregunta mas que nada, porque tengo que reiniciar el maldito servidor este aveces si y yaveces no lmao  */}
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        {/* TODO: Aca tipo mi idea es poner "mis compras"(pa mostrar las compras y su estado) y llevarlo a registrar de no estar registrado? no se si siquiera podes entrar aca sin estarlo no se, */}
        {/* <Tab.Screen name="registrar" component={Registrar}/> */}

        {/* Por ahora queda asi */}
        <Tab.Screen name="MisCompras" component={MisCompras}/>
        <Tab.Screen name="Registrar" component={Registrar}/>
      </Tab.Navigator>
      

      
    </NavigationContainer>

  );
}
