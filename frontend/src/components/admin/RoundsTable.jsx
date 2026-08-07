// ==========================================
// src/components/admin/RoundsTable.jsx
// ==========================================

import { useEffect, useState } from "react";

import roundService from "../../services/roundService";

import Loader from "../common/Loader";
import Alert from "../common/Alert";
import Button from "../common/Button";

import "./RoundsTable.css";

   function RoundsTable() {

    // ==========================================
    // Estados
    // ==========================================

    const [rounds, setRounds] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [processingId, setProcessingId] = useState(null);

    // ==========================================
    // Cargar Rondas
    // ==========================================

    useEffect(() => {

        loadRounds();

    }, []);

    const loadRounds = async () => {

        try {

            setLoading(true);

            setError("");

            const response = await roundService.getAllRounds();

            const data = response.data || response || [];

            setRounds(data);

        } catch (err) {

            setError(

                err.response?.data?.message ||

                "No fue posible cargar las rondas."

            );

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Abrir Ronda
    // ==========================================

    const openRound = async (roundId) => {

        try {

            setProcessingId(roundId);

            await roundService.openRound(roundId);

            await loadRounds();

        } catch (err) {

            alert(

                err.response?.data?.message ||

                "No fue posible abrir la ronda."

            );

        } finally {

            setProcessingId(null);

        }

    };

    // ==========================================
    // Cerrar Ronda
    // ==========================================

    const closeRound = async (roundId) => {

        try {

            setProcessingId(roundId);

            await roundService.closeRound(roundId);

            await loadRounds();

        } catch (err) {

            alert(

                err.response?.data?.message ||

                "No fue posible cerrar la ronda."

            );

        } finally {

            setProcessingId(null);

        }

    };

    // ==========================================
    // Seleccionar Ganador
    // ==========================================

    const drawWinner = async (roundId) => {

        try {

            setProcessingId(roundId);

            await roundService.drawWinner(roundId);

            await loadRounds();

        } catch (err) {

            alert(

                err.response?.data?.message ||

                "No fue posible realizar el sorteo."

            );

        } finally {

            setProcessingId(null);

        }

    };

    // ==========================================
    // Formato Moneda
    // ==========================================

    const formatCurrency = (value = 0) => {

        return Number(value).toLocaleString("es-CO");

    };

    // ==========================================
    // Formato Fecha
    // ==========================================

    const formatDate = (date) => {

        if (!date) return "-";

        return new Date(date).toLocaleString("es-CO");

    };

    // ==========================================
    // Clase del Estado
    // ==========================================

    const getStatusClass = (status = "") => {

        switch (status.toLowerCase()) {

            case "open":

            case "abierta":

            case "activa":

                return "open";

            case "closed":

            case "cerrada":

                return "closed";

            case "finished":

            case "finalizada":

                return "finished";

            default:

                return "pending";

        }

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

        <section className="rounds-table-container">

            <div className="rounds-table-header">

                <h2>

                    🎯 Administración de Rondas

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

                rounds.length === 0 ? (

                    <Alert

                        type="info"

                        message="No existen rondas registradas."

                    />

                ) : (

                    <table className="rounds-table">

                        <thead>

                            <tr>

                                <th>Ronda</th>

                                <th>Participantes</th>

                                <th>Premio Mayor</th>

                                <th>Bolsa</th>

                                <th>Fecha</th>

                                <th>Estado</th>

                                <th>Acciones</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                rounds.map((round) => (

                                    <tr

                                        key={round._id}

                                    >

                                        <td>

                                            {

                                                round.number ||

                                                round.roundNumber ||

                                                "-"

                                            }

                                        </td>

                                        <td>

                                            {

                                                round.currentParticipants ||

                                                0

                                            }

                                            /

                                            {

                                                round.maxParticipants ||

                                                100

                                            }

                                        </td>

                                        <td>

                                            $

                                            {

                                                formatCurrency(

                                                    round.mainPrize ||

                                                    1000000

                                                )

                                            }

                                        </td>

                                        <td>

                                            $

                                            {

                                                formatCurrency(

                                                    round.prizePool ||

                                                    0

                                                )

                                            }

                                        </td>

                                        <td>

                                            {

                                                formatDate(

                                                    round.createdAt

                                                )

                                            }

                                        </td>

                                        <td>

                                            <span

                                                className={`round-status ${

                                                    getStatusClass(

                                                        round.status ||

                                                        "pending"

                                                    )

                                                }`}

                                            >

                                                {

                                                    round.status ||

                                                    "Pendiente"

                                                }

                                            </span>

                                        </td>

                                        <td>

                                            <div className="round-actions">

                                                {

                                                    (round.status === "OPEN" ||

                                                    round.status === "Abierta" ||

                                                    round.status === "open") && (

                                                        <Button

                                                            className="btn-close"

                                                            disabled={

                                                                processingId === round._id

                                                            }

                                                            onClick={() =>

                                                                closeRound(round._id)

                                                            }

                                                        >

                                                            Cerrar

                                                        </Button>

                                                    )

                                                }

                                                {

                                                    (round.status === "CLOSED" ||

                                                    round.status === "Cerrada" ||

                                                    round.status === "closed") && (

                                                        <Button

                                                            className="btn-open"

                                                            disabled={

                                                                processingId === round._id

                                                            }

                                                            onClick={() =>

                                                                openRound(round._id)

                                                            }

                                                        >

                                                            Abrir

                                                        </Button>

                                                    )

                                                }

                                                <Button

                                                    className="btn-draw"

                                                    disabled={

                                                        processingId === round._id

                                                    }

                                                    onClick={() =>

                                                        drawWinner(round._id)

                                                    }

                                                >

                                                    Sortear

                                                </Button>

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                )

            }

        </section>

    );

    // ==========================================
    // Funciones
    // ==========================================

    const loadRounds = async () => {

        try {

            setLoading(true);

            setError("");

            const response = await roundService.getAllRounds();

            const data = response.data || response || [];

            setRounds(data);

        } catch (err) {

            setError(

                err.response?.data?.message ||

                "No fue posible cargar las rondas."

            );

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Abrir Ronda
    // ==========================================

    const openRound = async (roundId) => {

        try {

            setProcessingId(roundId);

            await roundService.openRound(roundId);

            await loadRounds();

        } catch (err) {

            alert(

                err.response?.data?.message ||

                "No fue posible abrir la ronda."

            );

        } finally {

            setProcessingId(null);

        }

    };

    // ==========================================
    // Cerrar Ronda
    // ==========================================

    const closeRound = async (roundId) => {

        try {

            setProcessingId(roundId);

            await roundService.closeRound(roundId);

            await loadRounds();

        } catch (err) {

            alert(

                err.response?.data?.message ||

                "No fue posible cerrar la ronda."

            );

        } finally {

            setProcessingId(null);

        }

    };

    // ==========================================
    // Sortear Ganador
    // ==========================================

    const drawWinner = async (roundId) => {

        try {

            setProcessingId(roundId);

            await roundService.drawWinner(roundId);

            await loadRounds();

        } catch (err) {

            alert(

                err.response?.data?.message ||

                "No fue posible realizar el sorteo."

            );

        } finally {

            setProcessingId(null);

        }

    };

    // ==========================================
    // Formato Moneda
    // ==========================================

    const formatCurrency = (value = 0) => {

        return Number(value).toLocaleString("es-CO");

    };

    // ==========================================
    // Formato Fecha
    // ==========================================

    const formatDate = (date) => {

        if (!date) return "-";

        return new Date(date).toLocaleString("es-CO");

    };

    // ==========================================
    // Clase del Estado
    // ==========================================

    const getStatusClass = (status = "") => {

        switch (status.toLowerCase()) {

            case "open":

            case "abierta":

            case "activa":

                return "open";

            case "closed":

            case "cerrada":

                return "closed";

            case "finished":

            case "finalizada":

                return "finished";

            default:

                return "pending";

        }

    };

    // ==========================================
    // Loading
    // ==========================================

    if (loading) {

        return <Loader />;

    }

}

export default RoundsTable;