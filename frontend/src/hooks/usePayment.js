// ==========================================
// src/hooks/usePayment.js
// ==========================================

import { useState, useEffect, useCallback } from "react";

import paymentService from "../services/paymentService";

function usePayment() {

    const [payments, setPayments] = useState([]);

    const [currentPayment, setCurrentPayment] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    // ==========================================
    // Obtener pagos del usuario
    // ==========================================

    const loadPayments = useCallback(async () => {

        try {

            setLoading(true);

            setError("");

            const response = await paymentService.getMyPayments();

            const data = response.data || response || [];

            setPayments(data);

        } catch (err) {

            setError(

                err.response?.data?.message ||

                "No fue posible cargar los pagos."

            );

        } finally {

            setLoading(false);

        }

    }, []);

    // ==========================================
    // Obtener un pago por ID
    // ==========================================

    const loadPaymentById = async (paymentId) => {

        try {

            setLoading(true);

            setError("");

            const response = await paymentService.getPaymentById(paymentId);

            const data = response.data || response;

            setCurrentPayment(data);

            return data;

        } catch (err) {

            setError(

                err.response?.data?.message ||

                "No fue posible obtener el pago."

            );

            return null;

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Crear pago
    // ==========================================

    const createPayment = async (paymentData) => {

        try {

            setLoading(true);

            setError("");

            const response = await paymentService.createPayment(paymentData);

            await loadPayments();

            return response;

        } catch (err) {

            setError(

                err.response?.data?.message ||

                "No fue posible registrar el pago."

            );

            throw err;

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Subir comprobante
    // ==========================================

    const uploadVoucher = async (paymentId, file) => {

        try {

            setLoading(true);

            setError("");

            const response = await paymentService.uploadVoucher(

                paymentId,

                file

            );

            await loadPayments();

            return response;

        } catch (err) {

            setError(

                err.response?.data?.message ||

                "No fue posible subir el comprobante."

            );

            throw err;

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Refrescar lista
    // ==========================================

    const refreshPayments = async () => {

        await loadPayments();

    };

    // ==========================================
    // Cargar automáticamente
    // ==========================================

    useEffect(() => {

        loadPayments();

    }, [loadPayments]);

    // ==========================================
    // Retorno del Hook
    // ==========================================

    return {

        payments,

        currentPayment,

        loading,

        error,

        refreshPayments,

        loadPaymentById,

        createPayment,

        uploadVoucher,

        setPayments,

        setCurrentPayment

    };

}

export default usePayment;