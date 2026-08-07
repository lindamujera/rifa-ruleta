// ==========================================
// src/components/admin/PrizePoolCard.jsx
// ==========================================

import { useEffect, useState } from "react";

import prizePoolService from "../../services/prizePoolService";

import Loader from "../common/Loader";
import Alert from "../common/Alert";

import "./PrizePoolCard.css";

function PrizePoolCard() {

    const [prizePool, setPrizePool] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    // ==========================================
    // Cargar Bolsa de Premios
    // ==========================================

    useEffect(() => {

        loadPrizePool();

    }, []);

    const loadPrizePool = async () => {

        try {

            setLoading(true);

            setError("");

            const response = await prizePoolService.getCurrentPrizePool();

            const data = response.data || response;

            setPrizePool(data);

        } catch (err) {

            setError(

                err.response?.data?.message ||

                "No fue posible cargar la bolsa de premios."

            );

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Formato Moneda
    // ==========================================

    const formatCurrency = (value = 0) => {

        return Number(value).toLocaleString("es-CO");

    };

    // ==========================================
    // Loading
    // ==========================================

    if (loading) {

        return <Loader />;

    }

    // ==========================================
    // Render
    // ==========================================

    return (

        <section className="prize-pool-card">

            <div className="prize-pool-header">

                <h2>

                    💰 Bolsa de Premios

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

                prizePool && (

                    <div className="prize-pool-grid">

                        <div className="pool-item">

                            <span>

                                🏆 Premio Mayor

                            </span>

                            <strong>

                                $

                                {

                                    formatCurrency(

                                        prizePool.mainPrize ||

                                        1000000

                                    )

                                }

                            </strong>

                        </div>

                        <div className="pool-item">

                            <span>

                                💰 Bolsa Acumulada

                            </span>

                            <strong>

                                $

                                {

                                    formatCurrency(

                                        prizePool.prizePool ||

                                        0

                                    )

                                }

                            </strong>

                        </div>

                        <div className="pool-item">

                            <span>

                                👥 Participantes

                            </span>

                            <strong>

                                {

                                    prizePool.currentParticipants ||

                                    0

                                }

                                /

                                {

                                    prizePool.maxParticipants ||

                                    100

                                }

                            </strong>

                        </div>

                        <div className="pool-item">

                            <span>

                                📊 Estado

                            </span>

                            <strong
                                className={`pool-status ${

                                    prizePool.status?.toLowerCase()

                                }`}
                            >

                                {

                                    prizePool.status ||

                                    "ABIERTA"

                                }

                            </strong>

                        </div>

                    </div>

                )

            }

        </section>

    );

}

export default PrizePoolCard;