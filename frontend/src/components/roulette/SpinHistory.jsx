// ==========================================
// src/components/roulette/SpinHistory.jsx
// ==========================================

import { useEffect, useState } from "react";

import rouletteService from "../../services/rouletteService";

import Loader from "../common/Loader";
import Alert from "../common/Alert";

import "./SpinHistory.css";

function SpinHistory({

    userId = null,

    limit = 10,

    refresh = false

}) {

    const [history, setHistory] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    // ==========================================
    // Cargar historial
    // ==========================================

    useEffect(() => {

        loadHistory();

    }, [userId, refresh]);

    // ==========================================
    // Obtener historial
    // ==========================================

    const loadHistory = async () => {

        try {

            setLoading(true);

            setError("");

            let response;

            if (userId) {

                response = await rouletteService.getHistoryByUser(

                    userId

                );

            } else {

                response = await rouletteService.getHistory();

            }

            const spins =

                response.data ||

                response ||

                [];

            setHistory(

                spins.slice(0, limit)

            );

        } catch (err) {

            setError(

                err.response?.data?.message ||

                err.message ||

                "No fue posible cargar el historial."

            );

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Formateadores
    // ==========================================

    const formatMoney = (value = 0) =>

        Number(value).toLocaleString("es-CO");

    const formatDate = (date) => {

        if (!date) return "-";

        return new Date(date).toLocaleString("es-CO");

    };

    // ==========================================
    // Loading
    // ==========================================

    if (loading) {

        return <Loader />;

    }

    return (

        <div className="spin-history">

            <div className="spin-history-header">

                <h2>

                    🎡 Historial de Giros

                </h2>

                <button

                    className="refresh-history"

                    onClick={loadHistory}

                >

                    Actualizar

                </button>

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

                history.length === 0 ? (

                    <Alert

                        type="info"

                        message="Todavía no existen giros registrados."

                    />

                ) : (

                    <div className="spin-history-table">

                        <table>

                            <thead>

                                <tr>

                                    <th>Fecha</th>

                                    <th>Premio</th>

                                    <th>Resultado</th>

                                    <th>Estado</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    history.map(

                                        (spin) => (

                                            <tr

                                                key={

                                                    spin._id

                                                }

                                            >

                                                <td>

                                                    {

                                                        formatDate(

                                                            spin.createdAt

                                                        )

                                                    }

                                                </td>

                                                <td>

                                                    {

                                                        spin.prize

                                                            ? `$ ${formatMoney(

                                                                  spin.prize

                                                              )}`

                                                            : "Sin premio"

                                                    }

                                                </td>

                                                <td>

                                                    {

                                                        spin.result ||

                                                        "No disponible"

                                                    }

                                                </td>

                                                <td>

                                                    <span

                                                        className={`spin-status ${

                                                            spin.status?.toLowerCase() ||

                                                            "completed"

                                                        }`}

                                                    >

                                                        {

                                                            spin.status ||

                                                            "COMPLETADO"

                                                        }

                                                    </span>

                                                </td>

                                            </tr>

                                        )

                                    )

                                }

                            </tbody>

                        </table>

                    </div>

                )

            }

        </div>

    );

}

export default SpinHistory;