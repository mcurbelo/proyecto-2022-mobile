import { View } from "react-native";

import React from "react";
import { Text } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import { Button } from "react-native-paper";

const LogOrSign = ({
  route,
  navigation,
}: RootStackScreenProps<"LogOrSign">) => {
  return (
    <View>
      <Button
        mode="contained"
        onPress={() => navigation.push("LoginScreen", route.params)}
      >
        Log In
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.push("SignScreen")}
      >
        Sign In
      </Button>
    </View>
  );
};

export default LogOrSign;
