// ==========================================
// src/components/ticket/TicketQRCode.jsx
// ==========================================

import QRCode from "react-qr-code";

import "./TicketQRCode.css";

function TicketQRCode({

    value = "",

    ticketNumber = "",

    size = 180,

    title = "Código QR",

    showNumber = true,

    showBorder = true

}) {

    if (!value) {

        return (

            <div className="ticket-qr-empty">

                No hay información para generar el código QR.

            </div>

        );

    }

    return (

        <div

            className={

                `ticket-qr-container ${

                    showBorder

                        ? "with-border"

                        : ""

                }`

            }

        >

            <h3 className="ticket-qr-title">

                📱 {title}

            </h3>

            <div className="ticket-qr-code">

                <QRCode

                    value={value}

                    size={size}

                    bgColor="#FFFFFF"

                    fgColor="#0F172A"

                    level="H"

                />

            </div>

            {

                showNumber && (

                    <div className="ticket-qr-number">

                        Ticket #

                        {ticketNumber}

                    </div>

                )

            }

            <p className="ticket-qr-text">

                Presenta este código al momento de

                validar tu participación.

            </p>

        </div>

    );

}

export default TicketQRCode;