// ==========================================
// src/services/prizePoolService.js
// ==========================================

import api from "./api";

class PrizePoolService {

    // ==========================================
    // Obtener Premio Actual
    // GET /api/prizepool/current
    // ==========================================
    async obtenerActual() {
        try {
            const { data } = await api.get(
                "/prizepool/current"
            );

            return data;

        } catch (error) {
            throw error.response?.data || error;
        }
    }

    // ==========================================
    // Obtener Historial
    // GET /api/prizepool/history
    // ==========================================
    async obtenerHistorial() {
        try {
            const { data } = await api.get(
                "/prizepool/history"
            );

            return data;

        } catch (error) {
            throw error.response?.data || error;
        }
    }

    // ==========================================
    // Dashboard del Premio
    // GET /api/prizepool/dashboard
    // ==========================================
    async dashboard() {
        try {
            const { data } = await api.get(
                "/prizepool/dashboard"
            );

            return data;

        } catch (error) {
            throw error.response?.data || error;
        }
    }

    // ==========================================
    // Obtener Premio por ID
    // GET /api/prizepool/:prizePoolId
    // ==========================================
    async obtenerPorId(prizePoolId) {
        try {
            const { data } = await api.get(
                `/prizepool/${prizePoolId}`
            );

            return data;

        } catch (error) {
            throw error.response?.data || error;
        }
    }

    // ==========================================
    // Incrementar Fondo
    // PUT /api/prizepool/increment
    // ==========================================
    async incrementar(valor) {
        try {
            const { data } = await api.put(
                "/prizepool/increment",
                { valor }
            );

            return data;

        } catch (error) {
            throw error.response?.data || error;
        }
    }

    // ==========================================
    // Reiniciar Fondo
    // PUT /api/prizepool/reset
    // ==========================================
    async reiniciar() {
        try {
            const { data } = await api.put(
                "/prizepool/reset"
            );

            return data;

        } catch (error) {
            throw error.response?.data || error;
        }
    }

    // ==========================================
    // Entregar Premio
    // PUT /api/prizepool/deliver
    // ==========================================
    async entregar(datos) {
        try {
            const { data } = await api.put(
                "/prizepool/deliver",
                datos
            );

            return data;

        } catch (error) {
            throw error.response?.data || error;
        }
    }

}

export default new PrizePoolService();