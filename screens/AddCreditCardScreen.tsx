import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Button, SafeAreaView } from "react-native";
import { TextInput } from "react-native-paper";
import { agregarTarjeta } from "../tmp/CardsService";
import { CheckoutFlowStack } from "../types";

type AddCreditCardScreen = {
  ccNumber: string;
  ccCvv: string;
  ccExpiration: string;
  isLoading: boolean;
};
const CrediCardScreen = ({
  navigation,
  route,
}: CheckoutFlowStack<"AddCard">) => {
  const [state, setState] = useState({} as AddCreditCardScreen);

  const addCard = async () => {
    let token = await AsyncStorage.getItem("@token");
    let uuid = await AsyncStorage.getItem("@uuid");
    if (!token || !uuid) return;
    setState({ ...state, isLoading: true });
    agregarTarjeta({
      token: token,
      uuid: uuid,
      cardNumber: state.ccNumber,
      cardCvv: state.ccCvv,
      cardExpiration: state.ccExpiration,
    })
      .then((response) => {
        setState({ isLoading: false } as AddCreditCardScreen);
        Alert.alert(
          "Exito!",
          `Su tarjeta ${state.ccNumber} se ha agregado con exito`
        );
        navigation.pop();
      })
      .catch((error) => {
        setState({ isLoading: false } as AddCreditCardScreen);
        Alert.alert("Error", error.message);
      });
  };
  return (
    <SafeAreaView style={{ height: "100%", padding: 15 }}>
      {!state.isLoading && (
        <>
          <TextInput
            placeholder="4111 1111 1111 1111"
            label={"Numero"}
            maxLength={16}
            value={state.ccNumber ?? ""}
            mode="outlined"
            onChangeText={(value) =>
              setState({ ...state, ccNumber: value.valueOf() })
            }
          />
          <TextInput
            maxLength={3}
            placeholder="111"
            label={"CVV"}
            value={state.ccCvv ?? ""}
            mode="outlined"
            onChangeText={(value) =>
              setState({ ...state, ccCvv: value.valueOf() })
            }
          />
          <TextInput
            label={"Vencimiento"}
            placeholder="12/23"
            value={state.ccExpiration ?? ""}
            mode="outlined"
            style={{ marginBottom: 8 }}
            onChangeText={(value) =>
              setState({ ...state, ccExpiration: value.valueOf() })
            }
          />
          <Button title="Agregar" onPress={() => addCard()} />
        </>
      )}
      {state.isLoading && <ActivityIndicator />}
    </SafeAreaView>
  );
};

export default CrediCardScreen;
