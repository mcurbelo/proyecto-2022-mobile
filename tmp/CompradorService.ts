import axios from "axios";
import { ip } from "./UserService";
// import { DtAltaProducto, DtFiltoReclamo, EstadoCompra, listados, TipoReclamo } from "./VendedorService"

// export const enviarSolicitudVendedor = (solicitud: Dtsolicitud, imagenes: File[], token: String): Promise<String> => {
//     const json = JSON.stringify(solicitud);
//     const blob = new Blob([json], {
//         type: 'application/json'
//     });
//     const data = new FormData();
//     data.append("datos", blob);
//     imagenes.forEach((imagen: File) => {
//         data.append("imagenes", imagen);
//     })
//     return axios.post(`${ip}/api/compradores/solicitudVendedor`, data, {
//         headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`
//         },
//     })
// }

export const agregarDireccion = (
  token: string,
  direccion: DtDireccion
): Promise<{ success: boolean }> => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return axios
    .post(
      `${ip}/api/compradores/agregarDireccion`,
      {
        calle: direccion.calle,
        numero: direccion.numero,
        departamento: direccion.departamento,
        localidad: direccion.localidad,
        notas: direccion.notas,
        esLocal: direccion.esLocal,
      },
      config
    )
    .then((response) => {
      return { success: true };
    })
    .catch((error) => {
      return { success: false };
    });
};

export const editarDireccion = (
  token: string,
  direccion: DtDireccion
): Promise<{ status: number }> => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  return axios
    .patch(
      `${ip}/api/compradores/Direcciones`,
      {
        id: direccion.id,
        calle: direccion.calle,
        numero: direccion.numero,
        departamento: direccion.departamento,
        localidad: direccion.localidad,
        notas: direccion.notas,
        esLocal: direccion.esLocal,
      },
      config
    )
    .then((response) => {
      return {
        status: response.status,
      };
    })
    .catch((error) => {
      return {
        status: error.response.data.status,
      };
    });
};

export const obtenerDirecciones = (token: string): Promise<DtDireccion[]> => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  return axios
    .get(`${ip}/api/compradores/Direcciones`, config)
    .then((response) => {
      return response.data;
    });
};

export const nuevaCompra = (
  idUsuario: string,
  token: string,
  datos: DtCompra
): Promise<any> => {
  return axios.post(`${ip}/api/compradores/${idUsuario}/compras`, datos, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// export const listarCompras = (idUsuario: string, token: string, pageNo: string, pageSize: string, sortBy: string, sortDir: string, filtros: DtFiltrosCompras): Promise<listados> => {
//     const searchParams = new URLSearchParams();
//     if (pageNo != "") searchParams.append("pageNo", pageNo);
//     if (pageSize != "") searchParams.append("pageSize", pageSize);
//     if (sortBy != "") searchParams.append("sortBy", sortBy);
//     if (sortDir != "") searchParams.append("sortDir", sortDir);
//     if (filtros.nombreProducto != undefined) searchParams.append("nombreProducto", filtros.nombreProducto);
//     if (filtros.nombreVendedor != undefined) searchParams.append("nombreVendedor", filtros.nombreVendedor);
//     if (filtros.fecha != undefined) searchParams.append("fecha", filtros.fecha);
//     if (filtros.estado != undefined) searchParams.append("estado", filtros.estado.toString());
//     return axios.get(`${ip}/api/compradores/${idUsuario}/compras?${searchParams.toString()}`, {
//     }).then((response) => {
//         return response.data;
//     })
//         .catch((error) => {
//             return error.response.data.message;
//         })
// }

// export const reclamosHechos = (idUsuario: string, token: string, pageNo: string, pageSize: string, sortBy: string, sortDir: string, filtros: DtFiltoReclamo): Promise<listados> => {
//     const searchParams = new URLSearchParams();
//     if (pageNo != "") searchParams.append("pageNo", pageNo);
//     if (pageSize != "") searchParams.append("pageSize", pageSize);
//     if (sortBy != "") searchParams.append("sortBy", sortBy);
//     if (sortDir != "") searchParams.append("sortDir", sortDir);
//     if (filtros.resolucion != undefined) searchParams.append("resolucion", filtros.resolucion.toString());
//     if (filtros.tipo != undefined) searchParams.append("tipo", filtros.tipo.toString());
//     if (filtros.fecha != undefined) searchParams.append("fecha", filtros.fecha);
//     if (filtros.nombreProducto != undefined) searchParams.append("nombreProducto", filtros.nombreProducto);
//     if (filtros.nombreUsuario != undefined) searchParams.append("nombreUsuario", filtros.nombreUsuario);
//     return axios.get(`${ip}/api/compradores/${idUsuario}/compras/reclamos?${searchParams.toString()}`, {
//     }).then((response) => {
//         return response.data;
//     })
//         .catch((error) => {
//             return error.response.data.message;
//         })
// }

// export const nuevoReclamo = (idUsuario: string, token: string, idCompra: string, datos: DtAltaReclamo): Promise<String> => {
//     return axios.post(`${ip}/api/compradores/${idUsuario}/compras/${idCompra}/reclamos`, datos, {
//     }).then((response) => {
//         return response.status.toString();
//     })
//         .catch((error) => {
//             return error.response.data.message;
//         })
// }

// export const marcarReclamoResuelto = (idUsuario: string, token: string, idCompra: string, idReclamo: string): Promise<String> => {
//     return axios.put(`${ip}/api/compradores/${idUsuario}/compras/${idCompra}/reclamos/${idReclamo}`, {
//     }).then((response) => {
//         return response.status.toString();
//     })
//         .catch((error) => {
//             return error.response.data.message;
//         })
// }

// export const obtenerChat = (idcompra: string): Promise<String> => {
//     return axios.get(`${ip}/api/compras/chat/${idcompra}`).then((response) =>{
//         return response.data;
//     }).catch((error)=>{});
// }

// export const iniciarChat = (idcompra: string, idchat: string): Promise<String> => {
//     return axios.post(`${ip}/api/compras/iniciarChat`, {idCompra: idcompra, idChat: idchat}).then((response) =>{
//         return response.data;
//     }).catch((error)=>{});
// }

export type DtCompra = {
  idVendedor: string;
  idProducto: string;
  cantidad: number;
  codigoCanje?: string;
  idTarjeta: string;
  esParaEnvio: boolean;
  idDireccionEnvio?: number;
  idDireccionLocal?: number;
};

type DtChat = {
  idCompra?: string;
  idChat?: string;
};
// type Dtsolicitud = {
//     nombreEmpresa?: string
//     rut?: string
//     telefonoEmpresa?: string
//     producto: DtAltaProducto,
//     idDireccion: string
// }

export type DtDireccion = {
  id?: string;
  calle: string;
  numero: number;
  departamento: string;
  localidad: string;
  notas: string;
  esLocal: boolean;
};

// export type DtFiltrosCompras = {
//     fecha?: string,
//     nombreVendedor?: string,
//     nombreProducto?: string,
//     estado?: EstadoCompra
// }

// export type DtAltaReclamo = {
//     descripcion: string,
//     tipo: TipoReclamo,
// }
