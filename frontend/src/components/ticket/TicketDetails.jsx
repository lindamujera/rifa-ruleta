// ==========================================
// src/components/ticket/TicketDetails.jsx
// ==========================================

import Modal from "../common/Modal";
import Button from "../common/Button";

import "./TicketDetails.css";

function TicketDetails({

    open = false,

    ticket = null,

    onClose = () => {}

}) {

    if (!ticket) {

        return null;

    }

    const formatearMoneda = (valor = 0) => {

        return Number(valor).toLocaleString("es-CO");

    };

    const formatearFecha = (fecha) => {

        if (!fecha) return "No disponible";

        return new Date(fecha).toLocaleString("es-CO");

    };

    return (

        <Modal

            isOpen={open}

            onClose={onClose}

            title="🎟 Detalle del Ticket"

        >

            <div className="ticket-details">

                {/* ========================================== */}
                {/* Encabezado */}
                {/* ========================================== */}

                <div className="ticket-details-header">

                    <h2>

                        Ticket

                        {" "}

                        {ticket.codigo}

                    </h2>

                    <span

                        className={`ticket-badge ${String(

                            ticket.estado || ""

                        ).toLowerCase()}`}

                    >

                        {ticket.estado || "ACTIVO"}

                    </span>

                </div>

                {/* ========================================== */}
                {/* Información del Ticket */}
                {/* ========================================== */}

                <section className="ticket-section">

                    <h3>

                        🎟 Información del Ticket

                    </h3>

                    <div className="ticket-info-grid">

                        <div>

                            <label>

                                Código

                            </label>

                            <span>

                                {ticket.codigo}

                            </span>

                        </div>

                        <div>

                            <label>

                                Número

                            </label>

                            <span>

                                {ticket.numero}

                            </span>

                        </div>

                        <div>

                            <label>

                                Valor

                            </label>

                            <span>

                                $

                                {formatearMoneda(

                                    ticket.valor || 25000

                                )}

                            </span>

                        </div>

                        <div>

                            <label>

                                Fecha

                            </label>

                            <span>

                                {formatearFecha(

                                    ticket.createdAt

                                )}

                            </span>

                        </div>

                    </div>

                </section>

                {/* ========================================== */}
                {/* Usuario */}
                {/* ========================================== */}

                {

                    ticket.usuario && (

                        <section className="ticket-section">

                            <h3>

                                👤 Participante

                            </h3>

                            <div className="ticket-info-grid">

                                <div>

                                    <label>

                                        Nombre

                                    </label>

                                    <span>

                                        {ticket.usuario.nombre}

                                    </span>

                                </div>

                                <div>

                                    <label>

                                        Correo

                                    </label>

                                    <span>

                                        {ticket.usuario.correo}

                                    </span>

                                </div>

                            </div>

                        </section>

                    )

                }

                {/* ========================================== */}
                {/* Ronda */}
                {/* ========================================== */}

                {

                    ticket.ronda && (

                        <section className="ticket-section">

                            <h3>

                                🎯 Ronda

                            </h3>

                            <div className="ticket-info-grid">

                                <div>

                                    <label>

                                        Código

                                    </label>

                                    <span>

                                        {ticket.ronda.codigo}

                                    </span>

                                </div>

                                <div>

                                    <label>

                                        Estado

                                    </label>

                                    <span>

                                        {ticket.ronda.estado}

                                    </span>

                                </div>

                            </div>

                        </section>

                    )

                }

                {/* ========================================== */}
                {/* Pago */}
                {/* ========================================== */}

                {

                    ticket.pago && (

                        <section className="ticket-section">

                            <h3>

                                💳 Pago

                            </h3>

                            <div className="ticket-info-grid">

                                <div>

                                    <label>

                                        Referencia

                                    </label>

                                    <span>

                                        {ticket.pago.referencia}

                                    </span>

                                </div>

                                <div>

                                    <label>

                                        Estado

                                    </label>

                                    <span>

                                        {ticket.pago.estado}

                                    </span>

                                </div>

                            </div>

                        </section>

                    )

                }

                {/* ========================================== */}
                {/* Giro */}
                {/* ========================================== */}

                {

                    ticket.spin && (

                        <section className="ticket-section">

                            <h3>

                                🎡 Giro de Ruleta

                            </h3>

                            <div className="ticket-info-grid">

                                <div>

                                    <label>

                                        Estado

                                    </label>

                                    <span>

                                        {ticket.spin.estado}

                                    </span>

                                </div>

                                <div>

                                    <label>

                                        Premio

                                    </label>

                                    <span>

                                        $

                                        {formatearMoneda(

                                            ticket.spin.premio ||

                                            0

                                        )}

                                    </span>

                                </div>

                            </div>

                        </section>

                    )

                }

                {/* ========================================== */}
                {/* Acciones */}
                {/* ========================================== */}

                <div className="ticket-details-actions">

                    <Button

                        onClick={onClose}

                    >

                        Cerrar

                    </Button>

                </div>

            </div>

        </Modal>

    );

}

export default TicketDetails;