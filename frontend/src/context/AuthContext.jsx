// ==========================================
// src/context/AuthContext.jsx
// ==========================================

import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react";

const AuthContext = createContext(null);

// ==========================================
// Provider
// ==========================================

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [token, setToken] = useState(null);

    const [loading, setLoading] = useState(true);

    // ==========================================
    // Cargar sesión
    // ==========================================

    useEffect(() => {

        try {

            const savedToken =
                localStorage.getItem("token");

            const savedUser =
                localStorage.getItem("user");

            if (savedToken && savedUser) {

                setToken(savedToken);

                setUser(
                    JSON.parse(savedUser)
                );

            }

        } catch (error) {

            console.error(
                "Error cargando sesión:",
                error
            );

            localStorage.removeItem("token");
            localStorage.removeItem("user");

        } finally {

            setLoading(false);

        }

    }, []);

    // ==========================================
    // Iniciar sesión
    // ==========================================

    const login = (usuario, jwt) => {

        localStorage.setItem(
            "token",
            jwt
        );

        localStorage.setItem(
            "user",
            JSON.stringify(usuario)
        );

        setUser(usuario);

        setToken(jwt);

    };

    // ==========================================
    // Cerrar sesión
    // ==========================================

    const logout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        setUser(null);

        setToken(null);

    };

    // ==========================================
    // Actualizar usuario
    // ==========================================

    const updateUser = (data) => {

        const updated = {

            ...user,

            ...data

        };

        localStorage.setItem(

            "user",

            JSON.stringify(updated)

        );

        setUser(updated);

    };

    // ==========================================
    // Valores derivados
    // ==========================================

    const isAuthenticated = !!token;

    const isAdmin =
        user?.rol === "ADMIN";

    const isCliente =
        user?.rol === "CLIENTE";

    // ==========================================
    // Contexto
    // ==========================================

    const value = useMemo(() => ({

        user,

        token,

        loading,

        login,

        logout,

        updateUser,

        isAuthenticated,

        isAdmin,

        isCliente

    }), [

        user,

        token,

        loading

    ]);

    return (

        <AuthContext.Provider value={value}>

            {children}

        </AuthContext.Provider>

    );

}

// ==========================================
// Hook personalizado
// ==========================================

export function useAuth() {

    const context = useContext(

        AuthContext

    );

    if (!context) {

        throw new Error(

            "useAuth debe usarse dentro de AuthProvider."

        );

    }

    return context;

}
export default AuthContext;