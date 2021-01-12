import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, StyleSheet, Text, View, Linking } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { confirmDelivery } from "../api";
import Header from "../Header";
import OrderCard from "../OrderCard";
import { Order } from "../types";

type Props = {
  route: {
    params: {
      order: Order;
    };
  };
};

function OrderDetails({ route }: Props) {
  const { order } = route.params;
  const navigation = useNavigation();

  const handleOnCancel = () => {
    navigation.navigate("Orders");
  };

  const handleConfirmDelivey = () => {
    confirmDelivery(order.id)
      .then(() => {
        Alert.alert(`Pedido ${order.id} confirmado com sucesso!!!`);
        navigation.navigate("Orders");
      })
      .catch(() => {
        Alert.alert(`Houve um erro ao confirmar o pedido ${order.id}!`);
      });
  };

  const handleStartNavigation = () => {
    Linking.openURL(`https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${order.latitude},${order.longitude}`);
  };

  return (
    <>
      <Header />
      <View style={styles.container}>
        <OrderCard order={order} />
        <RectButton style={styles.button} onPress={handleStartNavigation}>
          <Text style={styles.buttonText}>INICIAR NAVEGAÇÃO</Text>
        </RectButton>
        <RectButton style={styles.button} onPress={handleConfirmDelivey}>
          <Text style={styles.buttonText}>CONFIRMAR ENTREGA</Text>
        </RectButton>
        <RectButton style={styles.button}>
          <Text style={styles.buttonText} onPress={handleOnCancel}>
            CANCELAR PEDIDO
          </Text>
        </RectButton>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingRight: "5%",
    paddingLeft: "5%",
  },
  button: {
    backgroundColor: "#048ddd",
    flexDirection: "row",
    borderRadius: 10,
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 50,
    paddingRight: 50,
    fontWeight: "bold",
    fontSize: 18,
    color: "#FFF",
    letterSpacing: -0.24,
    fontFamily: "OpenSans_700Bold",
  },
});

export default OrderDetails;