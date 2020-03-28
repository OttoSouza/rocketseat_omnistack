import React from "react";
import "./styles.css";
import logoimg from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
export default function Register() {
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
        <form>
          <input placeholder="Nome da ONG" />
          <input placeholder="E-mail" type="email" />
          <input placeholder="Whatsapp" />

          <div className="input-group">
            <input placeholder="Cidade" />
            <input placeholder="Uf" style={{ width: 80 }} />
          </div>

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
