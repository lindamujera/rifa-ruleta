// ==========================================
// src/services/TicketService.js
// Servicio de Tickets
// ==========================================

import api from "./api";

class TicketService {

    // ==========================================
    // Crear Ticket
    // ==========================================
    async crearTicket(datos) {

        try {

            const response = await api.post(
                "/tickets",
                datos
            );

            return response.data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    // ==========================================
    // Obtener Ticket por ID
    // ==========================================
    async obtenerTicket(ticketId) {

        try {

            const response = await api.get(
                `/tickets/${ticketId}`
            );

            return response.data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    // ==========================================
    // Obtener Tickets del Usuario
    // ==========================================
    async obtenerTicketsUsuario(usuarioId) {

        try {

            const response = await api.get(
                `/tickets/usuario/${usuarioId}`
            );

            return response.data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    // ==========================================
    // Obtener Tickets de la Ronda
    // ==========================================
    async obtenerTicketsRonda(rondaId) {

        try {

            const response = await api.get(
                `/tickets/ronda/${rondaId}`
            );

            return response.data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    // ==========================================
    // Obtener Número del Ticket
    // ==========================================
    async obtenerNumero(ticketId) {

        try {

            const response = await api.get(
                `/tickets/${ticketId}/numero`
            );

            return response.data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    // ==========================================
    // Seleccionar Número de Rifa
    // ==========================================
    async seleccionarNumero(ticketId, numero) {

        try {

            const response = await api.put(

                `/tickets/${ticketId}/numero`,

                {
                    numero
                }

            );

            return response.data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    // Alias para mantener compatibilidad
    async escogerNumero(ticketId, numero) {

        return await this.seleccionarNumero(
            ticketId,
            numero
        );

    }

    // ==========================================
    // Validar Número Disponible
    // ==========================================
    async validarNumero(rondaId, numero) {

        try {

            const response = await api.get(
                `/tickets/validar/${rondaId}/${numero}`
            );

            return response.data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    // ==========================================
    // Verificar si el Usuario tiene Ticket
    // ==========================================
    async usuarioTieneTicket(usuarioId, rondaId) {

        try {

            const response = await api.get(
                `/tickets/usuario/${usuarioId}/ronda/${rondaId}`
            );

            return response.data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    // ==========================================
    // Manejo Centralizado de Errores
    // ==========================================
    handleError(error) {

        if (error.response) {

            return new Error(

                error.response.data?.message ||

                "Error del servidor."

            );

        }

        if (error.request) {

            return new Error(

                "No fue posible conectar con el servidor."

            );

        }

        return new Error(

            error.message ||

            "Ocurrió un error inesperado."

        );

    }

}

export default new TicketService();