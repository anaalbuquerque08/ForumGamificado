import React, { useState } from "react";
import "./Forms.css";

function Forms() {
  const [loginForm, setLoginForm] = useState(true); // Estado para alternar entre login e cadastro
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginForm) {
      // Lógica de login
      console.log("Login realizado com sucesso!");
    } else {
      // Verifica se as senhas são iguais
      if (formData.password !== formData.confirmPassword) {
        setError("As senhas não coincidem");
      } else {
        // Lógica de cadastro
        console.log("Cadastro realizado com sucesso!");
      }
    }
  };

  const toggleForm = () => {
    setLoginForm(!loginForm);
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
    });
    setError("");
  };

  return (
    <div className="forms">
      <div className="login-box">
        <h2>{loginForm ? "Login" : "Cadastro"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label>Password</label>
          </div>
          {!loginForm && (
            <div className="user-box">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <label>Confirm Password</label>
            </div>
          )}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit">{loginForm ? "Entrar" : "Cadastrar"}</button>
          <a href="#" onClick={toggleForm}>
            {loginForm ? "Não tem login? Cadastre-se" : "Já tem login? Faça login"}
          </a>
        </form>
      </div>
    </div>
  );
}

export default Forms;
 
