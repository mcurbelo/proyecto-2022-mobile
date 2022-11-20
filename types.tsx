/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DtDireccion } from "./tmp/CompradorService";
import { Direccion } from "./tmp/ProductService";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
    interface CheckoutParamList extends CheckoutFlowList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  LogOrSign: {
    token: string;
    setToken: (v: string) => void;
  };
  SignScreen: undefined;
  LoginScreen: {
    token: string;
    setToken: (v: string) => void;
  };
  ProductDetailsScreen: {
    productId: string;
  };
  SelectCard: { productId: string; canDelivery: boolean };
  AddCard: undefined;
  AddAddress: { edit?: DtDireccion | Direccion };
  ListAddress: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
  HomeScreen: {
    uuid: string;
    setUuid: (v: string) => void;
  };
  AddCard: undefined;
  AddAddress: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type PersonaRegistrar = {
  mail: string;
  nom: string;
  ape: string;
  tel: string;
  pass: string;
  rePass: string;
  validacion: boolean;
  fechaNac: string;
};

export type CheckoutFlowStack<Screen extends keyof CheckoutFlowList> =
  NativeStackScreenProps<CheckoutFlowList, Screen>;

export type CheckoutFlowList = {
  SelectCard: { productId: string; canDelivery: boolean };
  AddCard: undefined;
  ReviewOrder: {
    productId: string;
    cardLast4: string;
    cardId: string;
    isDelivery: boolean;
    addressId: string;
  };

  AddressSelection: {
    productId: string;
    cardId: string;
    cardLast4: string;
    canDelivery: boolean;
  };
  LoginScreen: undefined;
  Root: undefined;
};
