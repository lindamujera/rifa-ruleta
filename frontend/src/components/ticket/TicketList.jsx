// ==========================================
// src/components/ticket/TicketList.jsx
// ==========================================

import { useContext, useEffect, useState } from "react";

import { TicketContext } from "../../context/TicketContext";

import TicketCard from "./TicketCard";

import Loader from "../common/Loader";
import Alert from "../common/Alert";

import "./TicketList.css";

function TicketList({

    onViewTicket = () => {},

    onDownloadTicket = () => {}

}) {

    const {

        tickets,

        loading,

        error,

        loadTickets

    } = useContext(TicketContext);

    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {

        loadTickets();

    }, []);

    // ==========================================
    // Filtrar tickets
    // ==========================================

    const ticketsFiltrados = tickets.filter((ticket) => {

        const codigo = String(

            ticket.codigo || ""

        ).toLowerCase();

        const numero = String(

            ticket.numero || ""

        ).toLowerCase();

        const estado = String(

            ticket.estado || ""

        ).toLowerCase();

        const texto = busqueda.toLowerCase();

        return (

            codigo.includes(texto) ||

            numero.includes(texto) ||

            estado.includes(texto)

        );

    });

    if (loading) {

        return (

            <Loader

                text="Cargando tickets..."

            />

        );

    }

    return (

        <div className="ticket-list">

            {/* ========================================== */}
            {/* Encabezado */}
            {/* ========================================== */}

            <div className="ticket-list-header">

                <h2>

                    🎟 Mis Tickets

                </h2>

                <input

                    type="text"

                    placeholder="Buscar ticket..."

                    value={busqueda}

                    onChange={(e) =>

                        setBusqueda(

                            e.target.value

                        )

                    }

                    className="ticket-search"

                />

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
            {/* Sin resultados */}
            {/* ========================================== */}

            {

                !loading &&

                ticketsFiltrados.length === 0 && (

                    <Alert

                        type="info"

                        message="No hay tickets disponibles."

                    />

                )

            }

            {/* ========================================== */}
            {/* Lista */}
            {/* ========================================== */}

            <div className="ticket-grid">

                {

                    ticketsFiltrados.map(

                        (ticket) => (

                            <TicketCard

                                key={ticket._id}

                                ticket={ticket}

                                onView={

                                    onViewTicket

                                }

                                onDownload={

                                    onDownloadTicket

                                }

                            />

                        )

                    )

                }

            </div>

            {/* ========================================== */}
            {/* Total */}
            {/* ========================================== */}

            {

                ticketsFiltrados.length > 0 && (

                    <div className="ticket-total">

                        Total de tickets:

                        <strong>

                            {" "}

                            {

                                ticketsFiltrados.length

                            }

                        </strong>

                    </div>

                )

            }

        </div>

    );

}

export default TicketList;