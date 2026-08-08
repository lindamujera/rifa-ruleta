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
  const [mostrarPassword, setMostrarPassword] = useState(false);

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

       <div className="password-container">

    <input
        type={mostrarPassword ? "text" : "password"}
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
    />

    <button
        type="button"
        className="password-toggle"
        onClick={() =>
            setMostrarPassword(!mostrarPassword)
        }
    >
        {mostrarPassword ? "🙈" : "👁️"}
    </button>

</div>
        <button type="submit" className="primary-btn">
          Registrarme
        </button>

       <p>
    ¿Ya tienes una cuenta?<span className="register-link-static">Inicia sesión aquí</span>
     </p>
      </form>
    </div>
  );
}

export default Register;
