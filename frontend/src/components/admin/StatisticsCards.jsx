// ==========================================
// src/components/admin/StatisticsCards.jsx
// ==========================================

import { useEffect, useState } from "react";

import statisticsService from "../../services/statisticsService";

import Loader from "../common/Loader";
import Alert from "../common/Alert";

import "./StatisticsCards.css";

function StatisticsCards() {

    // ==========================================
    // Estados
    // ==========================================

    const [stats, setStats] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    // ==========================================
    // useEffect
    // ==========================================

    useEffect(() => {

        loadStatistics();

    }, []);

    // ==========================================
    // Cargar Estadísticas
    // ==========================================

    const loadStatistics = async () => {

        try {

            setLoading(true);

            setError("");

            const response = await statisticsService.getDashboardStatistics();

            const data = response.data || response;

            setStats(data);

        } catch (err) {

            setError(

                err.response?.data?.message ||

                "No fue posible cargar las estadísticas."

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
    // Error
    // ==========================================

    if (error) {

        return (

            <Alert

                type="error"

                message={error}

            />

        );

    }

    // ==========================================
    // Render
    // ==========================================

    return (

        <section className="statistics-cards">

            <div className="statistics-card users">

                <div className="statistics-icon">

                    👥

                </div>

                <h3>

                    Usuarios

                </h3>

                <h2>

                    {

                        stats?.totalUsers ||

                        0

                    }

                </h2>

            </div>

            <div className="statistics-card payments">

                <div className="statistics-icon">

                    💳

                </div>

                <h3>

                    Pagos

                </h3>

                <h2>

                    {

                        stats?.totalPayments ||

                        0

                    }

                </h2>

            </div>

            <div className="statistics-card tickets">

                <div className="statistics-icon">

                    🎟

                </div>

                <h3>

                    Tickets

                </h3>

                <h2>

                    {

                        stats?.totalTickets ||

                        0

                    }

                </h2>

            </div>

            <div className="statistics-card rounds">

                <div className="statistics-icon">

                    🎯

                </div>

                <h3>

                    Rondas

                </h3>

                <h2>

                    {

                        stats?.totalRounds ||

                        0

                    }

                </h2>

            </div>

            <div className="statistics-card revenue">

                <div className="statistics-icon">

                    💰

                </div>

                <h3>

                    Recaudado

                </h3>

                <h2>

                    $

                    {

                        formatCurrency(

                            stats?.totalRevenue ||

                            0

                        )

                    }

                </h2>

            </div>

            <div className="statistics-card prizes">

                <div className="statistics-icon">

                    🏆

                </div>

                <h3>

                    Premios

                </h3>

                <h2>

                    $

                    {

                        formatCurrency(

                            stats?.totalPrizes ||

                            0

                        )

                    }

                </h2>

            </div>

        </section>

    );

}

export default StatisticsCards;