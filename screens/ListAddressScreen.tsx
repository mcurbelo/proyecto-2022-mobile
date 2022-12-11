import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Button, FlatList, SafeAreaView, View } from "react-native";
import AddressItem from "../components/AddressItem";
import { DtDireccion, obtenerDirecciones } from "../tmp/CompradorService";

type ListAddressState = {
  isLoading: boolean;
  addresses: DtDireccion[];
  isError: boolean;
};
const ListAddressScreen = (props: any) => {
  const [state, setState] = useState({} as ListAddressState);
  const navigator = useNavigation();
  const fetchAddress = async () => {
    let token = await AsyncStorage.getItem("@token");
    if (!token) {
      setState({ ...state, isError: true, isLoading: false });
      return;
    }
    setState({ ...state, isLoading: true });
    obtenerDirecciones(token)
      .then((response) => {
        setState({ isLoading: false, isError: false, addresses: response.filter(item => !item.esLocal) });
      })
      .catch((error) => {
        setState({ ...state, isLoading: false, isError: true });
      });
  };

  useEffect(() => {
    fetchAddress();
  }, [props]);
  return (
    <SafeAreaView style={{ height: "100%", backgroundColor: "#FFFFFF" }}>
      <View style={{ width: "100%", height: "80%" }}>
        <FlatList
          data={state.addresses}
          renderItem={(item) => (
            <AddressItem address={item.item} editable={true} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

      <Button
        title="Agregar dirección"
        onPress={() => {
          navigator.navigate("AddAddress", {});
        }}
      />
    </SafeAreaView>
  );
};

export default ListAddressScreen;
