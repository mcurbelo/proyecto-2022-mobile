import { View, Text } from "react-native";
import { Checkbox } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import { Direccion } from "../tmp/ProductService";
import { DtDireccion } from "../tmp/CompradorService";

type AddressItemProps = {
  address: Direccion | DtDireccion;
  onSelect: () => void;
};
const AddressItem = (props: AddressItemProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 1,
        borderWidth: 0.1,
        margin: 15,
        padding: 4
      }}
      onTouchEnd={() => props.onSelect()}
    >
      <FontAwesome name="home" size={25} />
      <Text>
        {props.address.calle} {props.address.numero}
      </Text>
      <Text> {props.address.localidad}</Text>
      <Text> {props.address.departamento}</Text>
    </View>
  );
};

export default AddressItem;
