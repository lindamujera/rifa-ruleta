// ==========================================
// src/pages/Tickets.jsx - Selector de Números
// ==========================================

import { useEffect, useState } from "react";
import TicketService from "../services/ticketService";
import { useAuth } from "../context/AuthContext";
import "../styles/Tickets.css";

export default function Tickets() {
    const { user, isAuthenticated } = useAuth();

    // Estados
    const [numeroSeleccionado, setNumeroSeleccionado] = useState(null);
    const [numerosOcupados, setNumerosOcupados] = useState([]);
    const [ticketPendiente, setTicketPendiente] = useState(null);
    const [loading, setLoading] = useState(true);
    const [guardando, setGuardando] = useState(false);
    const [mensaje, setMensaje] = useState("");

    // Cargar números ocupados y verificar ticket activo
    const cargarDatosRonda = async () => {
        try {
            setLoading(true);
            if (!user) return;

            // Obtener tickets del usuario para identificar cuál no tiene número asignado
            const resTickets = await TicketService.obtenerTicketsUsuario(user.id || user._id);
            const tickets = resTickets.data || [];
            
            const pendiente = tickets.find((t) => t.numeroRifa === null || t.numeroRifa === undefined);
            setTicketPendiente(pendiente);

            // Si hay un ticket o una ronda activa, obtener los números ya ocupados por otros
            if (tickets.length > 0 && tickets[0].ronda?._id) {
                const resRonda = await TicketService.obtenerTicketsRonda(tickets[0].ronda._id);
                const ocupados = (resRonda.data || [])
                    .filter((item) => item.numeroRifa !== null && item.numeroRifa !== undefined)
                    .map((item) => item.numeroRifa);

                setNumerosOcupados(ocupados);
            }
        } catch (error) {
            console.error("Error al cargar la tabla de números:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated && user) {
            cargarDatosRonda();
        }
    }, [isAuthenticated, user]);

    // Confirmar la selección del número
    const confirmarNumero = async () => {
        if (!numeroSeleccionado) return;

        try {
            setGuardando(true);
            setMensaje("");

            if (!ticketPendiente) {
                alert("No tienes tickets pendientes por asignar número.");
                return;
            }

            await TicketService.escogerNumero(ticketPendiente._id, numeroSeleccionado);
            setMensaje(`¡Número #${numeroSeleccionado} asignado con éxito!`);
            
            // Recargar datos para actualizar los números ocupados
            await cargarDatosRonda();
            setNumeroSeleccionado(null);
        } catch (error) {
            alert(error.message || "Error al guardar el número.");
        } finally {
            setGuardando(false);
        }
    };

    if (loading) {
        return <div className="tickets-loading">Cargando tabla de números...</div>;
    }

    return (
        <div className="selector-container">
            <h2>🎟 Selecciona tu Número de Rifa</h2>
            <p className="subtitulo">Escoge un número disponible entre el <strong>1 y el 99</strong></p>

            {mensaje && <div className="alerta-exito">{mensaje}</div>}

            {/* TABLA / CUADRÍCULA DEL 1 AL 99 */}
            {/* TABLA DEL 00 AL 99 */}
            <div className="numbers-grid">
                {Array.from({ length: 100 }, (_, i) => i).map((numero) => {
                    const estaOcupado = numerosOcupados.includes(numero);
                    const esSeleccionado = numeroSeleccionado === numero;
                    const numeroTexto = String(numero).padStart(2, "0");

                    return (
                        <button
                            key={numero}
                            disabled={estaOcupado}
                            onClick={() => setNumeroSeleccionado(numero)}
                            className={
                                estaOcupado
                                    ? "number-btn occupied"
                                    : esSeleccionado
                                    ? "number-btn selected"
                                    : "number-btn"
                            }
                        >
                            {numeroTexto}
                        </button>
                    );
                })}
            </div>

            {/* CONFIRMACIÓN */}
            <div className="footer-acciones">
                {numeroSeleccionado ? (
                    <p className="info-seleccion">Número seleccionado: <strong>#{numeroSeleccionado}</strong></p>
                ) : (
                    <p className="info-seleccion">Haz clic en un número libre para elegirlo.</p>
                )}

                <button
                    className="btn-confirmar"
                    disabled={!numeroSeleccionado || guardando}
                    onClick={confirmarNumero}
                >
                    {guardando ? "Guardando..." : "Confirmar Selección"}
                </button>
            </div>
        </div>
    );
}
