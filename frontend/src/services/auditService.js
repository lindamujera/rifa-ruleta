// ==========================================
// src/services/auditService.js
// ==========================================

import api from "./api";

class AuditService {

    // ==========================================
    // Obtener todos los registros
    // ==========================================
    async obtenerTodos() {

        try {

            const response = await api.get(
                "/audit"
            );

            return response.data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    // ==========================================
    // Obtener registros por usuario
    // ==========================================
    async obtenerPorUsuario(usuarioId) {

        try {

            const response = await api.get(

                `/audit/usuario/${usuarioId}`

            );

            return response.data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    // ==========================================
    // Buscar por código
    // ==========================================
    async obtenerPorCodigo(codigo) {

        try {

            const response = await api.get(

                `/audit/codigo/${codigo}`

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

export default new AuditService();