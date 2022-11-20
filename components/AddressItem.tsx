import { View, Text, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Direccion } from "../tmp/ProductService";
import { DtDireccion, borrarDireccion } from "../tmp/CompradorService";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
type AddressItemProps = {
  address: Direccion | DtDireccion;
  onSelect?: () => void;
  editable?: boolean;
};
const AddressItem = (props: AddressItemProps) => {
  const deleteAddress = async (id: string) => {
    let token = await AsyncStorage.getItem("@token");
    if (!token) return;
    borrarDireccion(token, id)
      .then((response) => {
        Alert.alert("Exito!", "Su dirección se ha borrado de forma exitosa");
        nav.navigate("Root");
      })
      .catch((error) =>
        Alert.alert(
          "Errro!",
          "Ha ocurrido un error inesperado, por favor vuelva a intentarlo mas tarde"
        )
      );
  };

  const confirmationAlert = () => {
    Alert.alert("Alerta!", "Esta seguro que desea borrar esta dirección?", [
      {
        text: "Si",
        onPress: () => deleteAddress(props.address.id.toString()),
        style: "destructive",
      },
      {
        text: "No",
        // onPress: () => deleteAddress(props.address.id.toString()),
        style: "cancel",
      },
    ]);
  };
  const nav = useNavigation();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        elevation: 2,
        borderRadius: 3,
        marginHorizontal: 12,
        marginVertical: 8,
        padding: 12,
      }}
      onTouchEnd={() => {
        if (props.onSelect) props.onSelect();
      }}
    >
      <FontAwesome name="home" size={25} />
      <View style={{ marginLeft: 20 }}>
        <Text>
          {props.address.calle} {props.address.numero}
        </Text>
        <Text> {props.address.localidad}</Text>
        <Text> {props.address.departamento}</Text>
      </View>
      <FontAwesome
        name="trash"
        size={16}
        style={{ marginLeft: "auto" }}
        onPress={() => {
          confirmationAlert();
        }}
      />
      {props.editable && (
        <FontAwesome
          onPress={() => {
            nav.navigate("AddAddress", { edit: props.address });
          }}
          name="pencil"
          size={16}
          style={{
            marginLeft: 16,
          }}
        />
      )}
    </View>
  );
};

export default AddressItem;
