import React, { useState } from "react";
import "./styles.css";
import logoimg from "../../assets/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from "../services/api";

//ciclos de vida : useState, useEffect, useMemo, useRef, useContext

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");
  const history = useHistory();
  async function handleRegister(event) {
    event.preventDefault();
    const data = { name, email, whatsapp, city, uf };

    await api
      .post("ongs", data)
      .then(response => {
        alert(`Seu ID de Acesso: ${response.data.id}`);
        history.push("/");
      })
      .catch(err => {
        alert("Erro no cadastro, tente novamente!");
      });
  }

  return (
    <div className="registe-container">
      <div className="content">
        <section>
          <img src={logoimg} alt="logo"></img>
          <h1>Cadastro</h1>
          <p>
            {" "}
            Faça seu cadastro, entre na plataforma e ajude as pessoas da sua ONG
          </p>
          <Link className="back-link" to="/">
            {" "}
            <FiArrowLeft size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome da ONG"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            placeholder="E-mail"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <input
              placeholder="Uf"
              style={{ width: 80 }}
              value={uf}
              onChange={e => setUf(e.target.value)}
            />
          </div>

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
