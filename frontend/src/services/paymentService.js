// ==========================================
// src/services/paymentService.js
// ==========================================

import api from "./api";

// ==========================================
// Obtener pagos del usuario
// ==========================================

const obtenerMisPagos = async () => {
    return await api.get("/payments/usuario");
};

// ==========================================
// Obtener pagos pendientes
// ==========================================

const obtenerPendientes = async () => {
    return await api.get("/payments/pendientes");
};

// ==========================================
// Obtener pagos aprobados
// ==========================================

const obtenerAprobados = async () => {
    return await api.get("/payments/aprobados");
};

// ==========================================
// Obtener pagos rechazados
// ==========================================

const obtenerRechazados = async () => {
    return await api.get("/payments/rechazados");
};

// ==========================================
// Obtener pago por ID
// ==========================================

const obtenerPago = async (id) => {
    return await api.get(`/payments/${id}`);
};

// ==========================================
// Obtener pago por código
// ==========================================

const obtenerPagoPorCodigo = async (codigo) => {
    return await api.get(`/payments/codigo/${codigo}`);
};

// ==========================================
// Crear pago
// ==========================================

const crearPago = async (formData) => {

    return await api.post(
        "/payments",
        formData
    );

};

// ==========================================
// Aprobar pago
// ==========================================

const aprobarPago = async (pagoId) => {

    return await api.put(
        `/payments/${pagoId}/aprobar`
    );

};

// ==========================================
// Rechazar pago
// ==========================================

const rechazarPago = async (pagoId, motivo) => {

    return await api.put(
        `/payments/${pagoId}/rechazar`,
        {
            motivo
        }
    );

};

// ==========================================
// Eliminar pago
// ==========================================

const eliminarPago = async (id) => {

    return await api.delete(`/payments/${id}`);

};

// ==========================================
// Exportar servicio
// ==========================================

const PaymentService = {

    obtenerMisPagos,

    obtenerPendientes,

    obtenerAprobados,

    obtenerRechazados,

    obtenerPago,

    obtenerPagoPorCodigo, 

    crearPago,

    aprobarPago,

    rechazarPago,

    eliminarPago

};
export default PaymentService;