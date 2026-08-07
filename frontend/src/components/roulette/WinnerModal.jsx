// ==========================================
// src/components/roulette/WinnerModal.jsx
// ==========================================

import Modal from "../common/Modal";
import Button from "../common/Button";

import "./WinnerModal.css";

function WinnerModal({

    open = false,

    winner = null,

    round = null,

    onClose = () => {}

}) {

    if (!winner) {

        return null;

    }

    return (

        <Modal

            isOpen={open}

            onClose={onClose}

            title="🏆 ¡Tenemos un Ganador!"

        >

            <div className="winner-modal">

                {/* ========================================== */}
                {/* Trofeo */}
                {/* ========================================== */}

                <div className="winner-trophy">

                    👑

                </div>

                {/* ========================================== */}
                {/* Título */}
                {/* ========================================== */}

                <h2>

                    ¡La ronda ha finalizado!

                </h2>

                <p>

                    El premio mayor ya tiene ganador.

                </p>

                {/* ========================================== */}
                {/* Información del ganador */}
                {/* ========================================== */}

                <div className="winner-card">

                    <div className="winner-item">

                        <span className="winner-label">

                            👤 Ganador

                        </span>

                        <span className="winner-value">

                            {winner.nombre || "Usuario"}

                        </span>

                    </div>

                    <div className="winner-item">

                        <span className="winner-label">

                            🎟 Ticket

                        </span>

                        <span className="winner-value">

                            {winner.ticket || winner.ticketCodigo || "N/A"}

                        </span>

                    </div>

                    <div className="winner-item">

                        <span className="winner-label">

                            💰 Premio

                        </span>

                        <span className="winner-value">

                            $

                            {Number(

                                winner.premio ||

                                winner.valor ||

                                1000000

                            ).toLocaleString("es-CO")}

                        </span>

                    </div>

                    {

                        round && (

                            <div className="winner-item">

                                <span className="winner-label">

                                    🎯 Ronda

                                </span>

                                <span className="winner-value">

                                    {round.codigo || round.numero || "N/A"}

                                </span>

                            </div>

                        )

                    }

                </div>

                {/* ========================================== */}
                {/* Mensaje */}
                {/* ========================================== */}

                <div className="winner-message">

                    Gracias por participar en

                    <strong>

                        {" "}RifaRuleta

                    </strong>

                    .

                    Muy pronto iniciaremos una nueva ronda con

                    más oportunidades para ganar.

                </div>

                {/* ========================================== */}
                {/* Botón */}
                {/* ========================================== */}

                <div className="winner-actions">

                    <Button

                        onClick={onClose}

                    >

                        Continuar

                    </Button>

                </div>

            </div>

        </Modal>

    );

}

export default WinnerModal;