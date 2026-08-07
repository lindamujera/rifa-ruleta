// ==========================================
// src/components/layout/Navbar.jsx
// ==========================================

import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";

import Button from "../common/Button";

import "./Navbar.css";

function Navbar() {

    const navigate = useNavigate();

    const {

        user,
        logout,
        isAuthenticated

    } = useContext(AuthContext);

    // ==========================================
    // Cerrar sesión
    // ==========================================

    const cerrarSesion = () => {

        logout();

        navigate("/login");

    };

    return (

        <header className="navbar">

            <div className="navbar-container">

                {/* =============================== */}
                {/* Logo */}
                {/* =============================== */}

                <Link

                    to="/"

                    className="navbar-logo"

                >

                    🎰 RifaRuleta

                </Link>

                {/* =============================== */}
                {/* Menú */}
                {/* =============================== */}

                <nav className="navbar-menu">

                    <NavLink
                        to="/"
                        className="navbar-link"
                    >
                        Inicio
                    </NavLink>

                    {

                        isAuthenticated && (

                            <>

                                <NavLink
                                    to="/perfil"
                                    className="navbar-link"
                                >
                                    Perfil
                                </NavLink>

                                <NavLink
                                    to="/historial"
                                    className="navbar-link"
                                >
                                    Historial
                                </NavLink>

                            </>

                        )

                    }

                    {

                        user?.rol === "ADMIN" && (

                            <NavLink
                                to="/admin"
                                className="navbar-link"
                            >
                                Administración
                            </NavLink>

                        )

                    }

                </nav>

                {/* =============================== */}
                {/* Usuario */}
                {/* =============================== */}

                <div className="navbar-user">

                    {

                        isAuthenticated ? (

                            <>

                                <span className="navbar-name">

                                    Hola,

                                    <strong>

                                        {" "}

                                        {user?.nombre}

                                    </strong>

                                </span>

                                <Button

                                    variant="danger"

                                    size="small"

                                    onClick={cerrarSesion}

                                >

                                    Cerrar sesión

                                </Button>

                            </>

                        ) : (

                            <>

                                <Link to="/login">

                                    <Button

                                        variant="outline"

                                        size="small"

                                    >

                                        Iniciar sesión

                                    </Button>

                                </Link>

                                <Link to="/registro">

                                    <Button

                                        variant="primary"

                                        size="small"

                                    >

                                        Registrarse

                                    </Button>

                                </Link>

                            </>

                        )

                    }

                </div>

            </div>

        </header>

    );

}

export default Navbar;