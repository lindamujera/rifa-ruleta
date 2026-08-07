// ==========================================
// src/components/dashboard/QuickActions.jsx
// ==========================================

import { useNavigate } from "react-router-dom";

import "./QuickActions.css";

function QuickActions() {

    const navigate = useNavigate();

    const actions = [

        {
            title: "Realizar Pago",
            description: "Registra un nuevo pago para participar.",
            icon: "💳",
            color: "blue",
            path: "/payments"
        },

        {
            title: "Girar Ruleta",
            description: "Utiliza tus giros disponibles.",
            icon: "🎡",
            color: "green",
            path: "/roulette"
        },

        {
            title: "Mis Tickets",
            description: "Consulta tus tickets activos.",
            icon: "🎟",
            color: "orange",
            path: "/tickets"
        },

        {
            title: "Mi Perfil",
            description: "Actualiza tu información personal.",
            icon: "👤",
            color: "purple",
            path: "/profile"
        },

        {
            title: "Historial",
            description: "Consulta pagos, premios y giros.",
            icon: "📜",
            color: "red",
            path: "/history"
        },

        {
            title: "Panel Administrativo",
            description: "Administración del sistema.",
            icon: "⚙️",
            color: "dark",
            path: "/admin"
        }

    ];

    return (

        <section className="quick-actions">

            <div className="quick-actions-header">

                <h2>

                    ⚡ Acciones Rápidas

                </h2>

                <p>

                    Accede rápidamente a las funciones principales de la plataforma.

                </p>

            </div>

            <div className="quick-actions-grid">

                {

                    actions.map((action, index) => (

                        <div

                            key={index}

                            className={`quick-action-card ${action.color}`}

                            onClick={() => navigate(action.path)}

                        >

                            <div className="quick-action-icon">

                                {action.icon}

                            </div>

                            <div className="quick-action-content">

                                <h3>

                                    {action.title}

                                </h3>

                                <p>

                                    {action.description}

                                </p>

                            </div>

                        </div>

                    ))

                }

            </div>

        </section>

    );

}

export default QuickActions;