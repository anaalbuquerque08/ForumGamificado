import "./Signin.css";
import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../useAuth";
import "./Signin.css";
import { HiOutlineMail } from "react-icons/hi";
import { GiPadlock } from "react-icons/gi";
import LoginImagem from "../Photos/login-img-verde-2.png";

function Signin() {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  function handleLogin() {
    if (!email || !senha) {
      setError("Preencha todos os campos");
      return;
    }

    const res = signin(email, senha);

    if (res) {
      setError(res);
      return;
    }

    navigate("/home");
  }

  return (
    <div className="signin-container">
      <div className="signin-content">
        <div className="signin-left">
        <h2 className="signin-label">Faça o login</h2>

<div className="box-input">
<div className="icon-label">
<HiOutlineMail />
</div>
  <Input className="signin-input"
    type="email"
    placeholder="Digite seu E-mail"
    value={email}
    onChange={(e) => [setEmail(e.target.value), setError("")]}
  />
</div>

<div className="box-input">
<div className="icon-label">
<GiPadlock />
</div>
  <Input
    type="password"
    placeholder="Digite sua Senha"
    value={senha}
    onChange={(e) => [setSenha(e.target.value), setError("")]}
  />
  </div>

  <div className="signin-label-signup">
    Não tem uma conta?
    <strong>
      <Link to="/signup">&nbsp;Registre-se</Link>
    </strong>
  </div>
  <Button Text="Entrar" onClick={handleLogin} />
  <label className="signin-label-error">{error}</label>
        </div>
        <div className="login-imagem">
      <img src={LoginImagem} alt="Descrição da imagem" />
      </div>
      </div>
    </div>
  );
}

export default Signin;
