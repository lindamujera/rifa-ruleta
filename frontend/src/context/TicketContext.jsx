// ==========================================
// src/context/TicketContext.jsx
// ==========================================

import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import TicketService from "../services/ticketService";

// ==========================================
// Crear Contexto
// ==========================================

const TicketContext = createContext();

// ==========================================
// Hook personalizado
// ==========================================

export const useTicket = () => {

    const context = useContext(TicketContext);

    if (!context) {

        throw new Error(
            "useTicket debe usarse dentro de TicketProvider"
        );

    }
    }

// ==========================================
// Provider
// ==========================================

export function TicketProvider({ children }) {

    const [tickets, setTickets] = useState([]);

    const [ticket, setTicket] = useState(null);

    const [numeroSeleccionado, setNumeroSeleccionado] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    // ==========================================
    // Obtener Tickets del Usuario
    // ==========================================

    const cargarMisTickets = async (usuarioId) => {

        if (!usuarioId) return;

        try {

            setLoading(true);

            setError(null);

            const response =
                await TicketService.obtenerTicketsUsuario(
                    usuarioId
                );

            setTickets(
                response.data || []
            );

        } catch (err) {

            console.error(err);

            setError(

                err.message ||

                "No fue posible cargar los tickets."

            );

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Obtener Ticket por ID
    // ==========================================

    const cargarTicket = async (ticketId) => {

        try {

            setLoading(true);

            const response =
                await TicketService.obtenerTicket(
                    ticketId
                );

            setTicket(
                response.data || null
            );

        } catch (err) {

            console.error(err);

            setError(

                err.message ||

                "No fue posible cargar el ticket."

            );

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Crear Ticket
    // ==========================================

    const crearTicket = async (

        usuarioId,

        pagoId,

        rondaId

    ) => {

        try {

            setLoading(true);

            const response =
                await TicketService.crearTicket({

                    usuarioId,

                    pagoId,

                    rondaId

                });

            return response;

        } catch (err) {

            console.error(err);

            throw err;

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Escoger Número
    // ==========================================

    const escogerNumero = async (

        ticketId,

        numero

    ) => {

        try {

            setLoading(true);

            const response =
                await TicketService.escogerNumero(

                    ticketId,

                    numero

                );

            setNumeroSeleccionado(numero);

            await cargarTicket(ticketId);

            return response;

        } catch (err) {

            console.error(err);

            throw err;

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Validar Número Disponible
    // ==========================================

    const validarNumero = async (

        rondaId,

        numero

    ) => {

        try {

            const response =
                await TicketService.validarNumero(

                    rondaId,

                    numero

                );

            return response.disponible;

        } catch (err) {

            console.error(err);

            return false;

        }

    };

    // ==========================================
    // Obtener Número del Ticket
    // ==========================================

    const obtenerNumero = async (ticketId) => {

        try {

            const response =
                await TicketService.obtenerNumero(
                    ticketId
                );

            return response.numero;

        } catch (err) {

            console.error(err);

            return null;

        }

    };

    // ==========================================
    // Verificar si el Usuario ya Tiene Ticket
    // ==========================================

    const usuarioTieneTicket = async (

        usuarioId,

        rondaId

    ) => {

        try {

            const response =
                await TicketService.usuarioTieneTicket(

                    usuarioId,

                    rondaId

                );

            return response.existe;

        } catch (err) {

            console.error(err);

            return false;

        }

    };

    // ==========================================
    // Obtener Tickets de una Ronda
    // ==========================================

    const obtenerTicketsRonda = async (rondaId) => {

        try {

            const response =
                await TicketService.obtenerTicketsRonda(
                    rondaId
                );

            return response.data || [];

        } catch (err) {

            console.error(err);

            return [];

        }

    };

    // ==========================================
    // Limpiar Ticket Actual
    // ==========================================

    const limpiarTicket = () => {

        setTicket(null);

        setNumeroSeleccionado(null);

    };

    // ==========================================
    // Valores Compartidos
    // ==========================================

    const value = {

        loading,

        error,

        tickets,

        ticket,

        numeroSeleccionado,

        cargarMisTickets,

        cargarTicket,

        crearTicket,

        escogerNumero,

        validarNumero,

        obtenerNumero,

        usuarioTieneTicket,

        obtenerTicketsRonda,

        limpiarTicket,

        setNumeroSeleccionado

    };

    return (

        <TicketContext.Provider value={value}>

            {children}

        </TicketContext.Provider>

    );

}

export default TicketContext;