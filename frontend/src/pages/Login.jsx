// ==========================================
// src/pages/Login.jsx
// ==========================================

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthService from "../services/authService";
import { useAuth } from "../context/AuthContext";

import "../styles/Login.css";

function Login() {
    const navigate = useNavigate();

    // Contexto de autenticación
    const { login } = useAuth();

    // Estados
    const [correo, setCorreo] = useState("");
    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // Iniciar sesión
    const iniciarSesion = async () => {
        try {
            setLoading(true);
            console.log("Intentando iniciar sesión...");

            const respuesta = await AuthService.login(correo, password);

            console.log("Respuesta del backend:");
            console.log(respuesta);

            // Guardar sesión
            AuthService.saveSession(respuesta.token, respuesta.usuario);

            // Actualizar contexto
            login(respuesta.usuario, respuesta.token);

            // Redireccionar según el rol
            if (respuesta.usuario.rol === "ADMIN") {
                console.log("Navegando al panel administrador...");
                navigate("/admin");
            } else {
                console.log("Navegando al Dashboard...");
                navigate("/dashboard");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Render
    return (
        <div className="login-container">
            <div className="login-form">
                <h1>Iniciar Sesión</h1>
                <h2>Ingresa tus credenciales para continuar</h2>

                <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
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

                <button
                    className="primary-btn"
                    onClick={iniciarSesion}
                    disabled={loading}
                >
                    {loading ? "Ingresando..." : "Ingresar"}
                </button>

                <p>
                    <span className="register-link-static">Regístrate aquí
                </p>
            </div>
        </div>
    );
}

export default Login;
