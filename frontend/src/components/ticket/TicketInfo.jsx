// ==========================================
// src/components/ticket/TicketInfo.jsx
// ==========================================

import Card from "../common/Card";

import TicketNumber from "./TicketNumber";
import TicketStatus from "./TicketStatus";
import TicketQRCode from "./TicketQRCode";

import "./TicketInfo.css";

function TicketInfo({

    ticket,

    showQRCode = true,

    showStatus = true,

    showNumber = true

}) {

    if (!ticket) {

        return null;

    }

    // ==========================================
    // Formateadores
    // ==========================================

    const formatMoney = (value = 0) =>

        Number(value).toLocaleString("es-CO");

    const formatDate = (date) => {

        if (!date) {

            return "No disponible";

        }

        return new Date(date).toLocaleString("es-CO");

    };

    return (

        <Card className="ticket-info">

            {/* ========================================== */}
            {/* Encabezado */}
            {/* ========================================== */}

            <div className="ticket-info-header">

                <div>

                    <h2>

                        🎟 Información del Ticket

                    </h2>

                    <p>

                        Consulta toda la información de tu participación.

                    </p>

                </div>

                {

                    showStatus && (

                        <TicketStatus

                            status={

                                ticket.estado ||

                                "PENDIENTE"

                            }

                            showDescription={false}

                        />

                    )

                }

            </div>

            {/* ========================================== */}
            {/* Número */}
            {/* ========================================== */}

            {

                showNumber && (

                    <div className="ticket-info-number">

                        <TicketNumber

                            number={

                                ticket.numero

                            }

                            size="large"

                        />

                    </div>

                )

            }

            {/* ========================================== */}
            {/* Información */}
            {/* ========================================== */}

            <div className="ticket-info-grid">

                <div className="ticket-info-item">

                    <span>

                        Código

                    </span>

                    <strong>

                        {ticket.codigo}

                    </strong>

                </div>

                <div className="ticket-info-item">

                    <span>

                        Número

                    </span>

                    <strong>

                        {

                            ticket.numero

                        }

                    </strong>

                </div>

                <div className="ticket-info-item">

                    <span>

                        Estado

                    </span>

                    <strong>

                        {

                            ticket.estado ||

                            "PENDIENTE"

                        }

                    </strong>

                </div>

                <div className="ticket-info-item">

                    <span>

                        Usuario

                    </span>

                    <strong>

                        {

                            ticket.usuario?.nombre ||

                            ticket.usuario?.nombres ||

                            "No disponible"

                        }

                    </strong>

                </div>

                <div className="ticket-info-item">

                    <span>

                        Correo

                    </span>

                    <strong>

                        {

                            ticket.usuario?.email ||

                            "No disponible"

                        }

                    </strong>

                </div>

                <div className="ticket-info-item">

                    <span>

                        Ronda

                    </span>

                    <strong>

                        {

                            ticket.ronda?.numero ||

                            ticket.ronda ||

                            "-"

                        }

                    </strong>

                </div>

                <div className="ticket-info-item">

                    <span>

                        Premio Mayor

                    </span>

                    <strong>

                        $

                        {

                            formatMoney(

                                ticket.ronda?.premioMayor ||

                                1000000

                            )

                        }

                    </strong>

                </div>

                <div className="ticket-info-item">

                    <span>

                        Fecha de Registro

                    </span>

                    <strong>

                        {

                            formatDate(

                                ticket.createdAt

                            )

                        }

                    </strong>

                </div>

                <div className="ticket-info-item">

                    <span>

                        Pago

                    </span>

                    <strong>

                        {

                            ticket.payment?.estado ||

                            "Pendiente"

                        }

                    </strong>

                </div>

                <div className="ticket-info-item">

                    <span>

                        Valor Pagado

                    </span>

                    <strong>

                        $

                        {

                            formatMoney(

                                ticket.payment?.valor ||

                                25000

                            )

                        }

                    </strong>

                </div>

            </div>

            {/* ========================================== */}
            {/* QR */}
            {/* ========================================== */}

            {

                showQRCode && (

                    <div className="ticket-info-qr">

                        <TicketQRCode

                            value={

                                ticket.codigo ||

                                String(ticket.numero)

                            }

                            ticketNumber={

                                ticket.numero

                            }

                        />

                    </div>

                )

            }

        </Card>

    );

}

export default TicketInfo;