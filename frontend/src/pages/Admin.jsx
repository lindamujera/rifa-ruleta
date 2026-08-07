// ==========================================
// src/pages/Admin.jsx
// ========================================== 
 
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom"; 

import { useAuth } from "../context/AuthContext";
import PaymentTable from "../components/admin/PaymentTable";
import paymentService from "../services/paymentService";
import "../styles/Admin.css";

export default function Admin() {

    // ==========================================
    // Estados
    // ==========================================

    const [loading, setLoading] = useState(true);

    const [estadisticas, setEstadisticas] = useState({

        usuarios: 0,

        pagosPendientes: 0,

        pagosAprobados: 0,

        tickets: 0,

        rondas: 0,

        premioMayor: 1000000

    });

    const [error, setError] = useState("");

    const { user } = useAuth();

    // ==========================================
    // Redirigir si no es ADMIN
    // ==========================================

    if (!user || user.rol !== "ADMIN") {
        return <Navigate to="/login" replace />;
    }

    // ==========================================
    // Cargar estadísticas
    // ==========================================

    const cargarDashboard = async () => {

        try {

            setLoading(true);

            const pagosPendientes = await paymentService.obtenerPendientes();
            const pagosAprobados = await paymentService.obtenerAprobados();

            setEstadisticas({
                usuarios: 0,
                pagosPendientes: pagosPendientes.data.total || 0,
                pagosAprobados: pagosAprobados.data.total || 0,
                tickets: 0,
                rondas: 0,
                premioMayor: 1000000
            });

        } catch (error) {

            console.error(error);

            setError(

                error.response?.data?.message ||

                "No fue posible cargar el Dashboard."

            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        cargarDashboard();

    }, []);

    // ==========================================
    // Loading
    // ==========================================

    if (loading) {

        return (

            <div className="admin-loading">

                <div className="loader"></div>

                <h2>

                    Cargando Panel Administrativo...

                </h2>

            </div>

        );

    }

    // ==========================================
    // Error
    // ==========================================

    if (error) {

        return (

            <div className="admin-error">

                <h2>Error</h2>

                <p>{error}</p>

            </div>

        );

    }

    // ==========================================
    // Vista principal
    // ==========================================

    return (

        <div className="admin-page">

            {/* HEADER */}

            <section className="admin-header">

                <h1>

                    Panel Administrador

                </h1>

                <p>

                    Administración general de la plataforma
                    Rifa-Ruleta.

                </p>

            </section>

            {/* TARJETAS */}

            <section className="admin-cards">

                <div className="admin-card">

                    <h3>Usuarios</h3>

                    <h2>

                        {estadisticas.usuarios}

                    </h2>

                </div>

                <div className="admin-card">

                    <h3>Pagos Pendientes</h3>

                    <h2>

                        {estadisticas.pagosPendientes}

                    </h2>

                </div>

                <div className="admin-card">

                    <h3>Pagos Aprobados</h3>

                    <h2>

                        {estadisticas.pagosAprobados}

                    </h2>

                </div>

                <div className="admin-card">

                    <h3>Tickets</h3>

                    <h2>

                        {estadisticas.tickets}

                    </h2>

                </div>

                <div className="admin-card">

                    <h3>Rondas Activas</h3>

                    <h2>

                        {estadisticas.rondas}

                    </h2>

                </div>

                <div className="admin-card premio">

                    <h3>

                        Premio Mayor

                    </h3>

                    <h2>

                        $

                        {

                            estadisticas.premioMayor.toLocaleString(

                                "es-CO"

                            )

                        }

                    </h2>

                </div>

            </section>

            {/* PAGOS PENDIENTES */}

            <section className="admin-payments-section">
                <h2>Pagos pendientes</h2>
                <PaymentTable />
            </section>

            {/* ACCESOS */}

            <section className="admin-actions">

                <button>

                    Aprobar Pagos

                </button>

                <button>

                    Usuarios

                </button>

                <button>

                    Tickets

                </button>

                <button>

                    Rondas

                </button>

                <button>

                    Reportes

                </button>

                <button>

                    Configuración

                </button>

            </section>

            {/* INFORMACIÓN */}

            <section className="admin-information">

                <h2>

                    Estado General

                </h2>

                <p>

                    Desde este panel podrás administrar todos los
                    procesos de la plataforma Rifa-Ruleta:

                </p>

                <ul>

                    <li>

                        ✔ Aprobar pagos.

                    </li>

                    <li>

                        ✔ Administrar usuarios.

                    </li>

                    <li>

                        ✔ Supervisar tickets.

                    </li>

                    <li>

                        ✔ Gestionar rondas.

                    </li>

                    <li>

                        ✔ Consultar estadísticas.

                    </li>

                    <li>

                        ✔ Visualizar auditorías.

                    </li>

                </ul>

            </section>

        </div>

    );

}