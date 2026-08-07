// ==========================================
// src/services/paymentService.js
// Servicio de Pagos
// ==========================================

import api from "./api";

class PaymentService {

    // ==========================================
    // Crear Pago
    // ==========================================
    async crearPago(formData) {

        try {

            const response = await api.post(

                "/payments",

                formData,

                {

                    headers: {

                        "Content-Type": "multipart/form-data"

                    }

                }

            );

            return response.data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    // ==========================================
    // Obtener Pagos del Usuario
    // ==========================================
    async obtenerMisPagos() {

        try {

            const response = await api.get(

                "/payments/usuario"

            );

            return response.data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    // ==========================================
    // Obtener Pago por ID
    // ==========================================
    async obtenerPago(id) {

        try {

            const response = await api.get(

                `/payments/${id}`

            );

            return response.data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    // ==========================================
    // Obtener Pago por Código
    // ==========================================
    async obtenerPorCodigo(codigo) {

        try {

            const response = await api.get(

                `/payments/codigo/${codigo}`

            );

            return response.data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    // ==========================================
    // Obtener Pagos Pendientes
    // ==========================================
    async obtenerPendientes() {

        try {

            const response = await api.get(

                "/payments/pendientes"

            );

            return response.data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    // ==========================================
    // Obtener Pagos Aprobados
    // ==========================================
    async obtenerAprobados() {

        try {

            const response = await api.get(

                "/payments/aprobados"

            );

            return response.data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    // ==========================================
    // Obtener Pagos Rechazados
    // ==========================================
    async obtenerRechazados() {

        try {

            const response = await api.get(

                "/payments/rechazados"

            );

            return response.data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    // ==========================================
    // Aprobar Pago
    // ==========================================
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

    // ==========================================
    // Rechazar Pago
    // ==========================================
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
    // Eliminar Pago
    // ==========================================
    async eliminarPago(id) {

        try {

            const response = await api.delete(

                `/payments/${id}`

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

export default new PaymentService();