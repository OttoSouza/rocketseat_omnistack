import React, { useEffect, useState } from "react";
import { View, FlatList, Image, Text, TouchableOpacity } from "react-native";
import imgLogo from "../../assets/logo.png";
import styles from "./styles";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import api from "../../services/api";
export default function Incidents() {
  // é tipo o history do reactjs
  const navegation = useNavigation();
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  function navegateToDetail(incident) {
    navegation.navigate("Detail", { incident });
  }

  async function loadIncidents() {
    if (loading) {
      return;
    }
    if (total > 0 && incidents.length === total) {
      return;
    }
    setLoading(true);
    const response = await api.get("incidents", {params: {page}});

    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers["x-total-count"]);
    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={imgLogo} />
        <Text style={styles.headerText}>
          Total de <Text style={styles.headerTextBold}>{total} casos</Text>
        </Text>
      </View>

      <Text style={styles.title}>Bem vindo!</Text>

      <Text style={styles.description}>Escolha um dos casos abaixos</Text>

      <FlatList
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        style={styles.incidentsList}
       // showsVerticalScrollIndicator={false}
        data={incidents}
        keyExtractor={incident => String(incident.id)}
        renderItem={({ item: incident }) => (
          <View style={styles.incidents}>
            <Text style={styles.incidentsProperty}>ONG:</Text>
            <Text style={styles.incidentsValue}>{incident.name}</Text>

            <Text style={styles.incidentsProperty}>Caso:</Text>
            <Text style={styles.incidentsValue}>{incident.title}a</Text>

            <Text style={styles.incidentsProperty}>Valor:</Text>
            <Text style={styles.incidentsValue}>
              {Intl.NumberFormat("pt-br", {
                style: "currency",
                currency: "BRL"
              }).format(incident.value)}
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navegateToDetail(incident)}
            >
              <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
              <Feather name="arrow-right" size={17} color="#e02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
