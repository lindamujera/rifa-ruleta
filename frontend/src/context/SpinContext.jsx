// ==========================================
// src/context/SpinContext.jsx
// ==========================================

import {
    createContext,
    useContext,
    useState
} from "react";

import SpinService from "../services/spinService";
import AuthService from "../services/authService";

// ==========================================
// Crear Contexto
// ==========================================

const SpinContext = createContext();

// ==========================================
// Hook Personalizado
// ==========================================

export const useSpin = () => {

    const context = useContext(SpinContext);

    if (!context) {

        throw new Error(
            "useSpin debe usarse dentro de SpinProvider."
        );

    }

    return context;

};

// ==========================================
// Provider
// ==========================================

export function SpinProvider({ children }) {

    const [spin, setSpin] = useState(null);

    const [premio, setPremio] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    // ==========================================
    // Ejecutar Ruleta
    // ==========================================

    const ejecutarRuleta = async (spinId) => {

        if (!AuthService.isAuthenticated()) {

            throw new Error(
                "Debe iniciar sesión."
            );

        }

        try {

            setLoading(true);

            setError(null);

            const response =
                await SpinService.ejecutarRuleta(
                    spinId
                );

            setSpin(
                response.data || response
            );

            return response;

        } catch (err) {

            console.error(err);

            setError(

                err.message ||

                "No fue posible ejecutar la ruleta."

            );

            throw err;

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Crear Giro
    // ==========================================

    const crearSpin = async (datos) => {

        if (!AuthService.isAuthenticated()) {

            throw new Error(
                "Debe iniciar sesión."
            );

        }

        try {

            setLoading(true);

            setError(null);

            const response =
                await SpinService.crearSpin(
                    datos
                );

            setSpin(
                response.data || response
            );

            return response;

        } catch (err) {

            console.error(err);

            setError(

                err.message ||

                "No fue posible crear el giro."

            );

            throw err;

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Obtener Giro
    // ==========================================

    const obtenerSpin = async (spinId) => {

        try {

            setLoading(true);

            setError(null);

            const response =
                await SpinService.obtenerSpin(
                    spinId
                );

            setSpin(
                response.data || response
            );

            return response;

        } catch (err) {

            console.error(err);

            setError(

                err.message ||

                "No fue posible obtener el giro."

            );

            throw err;

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Obtener Premio
    // ==========================================

    const obtenerPremio = async (spinId) => {

        try {

            setLoading(true);

            setError(null);

            const response =
                await SpinService.obtenerPremio(
                    spinId
                );

            setPremio(

                response.premio ||

                response.data ||

                response

            );

            return response;

        } catch (err) {

            console.error(err);

            setError(

                err.message ||

                "No fue posible obtener el premio."

            );

            throw err;

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Limpiar Giro
    // ==========================================

    const limpiarSpin = () => {

        setSpin(null);

        setPremio(null);

        setError(null);

    };

    // ==========================================
    // Valores Compartidos
    // ==========================================

    const value = {

        loading,

        error,

        spin,

        premio,

        crearSpin,

        ejecutarRuleta,

        obtenerSpin,

        obtenerPremio,

        limpiarSpin

    };

    return (

        <SpinContext.Provider value={value}>

            {children}

        </SpinContext.Provider>

    );

}

export default SpinContext;