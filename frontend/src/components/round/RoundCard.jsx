// ==========================================
// src/components/round/RoundCard.jsx
// ==========================================

import Button from "../common/Button";
import Card from "../common/Card";
import ProgressBar from "../ProgressBar/ProgressBar";

import "./RoundCard.css";

function RoundCard({

    round,

    onView = () => {},

    onPlay = () => {}

}) {

    if (!round) {

        return null;

    }

    const participantes =

        round.totalParticipantes ||

        round.participantes ||

        0;

    const maxParticipantes =

        round.maxParticipantes ||

        100;

    const premioMayor =

        round.premioMayor ||

        1000000;

    const fondoRuleta =

        round.fondoRuleta ||

        551000;

    const estado =

        round.estado ||

        "ABIERTA";

    const fechaInicio =

        round.createdAt

            ? new Date(

                  round.createdAt

              ).toLocaleDateString("es-CO")

            : "No disponible";

    return (

        <Card className="round-card">

            {/* ========================================== */}
            {/* Encabezado */}
            {/* ========================================== */}

            <div className="round-header">

                <div>

                    <h2>

                        🎯 Ronda

                        {" "}

                        {round.codigo}

                    </h2>

                    <p>

                        Inicio:

                        {" "}

                        {fechaInicio}

                    </p>

                </div>

                <span

                    className={`round-status ${estado.toLowerCase()}`}

                >

                    {estado}

                </span>

            </div>

            {/* ========================================== */}
            {/* Progreso */}
            {/* ========================================== */}

            <ProgressBar

                current={participantes}

                total={maxParticipantes}

                title="Participantes"

                color="#2563eb"

            />

            {/* ========================================== */}
            {/* Información */}
            {/* ========================================== */}

            <div className="round-grid">

                <div className="round-item">

                    <span>

                        👥 Participantes

                    </span>

                    <strong>

                        {participantes}

                        {" / "}

                        {maxParticipantes}

                    </strong>

                </div>

                <div className="round-item">

                    <span>

                        💰 Premio Mayor

                    </span>

                    <strong>

                        $

                        {Number(

                            premioMayor

                        ).toLocaleString("es-CO")}

                    </strong>

                </div>

                <div className="round-item">

                    <span>

                        🎡 Fondo Ruleta

                    </span>

                    <strong>

                        $

                        {Number(

                            fondoRuleta

                        ).toLocaleString("es-CO")}

                    </strong>

                </div>

                <div className="round-item">

                    <span>

                        🎟 Valor Jugada

                    </span>

                    <strong>

                        $25.000

                    </strong>

                </div>

            </div>

            {/* ========================================== */}
            {/* Pie */}
            {/* ========================================== */}

            <div className="round-footer">

                <Button

                    variant="secondary"

                    onClick={() => onView(round)}

                >

                    Ver Detalle

                </Button>

                {

                    estado === "ABIERTA" && (

                        <Button

                            onClick={() => onPlay(round)}

                        >

                            Participar

                        </Button>

                    )

                }

            </div>

        </Card>

    );

}

export default RoundCard;