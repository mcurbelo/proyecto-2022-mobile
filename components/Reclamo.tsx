import { View, Text, Button, Image } from "react-native";
import { DtReclamo, TipoReclamo, TipoResolucion } from "../tmp/ProductService";

type ReclamoProps = {
  reclamo: DtReclamo;
  onResolver: (idReclamo: string, idCompra: string) => void;
};

const formatoReclamo = (reclamo: TipoResolucion) => {
  if (reclamo == TipoResolucion.NoResuelto) {
    return (
      <Text>
        {"Estado: "}
        <Text style={{ color: "#ff8c00", fontWeight: "bold" }}>
          No Resuelto
        </Text>
      </Text>
    );
  }
  if (reclamo == TipoResolucion.Devolucion) {
    return (
      <Text>
        {"Estado: "}
        <Text style={{ color: "#28a745", fontWeight: "bold" }}>Devuelto</Text>
      </Text>
    );
  }

  if (reclamo == TipoResolucion.PorChat) {
    return (
      <Text>
        {"Estado: "}
        <Text style={{ color: "#28a745", fontWeight: "bold" }}>Por Chat</Text>
      </Text>
    );
  }
};

const formatoMotivo = (motivo: TipoReclamo) => {
  if (motivo == TipoReclamo.DesperfectoProducto)
    return "Desperfecto en el producto";
  if (motivo == TipoReclamo.Otro) return "Otro";
  if (motivo == TipoReclamo.ProducoErroneo) return "Producto Erroneo";
  if (motivo == TipoReclamo.ProductoNoRecibido) return "Producto No Recibido";
  if (motivo == TipoReclamo.RepticionIncoveniente) return "Repetición del inconveniente";
};

const Reclamo = (props: ReclamoProps) => {
  return (
    <View
      style={{
        margin: 8,
        flexDirection: "column",
        padding: 8,
        backgroundColor: "#FFFFFF",
        elevation: 4,
        borderRadius: 4,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Text>
          Iniciado:{" "}
          <Text
            style={{ fontWeight: "bold" }}
          >{`${props.reclamo.fechaRealizado}`}</Text>
        </Text>
        <Text>
          {"Motivo: "}
          <Text style={{ fontWeight: "bold" }}>
            {formatoMotivo(props.reclamo.tipo)}
          </Text>
        </Text>
        {formatoReclamo(props.reclamo.estado)}
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 8,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: props.reclamo.datosCompra.imagenProducto }}
          style={{
            width: 80,
            height: 80,
            borderWidth: 0.1,
            borderColor: "#000000",
          }}
          resizeMode="cover"
        />
        <Text style={{ flex: 1, flexWrap: "wrap", paddingLeft: 6 }}>
          {props.reclamo.datosCompra.nombreProducto}
        </Text>
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Text>Reclamando a</Text>
          <Text>{props.reclamo.datosCompra.nombreVendedor}</Text>
        </View>
      </View>
      <View
        style={{
          marginVertical: 8,
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Text>
          Total:{" "}
          <Text style={{ fontWeight: "bold" }}>
            ${props.reclamo.datosCompra.montoTotal}
          </Text>
        </Text>
        <Text>
          Fecha de entrega:{" "}
          <Text style={{ fontWeight: "bold" }}>
            {props.reclamo.datosCompra.fechaEntrega}
          </Text>
        </Text>
        <Text>
          Tipo de entrega:{" "}
          <Text style={{ fontWeight: "bold" }}>
            {props.reclamo.datosCompra.esEnvio ? "Envio" : "Retiro"}
          </Text>
        </Text>
        <Text>
          Direccion:{" "}
          <Text style={{ fontWeight: "bold" }}>
            {props.reclamo.datosCompra.direccionEntrega}
          </Text>
        </Text>
      </View>
      {props.reclamo.estado == TipoResolucion.NoResuelto && (
        <Button
          title="Marcar como resuelto"
          onPress={() => {
            props.onResolver(
              props.reclamo.idReclamo,
              props.reclamo.datosCompra.idCompra
            );
          }}
        />
      )}
    </View>
  );
};

export default Reclamo;
