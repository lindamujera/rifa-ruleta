// ==========================================
// src/components/roulette/PrizeModal.jsx
// ==========================================

import Modal from "../common/Modal";
import Button from "../common/Button";

import "./PrizeModal.css";

function PrizeModal({

    open = false,

    prize = null,

    onClose = () => {}

}) {

    if (!prize) {

        return null;

    }

    const valor = Number(

        prize.valor ||

        prize.monto ||

        0

    ).toLocaleString("es-CO");

    return (

        <Modal

            isOpen={open}

            onClose={onClose}

            title="🎉 ¡Felicidades!"

        >

            <div className="prize-modal">

                {/* ========================================== */}
                {/* Icono */}
                {/* ========================================== */}

                <div className="prize-icon">

                    🏆

                </div>

                {/* ========================================== */}
                {/* Información */}
                {/* ========================================== */}

                <h2>

                    ¡Has ganado un premio!

                </h2>

                <h1 className="prize-value">

                    ${valor}

                </h1>

                <div className="prize-details">

                    <p>

                        <strong>Código:</strong>

                        {" "}

                        {prize.codigo || "N/A"}

                    </p>

                    <p>

                        <strong>Estado:</strong>

                        {" "}

                        {prize.estado || "ENTREGADO"}

                    </p>

                    {

                        prize.posicion && (

                            <p>

                                <strong>Posición:</strong>

                                {" "}

                                {prize.posicion}

                            </p>

                        )

                    }

                </div>

                <div className="prize-message">

                    Tu premio ha sido registrado correctamente.

                    Puedes consultarlo posteriormente desde tu historial.

                </div>

                {/* ========================================== */}
                {/* Botón */}
                {/* ========================================== */}

                <div className="prize-actions">

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

export default PrizeModal;