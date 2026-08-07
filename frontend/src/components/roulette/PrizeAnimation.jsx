// ==========================================
// src/components/roulette/PrizeAnimation.jsx
// ==========================================

import { useEffect, useState } from "react";

import Button from "../common/Button";

import "./PrizeAnimation.css";

function PrizeAnimation({

    open = false,

    prize = null,

    message = "",

    onClose = () => {}

}) {

    const [visible, setVisible] = useState(false);

    useEffect(() => {

        if (open) {

            setVisible(true);

        }

    }, [open]);

    if (!visible) {

        return null;

    }

    const formatMoney = (value = 0) =>

        Number(value).toLocaleString("es-CO");

    const closeAnimation = () => {

        setVisible(false);

        onClose();

    };

    return (

        <div className="prize-animation-overlay">

            <div className="prize-animation">

                {/* ========================================== */}
                {/* Confeti */}
                {/* ========================================== */}

                <div className="confetti">

                    🎉 🎊 ✨ 🎉 🎊 ✨ 🎉 🎊 ✨

                </div>

                {/* ========================================== */}
                {/* Icono */}
                {/* ========================================== */}

                <div className="prize-icon">

                    🎁

                </div>

                {/* ========================================== */}
                {/* Título */}
                {/* ========================================== */}

                <h1>

                    ¡Felicidades!

                </h1>

                <h2>

                    Has ganado

                </h2>

                {/* ========================================== */}
                {/* Premio */}
                {/* ========================================== */}

                <div className="prize-value">

                    {

                        typeof prize === "number"

                            ? `$ ${formatMoney(prize)}`

                            : prize

                    }

                </div>

                {/* ========================================== */}
                {/* Mensaje */}
                {/* ========================================== */}

                <p>

                    {

                        message ||

                        "Tu premio fue registrado correctamente."

                    }

                </p>

                {/* ========================================== */}
                {/* Botón */}
                {/* ========================================== */}

                <Button

                    onClick={closeAnimation}

                >

                    Continuar

                </Button>

            </div>

        </div>

    );

}

export default PrizeAnimation;