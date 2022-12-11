import { RootStackParamList, RootStackScreenProps } from "../types";
import { Alert, FlatList, Text } from "react-native";
import { useEffect, useState } from "react";
import { marcarReclamoResuelto, reclamosHechos } from "../tmp/CompradorService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Reclamo from "../components/Reclamo";
import { DtReclamo } from "../tmp/ProductService";
const MisReclamos = ({
  route,
  navigation,
}: RootStackScreenProps<"MisReclamos">) => {
  const [reclamos, setReclamos] = useState<DtReclamo[]>([]);
  useEffect(() => {
    fetchReclamos();
  }, []);

  const fetchReclamos = async () => {
    let token = await AsyncStorage.getItem("@token");
    let uuid = await AsyncStorage.getItem("@uuid");
    if (!token || !uuid) return;
    reclamosHechos(uuid, token, "0").then((response) => {
      setReclamos((response as any).data.reclamos);
    });
  };

  const resolverReclamo = async (idReclamo: string, idCompra: string) => {
    let token = await AsyncStorage.getItem("@token");
    let uuid = await AsyncStorage.getItem("@uuid");
    if (!token || !uuid) return;
    marcarReclamoResuelto(uuid, token, idCompra, idReclamo)
      .then((response) => {
        Alert.alert("Exito!", "Su reclamo ha sido resuelto de forma correcta!");
        navigation.pop();
      })
      .catch((error) => {
        Alert.alert(
          "Error!",
          "Ha ocurrido un error inesperado. Por favor intente mas tarde."
        );
      });
  };
  return (
    <>
      <FlatList
        ListEmptyComponent={
          <>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginHorizontal: 8,
              }}
            >
              Usted no ha realizado ningún reclamo {":)"}
            </Text>
          </>
        }
        data={reclamos}
        renderItem={(item) => (
          <Reclamo
            reclamo={item.item}
            onResolver={(idReclamo, idCompra) =>
              resolverReclamo(idReclamo, idCompra)
            }
          />
        )}
        keyExtractor={(item) => item.idReclamo}
      />
    </>
  );
};

export default MisReclamos;
