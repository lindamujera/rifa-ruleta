// ==========================================
// src/services/transactionService.js
// Servicio de Transacciones
// ==========================================

import api from "./api";

class TransactionService {

    // ==========================================
    // Obtener todas las transacciones
    // GET /api/transactions
    // ==========================================
    async obtenerTodas() {

        try {

            const response = await api.get(

                "/transactions"

            );

            return response.data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    // ==========================================
    // Obtener transacciones por usuario
    // GET /api/transactions/usuario/:usuarioId
    // ==========================================
    async obtenerPorUsuario(usuarioId) {

        try {

            const response = await api.get(

                `/transactions/usuario/${usuarioId}`

            );

            return response.data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    // ==========================================
    // Obtener transacción por código
    // GET /api/transactions/codigo/:codigo
    // ==========================================
    async obtenerPorCodigo(codigo) {

        try {

            const response = await api.get(

                `/transactions/codigo/${codigo}`

            );

            return response.data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    // ==========================================
    // Verificar si existe una transacción
    // ==========================================
    async existeTransaccion(codigo) {

        try {

            const response = await this.obtenerPorCodigo(

                codigo

            );

            return !!response?.data;

        } catch (error) {

            return false;

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

export default new TransactionService();