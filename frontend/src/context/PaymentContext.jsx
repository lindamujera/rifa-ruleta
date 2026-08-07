// ==========================================
// src/context/PaymentContext.jsx
// ==========================================

import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import PaymentService from "../services/paymentService";
import AuthService from "../services/authService";

// ==========================================
// Crear Contexto
// ==========================================

const PaymentContext = createContext();

// ==========================================
// Hook Personalizado
// ==========================================

export const usePayment = () => {

    const context = useContext(PaymentContext);

    if (!context) {
        throw new Error(
            "usePayment debe usarse dentro de PaymentProvider."
        );
    }

    return context;
};

// ==========================================
// Provider
// ==========================================

export function PaymentProvider({ children }) {

    const [payments, setPayments] = useState([]);
    const [pendingPayments, setPendingPayments] = useState([]);
    const [approvedPayments, setApprovedPayments] = useState([]);
    const [rejectedPayments, setRejectedPayments] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // ==========================================
    // Obtener pagos del usuario
    // ==========================================

    const cargarMisPagos = async () => {

        if (!AuthService.isAuthenticated()) return;

        try {

            setLoading(true);
            setError(null);

            const response =
                await PaymentService.obtenerMisPagos();

            setPayments(response.data || []);

        } catch (err) {

            console.error(err);

            setError(
                err.message ||
                "Error al cargar los pagos."
            );

        } finally {

            setLoading(false);

        }

    };


    // ==========================================
    // Obtener pagos pendientes
    // ==========================================

    const cargarPendientes = async () => {

        try {

            const response =
                await PaymentService.obtenerPendientes();

            setPendingPayments(
                response.data || []
            );

        } catch (err) {

            console.error(err);

        }

    };

    // ==========================================
    // Obtener pagos aprobados
    // ==========================================

    const cargarAprobados = async () => {

        try {

            const response =
                await PaymentService.obtenerAprobados();

            setApprovedPayments(
                response.data || []
            );

        } catch (err) {

            console.error(err);

        }

    };

    // ==========================================
    // Obtener pagos rechazados
    // ==========================================

    const cargarRechazados = async () => {

        try {

            const response =
                await PaymentService.obtenerRechazados();

            setRejectedPayments(
                response.data || []
            );

        } catch (err) {

            console.error(err);

        }

    };

    // ==========================================
    // Crear Pago
    // ==========================================

    const crearPago = async (formData) => {

        try {

            setLoading(true);

            setError(null);

            const response =
                await PaymentService.crearPago(
                    formData
                );

            await cargarMisPagos();

            return response;

        } catch (err) {

            console.error(err);

            setError(err.message);

            throw err;

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Aprobar Pago
    // ==========================================

    const aprobarPago = async (pagoId) => {

        try {

            setLoading(true);

            await PaymentService.aprobarPago(
                pagoId
            );

            await actualizarAdmin();

        } catch (err) {

            console.error(err);

            setError(err.message);

            throw err;

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Rechazar Pago
    // ==========================================

    const rechazarPago = async (

        pagoId,

        motivo

    ) => {

        try {

            setLoading(true);

            await PaymentService.rechazarPago(

                pagoId,

                motivo

            );

            await actualizarAdmin();

        } catch (err) {

            console.error(err);

            setError(err.message);

            throw err;

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Obtener Pago por ID
    // ==========================================

    const obtenerPago = async (id) => {

        try {

            const response =
                await PaymentService.obtenerPago(id);

            return response.data;

        } catch (err) {

            console.error(err);

            return null;

        }

    };

    // ==========================================
    // Actualizar información del cliente
    // ==========================================

    const actualizar = async () => {

        await cargarMisPagos();

    };

    // ==========================================
    // Actualizar información del administrador
    // ==========================================

    const actualizarAdmin = async () => {

        await Promise.all([

            cargarPendientes(),

            cargarAprobados(),

            cargarRechazados()

        ]);

    };

    // ==========================================
    // Limpiar Error
    // ==========================================

    const limpiarError = () => {

        setError(null);

    };

    // ==========================================
    // Inicializar
    // ==========================================

    useEffect(() => {

        cargarMisPagos();

    }, []);

    // ==========================================
    // Valores Compartidos
    // ==========================================

    const value = {

        loading,

        error,

        payments,

        pendingPayments,

        approvedPayments,

        rejectedPayments,

        crearPago,

        aprobarPago,

        rechazarPago,

        obtenerPago,

        cargarMisPagos,

        cargarPendientes,

        cargarAprobados,

        cargarRechazados,

        actualizar,

        actualizarAdmin,

        limpiarError

    };

    return (

        <PaymentContext.Provider value={value}>

            {children}

        </PaymentContext.Provider>

    );

}

export default PaymentContext;