// ==========================================
// src/components/dashboard/DashboardCards.jsx
// ==========================================

import "./DashboardCards.css";

function DashboardCards({

    ticketNumber = "---",

    availableSpins = 0,

    participants = 0,

    maxParticipants = 100,

    jackpot = 1000000

}) {

    const formatCurrency = (value = 0) =>

        Number(value).toLocaleString("es-CO");

    return (

        <section className="dashboard-cards">

            {/* ========================================== */}
            {/* Ticket */}
            {/* ========================================== */}

            <div className="dashboard-card">

                <div className="dashboard-card-icon">

                    🎟

                </div>

                <div className="dashboard-card-content">

                    <h4>

                        Mi Ticket

                    </h4>

                    <h2>

                        {ticketNumber}

                    </h2>

                    <p>

                        Número asignado

                    </p>

                </div>

            </div>

            {/* ========================================== */}
            {/* Giros */}
            {/* ========================================== */}

            <div className="dashboard-card">

                <div className="dashboard-card-icon">

                    🎡

                </div>

                <div className="dashboard-card-content">

                    <h4>

                        Giros Disponibles

                    </h4>

                    <h2>

                        {availableSpins}

                    </h2>

                    <p>

                        Puedes girar la ruleta

                    </p>

                </div>

            </div>

            {/* ========================================== */}
            {/* Participantes */}
            {/* ========================================== */}

            <div className="dashboard-card">

                <div className="dashboard-card-icon">

                    👥

                </div>

                <div className="dashboard-card-content">

                    <h4>

                        Participantes

                    </h4>

                    <h2>

                        {participants} / {maxParticipants}

                    </h2>

                    <p>

                        Ronda actual

                    </p>

                </div>

            </div>

            {/* ========================================== */}
            {/* Premio */}
            {/* ========================================== */}

            <div className="dashboard-card jackpot">

                <div className="dashboard-card-icon">

                    🏆

                </div>

                <div className="dashboard-card-content">

                    <h4>

                        Premio Mayor

                    </h4>

                    <h2>

                        $

                        {

                            formatCurrency(

                                jackpot

                            )

                        }

                    </h2>

                    <p>

                        Premio de la ronda

                    </p>

                </div>

            </div>

        </section>

    );

}

export default DashboardCards;