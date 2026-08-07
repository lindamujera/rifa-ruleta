// ==========================================
// src/context/RoundContext.jsx
// ==========================================

import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import RoundService from "../services/roundService";
import AuthService from "../services/authService";

// ==========================================
// Crear Contexto
// ==========================================

const RoundContext = createContext();

// ==========================================
// Hook Personalizado
// ==========================================

export const useRound = () => {

    const context = useContext(RoundContext);

    if (!context) {

        throw new Error(
            "useRound debe usarse dentro de RoundProvider."
        );

    }

    return context;

};

// ==========================================
// Provider
// ==========================================

export function RoundProvider({ children }) {

    const [round, setRound] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    // ==========================================
    // Obtener Ronda Activa
    // ==========================================

    const cargarRonda = async () => {

        if (!AuthService.isAuthenticated()) {

            setRound(null);

            return;

        }

        try {

            setLoading(true);

            setError(null);

            const response =
                await RoundService.obtenerActual();

            setRound(
                response.data || response || null
            );

        } catch (err) {

            console.error(err);

            setError(
                err.message ||
                "No fue posible cargar la ronda."
            );

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Obtener Resumen Financiero
    // ==========================================

    const obtenerResumen = async () => {

        if (!round?._id) return null;

        try {

            const response =
                await RoundService.obtenerResumen(
                    round._id
                );

            return response.data || response;

        } catch (err) {

            console.error(err);

            return null;

        }

    };

    // ==========================================
    // Cerrar Ronda
    // ==========================================

    const cerrarRonda = async () => {

        if (!round?._id) return;

        try {

            await RoundService.cerrar(
                round._id
            );

            await cargarRonda();

        } catch (err) {

            console.error(err);

            throw err;

        }

    };

    // ==========================================
    // Actualizar Información
    // ==========================================

    const actualizar = async () => {

        await cargarRonda();

    };

    // ==========================================
    // Inicializar
    // ==========================================

    useEffect(() => {

        cargarRonda();

    }, []);

    // ==========================================
    // Valores Compartidos
    // ==========================================

    const value = {

        round,

        loading,

        error,

        actualizar,

        cargarRonda,

        obtenerResumen,

        cerrarRonda

    };

    return (

        <RoundContext.Provider value={value}>

            {children}

        </RoundContext.Provider>

    );

}

export default RoundContext;