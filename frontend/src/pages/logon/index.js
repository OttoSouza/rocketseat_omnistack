import React from "react";
import "./styles.css";
import heroimg from "../../assets/heroes.png";
import logoimg from "../../assets/logo.svg";
import { FiLogIn } from 'react-icons/fi'
import {Link} from 'react-router-dom'
export default function Logon() {
  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoimg} alt="logo"></img>
        <form>
            <h1>Faça seu Logon</h1>
            <input placeholder="Sua ID"/>
            <button className="button" type="submit">Entrar</button>
            <Link className="back-link" to="/register"> <FiLogIn size={16} color="#e02041" />Não tenho cadastro</Link>
        </form>
      </section>
      <img src={heroimg} alt="heros"></img>
    </div>
  );
}
