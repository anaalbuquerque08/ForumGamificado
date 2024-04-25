import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../useAuth";
import { HiOutlineMail } from "react-icons/hi";
import { GiPadlock } from "react-icons/gi";
import LoginImagem from "../Photos/login-img-verde.png";

function Signup() {
  const [email, setEmail] = useState("");
  const [emailConf, setEmailConf] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { signup } = useAuth();

  function handleSignup() {
    if (!email || !emailConf || !senha) {
      setError("Preencha todos os campos");
      return;
    } else if (email !== emailConf) {
      setError("Os e-mails não são iguais");
      return;
    }

    const res = signup(email, senha);

    if (res) {
      setError(res);
      return;
    }

    alert("Usuário cadastrado com sucesso!");
    navigate("/");
  }

  return (
    <div className="signup-container">
      <div className="signup-content">
      <div className="login-imagem-up">
      <img src={LoginImagem} alt="Descrição da imagem" />
      </div>
      <div className="signup-right">
      <h2 className="signup-label">Faça o cadastro</h2>

      <div className="input-container">
      <div className="box-input">
      <div className="icon-label">
<HiOutlineMail />
</div>
      <Input className="signup-input"
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
        />
        </div>
        
        <div className="box-input">
<div className="icon-label">
<HiOutlineMail />
</div>
        <Input className="signup-input"
          type="email"
          placeholder="Confirme o email"
          value={emailConf}
          onChange={(e) => {
            setEmailConf(e.target.value);
            setError("");
          }}
        />
        </div>
        <div className="box-input">
<div className="icon-label">
<GiPadlock />
</div>
        <Input className="signup-input"
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => {
            setSenha(e.target.value);
            setError(""); 
          }}
        />
        </div>
      </div>
    
        <label className="signup-label-error">{error}</label>
        <div className="signup-label-signin">
          Já tem uma conta?
          <strong>
            <Link to="/">&nbsp;Entre</Link>
          </strong>
        </div>
        <Button Text="Inscrever-se" onClick={handleSignup} />
      
      </div>
      </div>
      </div>
  );
}

export default Signup;
