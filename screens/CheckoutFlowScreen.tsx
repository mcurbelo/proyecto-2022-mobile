import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Button, FlatList, SafeAreaView, Text, View } from "react-native";
import { CheckoutFlowStack } from "../types";
import { DtTarjeta, fetchTarjetas } from "../tmp/CardsService";
import CreditCardView from "../components/CreditCard";

type CheckoutState = {
  isLoading: boolean;
  token: string;
  cards: DtTarjeta[];
  uuid: string;
  selectedCardId: string;
};
const CheckoutFlowScreen = ({
  navigation,
  route,
}: CheckoutFlowStack<"SelectCard">) => {
  const [state, setState] = useState({ isLoading: true } as CheckoutState);
  console.log(route.params.productId);
  useEffect(() => {
    Promise.all<string | null>([
      AsyncStorage.getItem("@token"),
      AsyncStorage.getItem("@uuid"),
    ])
      .then((result) => {
        if (!result || result.filter((item) => item).length != 2) {
          popToSignIn();
          return;
        } else {
          setState({ ...state, token: result[0]!, uuid: result[1]! });
          fetchTarjetas({ token: result[0]!, uuid: result[1]! }).then(
            (result) => setState({ ...state, isLoading: false, cards: result })
          );
        }
      })
      .catch((error) => popToSignIn());
  }, []);

  const popToSignIn = () => {
    navigation.pop(1);
    navigation.navigate("LoginScreen");
  };

  return (
    <SafeAreaView style={{ width: "100%", height: "100%", padding: 15 }}>
      {!state.isLoading && (
        <>
          <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 8 }}>
            Seleccione una tarjeta
          </Text>
          <View style={{ height: "70%" }}>
            <FlatList
              data={state.cards}
              renderItem={(item) => {
                console.log(item);
                return (
                  <CreditCardView
                    card={item.item}
                    onSelect={() => {
                      setState({ ...state, selectedCardId: item.item.id });
                    }}
                    isSelected={item.item.id == state.selectedCardId}
                  />
                );
              }}
              keyExtractor={(item) => item.id}
            />
          </View>
          <Button
            disabled={!state.selectedCardId}
            title="Siguiente"
            onPress={() => {
              navigation.navigate("AddressSelection", {
                productId: route.params.productId,
                cardId: state.selectedCardId,
                cardLast4: state.cards.find(
                  (item) => item.id == state.selectedCardId
                )?.last4!,
                canDelivery: route.params.canDelivery,
              });
            }}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default CheckoutFlowScreen;
