// ==========================================
// src/pages/Home.jsx
// ==========================================
import { Link } from "react-router-dom";
import { FaGift } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaDice } from "react-icons/fa";
import {FaTicketAlt,FaTrophy,FaCreditCard} from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

import "../styles/Home.css";

export default function Home() {

    return (

        <div className="home">

            {/* ==========================================
                HERO
            ========================================== */}

            <section className="hero">

                <div className="hero-content">

                    <h1>
                        <FaGift className="hero-icon" />
                          RIFA & RULETA
                        <FaDice className="hero-icon" />
                    </h1>

                    <h2>
                    <FaStar className="hero-icon" />
                        Participa con solo

                        <span>

                            $25.000 COP

                        </span>
                   
                    </h2>

                    <p>

                        Con un único pago recibes:

                    </p>

                    <ul className="benefits-list">

    <li>
        <FaTicketAlt className="benefit-icon" />
        <span>Un Ticket para la Gran Rifa</span>
    </li>

    <li>
        <FaDice className="benefit-icon" />
        <span>Un Giro en la Ruleta</span>
    </li>

    <li>
        <FaGift className="benefit-icon" />
        <span>Oportunidad de ganar premios al instante</span>
    </li>

    <li>
        <FaTrophy className="benefit-icon trophy" />
        <span>
            Premio Mayor de <strong>$1.000.000 COP</strong>
        </span>
    </li>

</ul>

                    <div className="hero-buttons">

                        <Link
                            to="/register"
                            className="btn-primary"
                        >
                            Participar Ahora
                        </Link>

                        <Link
                           to="/login"
                           className="btn-secondary"
                        >
                            Iniciar Sesión
                        </Link>

                    </div>

                </div>

            </section>

           {/* ==========================================
    INFORMACIÓN
========================================== */}

<section className="info">

    <h2>¿Cómo funciona?</h2>

    <div className="cards">

        <div className="card">

            <div className="icon-circle">
                <FaCreditCard className="info-icon" />
            </div>

            <h3>Realiza el pago</h3>

            <p>
                Consigna únicamente
                <strong> $25.000 COP</strong>.
            </p>

        </div>

        <div className="card">

            <div className="icon-circle">
                <FaTicketAlt className="info-icon" />
            </div>

            <h3>Recibe tu Ticket</h3>

            <p>
                Obtienes automáticamente un número
                para participar en la rifa.
            </p>

        </div>

        <div className="card">

            <div className="icon-circle">
                <FaDice className="info-icon spin-icon" />
            </div>

            <h3>Gira la Ruleta</h3>

            <p>
                Un solo giro por pago,
                con premios instantáneos.
            </p>

        </div>

        <div className="card">

            <div className="icon-circle">
                <FaTrophy className="info-icon trophy-icon" />
            </div>

            <h3>Premio Mayor</h3>

            <p>
                Cuando la ronda llegue a
                <strong> 100 participantes</strong>,
                se realiza el sorteo del premio de
                <strong> $1.000.000 COP</strong>.
            </p>

        </div>

    </div>

</section>

{/* ========================================== */}
{/* WHATSAPP SOPORTE */}
{/* ========================================== */}

<a
    href="https://wa.me/573155012850?text=Hola,%20necesito%20ayuda%20con%20Rifa%20%26%20Ruleta."
    className="whatsapp-float"
    target="_blank"
    rel="noopener noreferrer"
>

    <FaWhatsapp />

    <span>

        Soporte

    </span>

</a>
        </div>

    );

}