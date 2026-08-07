// ==========================================
// src/components/ticket/TicketCard.jsx
// ==========================================

import Button from "../common/Button";
import Card from "../common/Card";

import "./TicketCard.css";

function TicketCard({

    ticket,

    onView = () => {},

    onDownload = () => {}

}) {

    if (!ticket) {

        return null;

    }

    return (

        <Card className="ticket-card">

            {/* ========================================== */}
            {/* Encabezado */}
            {/* ========================================== */}

            <div className="ticket-header">

                <h2>

                    🎟 Ticket

                </h2>

                <span

                    className={`ticket-status ${String(ticket.estado || "").toLowerCase()}`}

                >

                    {ticket.estado || "ACTIVO"}

                </span>

            </div>

            {/* ========================================== */}
            {/* Información */}
            {/* ========================================== */}

            <div className="ticket-body">

                <div className="ticket-row">

                    <span>

                        Código

                    </span>

                    <strong>

                        {ticket.codigo}

                    </strong>

                </div>

                <div className="ticket-row">

                    <span>

                        Número

                    </span>

                    <strong>

                        {ticket.numero}

                    </strong>

                </div>

                <div className="ticket-row">

                    <span>

                        Valor

                    </span>

                    <strong>

                        $

                        {Number(

                            ticket.valor || 25000

                        ).toLocaleString("es-CO")}

                    </strong>

                </div>

                <div className="ticket-row">

                    <span>

                        Ronda

                    </span>

                    <strong>

                        {

                            ticket.ronda?.codigo ||

                            ticket.ronda ||

                            "N/A"

                        }

                    </strong>

                </div>

                <div className="ticket-row">

                    <span>

                        Fecha

                    </span>

                    <strong>

                        {

                            ticket.createdAt

                                ? new Date(

                                      ticket.createdAt

                                  ).toLocaleDateString("es-CO")

                                : "-"

                        }

                    </strong>

                </div>

            </div>

            {/* ========================================== */}
            {/* Pie */}
            {/* ========================================== */}

            <div className="ticket-footer">

                <Button

                    onClick={() => onView(ticket)}

                >

                    Ver Ticket

                </Button>

                <Button

                    variant="secondary"

                    onClick={() => onDownload(ticket)}

                >

                    Descargar

                </Button>

            </div>

        </Card>

    );

}

export default TicketCard;