import axios from "axios";
import { ip } from "./UserService";

export const calificar = (
  idCompra: string,
  token: string,
  datos: DtCalificacion
): Promise<String> => {
  return axios
    .post(`${ip}/api/compras/calificaciones/${idCompra}`, datos, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    // .then((response) => {
    //   return response.status.toString();
    // })
    // .catch((error) => {
    //   return error.response.data.message;
    // });
};

export type DtCalificacion = {
  puntuacion: number;
  comentario: string;
  autor: string;
};
