// ==========================================
// src/services/roundService.js
// ==========================================

import api from "./api";

class RoundService {

    // ==========================================
    // Obtener Ronda Activa
    // GET /api/rounds/current
    // ==========================================
    async obtenerActual() {
        try {
            const { data } = await api.get(
                "/rounds/current"
            );

            return data;

        } catch (error) {
            throw error.response?.data || error;
        }
    }

    // ==========================================
    // Obtener Todas las Rondas
    // GET /api/rounds
    // ==========================================
    async obtenerTodas() {
        try {
            const { data } = await api.get(
                "/rounds"
            );

            return data;

        } catch (error) {
            throw error.response?.data || error;
        }
    }

    // ==========================================
    // Obtener Ronda por ID
    // GET /api/rounds/:rondaId
    // ==========================================
    async obtenerPorId(rondaId) {
        try {
            const { data } = await api.get(
                `/rounds/${rondaId}`
            );

            return data;

        } catch (error) {
            throw error.response?.data || error;
        }
    }

    // ==========================================
    // Cerrar Ronda
    // PUT /api/rounds/:rondaId/cerrar
    // ==========================================
    async cerrar(rondaId) {
        try {
            const { data } = await api.put(
                `/rounds/${rondaId}/cerrar`
            );

            return data;

        } catch (error) {
            throw error.response?.data || error;
        }
    }

    // ==========================================
    // Obtener Resumen Financiero
    // GET /api/rounds/:rondaId/resumen
    // ==========================================
    async obtenerResumen(rondaId) {
        try {
            const { data } = await api.get(
                `/rounds/${rondaId}/resumen`
            );

            return data;

        } catch (error) {
            throw error.response?.data || error;
        }
    }

    // ==========================================
    // Verificar si existe una ronda activa
    // ==========================================
    async existeRondaActiva() {
        try {
            const respuesta = await this.obtenerActual();

            return !!respuesta?.data;

        } catch (error) {
            return false;
        }
    }

}

export default new RoundService();