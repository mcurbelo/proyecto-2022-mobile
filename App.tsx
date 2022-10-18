import { SafeAreaView } from "react-native-safe-area-context";
import Navigator from "./src/navigator/Navigator";
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({ root: { backgroundColor: "#F0FBFC" } });
export default function App() {
  return (
      <Navigator />
  );
}
