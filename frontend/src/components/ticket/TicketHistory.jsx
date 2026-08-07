// ==========================================
// src/components/ticket/TicketHistory.jsx
// ==========================================

import { useEffect, useState } from "react";

import ticketService from "../../services/ticketService";

import Loader from "../common/Loader";
import Alert from "../common/Alert";
import TicketCard from "./TicketCard";

import "./TicketHistory.css";

function TicketHistory({

    userId = null,

    onView = () => {},

    onRefresh = () => {}

}) {

    const [tickets, setTickets] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    // ==========================================
    // Cargar historial
    // ==========================================

    useEffect(() => {

        loadTickets();

    }, [userId]);

    // ==========================================
    // Obtener tickets
    // ==========================================

    const loadTickets = async () => {

        try {

            setLoading(true);

            setError("");

            let response;

            if (userId) {

                response = await ticketService.getByUser(

                    userId

                );

            } else {

                response = await ticketService.getHistory();

            }

            setTickets(

                response.data ||

                response ||

                []

            );

        } catch (err) {

            setError(

                err.response?.data?.message ||

                err.message ||

                "No fue posible cargar el historial."

            );

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Resumen
    // ==========================================

    const totalTickets = tickets.length;

    const activos = tickets.filter(

        ticket =>

            ticket.estado === "ACTIVO"

    ).length;

    const ganadores = tickets.filter(

        ticket =>

            ticket.estado === "GANADOR"

    ).length;

    const pendientes = tickets.filter(

        ticket =>

            ticket.estado === "PENDIENTE"

    ).length;

    // ==========================================
    // Loading
    // ==========================================

    if (loading) {

        return <Loader />;

    }

    return (

        <div className="ticket-history">

            {/* ========================================== */}
            {/* Encabezado */}
            {/* ========================================== */}

            <div className="ticket-history-header">

                <div>

                    <h2>

                        🎟 Historial de Tickets

                    </h2>

                    <p>

                        Consulta todos tus tickets registrados.

                    </p>

                </div>

                <button

                    className="refresh-button"

                    onClick={() => {

                        loadTickets();

                        onRefresh();

                    }}

                >

                    Actualizar

                </button>

            </div>

            {/* ========================================== */}
            {/* Error */}
            {/* ========================================== */}

            {

                error && (

                    <Alert

                        type="error"

                        message={error}

                    />

                )

            }

            {/* ========================================== */}
            {/* Resumen */}
            {/* ========================================== */}

            {

                tickets.length > 0 && (

                    <div className="ticket-summary">

                        <div className="summary-card">

                            <span>

                                Total

                            </span>

                            <strong>

                                {totalTickets}

                            </strong>

                        </div>

                        <div className="summary-card success">

                            <span>

                                Activos

                            </span>

                            <strong>

                                {activos}

                            </strong>

                        </div>

                        <div className="summary-card warning">

                            <span>

                                Pendientes

                            </span>

                            <strong>

                                {pendientes}

                            </strong>

                        </div>

                        <div className="summary-card winner">

                            <span>

                                Ganadores

                            </span>

                            <strong>

                                {ganadores}

                            </strong>

                        </div>

                    </div>

                )

            }

            {/* ========================================== */}
            {/* Sin datos */}
            {/* ========================================== */}

            {

                tickets.length === 0 ? (

                    <Alert

                        type="info"

                        message="Todavía no tienes tickets registrados."

                    />

                ) : (

                    <div className="ticket-history-list">

                        {

                            tickets.map(

                                (ticket) => (

                                    <TicketCard

                                        key={

                                            ticket._id

                                        }

                                        ticket={ticket}

                                        onView={onView}

                                    />

                                )

                            )

                        }

                    </div>

                )

            }

        </div>

    );

}

export default TicketHistory;