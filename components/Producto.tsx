import { Image, SafeAreaView, Text, View } from "react-native";
import { DtProductoSlim } from "../tmp/ProductService";

type ProductoProps = {
  producto: DtProductoSlim;
  onTouch: () => void;
};

export function Producto(props: ProductoProps) {
  return (
    <SafeAreaView
      style={{
        margin: 8,
        padding: 8,
        borderColor: "#000000",
        borderWidth: 0.5,
        borderRadius: 4,
      }}
      onTouchEnd={() => {
        props.onTouch();
      }}
    >
      <Image
        source={{ uri: props.producto.imagen }}
        style={{ width: "100%", height: 200 }}
        resizeMode="center"
      />
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontWeight: "bold", paddingEnd: 15 }}>
          {props.producto.nombre}
        </Text>
        <Text style={{ fontWeight: "bold" }}>${props.producto.precio}</Text>
      </View>
    </SafeAreaView>
  );
}

export default Producto;
