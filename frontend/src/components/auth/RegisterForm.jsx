import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import api from "../../services/api";

import "./RegisterForm.css";

function RegisterForm() {

    const navigate = useNavigate();

    const [mostrarPassword, setMostrarPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [form, setForm] = useState({

        nombre: "",

        celular: "",

        correo: "",

        password: "",

        confirmarPassword: ""

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
    // Registrar usuario
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        if (

            !form.nombre ||

            !form.celular ||

            !form.correo ||

            !form.password ||

            !form.confirmarPassword

        ) {

            return setError(

                "Todos los campos son obligatorios."

            );

        }

        if (

            form.password.length < 6

        ) {

            return setError(

                "La contraseña debe tener mínimo 6 caracteres."

            );

        }

        if (

            form.password !==

            form.confirmarPassword

        ) {

            return setError(

                "Las contraseñas no coinciden."

            );

        }

        try {

            setLoading(true);

            await api.post(

                "/auth/register",

                {

                    nombre: form.nombre,

                    celular: form.celular,

                    correo: form.correo,

                    password: form.password

                }

            );

            alert(

                "Usuario registrado correctamente."

            );

            navigate("/login");

        } catch (error) {

            setError(

                error.response?.data?.message ||

                "No fue posible registrar el usuario."

            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="register-container">

            <form

                className="register-form"

                onSubmit={handleSubmit}

            >

                <h1>🎡 RIFA - RULETA</h1>

                <h2>Crear Cuenta</h2>

                {

                    error &&

                    <div className="error">

                        {error}

                    </div>

                }

                <input

                    type="text"

                    name="nombre"

                    placeholder="Nombre completo"

                    value={form.nombre}

                    onChange={handleChange}

                />

                <input

                    type="text"

                    name="celular"

                    placeholder="Celular"

                    value={form.celular}

                    onChange={handleChange}

                />

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

                <input

                    type={

                        mostrarPassword

                            ? "text"

                            : "password"

                    }

                    name="confirmarPassword"

                    placeholder="Confirmar contraseña"

                    value={form.confirmarPassword}

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

                            ? "Registrando..."

                            : "Registrarse"

                    }

                </button>

                <p>

                    ¿Ya tienes cuenta?

                    <Link to="/login">

                        Iniciar sesión

                    </Link>

                </p>

            </form>

        </div>

    );

}

export default RegisterForm;