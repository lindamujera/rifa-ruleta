// ==========================================
// src/services/notificationService.js
// ==========================================

import api from "./api";

class NotificationService {

    // ==========================================
    // Obtener todas las notificaciones
    // GET /api/notifications
    // ==========================================
    async obtenerTodas() {

        try {

            const { data } = await api.get(
                "/notifications"
            );

            return data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    // ==========================================
    // Obtener notificaciones del usuario
    // GET /api/notifications/usuario/:usuarioId
    // ==========================================
    async obtenerPorUsuario(usuarioId) {

        try {

            const { data } = await api.get(
                `/notifications/usuario/${usuarioId}`
            );

            return data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    // ==========================================
    // Marcar una notificación como leída
    // PUT /api/notifications/leer/:id
    // ==========================================
    async marcarLeida(id) {

        try {

            const { data } = await api.put(
                `/notifications/leer/${id}`
            );

            return data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    // ==========================================
    // Marcar todas las notificaciones
    // PUT /api/notifications/leer-todas/:usuarioId
    // ==========================================
    async marcarTodas(usuarioId) {

        try {

            const { data } = await api.put(
                `/notifications/leer-todas/${usuarioId}`
            );

            return data;

        } catch (error) {

            throw this.handleError(error);

        }

    }
 // ==========================================
    // Manejo centralizado de errores
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

export default new NotificationService();