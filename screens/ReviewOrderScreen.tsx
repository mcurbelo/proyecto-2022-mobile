import { CheckoutFlowStack, RootStackScreenProps } from "../types";
import { FlatList, SafeAreaView, Text, Image, View, Alert } from "react-native";
import { useEffect, useState } from "react";
import { infoProducto, DtProducto } from "../tmp/ProductService";
import { FontAwesome } from "@expo/vector-icons";
import { DtTarjeta } from "../tmp/CardsService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { nuevaCompra } from "../tmp/CompradorService";
import { ActivityIndicator } from "react-native-paper";
type ProductDetailsState = {
  isLoading: boolean;
  product: DtProducto;
  card: DtTarjeta;
};
const ReviewOrderScreen = ({
  navigation,
  route,
}: CheckoutFlowStack<"ReviewOrder">) => {
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
        <>
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
              <Text>Producto: </Text>
              <Text style={{ fontWeight: "bold" }}>{state.product.nombre}</Text>
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
              <Text>Precio: </Text>
              <Text style={{ fontWeight: "bold" }}>
                ${state.product.precio}
              </Text>
            </View>
            {separator()}
            <View style={{ flexDirection: "row" }}>
              <Text>Forama de Pago: </Text>
              <Text style={{ fontWeight: "bold" }}>
                &#x2022;&#x2022;&#x2022;&#x2022;
                &#x2022;&#x2022;&#x2022;&#x2022;
                &#x2022;&#x2022;&#x2022;&#x2022; {route.params.cardLast4}
              </Text>
            </View>
            {separator()}
            <View style={{ flexDirection: "row" }}>
              <Text>Entrega: </Text>
              <Text style={{ fontWeight: "bold" }}>
                {route.params.isDelivery
                  ? "Envio a domicilio"
                  : "Retiro en el local"}
              </Text>
            </View>
            {separator()}
            <View style={{ flexDirection: "row" }}>
              <Text>Direccion: </Text>
              <Text style={{ fontWeight: "bold" }}>
                {route.params.address &&
                  `${
                    route.params.address?.calle +
                    " " +
                    route.params.address?.numero +
                    ", " +
                    route.params.address?.localidad +
                    ", " +
                    route.params.address.departamento
                  }`}
              </Text>
            </View>
            {separator()}
          </View>

          <FontAwesome.Button
            name="shopping-cart"
            onTouchEnd={async () => {
              let token = await AsyncStorage.getItem("@token");
              let uuid = await AsyncStorage.getItem("@uuid");
              if (!token || !uuid) {
                setState({ ...state, isLoading: false });
                Alert.alert(
                  "Error!",
                  "Ha ocurrido un error inesperado, por favor intente nuevamente."
                );
                return;
              } else {
                setState({ ...state, isLoading: true });
                //  ? :
                nuevaCompra(uuid, token, {
                  idVendedor: state.product.idVendedor,
                  idProducto: state.product.idProducto,
                  cantidad: 1,
                  idTarjeta: route.params.cardId,
                  esParaEnvio: route.params.isDelivery,
                  idDireccionEnvio: route.params.isDelivery
                    ? Number(route.params.addressId)
                    : undefined,
                  idDireccionLocal: !route.params.isDelivery
                    ? Number(route.params.addressId)
                    : undefined,
                })
                  .then((result) => {
                    Alert.alert(
                      "Exito!",
                      "Su compra ha sido realizada con exito!"
                    );
                    navigation.navigate("Root");
                  })
                  .catch((error) => {
                    setState({ ...state, isLoading: false });
                    Alert.alert("Error!", error.response.data.message);
                  });
              }
            }}
          >
            Finalizar Compra
          </FontAwesome.Button>
        </>
      )}
      {state.isLoading && (
        <ActivityIndicator
          size={"large"}
          style={{ marginTop: "auto", marginBottom: "auto" }}
        />
      )}
    </SafeAreaView>
  );
};

export default ReviewOrderScreen;
