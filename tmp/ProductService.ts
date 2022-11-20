import axios from "axios";
import { DtDireccion } from "./CompradorService";
import { ip } from "./UserService";

export const listarProductos = (
  pageNo: string,
  pageSize?: string,
  sortBy?: string,
  sortDir?: string,
  filtros?: DtFiltros
): Promise<listados> => {
  const searchParams = new URLSearchParams();
  if (pageNo) searchParams.append("pageNo", pageNo);
  if (pageSize) searchParams.append("pageSize", pageSize);
  if (sortBy) searchParams.append("sortBy", sortBy);
  if (sortDir) searchParams.append("sortDir", sortDir);
  if (filtros?.categorias && filtros.categorias?.length > 0) {
    filtros.categorias.forEach((categoria) =>
      searchParams.append("categorias", categoria)
    );
  }
  if (filtros?.nombre) searchParams.append("nombre", filtros.nombre);
  if (filtros?.idEventoPromocional)
    searchParams.append("idEventoPromocional", filtros.idEventoPromocional);
  if (filtros?.recibirInfoEventoActivo)
    searchParams.append("infoEventoActivo", "true");
  let url = `${ip}/api/productos?${searchParams.toString()}`;
  return axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (!error.response) return "Error de conexion";
      else return error.response.data.message;
    });
};

export const infoProducto = (idProducto: string): Promise<DtProducto> => {
  return axios
    .get(`${ip}/api/productos/${idProducto}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data.message;
    });
};

export type DtProducto = {
  idProducto: string;
  idVendedor: string;
  imagenes: string[];
  nombre: string;
  descripcion: string;
  precio: number;
  permiteEnvio: boolean;
  comentarios: Comentario[]; //Revisar cuando se haga el tema de los comentarios
  nombreVendedor: string;
  calificacion: number;
  imagenDePerfil: string;
  localesParaRetiro: Direccion[] | DtDireccion[];
  stock: number;
  garantia: number;
};

export type Direccion = {
  id: number;
  calle: string;
  numero: string;
  departamento: string;
  localidad: string;
  notas: string;
};

export type Comentario = {
  id: string;
  comentario: string;
  fecha: Date; //No se
  nombreAutor: string;
  respuestas?: Comentario[];
};

export type DtFiltros = {
  recibirInfoEventoActivo?: boolean;
  nombre?: string;
  categorias?: string[];
  idEventoPromocional?: string;
};

export type listados = {
  misProductos?: DtMiProducto[];
  ventas?: DtCompraSlimVendedor[];
  reclamos?: DtReclamo[];
  productos?: DtProductoSlim[];
  compras?: DtCompraSlimComprador[];
  usuarios?: DtUsuarioSlim[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
};

export type DtMiProducto = {
  idProducto: string;
  nombre: string;
  imagenes: string[];
  fechaInicio: string;
  fechaFin: string;
  categorias: string[];
  precio: number;
  stock: number;
  estado: EstadoProducto;
  descripcion: string;
  permiteEnvio: boolean;
};

export enum EstadoProducto {
  Activo = "Activo",
  Pausado = "Pausado",
  BloqueadoADM = "BloqueadoADM",
}

export type DtCompraSlimVendedor = {
  idVenta: string;
  idComprador: string;
  nombreComprador: string;
  nombreProducto: string;
  cantidad: number;
  fecha: Date;
  estadoCompra: EstadoCompra;
  montoTotal: number;
  montoUnitario: number;
  imagenURL: string;
  fechaEntrega?: string;
  puedeCalificar: boolean;
  puedeCompletar: boolean;
  esEnvio: boolean;
  direccionEntrega: string;
  calificacionComprador: number;
};

export enum EstadoCompra {
  Cancelada = "Cancelada",
  Completada = "Completada",
  Confirmada = "Confirmada",
  EsperandoConfirmacion = "EsperandoConfirmacion",
  Devolucion = "Devolucion",
}

export type DtReclamo = {
  datosCompra: DtInfoCompra;
  tipo: TipoReclamo;
  estado: TipoResolucion;
  fechaRealizado: Date;
  autor: string;
  idReclamo: string;
  descripcion: string;
};

export type DtInfoCompra = {
  idCompra: string;
  idVendedor: string;
  nombreVendedor: string;
  nombreProducto: string;
  cantidad: number;
  fecha: Date;
  estadoCompra: EstadoCompra;
  montoTotal: number;
  montoUnitario: number;
  fechaEntrega: string;
  direccionEntrega: string;
  esEnvio: boolean;
  avatarVendedor: string;
  avatarComprador: string;
  imagenProducto: string;
};

export enum TipoReclamo {
  DesperfectoProducto = "DesperfectoProducto",
  RepticionIncoveniente = "RepticionIncoveniente",
  ProductoNoRecibido = "ProductoNoRecibido",
  ProducoErroneo = "ProducoErroneo",
  Otro = "Otro",
}

export enum TipoResolucion {
  Devolucion = "Devolucion",
  PorChat = "PorChat",
  NoResuelto = "NoResuelto",
}

export type DtProductoSlim = {
  idProducto: string;
  nombre: string;
  imagen: string;
  precio: number;
  stock: number;
  permiteEnvio: boolean;
};

export type DtCompraSlimComprador = {
  idCompra: string;
  idVendedor: string;
  nombreVendedor: string;
  nombreProducto: string;
  cantidad: number;
  fecha: Date;
  estadoCompra: EstadoCompra;
  montoTotal: number;
  montoUnitario: number;
  imagenURL: string;
  esEnvio: boolean;
  puedeCompletar: boolean;
  puedeCalificar: boolean;
  puedeReclamar: boolean;
  fechaEntrega?: Date;
  direccionEntrega: string;
  garantiaActiva: boolean;
};

export type DtUsuarioSlim = {
  id: string;
  correo: string;
  nombre: string;
  apellido: string;
  estadoUsuario: string;
};
