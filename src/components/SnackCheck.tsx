import { View, Text } from "react-native";
import React, { FC } from "react";
import { Snackbar } from "react-native-paper";
import PersonaRegistrar from "../Data/Persona";

interface Props {
  visible: boolean;
  setVisible: (b: boolean) => void;
  persona: PersonaRegistrar;
}
let tempOK = false;

const SnackCheck: FC<Props> = (props) => {
    // TODO: Dejo esto por ahora asi porque sino me distraigo con cosas innecesarias.
    // aca podria ir los checks de otras cosas que no sean passwd 
  if (!props.persona.validacion && !tempOK) {
    props.setVisible(true);
  }
  return (
    <View>
      <Snackbar
        visible={props.visible}
        onDismiss={() => props.setVisible(false)}
        action={{
          label: "OK",
          onPress: () => {
            // Do something
            props.setVisible(false);
            tempOK = true;
          },
        }}
      >
        Hey there! I'm a Snackbar.
      </Snackbar>
    </View>
  );
};
export default SnackCheck;
