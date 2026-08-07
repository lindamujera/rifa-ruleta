// ==========================================
// src/components/dashboard/CurrentRound.jsx
// ==========================================

import { useEffect, useState } from "react";

import roundService from "../../services/roundService";

import Loader from "../common/Loader";
import Alert from "../common/Alert";

import "./CurrentRound.css";

function CurrentRound() {

    const [round, setRound] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        loadCurrentRound();

    }, []);

    const loadCurrentRound = async () => {

        try {

            setLoading(true);

            setError("");

            const response = await roundService.getCurrentRound();

            const data = response.data || response;

            setRound(data);

        } catch (err) {

            setError(

                err.response?.data?.message ||

                "No fue posible obtener la ronda actual."

            );

        } finally {

            setLoading(false);

        }

    };

    const formatCurrency = (value = 0) =>

        Number(value).toLocaleString("es-CO");

    const calculateProgress = () => {

        if (!round) return 0;

        return Math.round(

            ((round.currentParticipants || 0) /

                (round.maxParticipants || 100))

            * 100

        );

    };

    if (loading) {

        return <Loader />;

    }

    return (

        <section className="current-round">

            <div className="current-round-header">

                <h2>

                    🎯 Ronda Actual

                </h2>

            </div>

            {

                error && (

                    <Alert

                        type="error"

                        message={error}

                    />

                )

            }

            {

                round && (

                    <>

                        <div className="current-round-grid">

                            <div className="round-item">

                                <span>

                                    🆔 Número

                                </span>

                                <strong>

                                    {

                                        round.number ||

                                        round.roundNumber ||

                                        1

                                    }

                                </strong>

                            </div>

                            <div className="round-item">

                                <span>

                                    👥 Participantes

                                </span>

                                <strong>

                                    {

                                        round.currentParticipants ||

                                        0

                                    }

                                    /

                                    {

                                        round.maxParticipants ||

                                        100

                                    }

                                </strong>

                            </div>

                            <div className="round-item">

                                <span>

                                    🏆 Premio Mayor

                                </span>

                                <strong>

                                    $

                                    {

                                        formatCurrency(

                                            round.mainPrize ||

                                            1000000

                                        )

                                    }

                                </strong>

                            </div>

                            <div className="round-item">

                                <span>

                                    🎡 Bolsa Ruleta

                                </span>

                                <strong>

                                    $

                                    {

                                        formatCurrency(

                                            round.prizePool ||

                                            0

                                        )

                                    }

                                </strong>

                            </div>

                            <div className="round-item">

                                <span>

                                    📌 Estado

                                </span>

                                <strong
                                    className={`round-status ${

                                        round.status?.toLowerCase()

                                    }`}
                                >

                                    {

                                        round.status ||

                                        "ABIERTA"

                                    }

                                </strong>

                            </div>

                        </div>

                        {/* ========================================== */}
                        {/* Barra de Progreso */}
                        {/* ========================================== */}

                        <div className="round-progress">

                            <div className="progress-header">

                                <span>

                                    Avance de la ronda

                                </span>

                                <span>

                                    {

                                        calculateProgress()

                                    }%

                                </span>

                            </div>

                            <div className="progress-bar">

                                <div

                                    className="progress-fill"

                                    style={{

                                        width:

                                        `${

                                            calculateProgress()

                                        }%`

                                    }}

                                />

                            </div>

                        </div>

                    </>

                )

            }

        </section>

    );

}

export default CurrentRound;