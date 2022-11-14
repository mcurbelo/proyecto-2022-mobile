import React from "react";
import { View, Text, Image } from "react-native";
import { Checkbox, RadioButton } from "react-native-paper";
import { DtTarjeta } from "../tmp/CardsService";

type CreditCardViewProps = {
  card: DtTarjeta;
  isSelected: boolean;
  onSelect: () => void;
};

const CreditCardView = (props: CreditCardViewProps) => {
  return (
    <View
      style={{
        width: "100%",
        height: 80,
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "flex-start",
      }}
      onTouchEnd={() => {
        props.onSelect();
      }}
    >
      <RadioButton
        status={props.isSelected ? "checked" : "unchecked"}
        value=""
      />
      <Image
        source={{ uri: props.card.imageUrl }}
        style={{ width: 40, height: 40 }}
        resizeMode="contain"
      />
      <View style={{ flexDirection: "column", paddingStart: 8 }}>
        <Text style={{ fontWeight: "bold" }}>
          &#x2022;&#x2022;&#x2022;&#x2022; &#x2022;&#x2022;&#x2022;&#x2022;
          &#x2022;&#x2022;&#x2022;&#x2022; {props.card.last4}
        </Text>
        <Text style={{ fontStyle: "italic" }}>{props.card.expiration}</Text>
      </View>
    </View>
  );
};

export default CreditCardView;
