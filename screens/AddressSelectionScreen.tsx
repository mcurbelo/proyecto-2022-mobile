import { Button, FlatList, useWindowDimensions, Text } from "react-native";
import { CheckoutFlowStack } from "../types";
import { TabView, SceneMap } from "react-native-tab-view";
import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { Direccion, infoProducto } from "../tmp/ProductService";
import AddressItem from "../components/AddressItem";
import { DtDireccion, obtenerDirecciones } from "../tmp/CompradorService";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AddressSelectionState = {
  isDelivery: boolean;
  pickupAddresses: Direccion[];
  deliveryAddresses: DtDireccion[];
  selectedAddress: Direccion | DtDireccion;
};

const AddressSelectionScreen = ({
  navigation,
  route,
}: CheckoutFlowStack<"AddressSelection">) => {
  const [state, setState] = useState({} as AddressSelectionState);
  const [index, setIndex] = React.useState(0);
  useEffect(() => {
    infoProducto(route.params.productId).then(async (result) => {
      let token = await AsyncStorage.getItem("@token");
      let uuid = await AsyncStorage.getItem("@uuid");
      if (!token || !uuid) return;
      debugger;
      obtenerDirecciones(token)
        .then((response) => {
          setState({
            ...state,
            deliveryAddresses: response,
            pickupAddresses: result.localesParaRetiro,
          });
        })
        .catch((error) => {});
    });
  }, []);

  useEffect(() => {}, []);
  const FirstRoute = () => {
    return (
      <>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Direcciones de Envío
        </Text>
        <FlatList
          data={state.deliveryAddresses}
          renderItem={(item) => {
            return (
              <AddressItem
                address={item.item}
                onSelect={() => {
                  setState({
                    ...state,
                    selectedAddress: item.item,
                    isDelivery: true,
                  });
                }}
              />
            );
          }}
          keyExtractor={(item) => item.id!}
        />
      </>
    );
  };

  const SecondRoute = () => {
    return (
      <>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Direcciones de Retiro
        </Text>
        <FlatList
          data={state.pickupAddresses}
          renderItem={(item) => {
            return (
              <AddressItem
                address={item.item}
                onSelect={() => {
                  setState({
                    ...state,
                    selectedAddress: item.item,
                    isDelivery: false,
                  });
                }}
              />
            );
          }}
          keyExtractor={(item) => item.id.toString()}
        />
      </>
    );
  };

  const renderScene = route.params.canDelivery
    ? SceneMap({
        first: FirstRoute,
        second: SecondRoute,
      })
    : SceneMap({
        second: SecondRoute,
      });

  const layout = useWindowDimensions();

  const [routes] = route.params.canDelivery
    ? React.useState([
        { key: "first", title: "Envio" },
        { key: "second", title: "Retiro" },
      ])
    : React.useState([{ key: "second", title: "Retiro" }]);

  const onTabChange = (index: number) => {
    setIndex(index);
  };

  return (
    <>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={(index) => onTabChange(index)}
        initialLayout={{ width: layout.width }}
      />

      <View
        style={{
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 15 }}>
          Dirección seleccionada
        </Text>
        {state.isDelivery && state.selectedAddress && <Text>Envío a </Text>}
        {!state.isDelivery && state.selectedAddress && <Text>Retiro en </Text>}
        {state.selectedAddress && (
          <Text>
            {state.selectedAddress.calle} {state.selectedAddress.numero}{" "}
            {state.selectedAddress.localidad},{" "}
            {state.selectedAddress.departamento}
          </Text>
        )}
      </View>

      <View style={{ paddingBottom: 15 }}>
        <Button
          title="Siguiente"
          disabled={!state.selectedAddress}
          onPress={() => {
            navigation.navigate("ReviewOrder", {
              productId: route.params.productId,
              cardId: route.params.cardId,
              cardLast4: route.params.cardLast4,
              isDelivery: state.isDelivery,
              addressId: state.selectedAddress.id?.toString()!,
            });
          }}
        />
      </View>
    </>
  );
};

export default AddressSelectionScreen;
