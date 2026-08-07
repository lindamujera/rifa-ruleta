// ==========================================
// src/components/layout/Footer.jsx
// ==========================================

import { Link } from "react-router-dom";

import "./Footer.css";

function Footer() {

    const currentYear = new Date().getFullYear();

    return (

        <footer className="footer">

            <div className="footer-container">

                {/* ========================================== */}
                {/* Información */}
                {/* ========================================== */}

                <div className="footer-section">

                    <h2 className="footer-logo">

                        🎰 RifaRuleta

                    </h2>

                    <p className="footer-description">

                        Plataforma de rifas y ruleta desarrollada para ofrecer
                        una experiencia segura, rápida y transparente para todos
                        los participantes.

                    </p>

                </div>

                {/* ========================================== */}
                {/* Navegación */}
                {/* ========================================== */}

                <div className="footer-section">

                    <h3>

                        Navegación

                    </h3>

                    <ul className="footer-links">

                        <li>

                            <Link to="/">

                                Inicio

                            </Link>

                        </li>

                        <li>

                            <Link to="/perfil">

                                Perfil

                            </Link>

                        </li>

                        <li>

                            <Link to="/historial">

                                Historial

                            </Link>

                        </li>

                        <li>

                            <Link to="/admin">

                                Administración

                            </Link>

                        </li>

                    </ul>

                </div>

                {/* ========================================== */}
                {/* Contacto */}
                {/* ========================================== */}

                <div className="footer-section">

                    <h3>

                        Contacto

                    </h3>

                    <p>

                        📧 soporte@rifaruleta.com

                    </p>

                    <p>

                        📱 +57 3155012850

                    </p>

                    <p>

                        🇨🇴 Colombia

                    </p>

                </div>

            </div>

            {/* ========================================== */}
            {/* Copyright */}
            {/* ========================================== */}

            <div className="footer-bottom">

                © {currentYear} RifaRuleta.

                Todos los derechos reservados.

            </div>

        </footer>

    );

}

export default Footer;