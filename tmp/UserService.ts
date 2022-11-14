import axios from "axios";
export const ip = "http://10.0.2.2:8080";

export const iniciarSesion = (
  email: string,
  password: string
): Promise<IniciarSesionResponse> => {
  return axios
    .post(`${ip}/api/auth/iniciarSesion`, {
      correo: email,
      password: password,
    })
    .then((response) => {
      return {
        success: true,
        token: response.data["jwt-token"] as string,
        uuid: response.data.uuid,
      };
    })
    .catch((error) => {
      console.log(JSON.stringify(error));
      return { success: false };
    });
};

export const registrarUsuario = (
  datos: RegistrarUsuarioRequest
): Promise<IniciarSesionResponse> => {
  return axios
    .post(`${ip}/api/auth/registrarse`, datos)
    .then((response) => {
      if (response.data.success) {
        return {
          success: true,
          token: response.data.token as string,
          uuid: response.data.uuid as string,
        };
      } else {
        return {
          success: false,
          error: response.data.errorMessage as string,
        };
      }
    })
    .catch((error) => {
      return { success: false };
    });
};

export const recuperarContrasena = (correo: string): Promise<String> => {
  return axios
    .put(`${ip}/api/auth/recuperarContrasena?correo=${correo}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data.message;
    });
};

export const reiniciarContrasena = (
  tokenReset: string,
  nuevaContrasena: string
): Promise<String> => {
  return axios
    .put(
      `${ip}/api/auth/reiniciarContrasena?token=${tokenReset}&contrasena${nuevaContrasena}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data.message;
    });
};

export const obtenerInformacion = (
  uuid: string
): Promise<InfoUsuarioResponse> => {
  return axios
    .get(`${ip}/api/usuarios/` + uuid + `/infoUsuario`)
    .then((response) => {
      return {
        nombre: response.data.nombre,
        apellido: response.data.apellido,
        correo: response.data.correo,
        telefono: response.data.telefono,
        imagen: response.data.imagen.data,
        datosVendedor: response.data.datosVendedor,
        calificacion: response.data.calificacion,
      };
    })
    .catch((error) => {
      return { success: false };
    });
};

export const updateUser = (datos: UpdateInfo): Promise<UpdateResponse> => {
  return axios
    .put(`${ip}/api/usuarios/` + datos.uuid + `/infoBasica`, {
      apellido: datos.apellido,
      correo: datos.correo,
      nombre: datos.nombre,
      telefono: datos.telefono,
      imagen: {
        data: datos.imagen.data,
      },
    })
    .then((response) => {
      return {
        success: true,
      };
    })
    .catch((error) => {
      return { success: false };
    });
};

export type RegistrarUsuarioRequest = {
  apellido: string;
  correo: string;
  nombre: string;
  password: string;
  telefono: string;
  fechaNac: string;
};

export type InfoUsuarioResponse = {
  success?: boolean;
  apellido?: string;
  correo?: string;
  nombre?: string;
  telefono?: string;
  imagen?: string;
  datosVendedor?: any;
  calificacion?: number;
};

export type IniciarSesionResponse = {
  success: boolean;
  token?: string;
  uuid?: string;
  error?: string;
};

export type UpdateResponse = {
  success: boolean;
  message?: string;
};

export type UpdateInfo = {
  uuid: string;
  correo?: string;
  nombre?: string;
  apellido?: string;
  telefono?: string;
  imagen: {
    data: string;
    nombre?: string;
    tamaño?: 0;
    formato?: string;
  };
};
