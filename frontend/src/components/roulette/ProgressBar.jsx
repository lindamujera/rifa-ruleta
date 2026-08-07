// ==========================================
// src/components/ProgressBar/ProgressBar.jsx
// ==========================================

import "./ProgressBar.css";

function ProgressBar({

    current = 0,

    total = 100,

    title = "Progreso de la Ronda",

    color = "#2563eb",

    showPercentage = true,

    showNumbers = true,

    height = 18

}) {

    const porcentaje = Math.min(

        Math.max(

            (current / total) * 100,

            0

        ),

        100

    );

    return (

        <div className="progress-container">

            {/* ========================================== */}
            {/* Encabezado */}
            {/* ========================================== */}

            <div className="progress-header">

                <h3>

                    {title}

                </h3>

                {

                    showPercentage && (

                        <span>

                            {porcentaje.toFixed(0)}%

                        </span>

                    )

                }

            </div>

            {/* ========================================== */}
            {/* Barra */}
            {/* ========================================== */}

            <div

                className="progress-bar"

                style={{

                    height: `${height}px`

                }}

            >

                <div

                    className="progress-fill"

                    style={{

                        width: `${porcentaje}%`,

                        background: color

                    }}

                >

                    {

                        porcentaje > 15 && (

                            <span className="progress-inside">

                                {porcentaje.toFixed(0)}%

                            </span>

                        )

                    }

                </div>

            </div>

            {/* ========================================== */}
            {/* Información */}
            {/* ========================================== */}

            {

                showNumbers && (

                    <div className="progress-footer">

                        <span>

                            Participantes

                        </span>

                        <strong>

                            {current}

                            {" / "}

                            {total}

                        </strong>

                    </div>

                )

            }

        </div>

    );

}

export default ProgressBar;