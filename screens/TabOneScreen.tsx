import { FlatList, StyleSheet } from "react-native";

import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";

import { DtProductoSlim, listarProductos } from "../tmp/ProductService";
import Producto from "../components/Producto";
import { useEffect, useState } from "react";

const image =
  "https://firebasestorage.googleapis.com/v0/b/shopnowproyecto2022.appspot.com/o/ac391c60-5e0b-4e07-b9e4-a07612708150--img0?alt=media";
export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const [productos, setProdutcos] = useState([] as DtProductoSlim[]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    listarProductos("0").then((response) => {
      setProdutcos(response.productos!);
      setIsLoading(false);
    });
  }, []);

  return (
    <View style={{ height: "100%", backgroundColor: "#f9f9f9" }}>
      {!isLoading && (
        <FlatList
          onRefresh={() => {}}
          refreshing={false}
          data={productos}
          renderItem={(item) => (
            <Producto
              producto={item.item}
              onTouch={() => {
                navigation.push("ProductDetailsScreen", {
                  productId: item.item.idProducto,
                });
              }}
            />
          )}
          keyExtractor={(item) => item.idProducto}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
