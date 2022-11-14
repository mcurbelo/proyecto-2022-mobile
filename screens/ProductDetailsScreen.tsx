import { RootStackScreenProps } from "../types";
import { FlatList, SafeAreaView, Text, Image, View } from "react-native";
import { useEffect, useState } from "react";
import { infoProducto, DtProducto } from "../tmp/ProductService";
import { FontAwesome } from "@expo/vector-icons";

type ProductDetailsState = {
  isLoading: boolean;
  product: DtProducto;
};
const ProductDetailsScreen = ({
  navigation,
  route,
}: RootStackScreenProps<"ProductDetailsScreen">) => {
  const [state, setState] = useState({
    isLoading: true,
    product: {},
  } as ProductDetailsState);

  const separator = () => (
    <View
      style={{
        borderBottomColor: "black",
        borderBottomWidth: 0.2,
        marginVertical: 8,
      }}
    />
  );
  useEffect(() => {
    infoProducto(route.params.productId)
      .then((product) => {
        setState({ isLoading: false, product: product });
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  }, []);
  return (
    <SafeAreaView
      style={{
        width: "100%",
        height: "100%",
        padding: 15,
        flexDirection: "column",
      }}
    >
      {!state.isLoading && (
        <View>
          <View style={{ height: 250 }}>
            <FlatList
              data={state.product.imagenes}
              horizontal={true}
              showsHorizontalScrollIndicator={true}
              renderItem={(item) => (
                <Image
                  source={{ uri: item.item }}
                  resizeMode="center"
                  style={{
                    width: 260,
                    borderWidth: 0.5,
                    borderColor: "#000000",
                    resizeMode: "center",
                    marginEnd: 8,
                  }}
                />
              )}
              keyExtractor={(item) => item}
            />
          </View>
          {separator()}
          <View style={{ flexDirection: "row" }}>
            <Text>Vendedor: </Text>
            <Text style={{ fontWeight: "bold" }}>
              {state.product.nombreVendedor}
            </Text>
          </View>
          {separator()}
          <View style={{ flexDirection: "row" }}>
            <Text>Garantía: </Text>
            <Text style={{ fontWeight: "bold" }}>
              {state.product.garantia}{" "}
              {state.product.garantia != 1 ? "días" : "día"}
            </Text>
          </View>
          {separator()}
        </View>
      )}

      <FontAwesome.Button
        name="shopping-cart"
        onTouchEnd={() =>
          navigation.navigate("SelectCard", {
            productId: state.product.idProducto,
            canDelivery: state.product.permiteEnvio
          })
        }
      >
        Comprar
      </FontAwesome.Button>
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;
