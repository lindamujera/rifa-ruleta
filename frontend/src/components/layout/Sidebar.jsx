// ==========================================
// src/components/layout/Sidebar.jsx
// ==========================================

import { NavLink } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";

import "./Sidebar.css";

function Sidebar({

    open = false,

    onClose = () => {}

}) {

    const {

        user

    } = useContext(AuthContext);

    return (

        <>

            {/* ========================================== */}
            {/* Fondo oscuro para móviles */}
            {/* ========================================== */}

            {

                open && (

                    <div

                        className="sidebar-overlay"

                        onClick={onClose}

                    />

                )

            }

            {/* ========================================== */}
            {/* Sidebar */}
            {/* ========================================== */}

            <aside

                className={

                    open

                        ? "sidebar sidebar-open"

                        : "sidebar"

                }

            >

                {/* ========================================== */}
                {/* Usuario */}
                {/* ========================================== */}

                <div className="sidebar-user">

                    <div className="sidebar-avatar">

                        👤

                    </div>

                    <h3>

                        {user?.nombre || "Usuario"}

                    </h3>

                    <span>

                        {user?.rol || "CLIENTE"}

                    </span>

                </div>

                {/* ========================================== */}
                {/* Menú */}
                {/* ========================================== */}

                <nav className="sidebar-menu">

                    <NavLink

                        to="/"

                        className="sidebar-link"

                        onClick={onClose}

                    >

                        🏠 Inicio

                    </NavLink>

                    <NavLink

                        to="/perfil"

                        className="sidebar-link"

                        onClick={onClose}

                    >

                        👤 Mi Perfil

                    </NavLink>

                    <NavLink

                        to="/historial"

                        className="sidebar-link"

                        onClick={onClose}

                    >

                        📜 Historial

                    </NavLink>

                    {

                        user?.rol === "ADMIN" && (

                            <>

                                <NavLink

                                    to="/admin"

                                    className="sidebar-link"

                                    onClick={onClose}

                                >

                                    📊 Dashboard

                                </NavLink>

                                <NavLink

                                    to="/admin"

                                    className="sidebar-link"

                                    onClick={onClose}

                                >

                                    💳 Pagos

                                </NavLink>

                                <NavLink

                                    to="/admin/rondas"

                                    className="sidebar-link"

                                    onClick={onClose}

                                >

                                    🎯 Rondas

                                </NavLink>

                                <NavLink

                                    to="/admin/premios"

                                    className="sidebar-link"

                                    onClick={onClose}

                                >

                                    🏆 Bolsa Premios

                                </NavLink>

                                <NavLink

                                    to="/admin/usuarios"

                                    className="sidebar-link"

                                    onClick={onClose}

                                >

                                    👥 Usuarios

                                </NavLink>

                            </>

                        )

                    }

                </nav>

            </aside>

        </>

    );

}

export default Sidebar;