// ==========================================
// src/pages/Dashboard.jsx
// ==========================================

import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import TicketService from "../services/ticketService";
import {FaCreditCard,FaTicketAlt,FaDice,FaEnvelope,FaUserTag} from "react-icons/fa";
import { FaHandSparkles } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import { FaSignOutAlt } from "react-icons/fa";
import "../styles/Dashboard.css";

export default function Dashboard() {

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [activeTicket, setActiveTicket] = useState(null);
    const [tickets, setTickets] = useState([]);
    const [loadingTicket, setLoadingTicket] = useState(false);
    const [ticketError, setTicketError] = useState("");

    useEffect(() => {

        const usuarioId = user?.id || user?._id;
        if (!usuarioId) return;

        const loadTicket = async () => { 
            try {
                setLoadingTicket(true);
                setTicketError("");

                const response = await TicketService.obtenerTicketsUsuario(
                    usuarioId
                );

                const tickets = Array.isArray(response.data)
                    ? response.data
                    : [];
                const ticket = tickets.find((t) => t.estado === "ACTIVO") || tickets[0] || null;
                setTickets(tickets);
                setActiveTicket(ticket);
            } catch (error) {
                console.error(error);
                setTicketError(
                    error.response?.data?.message ||
                        error.message ||
                        "No fue posible cargar el ticket."
                );
            } finally {
                setLoadingTicket(false);
            }
        };

        loadTicket();
    }, [user]);

    const cerrarSesion = () => {
 
    authService.logout();

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    sessionStorage.clear();

    navigate("/login", {
        replace: true
    });

}; 
    return (

        <div className="dashboard-page">
            
            {/* ==========================================
    Encabezado
========================================== */}

<section className="dashboard-header">

    <div className="dashboard-welcome">

        <FaHandSparkles className="welcome-icon" />

        <div>

            <h1>

                Bienvenido,
                <span> {user?.nombre || "Usuario"}</span>

            </h1>

            <p>

                Administra tu participación en la
                <strong> RIFA & RULETA </strong>
                desde este panel.

            </p>

        </div>

    </div>

    <div className="dashboard-user-info">

        <p>

            <FaEnvelope className="info-small-icon" />

            <strong>Correo:</strong>

            {user?.correo || "-"}

        </p>

        <p>

            <FaUserTag className="info-small-icon" />

            <strong>Rol:</strong>

            {user?.rol || "-"}

        </p>
         <button
        className="logout-button"
        onClick={cerrarSesion}
    >

        <FaSignOutAlt />

        Cerrar sesión

    </button>

    </div>

</section>

            {/* ==========================================
                Resumen
            ========================================== */}


            <section className="dashboard-preview">

                <div className="preview-info">

                    <h2>Tu Rifa y Ruleta</h2>

                    {loadingTicket ? (
                        <p>Cargando información de tu ticket...</p>
                    ) : ticketError ? (
                        <p>{ticketError}</p>
                    ) : activeTicket ? (
                        <>
                            <p>
                                Tu número de rifa es:
                                <strong> #{activeTicket.numeroRifa || "--"}</strong>
                            </p>
                            <p>
                                {activeTicket.spin && activeTicket.spin.estado === "HABILITADO"
                                    ? "Tu giro está listo para jugar."
                                    : activeTicket.estado === "ACTIVO"
                                    ? "Ticket activo, esperando giro habilitado."
                                    : "Tu giro se preparará cuando el pago esté aprobado."}
                            </p>
                            <Link
                                to={
                                    activeTicket.spin && activeTicket.spin._id
                                        ? `/roulette/${activeTicket.spin._id}`
                                        : "/roulette"
                                }
                                className="preview-button"
                            >
                                {activeTicket.spin && activeTicket.spin.estado === "HABILITADO"
                                    ? "Girar Ruleta"
                                    : "Ver Ruleta"}
                            </Link>
                        </>
                    ) : (
                        <p>
                            Aún no tienes un ticket activo. Completa el pago y espera la aprobación del administrador.
                        </p>
                    )}

                </div>

                <div className="preview-wheel">

                    <div className="rainbow-wheel">
                        <div className="rainbow-center">GIRA</div>
                    </div>

                </div>

            </section>

            <section className="dashboard-actions">

    <h2>Acciones rápidas</h2>

    <div className="actions-grid">

        <Link
            to="/payments"
            className="action-button"
        >

            <div className="action-icon payment-icon">

                <FaCreditCard />

            </div>

            <div>

                <strong>Registrar Pago</strong>

                <span>

                    {activeTicket
                        ? "Puedes registrar otro pago"
                        : "Registra un pago para participar"}

                </span>

            </div>

        </Link>

        <Link
            to="/tickets"
            className="action-button"
        >

            <div className="action-icon ticket-icon">

                <FaTicketAlt />

            </div>

            <div>

                <strong>Mis Tickets</strong>

                <span>

                    {tickets.length
                        ? `Tienes ${tickets.length} ticket${tickets.length > 1 ? "s" : ""}`
                        : "Consulta tus tickets"}

                </span>

            </div>

        </Link>

        <Link

            to={
                activeTicket?.spin?._id
                    ? `/roulette/${activeTicket.spin._id}`
                    : "/roulette"
            }

            className="action-button"

        >

            <div className="action-icon roulette-icon">

                <FaDice />

            </div>

            <div>

                <strong>Girar Ruleta</strong>

                <span>

                    {activeTicket
                        ? activeTicket.spin?.estado === "HABILITADO"
                            ? "Tu giro está listo"
                            : "Prepara tu giro tras aprobación"
                        : "Primero necesitas un ticket"}

                </span>

            </div>

        </Link>

    </div>

</section>

            <section className="dashboard-tickets">
                <h2>Números de mi rifa</h2>
                {loadingTicket ? (
                    <p>Cargando tus tickets...</p>
                ) : tickets.length ? (
                    <div className="tickets-list">
                        {tickets.map((ticket) => (
                            <div key={ticket._id} className="ticket-badge">
                                <span>{ticket.numeroRifa ? `#${ticket.numeroRifa}` : "Pendiente"}</span>
                                <p>{ticket.estado || "PENDIENTE"}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Aún no tienes tickets registrados.</p>
                )}
            </section>

            {/* ==========================================
                Información de la ronda
            ========================================== */}

            <section className="dashboard-round">

                <h2>

                    Información de la ronda

                </h2>

                <div className="round-card">

                    <div>

                        <h4>

                            Valor de participación

                        </h4>

                        <p>

                            $25.000 COP

                        </p>

                    </div>

                    <div>

                        <h4>

                            Premio Mayor

                        </h4>

                        <p>

                            $1.000.000 COP

                        </p>

                    </div>

                    <div>

                        <h4>

                            Participantes

                        </h4>

                        <p>

                            0 / 100

                        </p>

                        <small>Ronda actual</small>

                    </div>

                    <div>

                        <h4>

                            Giros ruleta

                        </h4>

                        <p>

                            1

                        </p>

                        <small>Disponibles</small>

                    </div>

                </div>

            </section>

        </div>

    );

}