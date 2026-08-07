// ==========================================
// src/services/spinService.js
// ==========================================

import api from "./api";

class SpinService {

    // ==========================================
    // Crear Giro
    // ==========================================
    async crearSpin(datos) {

        try {

            const response = await api.post(

                "/spins",

                datos

            );

            return response.data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    // ==========================================
    // Ejecutar Ruleta
    // ==========================================
    async ejecutarRuleta(spinId) {

        try {

            const response = await api.put(

                `/spins/${spinId}/ejecutar`

            );

            return response.data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    // ==========================================
    // Obtener Giro
    // ==========================================
    async obtenerSpin(spinId) {

        try {

            const response = await api.get(

                `/spins/${spinId}`

            );

            return response.data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    // ==========================================
    // Obtener Premio
    // ==========================================
    async obtenerPremio(spinId) {

        try {

            const response = await api.get(

                `/spins/${spinId}/premio`

            );

            return response.data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    // ==========================================
    // Manejo de Errores
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

export default new SpinService();