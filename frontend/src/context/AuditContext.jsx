// ==========================================
// src/context/AuditContext.jsx
// ==========================================

import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import AuditService from "../services/auditService";
import AuthService from "../services/authService";

// ==========================================
// Crear Contexto
// ==========================================

const AuditContext = createContext();

// ==========================================
// Hook Personalizado
// ==========================================

export const useAudit = () => {

    const context = useContext(AuditContext);

    if (!context) {

        throw new Error(
            "useAudit debe usarse dentro de AuditProvider."
        );

    }

    return context;

};

// ==========================================
// Provider
// ==========================================

export function AuditProvider({ children }) {

    const [audits, setAudits] = useState([]);
    const [audit, setAudit] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // ==========================================
    // Obtener todas las auditorías
    // ==========================================

    const cargarAuditorias = async () => {

        if (!AuthService.isAuthenticated()) {

            return;

        }

        try {

            setLoading(true);
            setError(null);

            const response =
                await AuditService.obtenerTodos();

            setAudits(response.data || []);

        } catch (err) {

            console.error(err);

            setError(
                err.message ||
                "No fue posible cargar la auditoría."
            );

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Auditorías por usuario
    // ==========================================

    const cargarAuditoriasUsuario = async (usuarioId) => {

        if (!AuthService.isAuthenticated()) {

            return;

        }

        try {

            setLoading(true);
            setError(null);

            const response =
                await AuditService.obtenerPorUsuario(
                    usuarioId
                );

            setAudits(response.data || []);

        } catch (err) {

            console.error(err);

            setError(
                err.message ||
                "No fue posible cargar las auditorías."
            );

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Buscar por código
    // ==========================================

    const buscarPorCodigo = async (codigo) => {

        if (!AuthService.isAuthenticated()) {

            return null;

        }

        try {

            setLoading(true);
            setError(null);

            const response =
                await AuditService.obtenerPorCodigo(
                    codigo
                );

            setAudit(response.data || null);

            return response.data;

        } catch (err) {

            console.error(err);

            setError(
                err.message ||
                "No fue posible encontrar el registro."
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

        await cargarAuditorias();

    };

    // ==========================================
    // Limpiar
    // ==========================================

    const limpiar = () => {

        setAudit(null);
        setError(null);

    };

    // ==========================================
    // Inicializar
    // ==========================================

    useEffect(() => {

        if (AuthService.isAuthenticated()) {

            cargarAuditorias();

        }

    }, []);

    // ==========================================
    // Valores Compartidos
    // ==========================================

    const value = {

        loading,
        error,

        audits,
        audit,

        cargarAuditorias,
        cargarAuditoriasUsuario,

        buscarPorCodigo,

        actualizar,
        limpiar

    };

    return (

        <AuditContext.Provider value={value}>

            {children}

        </AuditContext.Provider>

    );

}

export default AuditContext;