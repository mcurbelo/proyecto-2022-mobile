import { useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { listarCompras, nuevoReclamo } from "../tmp/CompradorService";
import { DtCompraSlimComprador, TipoReclamo } from "../tmp/ProductService";
import Compra from "../components/Compra";
import DropDownPicker from "react-native-dropdown-picker";
import { TextInput } from "react-native-paper";

type State = {
  isError: boolean;
  compras?: DtCompraSlimComprador[];
  isEmpty: boolean;
  idCompra: string;
  showModal: boolean;
  descripcionReclamo: string;
};

const HomeScreen = (allProps: any) => {
  const [state, setState] = useState({ showModal: false } as State);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const [reclamosList, setReclamosList] = useState([
    { label: "Desperfecto Producto", value: "DesperfectoProducto" },
    { label: "Repeticion Incoveniente", value: "RepticionIncoveniente" },
    { label: "Producto No Recibido", value: "ProductoNoRecibido" },
    { label: "Produco Erroneo", value: "ProducoErroneo" },
    { label: "Otro", value: "Otro" },
  ]);

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

  const enviarReclamo = async () => {
    let uuid = await AsyncStorage.getItem("@uuid");
    let token = await AsyncStorage.getItem("@token");
    if (!uuid || !token) return;
    nuevoReclamo(uuid, token, state.idCompra, {
      descripcion: state.descripcionReclamo,
      tipo: value as TipoReclamo,
    })
      .then((response) => {
        Alert.alert("Su reclamo ha sido registrado de forma existosa!");
        setState({
          ...state,
          descripcionReclamo: "",
          showModal: false,
          idCompra: "",
        });
      })
      .catch((error) => {
        Alert.alert(
          "Ha ocurrido un error al intentar procesar su reclamo. Por favor intente mas tarde"
        );
        setState({
          ...state,
          descripcionReclamo: "",
          showModal: false,
          idCompra: "",
        });
      });
  };

  return (
    <View>
      <Modal animationType="slide" visible={state.showModal}>
        <View style={{ padding: 10 }}>
          <Text>Esto es un modal. ID: {state.idCompra}</Text>
          <Text>Descripción</Text>
          <TextInput // TODO Cambiar color focus
            multiline
            style={{ marginVertical: 8 }}
            value={state.descripcionReclamo}
            onChangeText={(e) => {
              setState({ ...state, descripcionReclamo: e });
            }}
          />

          <Text>Motivo del reclamo</Text>
          <DropDownPicker
            open={open}
            value={value}
            items={reclamosList}
            setOpen={setOpen}
            onChangeValue={(value) => setValue(value as string)}
            setValue={setValue}
            setItems={setReclamosList}
            style={{ marginVertical: 8 }}
          />

          <Button
            title="Enviar reclamo"
            onPress={() => {
              enviarReclamo();
            }}
          />
          <View style={{ height: 8 }} />
          <Button
            title={"Cancelar"}
            onPress={() => setState({ ...state, showModal: false })}
          />
        </View>
      </Modal>

      {!state.isError && !state.isEmpty && (
        <FlatList
          data={state.compras}
          renderItem={(compra) => (
            <Compra
              item={compra.item as DtCompraSlimComprador}
              onIniciarReclamo={(idCompra) =>
                setState({ ...state, idCompra: idCompra, showModal: true })
              }
            />
          )}
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
