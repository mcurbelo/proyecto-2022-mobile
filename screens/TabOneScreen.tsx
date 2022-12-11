import { FlatList, StyleSheet, ToastAndroid, Text } from "react-native";

import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

import {
  DtFiltros,
  DtProductoSlim,
  listarProductos,
} from "../tmp/ProductService";
import Producto from "../components/Producto";
import { useEffect, useState } from "react";
import { TextInput } from "react-native-paper";

type ProductListScreenState = {
  productos: DtProductoSlim[];
  isLoading: boolean;
  page: number;
  maxPages: number | null;
  fetchedLastPage: boolean;
  filtros: DtFiltros | undefined;
};

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [state, setState] = useState({
    isLoading: true,
    page: 0,
    productos: [] as DtProductoSlim[],
    maxPages: null,
    fetchedLastPage: false,
  } as ProductListScreenState);

  const refresh = async (pageNumber: number, filtros?: DtFiltros) => {
    if (state.fetchedLastPage) {
      ToastAndroid.showWithGravity(
        "No hay mas productos para mostrar",
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG
      );
      return;
    }
    setState({ ...state, isLoading: true });
    listarProductos(
      pageNumber.toString(),
      "3",
      undefined,
      undefined,
      filtros
    ).then((response) => {
      let fetchedLP = false;
      if (response.totalPages && pageNumber == response.totalPages - 1)
        fetchedLP = true;
      let productosContat = state.productos.concat(response.productos ?? []);
      setState({
        ...state,
        page: response.currentPage,
        isLoading: false,
        maxPages: response.totalPages,
        fetchedLastPage: fetchedLP,
        productos: productosContat,
      });
    });
  };

  const forcedRefresh = async (filtros?: DtFiltros) => {
    setState({ ...state, isLoading: true });
    listarProductos("0", "3", undefined, undefined, filtros).then(
      (response) => {
        let fetchedLP = false;
        if (response.totalPages && 0 == response.totalPages - 1)
          fetchedLP = true;
        setState({
          ...state,
          page: response.currentPage,
          isLoading: false,
          maxPages: response.totalPages,
          fetchedLastPage: fetchedLP,
          productos: response.productos ?? [],
        });
      }
    );
  };

  const filterByName = (name: string) => {
    forcedRefresh({ nombre: name });
  };

  useEffect(() => {
    refresh(state.page, state.filtros);
  }, [state.page]);

  return (
    <View style={{ height: "100%", backgroundColor: "#f9f9f9" }}>
      <View style={{ height: "100%" }}>
        <TextInput
        activeOutlineColor="#a8a7a7"
          style={{ marginHorizontal: 8 }}
          placeholder="Buscar producto"
          label={"Buscar"}
          right={<TextInput.Icon name="shopping-search" />}
          mode="outlined"
          returnKeyType="search"
          onSubmitEditing={(value) => {
            filterByName(value.nativeEvent.text);
          }}
        />
        <FlatList
          ListEmptyComponent={
            <>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginHorizontal: 8,
                }}
              >
                No existe ningún producto que coincida con su busqueda {":("}
              </Text>
            </>
          }
          onRefresh={() => {
            forcedRefresh();
          }}
          refreshing={state.isLoading}
          data={state.productos.filter(function (item, pos) {
            return state.productos.indexOf(item) == pos;
          })}
          renderItem={(item) => (
            <Producto
              producto={item.item}
              onTouch={() => {
                navigation.push("ProductDetailsScreen", {
                  productId: item.item.idProducto,
                });
              }}
            />
          )}
          keyExtractor={(item) => item.idProducto}
          onEndReached={() => {
            if (!state.fetchedLastPage) {
              setState({ ...state, page: state.page + 1 });
            } else {
              ToastAndroid.showWithGravity(
                "No hay mas productos para mostrar",
                ToastAndroid.BOTTOM,
                ToastAndroid.LONG
              );
            }
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
