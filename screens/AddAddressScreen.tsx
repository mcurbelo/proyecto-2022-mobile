import React, { useEffect, useState } from "react";
import { Button, View, Text, Alert } from "react-native";
import { Provider, TextInput } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import {
  agregarDireccion,
  DtDireccion,
  editarDireccion,
} from "../tmp/CompradorService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

type AddAddressState = {
  id: string;
  calle: string;
  numero: string;
  localidad: string;
  notas: string;
  esLocal: boolean;
  esEdit: boolean;
};

const AddAddressScreen = (props: any) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [departmentList, setDepartmentList] = useState([
    { label: "Artigas", value: "Artigas" },
    { label: "Canelones", value: "Canelones" },
    { label: "Cerro Largo", value: "CerroLargo" },
    { label: "Colonia", value: "Colonia" },
    { label: "Durazno", value: "Durazno" },
    { label: "Florida", value: "Florida" },
    { label: "Flores", value: "Flores" },
    { label: "Salto", value: "Salto" },
    { label: "Rocha", value: "Rocha" },
    { label: "Rivera", value: "Rivera" },
    { label: "Rio Negro", value: "RioNegro" },
    { label: "Paysandu", value: "Paysandu" },
    { label: "Lavalleja", value: "Lavalleja" },
    { label: "Maldonado", value: "Maldonado" },
    { label: "Montevideo", value: "Montevideo" },
    { label: "Treinta y Tres", value: "TreintayTres" },
    { label: "Tacuarembo", value: "Tacuarembo" },
    { label: "Soriano", value: "Soriano" },
    { label: "San Jose", value: "SanJose" },
  ]);

  const [state, setState] = useState({} as AddAddressState);
  const navigator = useNavigation();

  useEffect(() => {
    let addrss = props.route.params.edit as DtDireccion;
    if (addrss) {
      setState({
        ...state,
        id: addrss.id,
        calle: addrss.calle,
        numero: addrss.numero.toString(),
        localidad: addrss.localidad,
        notas: addrss.notas,
        esEdit: true,
      });
      setValue(addrss.departamento);
    }
  }, [props]);

  const addAddress = async () => {
    let token = await AsyncStorage.getItem("@token");
    if (!token) return;
    if (!state.esEdit) {
      agregarDireccion(token, {
        id: "",
        calle: state.calle,
        numero: parseInt(state.numero),
        departamento: value,
        localidad: state.localidad,
        notas: "",
        esLocal: false,
      }).then((response) => {
        if (response.success) {
          SuccessDialog();
          navigator.navigate("Root");
        } else {
          ErrorDialog();
        }
      });
    } else {
      editarDireccion(token, {
        id: state.id,
        calle: state.calle,
        numero: parseInt(state.numero),
        departamento: value,
        localidad: state.localidad,
        notas: state.notas,
        esLocal: false,
      })
        .then(() => {
          SuccessDialog();
          navigator.navigate("Root");
        })
        .catch(() => ErrorDialog());
    }
  };

  const SuccessDialog = () => {
    Alert.alert("Exito", "Su dirección se ha guardado de manera correcta");
  };

  const ErrorDialog = () => {
    Alert.alert("Error", "Ha ocurrido un error. Por favor intente mas tarde");
  };

  return (
    <Provider>
      <View style={{ padding: 15 }}>
        <TextInput
          activeOutlineColor="#a8a7a7"
          value={state.calle}
          style={{ marginBottom: 8 }}
          mode="outlined"
          placeholder="18 de Julio"
          label={"Calle"}
          onChangeText={(e) => setState({ ...state, calle: e.valueOf() })}
        />
        <TextInput
          activeOutlineColor="#a8a7a7"
          value={state.numero}
          style={{ marginBottom: 8 }}
          mode="outlined"
          keyboardType="number-pad"
          label={"Numero"}
          placeholder="1423"
          onChangeText={(e) => setState({ ...state, numero: e.valueOf() })}
        />
        <TextInput
          activeOutlineColor="#a8a7a7"
          value={state.localidad}
          style={{ marginBottom: 8 }}
          mode="outlined"
          label={"Localidad"}
          placeholder="Montevideo"
          onChangeText={(e) => setState({ ...state, localidad: e.valueOf() })}
        />
        <DropDownPicker
          placeholder="Departamento"
          open={open}
          value={value}
          items={departmentList}
          setOpen={setOpen}
          onChangeValue={(value) => setValue(value as string)}
          setValue={setValue}
          setItems={setDepartmentList}
        />

        <View style={{ margin: 8 }} />

        <Button
          title={!state.esEdit ? "Agregar" : "Actualizar"}
          onPress={() => addAddress()}
        />
      </View>
    </Provider>
  );
};

export default AddAddressScreen;
