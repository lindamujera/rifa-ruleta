// ==========================================
// src/components/roulette/WinnerBanner.jsx
// ==========================================

import Button from "../common/Button";

import "./WinnerBanner.css";

function WinnerBanner({

    winner = null,

    round = null,

    prize = 0,

    visible = false,

    onClose = () => {},

    onViewHistory = () => {}

}) {

    if (!visible || !winner) {

        return null;

    }

    const formatMoney = (value = 0) =>

        Number(value).toLocaleString("es-CO");

    return (

        <div className="winner-banner-overlay">

            <div className="winner-banner">

                {/* ========================================== */}
                {/* Encabezado */}
                {/* ========================================== */}

                <div className="winner-header">

                    <span className="winner-icon">

                        🏆

                    </span>

                    <h1>

                        ¡Tenemos un Ganador!

                    </h1>

                    <p>

                        La ronda terminó exitosamente.

                    </p>

                </div>

                {/* ========================================== */}
                {/* Información */}
                {/* ========================================== */}

                <div className="winner-content">

                    <div className="winner-item">

                        <span>

                            Participante

                        </span>

                        <strong>

                            {winner.nombre || winner.name}

                        </strong>

                    </div>

                    <div className="winner-item">

                        <span>

                            Ticket

                        </span>

                        <strong>

                            #

                            {winner.ticket ||

                                winner.ticketNumber}

                        </strong>

                    </div>

                    <div className="winner-item">

                        <span>

                            Premio

                        </span>

                        <strong>

                            $

                            {formatMoney(prize)}

                        </strong>

                    </div>

                    <div className="winner-item">

                        <span>

                            Ronda

                        </span>

                        <strong>

                            {round?.numero ||

                                round?.number ||

                                "-"}

                        </strong>

                    </div>

                </div>

                {/* ========================================== */}
                {/* Mensaje */}
                {/* ========================================== */}

                <div className="winner-message">

                    🎉

                    Felicitaciones al ganador.

                    Gracias a todos por participar.

                    La siguiente ronda ya está disponible.

                </div>

                {/* ========================================== */}
                {/* Botones */}
                {/* ========================================== */}

                <div className="winner-actions">

                    <Button

                        variant="secondary"

                        onClick={onClose}

                    >

                        Cerrar

                    </Button>

                    <Button

                        onClick={onViewHistory}

                    >

                        Ver Historial

                    </Button>

                </div>

            </div>

        </div>

    );

}

export default WinnerBanner;