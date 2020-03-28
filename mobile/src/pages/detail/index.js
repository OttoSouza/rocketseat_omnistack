import React from "react";
import { View, TouchableOpacity, Image, Text, Linking } from "react-native";

import * as MailComposer from "expo-mail-composer";

import imgLogo from "../../assets/logo.png";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import styles from "./styles";
export default function Detail() {
  const navegation = useNavigation();
  const route = useRoute();
  const incident = route.params.incident;

  const message = `Olá ${
    incident.name
  }, estou entrando em contato pois gostaria de ajudar no caso ${
    incident.title
  } com o valor de ${Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL"
  }).format(incident.value)}`;

  function navegateToIncidents() {
    navegation.goBack();
  }

  function sendMail() {
    MailComposer.composeAsync({
      //o assunnto que quero enviar   ;
      subject: `Heroi do caso:${incident.title}`,
      // para quem deseja enviar;
      recipients: [incident.email],
      // qual a mensagem que deseja enviar;
      body: message
    });
  }
  function sendWhatsApp() {
    //deeplink
    Linking.openURL(
      `whatsapp://send?phone=${incident.whatsapp}&text=${message}`
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={imgLogo} />
        <TouchableOpacity onPress={navegateToIncidents}>
          <Feather name="arrow-left" size={18} color="#e82041" />
        </TouchableOpacity>
      </View>

      <View style={styles.incidents}>
        <Text style={[styles.incidentsProperty, { marginTop: 0 }]}>ONG:</Text>
        <Text style={styles.incidentsValue}>
          {incident.name} de {incident.city}/{incident.uf}
        </Text>

        <Text style={styles.incidentsProperty}>Caso:</Text>
        <Text style={styles.incidentsValue}>{incident.title}</Text>

        <Text style={styles.incidentsProperty}>Valor:</Text>
        <Text style={styles.incidentsValue}>
          {Intl.NumberFormat("pt-br", {
            style: "currency",
            currency: "BRL"
          }).format(incident.value)}
        </Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o Dia</Text>
        <Text style={styles.heroTitle}>Be the hero</Text>

        <Text style={styles.heroDescription}>Entre em contato: </Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>e-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
