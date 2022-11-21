import React from "react";
import { View, Text, Image } from "react-native";
import { DtCompraSlimComprador, EstadoCompra } from "../tmp/ProductService";

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
            <Text style={{ fontWeight: "bold" }}>{item.nombreProducto}</Text>
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
    </View>
  );
};

export default Compra;
