// ==========================================
// src/hooks/useTicket.js
// ==========================================

import { useState, useEffect, useCallback } from "react";

import ticketService from "../services/ticketService";

function useTicket() {

    const [tickets, setTickets] = useState([]);

    const [currentTicket, setCurrentTicket] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    // ==========================================
    // Obtener tickets del usuario
    // ==========================================

    const loadTickets = useCallback(async () => {

        try {

            setLoading(true);

            setError("");

            const response = await ticketService.getMyTickets();

            const data = response.data || response || [];

            setTickets(data);

        } catch (err) {

            setError(

                err.response?.data?.message ||

                "No fue posible cargar los tickets."

            );

        } finally {

            setLoading(false);

        }

    }, []);

    // ==========================================
    // Obtener Ticket por ID
    // ==========================================

    const loadTicketById = async (ticketId) => {

        try {

            setLoading(true);

            setError("");

            const response = await ticketService.getTicketById(ticketId);

            const data = response.data || response;

            setCurrentTicket(data);

            return data;

        } catch (err) {

            setError(

                err.response?.data?.message ||

                "No fue posible obtener el ticket."

            );

            return null;

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Obtener Ticket por Número
    // ==========================================

    const loadTicketByNumber = async (ticketNumber) => {

        try {

            setLoading(true);

            setError("");

            const response = await ticketService.getTicketByNumber(ticketNumber);

            const data = response.data || response;

            setCurrentTicket(data);

            return data;

        } catch (err) {

            setError(

                err.response?.data?.message ||

                "No fue posible consultar el ticket."

            );

            return null;

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Refrescar Tickets
    // ==========================================

    const refreshTickets = async () => {

        await loadTickets();

    };

    // ==========================================
    // Buscar Ticket
    // ==========================================

    const findTicket = (ticketId) => {

        return tickets.find(

            (ticket) =>

                ticket._id === ticketId

        );

    };

    // ==========================================
    // Limpiar Ticket Actual
    // ==========================================

    const clearCurrentTicket = () => {

        setCurrentTicket(null);

    };

    // ==========================================
    // Total de Tickets
    // ==========================================

    const totalTickets = tickets.length;

    // ==========================================
    // Tickets Activos
    // ==========================================

    const activeTickets = tickets.filter(

        (ticket) =>

            ticket.status === "ACTIVE" ||

            ticket.status === "Activo"

    );

    // ==========================================
    // Tickets Ganadores
    // ==========================================

    const winnerTickets = tickets.filter(

        (ticket) =>

            ticket.isWinner === true ||

            ticket.status === "WINNER"

    );

    // ==========================================
    // Cargar Automáticamente
    // ==========================================

    useEffect(() => {

        loadTickets();

    }, [loadTickets]);

    // ==========================================
    // Retorno del Hook
    // ==========================================

    return {

        tickets,

        currentTicket,

        loading,

        error,

        totalTickets,

        activeTickets,

        winnerTickets,

        refreshTickets,

        loadTicketById,

        loadTicketByNumber,

        findTicket,

        clearCurrentTicket,

        setTickets,

        setCurrentTicket

    };

}

export default useTicket;