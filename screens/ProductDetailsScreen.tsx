import { RootStackScreenProps } from "../types";
import { FlatList, SafeAreaView, Text, Image, View, Alert } from "react-native";
import { useEffect, useState } from "react";
import { infoProducto, DtProducto } from "../tmp/ProductService";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ProductDetailsState = {
  isLoading: boolean;
  product: DtProducto;
  buttonDisabled: boolean;
};
const ProductDetailsScreen = ({
  navigation,
  route,
}: RootStackScreenProps<"ProductDetailsScreen">) => {
  const [state, setState] = useState({
    isLoading: true,
    product: {},
  } as ProductDetailsState);

  const separator = () => (
    <View
      style={{
        borderBottomColor: "black",
        borderBottomWidth: 0.2,
        marginVertical: 8,
      }}
    />
  );

  const getStockColor = (stock: number) => {
    if (stock > 30) return "#008000";
    if (stock < 30 && stock > 10) return "#D7D800";

    return "#FF1116";
  };

  const getStockText = (stock: number) => {
    if (stock > 30) return "Disponible";
    if (stock < 30 && stock > 10) return "Medio";

    return "Ultimas unidades";
  };
  useEffect(() => {
    infoProducto(route.params.productId)
      .then((product) => {
        setState({ ...state, isLoading: false, product: product });
      })
      .catch((error) => {});
  }, []);
  return (
    <SafeAreaView
      style={{
        width: "100%",
        height: "100%",
        padding: 15,
        flexDirection: "column",
      }}
    >
      {!state.isLoading && (
        <View>
          <View style={{ height: 250 }}>
            <FlatList
              data={state.product.imagenes}
              horizontal={true}
              showsHorizontalScrollIndicator={true}
              renderItem={(item) => (
                <Image
                  source={{ uri: item.item }}
                  resizeMode="center"
                  style={{
                    width: 260,
                    borderWidth: 0.5,
                    borderColor: "#000000",
                    resizeMode: "center",
                    marginEnd: 8,
                  }}
                />
              )}
              keyExtractor={(item) => item}
            />
          </View>
          {separator()}
          <View style={{ flexDirection: "row" }}>
            <Text>Nombre: </Text>
            <Text style={{ fontWeight: "bold" }}>{state.product.nombre}</Text>
          </View>
          {separator()}
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            <Text>Descripcion: </Text>
            <Text style={{ fontWeight: "bold" }}>
              {state.product.descripcion}
            </Text>
          </View>
          {separator()}
          <View style={{ flexDirection: "row" }}>
            <Text>Vendedor: </Text>
            <Text style={{ fontWeight: "bold" }}>
              {state.product.nombreVendedor}
            </Text>
          </View>
          {separator()}
          <View style={{ flexDirection: "row" }}>
            <Text>Garantía: </Text>
            <Text style={{ fontWeight: "bold" }}>
              {state.product.garantia}{" "}
              {state.product.garantia != 1 ? "días" : "día"}
            </Text>
          </View>
          {separator()}
          <View style={{ flexDirection: "row" }}>
            <Text>Stock: </Text>
            <Text
              style={{
                fontWeight: "bold",
                color: getStockColor(state.product.stock),
              }}
            >
              {getStockText(state.product.stock)}
            </Text>
          </View>
          {separator()}
          <View style={{ flexDirection: "row" }}>
            <Text>Precio: </Text>
            <Text style={{ fontWeight: "bold" }}>${state.product.precio}</Text>
          </View>
          {separator()}
          <View style={{ flexDirection: "row" }}>
            <Text>Formas de entrega: </Text>
            <FontAwesome name="home" size={20} />
            <View style={{ width: 10 }} />
            {state.product.permiteEnvio && (
              <FontAwesome name="truck" size={20} />
            )}
          </View>
          {separator()}
        </View>
      )}

      <FontAwesome.Button
        name="shopping-cart"
        onTouchEnd={async () => {
          let token = await AsyncStorage.getItem("@token");
          let uuid = await AsyncStorage.getItem("@uuid")
          if(uuid && token) {
            navigation.navigate("SelectCard", {
              productId: state.product.idProducto,
              canDelivery: state.product.permiteEnvio,
            });
          } else {
            Alert.alert(
              "No ha iniciado sesión",
              "Debe iniciar sesión para poder comprar productos"
            )
          }
        }}
      >
        Comprar
      </FontAwesome.Button>
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;
