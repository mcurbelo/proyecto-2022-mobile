import axios from "axios";
import { ip } from "./UserService";

const axiosConfig = (token: string) => {
  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
};

export const agregarTarjeta = (request: CreditCardRequest): Promise<any> => {
  return axios.post(
    `${ip}/api/usuarios/${request.uuid}/tarjetas`,
    request,
    axiosConfig(request.token)
  );
};

export const fetchTarjetas = (
  request: BasicRequestData
): Promise<DtTarjeta[]> => {
  return axios
    .get(
      `${ip}/api/usuarios/${request.uuid}/tarjetas`,
      axiosConfig(request.token)
    )
    .then((result) => result.data);
};

export type DtTarjeta = {
  id: string;
  last4: string;
  imageUrl: string;
  expiration: string;
};
type BasicRequestData = {
  token: string;
  uuid: string;
};
type CreditCardRequest = BasicRequestData & {
  cardNumber: string;
  cardCvv: string;
  cardExpiration: string;
};
