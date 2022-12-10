import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Button,
  Alert,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import { DtCompraSlimComprador, EstadoCompra } from "../tmp/ProductService";
import { completarEnvio } from "../tmp/CompradorService";
import AsyncStorage from "@react-native-async-storage/async-storage";
const getEstado = (estado: EstadoCompra): string => {
  if (estado == EstadoCompra.EsperandoConfirmacion)
    return "Esperando Confirmación";
  return estado;
};

const separator = () => (
  <View
    style={{
      borderBottomColor: "black",
      borderBottomWidth: 0.2,
      marginVertical: 8,
    }}
  />
);

const Compra = (item: DtCompraSlimComprador) => {
  const [isLoading, setIsLoading] = useState(false);

  const completarCompra = async (idCompra: string) => {
    let token = await AsyncStorage.getItem("@token");
    if (!token) return;
    setIsLoading(true);
    completarEnvio(idCompra, token)
      .then(() => {
        setIsLoading(false);
        Alert.alert("Exito!", "Su compra ha sido completada exitosamente");
      })
      .catch(() => {
        setIsLoading(false);
        Alert.alert(
          "Error!",
          "Ha ocurrido un error inesperado, por favor intente mas tarde"
        );
      });
  };

  return (
    <View style={{ padding: 15, backgroundColor: "#FFFFFF" }}>
      <View
        style={{
          backgroundColor: "#f9f9f9",
          borderRadius: 2,
          padding: 4,
          paddingStart: 16,
          elevation: 4,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontSize: 13, fontStyle: "italic" }}>
            {item.fecha.toString()}
          </Text>
          <Text
            style={{
              marginLeft: "auto",
              color:
                item.estadoCompra != EstadoCompra.Cancelada ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {getEstado(item.estadoCompra)}
          </Text>
        </View>
        {separator()}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: item.imagenURL }}
            style={{
              width: 80,
              height: 80,
              borderWidth: 0.1,
              borderColor: "#000000",
            }}
            resizeMode="cover"
          />
          <View style={{ marginStart: 8 }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontWeight: "bold", flex: 1, flexWrap: "wrap" }}>
                {item.nombreProducto}
              </Text>
            </View>
            <Text>{item.nombreVendedor}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text>{item.cantidad}</Text>
              <Text>{" x "}</Text>
              <Text>${item.montoUnitario}</Text>
            </View>
            <Text>Total: ${item.montoTotal}</Text>
          </View>
        </View>
      </View>
      {item.puedeCompletar && (
        <TouchableHighlight
          style={{
            backgroundColor: "#1890FF",
            height: 30,
            borderRadius: 4,
            marginTop: 8,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            completarCompra(item.idCompra);
          }}
        >
          <>
            {!isLoading && (
              <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>
                MARCAR COMO RECIBIDO
              </Text>
            )}
            <ActivityIndicator animating={isLoading} />
          </>
        </TouchableHighlight>
      )}
    </View>
  );
};

export default Compra;
