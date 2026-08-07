// ==========================================
// src/components/ticket/TicketNumber.jsx
// ==========================================

import "./TicketNumber.css";

function TicketNumber({

    number,

    size = "medium",

    showLabel = true,

    prefix = "#",

    color = "primary",

    onClick = () => {}

}) {

    // ==========================================
    // Formatear número
    // ==========================================

    const formatNumber = (value) => {

        if (

            value === undefined ||

            value === null ||

            value === ""

        ) {

            return "------";

        }

        return String(value).padStart(6, "0");

    };

    return (

        <div

            className={

                `ticket-number ${size} ${color}`

            }

            onClick={onClick}

        >

            {

                showLabel && (

                    <span className="ticket-number-label">

                        🎟 Número del Ticket

                    </span>

                )

            }

            <div className="ticket-number-value">

                {prefix}

                {formatNumber(number)}

            </div>

        </div>

    );

}

export default TicketNumber;