// ==========================================
// src/services/adminService.js
// ==========================================

import api from "./api";

class AdminService {

    // ==========================================
    // PERFIL DEL USUARIO
    // ==========================================

    async obtenerPerfil() {

        try {

            const response = await api.get(
                "/users/profile"
            );

            return response.data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    async actualizarPerfil(datos) {

        try {

            const response = await api.put(

                "/users/profile",

                datos

            );

            return response.data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    // ==========================================
    // RONDAS
    // ==========================================

    async obtenerRondaActual() {

        try {

            const response = await api.get(

                "/rounds/current"

            );

            return response.data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    async obtenerRondas() {

        try {

            const response = await api.get(

                "/rounds"

            );

            return response.data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    async obtenerRonda(rondaId) {

        try {

            const response = await api.get(

                `/rounds/${rondaId}`

            );

            return response.data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    async cerrarRonda(rondaId) {

        try {

            const response = await api.put(

                `/rounds/${rondaId}/cerrar`

            );

            return response.data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    async resumenRonda(rondaId) {

        try {

            const response = await api.get(

                `/rounds/${rondaId}/resumen`

            );

            return response.data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    // ==========================================
    // PAGOS
    // ==========================================

    async obtenerPagosPendientes() {

        try {

            const response = await api.get(

                "/payments/pendientes"

            );

            return response.data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    async obtenerPagosAprobados() {

        try {

            const response = await api.get(

                "/payments/aprobados"

            );

            return response.data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    async obtenerPagosRechazados() {

        try {

            const response = await api.get(

                "/payments/rechazados"

            );

            return response.data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    async aprobarPago(pagoId) {

        try {

            const response = await api.put(

                `/payments/${pagoId}/aprobar`

            );

            return response.data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    async rechazarPago(pagoId, motivo) {

        try {

            const response = await api.put(

                `/payments/${pagoId}/rechazar`,

                {

                    motivo

                }

            );

            return response.data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    // ==========================================
    // TICKETS
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
    // SPINS
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
    // DASHBOARD
    // ==========================================

    async cargarDashboard() {

        try {

            const [

                ronda,

                pendientes,

                aprobados

            ] = await Promise.all([

                this.obtenerRondaActual(),

                this.obtenerPagosPendientes(),

                this.obtenerPagosAprobados()

            ]);

            return {

                ronda,

                pendientes,

                aprobados

            };

        } catch (error) {

            throw this.handleError(error);

        }

    }

    // ==========================================
    // ERRORES
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

export default new AdminService();