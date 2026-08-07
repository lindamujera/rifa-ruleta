// ==========================================
// src/context/UserContext.jsx
// ==========================================

import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import UserService from "../services/userService";

// ==========================================
// Crear Contexto
// ==========================================

const UserContext = createContext();

// ==========================================
// Hook Personalizado
// ==========================================

export const useUser = () => {

    const context = useContext(UserContext);

    if (!context) {

        throw new Error(

            "useUser debe usarse dentro de UserProvider."

        );

    }

    return context;

};

// ==========================================
// Provider
// ==========================================

export function UserProvider({ children }) {

    const [user, setUser] = useState(null);

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    // ==========================================
    // Obtener Perfil
    // ==========================================

    const cargarPerfil = async () => {

        try {

            setLoading(true);

            setError(null);

            const response =
                await UserService.obtenerPerfil();

            setUser(

                response.data || null

            );

        } catch (err) {

            console.error(err);

            setError(

                err.message ||

                "No fue posible cargar el perfil."

            );

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Actualizar Perfil
    // ==========================================

    const actualizarPerfil = async (datos) => {

        try {

            setLoading(true);

            setError(null);

            const response =
                await UserService.actualizarPerfil(
                    datos
                );

            setUser(

                response.data

            );

            return response;

        } catch (err) {

            console.error(err);

            setError(

                err.message ||

                "No fue posible actualizar el perfil."

            );

            throw err;

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Obtener Usuario por ID
    // ==========================================

    const obtenerUsuario = async (id) => {

        try {

            const response =
                await UserService.obtenerPorId(id);

            return response.data;

        } catch (err) {

            console.error(err);

            return null;

        }

    };

    // ==========================================
    // Obtener Todos los Usuarios
    // ==========================================

    const cargarUsuarios = async () => {

        try {

            setLoading(true);

            const response =
                await UserService.obtenerTodos();

            setUsers(

                response.data || []

            );

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Actualizar Información
    // ==========================================

    const actualizar = async () => {

        await cargarPerfil();

    };

    // ==========================================
    // Limpiar
    // ==========================================

    const limpiar = () => {

        setUser(null);

        setUsers([]);

        setError(null);

    };

    // ==========================================
    // Inicializar
    // ==========================================

    useEffect(() => {

        cargarPerfil();

    }, []);

    // ==========================================
    // Valores Compartidos
    // ==========================================

    const value = {

        loading,

        error,

        user,

        users,

        cargarPerfil,

        actualizarPerfil,

        obtenerUsuario,

        cargarUsuarios,

        actualizar,

        limpiar

    };

    return (

        <UserContext.Provider value={value}>

            {children}

        </UserContext.Provider>

    );

}

export default UserContext;