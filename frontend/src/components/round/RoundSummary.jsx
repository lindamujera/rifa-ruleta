// ==========================================
// src/components/round/RoundSummary.jsx
// ==========================================

import Card from "../common/Card";

import "./RoundSummary.css";

function RoundSummary({ round }) {

    if (!round) {

        return null;

    }

    // ==========================================
    // Datos
    // ==========================================

    const participantes =
        round.totalParticipantes ||
        round.participantes ||
        0;

    const maxParticipantes =
        round.maxParticipantes ||
        100;

    const valorJugada =
        round.valorJugada ||
        25000;

    const totalRecaudado =
        round.totalRecaudado ||
        participantes * valorJugada;

    const fondoRuleta =
        round.fondoRuleta ||
        551000;

    const premioMayor =
        round.premioMayor ||
        1000000;

    const ganancia =
        round.ganancia ||
        (
            totalRecaudado -
            fondoRuleta -
            premioMayor
        );

    const porcentaje = Math.min(

        (
            participantes /
            maxParticipantes
        ) * 100,

        100

    );

    const premiosEntregados =
        round.premiosEntregados ||
        0;

    const premiosDisponibles =
        round.premiosDisponibles ||
        100;

    const participantesRestantes =
        maxParticipantes -
        participantes;

    return (

        <Card className="round-summary">

            {/* ========================================== */}
            {/* Encabezado */}
            {/* ========================================== */}

            <div className="summary-header">

                <h2>

                    📊 Resumen Financiero

                </h2>

                <span>

                    Ronda

                    {" "}

                    {round.codigo}

                </span>

            </div>

            {/* ========================================== */}
            {/* Tarjetas */}
            {/* ========================================== */}

            <div className="summary-grid">

                <div className="summary-card">

                    <h4>

                        👥 Participantes

                    </h4>

                    <strong>

                        {participantes}

                    </strong>

                    <small>

                        de {maxParticipantes}

                    </small>

                </div>

                <div className="summary-card">

                    <h4>

                        📈 Avance

                    </h4>

                    <strong>

                        {porcentaje.toFixed(0)}%

                    </strong>

                </div>

                <div className="summary-card">

                    <h4>

                        💳 Valor Jugada

                    </h4>

                    <strong>

                        $

                        {valorJugada.toLocaleString("es-CO")}

                    </strong>

                </div>

                <div className="summary-card">

                    <h4>

                        💵 Recaudado

                    </h4>

                    <strong>

                        $

                        {totalRecaudado.toLocaleString("es-CO")}

                    </strong>

                </div>

                <div className="summary-card">

                    <h4>

                        🎡 Fondo Ruleta

                    </h4>

                    <strong>

                        $

                        {fondoRuleta.toLocaleString("es-CO")}

                    </strong>

                </div>

                <div className="summary-card">

                    <h4>

                        🏆 Premio Mayor

                    </h4>

                    <strong>

                        $

                        {premioMayor.toLocaleString("es-CO")}

                    </strong>

                </div>

                <div className="summary-card success">

                    <h4>

                        💰 Ganancia

                    </h4>

                    <strong>

                        $

                        {ganancia.toLocaleString("es-CO")}

                    </strong>

                </div>

                <div className="summary-card">

                    <h4>

                        🎁 Premios Entregados

                    </h4>

                    <strong>

                        {premiosEntregados}

                    </strong>

                </div>

                <div className="summary-card">

                    <h4>

                        🎯 Premios Disponibles

                    </h4>

                    <strong>

                        {premiosDisponibles}

                    </strong>

                </div>

                <div className="summary-card warning">

                    <h4>

                        ⏳ Faltan

                    </h4>

                    <strong>

                        {participantesRestantes}

                    </strong>

                    <small>

                        participantes

                    </small>

                </div>

            </div>

            {/* ========================================== */}
            {/* Resumen */}
            {/* ========================================== */}

            <div className="summary-footer">

                {

                    participantes >= maxParticipantes

                        ? (

                            <div className="summary-message success">

                                ✅ La ronda está completa y lista para realizar el sorteo del premio mayor.

                            </div>

                        )

                        : (

                            <div className="summary-message">

                                Faltan

                                <strong>

                                    {" "}

                                    {participantesRestantes}

                                    {" "}

                                </strong>

                                participantes para completar la ronda y entregar el premio mayor.

                            </div>

                        )

                }

            </div>

        </Card>

    );

}

export default RoundSummary;