import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";

import "./LoginForm.css";

function LoginForm() {

    const navigate = useNavigate();

    const [mostrarPassword, setMostrarPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [form, setForm] = useState({

        correo: "",

        password: ""

    });

    // ==========================================
    // Cambiar valores
    // ==========================================

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    // ==========================================
    // Iniciar sesión
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (!form.correo.trim()) {

            return setError("Ingrese el correo.");

        }

        if (!form.password.trim()) {

            return setError("Ingrese la contraseña.");

        }

        try {

            setLoading(true);

            const { data } = await api.post(

                "/auth/login",

                form

            );

            localStorage.setItem(

                "token",

                data.token

            );

            localStorage.setItem(

                "usuario",

                JSON.stringify(data.usuario)

            );

            localStorage.setItem(

                "rol",

                data.usuario.rol

            );

            localStorage.setItem(

                "nombre",

                data.usuario.nombre

            );

            navigate("/home");

        } catch (error) {

            setError(

                error.response?.data?.message ||

                "No fue posible iniciar sesión."

            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="login-container">

            <form

                className="login-form"

                onSubmit={handleSubmit}

            >

                <h1>🎡 RIFA - RULETA</h1>

                <h2>Iniciar Sesión</h2>

                {

                    error &&

                    <div className="error">

                        {error}

                    </div>

                }

                <input

                    type="email"

                    name="correo"

                    placeholder="Correo electrónico"

                    value={form.correo}

                    onChange={handleChange}

                />

                <input

                    type={

                        mostrarPassword

                            ? "text"

                            : "password"

                    }

                    name="password"

                    placeholder="Contraseña"

                    value={form.password}

                    onChange={handleChange}

                />

                <button

                    type="button"

                    className="mostrar"

                    onClick={() =>

                        setMostrarPassword(

                            !mostrarPassword

                        )

                    }

                >

                    {

                        mostrarPassword

                            ? "Ocultar"

                            : "Mostrar"

                    }

                </button>

                <button

                    type="submit"

                    disabled={loading}

                >

                    {

                        loading

                            ? "Ingresando..."

                            : "Ingresar"

                    }

                </button>

                <p>

                    ¿No tienes cuenta?

                    <Link to="/register">

                        Registrarse

                    </Link>

                </p>

            </form>

        </div>

    );

}

export default LoginForm;