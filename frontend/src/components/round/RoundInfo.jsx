// ==========================================
// src/components/round/RoundInfo.jsx
// ==========================================

import Card from "../common/Card";
import ProgressBar from "../ProgressBar/ProgressBar";

import "./RoundInfo.css";

function RoundInfo({ round }) {

    if (!round) {

        return null;

    }

    // ==========================================
    // Datos de la ronda
    // ==========================================

    const participantes =
        round.totalParticipantes ||
        round.participantes ||
        0;

    const maxParticipantes =
        round.maxParticipantes ||
        100;

    const porcentaje = (
        (participantes / maxParticipantes) * 100
    ).toFixed(0);

    const premioMayor =
        round.premioMayor ||
        1000000;

    const fondoRuleta =
        round.fondoRuleta ||
        551000;

    const valorJugada =
        round.valorJugada ||
        25000;

    const totalRecaudado =
        round.totalRecaudado ||
        participantes * valorJugada;

    const ganancia =
        round.ganancia ||
        (
            totalRecaudado -
            fondoRuleta -
            premioMayor
        );

    const estado =
        round.estado ||
        "ABIERTA";

    const fechaInicio =
        round.createdAt
            ? new Date(
                  round.createdAt
              ).toLocaleString("es-CO")
            : "No disponible";

    const fechaFin =
        round.updatedAt
            ? new Date(
                  round.updatedAt
              ).toLocaleString("es-CO")
            : "En proceso";

    return (

        <Card className="round-info">

            {/* ========================================== */}
            {/* Encabezado */}
            {/* ========================================== */}

            <div className="round-info-header">

                <div>

                    <h2>

                        🎯

                        Información de la Ronda

                    </h2>

                    <p>

                        Código:

                        <strong>

                            {" "}

                            {round.codigo}

                        </strong>

                    </p>

                </div>

                <span

                    className={`round-state ${estado.toLowerCase()}`}

                >

                    {estado}

                </span>

            </div>

            {/* ========================================== */}
            {/* Barra de progreso */}
            {/* ========================================== */}

            <ProgressBar

                current={participantes}

                total={maxParticipantes}

                title="Participantes"

                color="#2563eb"

            />

            {/* ========================================== */}
            {/* Resumen */}
            {/* ========================================== */}

            <div className="round-info-grid">

                <div className="round-box">

                    <span>

                        👥 Participantes

                    </span>

                    <strong>

                        {participantes}

                        /

                        {maxParticipantes}

                    </strong>

                </div>

                <div className="round-box">

                    <span>

                        📈 Avance

                    </span>

                    <strong>

                        {porcentaje}%

                    </strong>

                </div>

                <div className="round-box">

                    <span>

                        💳 Valor Jugada

                    </span>

                    <strong>

                        $

                        {valorJugada.toLocaleString("es-CO")}

                    </strong>

                </div>

                <div className="round-box">

                    <span>

                        💵 Total Recaudado

                    </span>

                    <strong>

                        $

                        {totalRecaudado.toLocaleString("es-CO")}

                    </strong>

                </div>

                <div className="round-box">

                    <span>

                        🎡 Fondo Ruleta

                    </span>

                    <strong>

                        $

                        {fondoRuleta.toLocaleString("es-CO")}

                    </strong>

                </div>

                <div className="round-box">

                    <span>

                        🏆 Premio Mayor

                    </span>

                    <strong>

                        $

                        {premioMayor.toLocaleString("es-CO")}

                    </strong>

                </div>

                <div className="round-box">

                    <span>

                        💰 Ganancia

                    </span>

                    <strong>

                        $

                        {ganancia.toLocaleString("es-CO")}

                    </strong>

                </div>

                <div className="round-box">

                    <span>

                        📌 Estado

                    </span>

                    <strong>

                        {estado}

                    </strong>

                </div>

            </div>

            {/* ========================================== */}
            {/* Fechas */}
            {/* ========================================== */}

            <div className="round-dates">

                <div>

                    <span>

                        📅 Inicio

                    </span>

                    <strong>

                        {fechaInicio}

                    </strong>

                </div>

                <div>

                    <span>

                        ⏳ Última actualización

                    </span>

                    <strong>

                        {fechaFin}

                    </strong>

                </div>

            </div>

            {/* ========================================== */}
            {/* Ganador */}
            {/* ========================================== */}

            {

                round.ganador && (

                    <div className="round-winner">

                        <h3>

                            👑 Ganador de la Ronda

                        </h3>

                        <div className="winner-card">

                            <p>

                                <strong>

                                    Nombre:

                                </strong>

                                {" "}

                                {

                                    round.ganador.nombre

                                }

                            </p>

                            <p>

                                <strong>

                                    Ticket:

                                </strong>

                                {" "}

                                {

                                    round.ganador.ticket ||

                                    "N/A"

                                }

                            </p>

                            <p>

                                <strong>

                                    Premio:

                                </strong>

                                {" "}

                                $

                                {

                                    premioMayor.toLocaleString("es-CO")

                                }

                            </p>

                        </div>

                    </div>

                )

            }

        </Card>

    );

}

export default RoundInfo;