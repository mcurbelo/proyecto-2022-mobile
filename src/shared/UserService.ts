import axios from "axios"


export const iniciarSesion = (email: string, password: string) : Promise<IniciarSesionResponse> => {
  return axios.post(`http://10.0.2.2:8080/api/auth/iniciarSesion`, {
    correo: email,
    password: password
  }).then((response) => {
    return {
      success: true,
      token: (response.data['jwt-token'] as string),
      uuid: (response.data.uuid)
    }
  })
  .catch((error) => {
    return {success: false}
  })
}

export const registrarUsuario = (datos: RegistrarUsuarioRequest) : Promise<IniciarSesionResponse> => {
  return axios.post(`http://10.0.2.2:8080/api/auth/registrarse`, datos)
    .then((response) => {
      
      if(response.data.success) {
        return {
          success: true,
          token: (response.data.token as string),
          uuid: (response.data.uuid as string)
        }
      } else {
        return {
          success: false,
          error: (response.data.errorMessage as string)
        }
      }
      
    })
    .catch((error) => {
      return {success: false}
    })
}

export const recuperarContrasena = (correo: string): Promise<String> => {
  return axios.put(`http:// 172.29.128.1:8080/api/auth/recuperarContrasena?correo=${correo}`).then((response) => {
      return response.data;
  })
      .catch((error) => {
          return error.response.data.message;
      })
}

export const reiniciarContrasena = (tokenReset: string, nuevaContrasena: string): Promise<String> => {
  return axios.put(`http:// 172.29.128.1:8080/api/auth/reiniciarContrasena?token=${tokenReset}&contrasena${nuevaContrasena}`).then((response) => {
      return response.data;
  })
      .catch((error) => {
          return error.response.data.message;
      })
}

export const obtenerInformacion = (uuid: string) : Promise<InfoUsuarioResponse> => {
  return axios.get(`http:// 172.29.128.1:8080/api/usuarios/`+ uuid +`/infoUsuario`).then((response) => {
    return {
      nombre: response.data.nombre,
      apellido: response.data.apellido,
      correo: response.data.correo,
      telefono: response.data.telefono,
      imagen: response.data.imagen.data,
      datosVendedor: response.data.datosVendedor,
      calificacion: response.data.calificacion
    }
  })
  .catch((error) => {
    return {success: false}
  })
}


export const updateUser = (datos: UpdateInfo) : Promise<UpdateResponse> => {
  return axios.put(`http:// 172.29.128.1:8080/api/usuarios/`+ datos.uuid +`/infoBasica`, 
    {
      "apellido": datos.apellido,
      "correo": datos.correo,
      "nombre": datos.nombre,
      "telefono": datos.telefono,
      "imagen": {
        "data": datos.imagen.data
      }
  })
  .then((response) => {
    return {
      success: true
    }
  })
  .catch((error) => {
    return {success: false}
  })


}


type RegistrarUsuarioRequest = {
  apellido: string;
  correo: string;
  nombre: string;
  password: string;
  telefono: string;
  fechaNac: string;
}

type InfoUsuarioResponse = {
  success?: boolean;
  apellido?: string;
  correo?: string;
  nombre?: string;
  telefono?: string;
  imagen?: string;
  datosVendedor?: any;
  calificacion?: number;
}

type IniciarSesionResponse = {
  success: boolean;
  token?: string;
  uuid?: string;
  error?: string;
}

type UpdateResponse = {
  success: boolean;
  message?: string;
}

type UpdateInfo = {
    uuid: string,
    correo?: string,
    nombre?: string,
    apellido?: string,
    telefono?: string,
    imagen: {
      data: string,
      nombre?: string,
      tamaño?: 0,
      formato?: string
    }
}