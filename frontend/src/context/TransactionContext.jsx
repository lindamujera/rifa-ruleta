// ==========================================
// src/context/TransactionContext.jsx
// ==========================================

import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import TransactionService from "../services/transactionService";
import AuthService from "../services/authService";

// ==========================================
// Crear Contexto
// ==========================================

const TransactionContext = createContext();

// ==========================================
// Hook Personalizado
// ==========================================

export const useTransaction = () => {

    const context = useContext(TransactionContext);

    if (!context) {

        throw new Error(
            "useTransaction debe usarse dentro de TransactionProvider."
        );

    }

    return context;

};

// ==========================================
// Provider
// ==========================================

export function TransactionProvider({ children }) {

    const [transactions, setTransactions] = useState([]);
    const [transaction, setTransaction] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // ==========================================
// Obtener todas las transacciones
// ==========================================

const cargarTransacciones = async () => {

    if (!AuthService.isAuthenticated()) return;

    try {

        setLoading(true);
        setError(null);

        const response =
            await TransactionService.obtenerTodas();

        setTransactions(
            response.data.data || []
        );

    } catch (err) {

        console.error(err);

        setError(

            err.message ||

            "No se pudieron cargar las transacciones."

        );

    } finally {

        setLoading(false);

    }

};

    // ==========================================
    // Obtener transacciones de un usuario
    // ==========================================

    const cargarTransaccionesUsuario = async (usuarioId) => {

        if (!AuthService.isAuthenticated() || !usuarioId) {
            return;
        }

        try {

            setLoading(true);
            setError(null);

            const response =
                await TransactionService.obtenerPorUsuario(
                    usuarioId
                );

           setTransactions(
                  response.data.data || []
            );

        } catch (err) {

            console.error(err);

            setError(

                err.message ||

                "No se pudieron cargar las transacciones del usuario."

            );

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Buscar transacción por código
    // ==========================================

    const buscarPorCodigo = async (codigo) => {

        if (!AuthService.isAuthenticated()) {
            return null;
        }

        try {

            setLoading(true);
            setError(null);

            const response =
                await TransactionService.obtenerPorCodigo(
                    codigo
                );

            const data = response.data.data || null;

            setTransaction(data);

            return data;

        } catch (err) {

            console.error(err);

            setError(

                err.message ||

                "No se encontró la transacción."

            );

            return null;

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Actualizar
    // ==========================================

    const actualizar = async () => {

        await cargarTransacciones();

    };

    // ==========================================
    // Limpiar
    // ==========================================

    const limpiar = () => {

        setTransaction(null);
        setTransactions([]);
        setError(null);

    };

    // ==========================================
    // Inicializar
    // ==========================================
useEffect(() => {

    const user = AuthService.getUser();

    if (!user) return;

    if (
        user.rol === "ADMIN" ||
        user.rol === "OPERADOR"
    ) {

        cargarTransacciones();

    }

}, []);

    // ==========================================
    // Valores Compartidos
    // ==========================================

    const value = {

        loading,
        error,

        transactions,
        transaction,

        cargarTransacciones,
        cargarTransaccionesUsuario,
        buscarPorCodigo,

        actualizar,
        limpiar

    };

    return (

        <TransactionContext.Provider value={value}>

            {children}

        </TransactionContext.Provider>

    );

}

export default TransactionContext; 