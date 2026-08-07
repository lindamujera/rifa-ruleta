// ==========================================
// src/components/admin/Statistics.jsx
// ==========================================

import { useEffect, useState } from "react";

import statisticsService from "../../services/statisticsService";

import Loader from "../common/Loader";
import Alert from "../common/Alert";

import "./Statistics.css";

function Statistics() {

    // ==========================================
    // Estados
    // ==========================================

    const [statistics, setStatistics] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    // ==========================================
    // useEffect
    // ==========================================

    useEffect(() => {

        loadStatistics();

    }, []);

    // ==========================================
    // Funciones
    // ==========================================

    const loadStatistics = async () => {

        try {

            setLoading(true);

            setError("");

            const response = await statisticsService.getDashboardStatistics();

            const data = response.data || response;

            setStatistics(data);

        } catch (err) {

            setError(

                err.response?.data?.message ||

                "No fue posible cargar las estadísticas."

            );

        } finally {

            setLoading(false);

        }

    };

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

        <section className="statistics-container">

            <div className="statistics-header">

                <h2>

                    📊 Estadísticas Generales

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

                statistics && (

                    <div className="statistics-grid">

                        <div className="statistics-card">

                            <span>

                                👥 Usuarios

                            </span>

                            <strong>

                                {

                                    statistics.totalUsers ||

                                    0

                                }

                            </strong>

                        </div>

                        <div className="statistics-card">

                            <span>

                                💳 Pagos

                            </span>

                            <strong>

                                {

                                    statistics.totalPayments ||

                                    0

                                }

                            </strong>

                        </div>

                        <div className="statistics-card">

                            <span>

                                🎟 Tickets

                            </span>

                            <strong>

                                {

                                    statistics.totalTickets ||

                                    0

                                }

                            </strong>

                        </div>

                        <div className="statistics-card">

                            <span>

                                🎯 Rondas

                            </span>

                            <strong>

                                {

                                    statistics.totalRounds ||

                                    0

                                }

                            </strong>

                        </div>

                        <div className="statistics-card">

                            <span>

                                💰 Recaudado

                            </span>

                            <strong>

                                $

                                {

                                    formatCurrency(

                                        statistics.totalRevenue ||

                                        0

                                    )

                                }

                            </strong>

                        </div>

                        <div className="statistics-card">

                            <span>

                                🏆 Premios Entregados

                            </span>

                            <strong>

                                $

                                {

                                    formatCurrency(

                                        statistics.totalPrizes ||

                                        0

                                    )

                                }

                            </strong>

                        </div>

                    </div>

                )

            }

        </section>

    );

}

export default Statistics;