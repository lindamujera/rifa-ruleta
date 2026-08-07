// ==========================================
// src/components/dashboard/DashboardStats.jsx
// ==========================================

import "./DashboardStats.css";

function DashboardStats({

    totalTickets = 0,

    totalSpins = 0,

    totalWins = 0,

    totalPrize = 0,

    pendingPayments = 0,

    completedPayments = 0

}) {

    const formatCurrency = (value = 0) =>

        Number(value).toLocaleString("es-CO");

    const stats = [

        {
            icon: "🎟",
            title: "Tickets",
            value: totalTickets,
            description: "Tickets adquiridos"
        },

        {
            icon: "🎡",
            title: "Giros",
            value: totalSpins,
            description: "Giros realizados"
        },

        {
            icon: "🏆",
            title: "Premios",
            value: totalWins,
            description: "Premios ganados"
        },

        {
            icon: "💰",
            title: "Ganancias",
            value: `$ ${formatCurrency(totalPrize)}`,
            description: "Premios acumulados"
        },

        {
            icon: "⏳",
            title: "Pagos Pendientes",
            value: pendingPayments,
            description: "En revisión"
        },

        {
            icon: "✅",
            title: "Pagos Aprobados",
            value: completedPayments,
            description: "Confirmados"
        }

    ];

    return (

        <section className="dashboard-stats">

            <h2 className="dashboard-stats-title">

                📊 Estadísticas

            </h2>

            <div className="dashboard-stats-grid">

                {

                    stats.map((item, index) => (

                        <div

                            key={index}

                            className="dashboard-stat-card"

                        >

                            <div className="dashboard-stat-icon">

                                {item.icon}

                            </div>

                            <div className="dashboard-stat-content">

                                <h4>

                                    {item.title}

                                </h4>

                                <h2>

                                    {item.value}

                                </h2>

                                <p>

                                    {item.description}

                                </p>

                            </div>

                        </div>

                    ))

                }

            </div>

        </section>

    );

}

export default DashboardStats;