// ==========================================
// src/components/ticket/TicketStatus.jsx
// ==========================================

import "./TicketStatus.css";

function TicketStatus({

    status = "PENDIENTE",

    size = "medium",

    showIcon = true,

    showDescription = true

}) {

    // ==========================================
    // Configuración de estados
    // ==========================================

    const STATUS = {

        PENDIENTE: {

            icon: "🟡",

            title: "Pendiente",

            description:
                "El pago está pendiente de aprobación.",

            className: "pending"

        },

        ACTIVO: {

            icon: "🟢",

            title: "Activo",

            description:
                "El ticket ya puede participar en la ronda.",

            className: "active"

        },

        GANADOR: {

            icon: "🏆",

            title: "Ganador",

            description:
                "Este ticket fue seleccionado como ganador.",

            className: "winner"

        },

        UTILIZADO: {

            icon: "✔",

            title: "Utilizado",

            description:
                "El ticket ya fue utilizado.",

            className: "used"

        },

        CANCELADO: {

            icon: "❌",

            title: "Cancelado",

            description:
                "El ticket fue cancelado.",

            className: "cancelled"

        },

        EXPIRADO: {

            icon: "⌛",

            title: "Expirado",

            description:
                "El ticket ya no tiene validez.",

            className: "expired"

        }

    };

    const currentStatus =

        STATUS[status.toUpperCase()] ||

        STATUS.PENDIENTE;

    return (

        <div

            className={

                `ticket-status ${currentStatus.className} ${size}`

            }

        >

            {/* ========================================== */}
            {/* Icono */}
            {/* ========================================== */}

            {

                showIcon && (

                    <div className="ticket-status-icon">

                        {currentStatus.icon}

                    </div>

                )

            }

            {/* ========================================== */}
            {/* Información */}
            {/* ========================================== */}

            <div className="ticket-status-content">

                <h4>

                    {currentStatus.title}

                </h4>

                {

                    showDescription && (

                        <p>

                            {currentStatus.description}

                        </p>

                    )

                }

            </div>

        </div>

    );

}

export default TicketStatus;