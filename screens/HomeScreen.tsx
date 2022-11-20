import { useEffect, useState } from "react";
import { RootTabScreenProps } from "../types";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { listarCompras } from "../tmp/CompradorService";
import { DtCompraSlimComprador } from "../tmp/ProductService";
import Compra from "../components/Compra";

type State = {
  isError: boolean;
  compras?: DtCompraSlimComprador[];
  isEmpty: boolean;
};
const HomeScreen = (allProps: any) => {
  const [state, setState] = useState({} as State);
  const fetchCompras = async () => {
    let token = await AsyncStorage.getItem("@token");
    let uuid = await AsyncStorage.getItem("@uuid");
    if (!token || !uuid) return;

    listarCompras(uuid!, token!, "0", "100")
      .then((response) => {
        if (response.data.compras.length == 0) {
          setState({ ...state, isEmpty: true });
          return;
        }
        setState({
          ...state,
          isError: false,
          compras: response.data.compras.reverse(),
        });
      })
      .catch((error) => {
        setState({ ...state, isError: true });
      });
  };
  React.useEffect(() => {
    fetchCompras();
  }, [allProps.reset]);

  return (
    <View>
      {!state.isError && !state.isEmpty && (
        <FlatList
          data={state.compras}
          renderItem={(compra) => <Compra {...compra.item} />}
        />
      )}

      {!state.isError && state.isEmpty && (
        <View
          style={{
            height: "100%",
            width: "100%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 40, fontWeight: "bold" }}>
            No tienes ninguna compra! {":("}
          </Text>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
