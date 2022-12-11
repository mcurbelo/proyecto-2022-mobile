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
import { Modal } from "react-native-paper";
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

type CompraProps = {
  item: DtCompraSlimComprador;
  onIniciarReclamo: (idCompra: string) => void;
  onCalificarVendedor: (idCompra: string, idVendedor: string) => void;
};

// const Compra = (item: DtCompraSlimComprador, onIniciarReclamo: (idCompra: string) => void) => {
const Compra = (props: CompraProps) => {
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

  // const iniciarReclamo = async (idCompra: string) => {
  //   setShowModal(true)
  // };

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
            {props.item.fecha.toString()}
          </Text>
          <Text
            style={{
              marginLeft: "auto",
              color:
                props.item.estadoCompra != EstadoCompra.Cancelada
                  ? "green"
                  : "red",
              fontWeight: "bold",
            }}
          >
            {getEstado(props.item.estadoCompra)}
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
            source={{ uri: props.item.imagenURL }}
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
                {props.item.nombreProducto}
              </Text>
            </View>
            <Text>{props.item.nombreVendedor}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text>{props.item.cantidad}</Text>
              <Text>{" x "}</Text>
              <Text>${props.item.montoUnitario}</Text>
            </View>
            <Text>Total: ${props.item.montoTotal}</Text>
          </View>
        </View>
      </View>
      {props.item.puedeCompletar && (
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
            completarCompra(props.item.idCompra);
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
      {props.item.puedeReclamar && (
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
            // iniciarReclamo(item.idCompra);
            props.onIniciarReclamo(props.item.idCompra);
          }}
        >
          <>
            {!isLoading && (
              <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>
                INICIAR RECLAMO
              </Text>
            )}
            {/* <ActivityIndicator animating={isLoading} /> */}
          </>
        </TouchableHighlight>
      )}
      {/* TODO Agregar boton de calificar vendedor */}
      {props.item.puedeCalificar && (
        <Button
          title="Calificar vendedor"
          onPress={() => {
            props.onCalificarVendedor(
              props.item.idCompra,
              props.item.idVendedor
            );
          }}
        />
      )}
    </View>
  );
};

export default Compra;
