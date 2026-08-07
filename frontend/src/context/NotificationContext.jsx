// ==========================================
// src/context/NotificationContext.jsx
// ==========================================

import {
    createContext,
    useContext,
    useState,
    useCallback
} from "react";

// ==========================================
// Crear Contexto
// ==========================================

const NotificationContext = createContext();
// ==========================================
// Hook Personalizado
// ==========================================

export const useNotification = () => {

    return useContext(NotificationContext);

};

// ==========================================
// Provider
// ==========================================

export function NotificationProvider({ children }) {

    const [notification, setNotification] = useState({

        open: false,

        type: "info",

        title: "",

        message: "",

        duration: 4000

    });

    // ==========================================
    // Cerrar Notificación
    // ==========================================

    const cerrar = useCallback(() => {

        setNotification((prev) => ({

            ...prev,

            open: false

        }));

    }, []);

    // ==========================================
    // Mostrar Notificación
    // ==========================================

    const mostrar = useCallback(({

        type = "info",

        title = "",

        message = "",

        duration = 4000

    }) => {

        setNotification({

            open: true,

            type,

            title,

            message,

            duration

        });

        if (duration > 0) {

            setTimeout(() => {

                cerrar();

            }, duration);

        }

    }, [cerrar]);

    // ==========================================
    // Notificación de Éxito
    // ==========================================

    const success = (

        title,

        message,

        duration = 4000

    ) => {

        mostrar({

            type: "success",

            title,

            message,

            duration

        });

    };

    // ==========================================
    // Notificación de Error
    // ==========================================

    const error = (

        title,

        message,

        duration = 5000

    ) => {

        mostrar({

            type: "error",

            title,

            message,

            duration

        });

    };

    // ==========================================
    // Notificación de Advertencia
    // ==========================================

    const warning = (

        title,

        message,

        duration = 4500

    ) => {

        mostrar({

            type: "warning",

            title,

            message,

            duration

        });

    };

    // ==========================================
    // Notificación Informativa
    // ==========================================

    const info = (

        title,

        message,

        duration = 4000

    ) => {

        mostrar({

            type: "info",

            title,

            message,

            duration

        });

    };

    // ==========================================
    // Limpiar Notificación
    // ==========================================

    const limpiar = () => {

        setNotification({

            open: false,

            type: "info",

            title: "",

            message: "",

            duration: 4000

        });

    };

    // ==========================================
    // Valores Compartidos
    // ==========================================

    const value = {

        notification,

        mostrar,

        cerrar,

        limpiar,

        success,

        error,

        warning,

        info

    };

    return (

        <NotificationContext.Provider value={value}>

            {children}

        </NotificationContext.Provider>

    );

}

export default NotificationContext;