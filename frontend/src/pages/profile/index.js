import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import logoimg from "../../assets/logo.svg";
import "./styles.css";
import api from "../services/api";

export default function Profile() {
  const ongName = localStorage.getItem("ongName");
  const ongId = localStorage.getItem("ongId");
  const [incidents, setIncidents] = useState([]);
  const history = useHistory();
  useEffect(() => {
    api
      .get("profile", {
        headers: {
          Authorization: ongId
        }
      })
      .then(response => {
        setIncidents(response.data);
      });
  }, [ongId]);

  async function handleDeleteIncident(id) {
    await api
      .delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      })
      .then(response => {
        alert("Caso Deletado com sucesso");
        setIncidents(incidents.filter(incidents => incidents.id !== id));
      })
      .catch(err => {
        alert("Erro ao deletar caso");
      });
  }

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoimg} alt="logo"></img>
        <span>Bem vindo, {ongName}</span>
        <Link className="button" to="incidents/new">
          Cadastrar Novo Caso
        </Link>
        <button onClick={handleLogout} type="submit">
          {<FiPower size={18} color="#e02041" />}
        </button>
      </header>

      <h1>Casos Cadastrados</h1>
      <ul>
        {incidents.map(incident => (
          <li key={incident.id}>
            <strong>Caso: </strong>
            <p>{incident.title}</p>

            <strong>Descrição: </strong>
            <p>{incident.description}</p>

            <strong>Valor: </strong>
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(incident.value)}
            </p>
            <button
              type="button"
              onClick={() => handleDeleteIncident(incident.id)}
            >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
