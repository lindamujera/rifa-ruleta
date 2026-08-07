// ==========================================
// src/components/dashboard/PrizeCard.jsx
// ==========================================

import { useEffect, useState } from "react";

import prizePoolService from "../../services/prizePoolService";

import Loader from "../common/Loader";
import Alert from "../common/Alert";

import "./PrizeCard.css";

function PrizeCard() {

    const [prize, setPrize] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        loadPrize();

    }, []);

    const loadPrize = async () => {

        try {

            setLoading(true);

            setError("");

            const response = await prizePoolService.getCurrentPrizePool();

            const data = response.data || response;

            setPrize(data);

        } catch (err) {

            setError(

                err.response?.data?.message ||

                "No fue posible obtener la información del premio."

            );

        } finally {

            setLoading(false);

        }

    };

    const formatCurrency = (value = 0) =>

        Number(value).toLocaleString("es-CO");

    if (loading) {

        return <Loader />;

    }

    return (

        <section className="prize-card">

            <div className="prize-card-header">

                <h2>

                    🏆 Premio Mayor

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

                prize && (

                    <>

                        <div className="prize-main">

                            <span>

                                Premio Acumulado

                            </span>

                            <h1>

                                $

                                {

                                    formatCurrency(

                                        prize.mainPrize ||

                                        1000000

                                    )

                                }

                            </h1>

                        </div>

                        <div className="prize-info">

                            <div className="prize-item">

                                <span>

                                    🎡 Bolsa Ruleta

                                </span>

                                <strong>

                                    $

                                    {

                                        formatCurrency(

                                            prize.prizePool ||

                                            0

                                        )

                                    }

                                </strong>

                            </div>

                            <div className="prize-item">

                                <span>

                                    👥 Participantes

                                </span>

                                <strong>

                                    {

                                        prize.currentParticipants ||

                                        0

                                    }

                                    /

                                    {

                                        prize.maxParticipants ||

                                        100

                                    }

                                </strong>

                            </div>

                            <div className="prize-item">

                                <span>

                                    📅 Estado

                                </span>

                                <strong
                                    className={`prize-status ${

                                        prize.status?.toLowerCase()

                                    }`}
                                >

                                    {

                                        prize.status ||

                                        "ABIERTA"

                                    }

                                </strong>

                            </div>

                        </div>

                    </>

                )

            }

        </section>

    );

}

export default PrizeCard;