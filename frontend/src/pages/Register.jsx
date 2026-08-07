import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

import "../styles/Register.css";

function Register() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [celular, setCelular] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const registrarUsuario = async (e) => {
    e.preventDefault(); // Evita recargar la página

    try {
      await api.post("/auth/register", {
        nombre,
        celular,
        correo,
        password
      });

      alert("Usuario registrado correctamente");
      navigate("/login");

    } catch (error) {
      alert(
        error.response?.data?.msg ||
        "Error al registrar usuario"
      );
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={registrarUsuario}>
        <h1>Crear Cuenta</h1>
        <h2>Ingresa tus datos para registrarte</h2>

        <input
          placeholder="Nombre Completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <input
          placeholder="Celular"
          value={celular}
          onChange={(e) => setCelular(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="primary-btn">
          Registrarme
        </button>

        <p>
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
        </p>
      </form>
    </div>
  );
}

export default Register;