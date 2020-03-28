import React, { useState } from "react";
import "./styles.css";
import logoimg from "../../assets/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from "../services/api";
export default function NewIncident() {
  const [title, setTitle] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const ongId = localStorage.getItem("ongId");
  const history = useHistory();
  const handleSubmit = async event => {
    event.preventDefault();
    const data = { title, descricao, valor };
    await api
      .post("incidents", data, {
        headers: {
          Authorization: ongId
        }
      })
      .then(alert("Caso cadastrado com sucesso"), history.push("/profile"))
      .catch(err => alert("Erro ao cadastrar o caso"));
  };

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoimg} alt="logo"></img>
          <h1>Cadastrar novo caso</h1>
          <p> Descreva o caso detadalhadamnete para resolvermos;</p>
          <Link className="back-link" to="/profile">
            {" "}
            <FiArrowLeft size={16} color="#e02041" />
            voltar para home
          </Link>
        </section>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Título do caso"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
          />
          <input
            placeholder="Valor em reais"
            value={valor}
            onChange={e => setValor(e.target.value)}
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
