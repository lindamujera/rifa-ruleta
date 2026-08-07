// ==========================================
// src/components/roulette/SpinButton.jsx
// ==========================================

import { useState } from "react";

import Button from "../common/Button";
import Spinner from "../common/Spinner";

import "./SpinButton.css";

function SpinButton({

    disabled = false,

    loading = false,

    spinsAvailable = 1,

    text = "Girar Ruleta",

    onSpin = () => {}

}) {

    const [spinning, setSpinning] = useState(false);

    // ==========================================
    // Girar Ruleta
    // ==========================================

    const handleSpin = async () => {

        if (

            disabled ||

            loading ||

            spinning ||

            spinsAvailable <= 0

        ) {

            return;

        }

        try {

            setSpinning(true);

            await onSpin();

        } finally {

            setSpinning(false);

        }

    };

    return (

        <div className="spin-button-container">

            {/* ========================================== */}
            {/* Giros Disponibles */}
            {/* ========================================== */}

            <div className="spin-counter">

                🎡 Giros disponibles:

                <strong>

                    {" "}

                    {spinsAvailable}

                </strong>

            </div>

            {/* ========================================== */}
            {/* Botón */}
            {/* ========================================== */}

            <Button

                className="spin-button"

                disabled={

                    disabled ||

                    loading ||

                    spinning ||

                    spinsAvailable <= 0

                }

                onClick={handleSpin}

            >

                {

                    loading || spinning ? (

                        <>

                            <Spinner />

                            <span>

                                Girando...

                            </span>

                        </>

                    ) : (

                        <>

                            🎡 {text}

                        </>

                    )

                }

            </Button>

            {/* ========================================== */}
            {/* Mensaje */}
            {/* ========================================== */}

            {

                spinsAvailable <= 0 && (

                    <p className="spin-message">

                        Ya utilizaste todos tus giros para esta ronda.

                    </p>

                )

            }

        </div>

    );

}

export default SpinButton;