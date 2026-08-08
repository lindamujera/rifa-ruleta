// ==========================================
// src/config/apiConfig.js
// ==========================================

/**
 * Configuración general de la API
 */

const API_CONFIG = {

    BASE_URL:

        import.meta.env.VITE_API_URL ||

        "http://localhost:5001/api"

    TIMEOUT: 30000,

    HEADERS: {

        "Content-Type": "application/json",

        Accept: "application/json"

    }

};

/**
 * Endpoints de Autenticación
 */
export const AUTH_API = {

    LOGIN: "/auth/login",

    REGISTER: "/auth/register",

    PROFILE: "/auth/profile",

    REFRESH: "/auth/refresh",

    LOGOUT: "/auth/logout"

};

/**
 * Usuarios
 */

export const USERS_API = {

    LIST: "/users",

    CREATE: "/users",

    DETAIL: "/users/:id",

    UPDATE: "/users/:id",

    DELETE: "/users/:id"

};

/**
 * Pagos
 */

export const PAYMENTS_API = {

    LIST: "/payments",

    CREATE: "/payments",

    DETAIL: "/payments/:id",

    APPROVE: "/payments/:id/approve",

    REJECT: "/payments/:id/reject",

    HISTORY: "/payments/history"

};

/**
 * Tickets
 */

export const TICKETS_API = {

    LIST: "/tickets",

    MY_TICKET: "/tickets/my-ticket",

    DETAIL: "/tickets/:id",

    HISTORY: "/tickets/history",

    QR: "/tickets/:id/qr"

};

/**
 * Ruleta
 */

export const ROULETTE_API = {

    SPIN: "/roulette/spin",

    HISTORY: "/roulette/history",

    PRIZES: "/roulette/prizes"

};

/**
 * Rondas
 */

export const ROUNDS_API = {

    LIST: "/rounds",

    CURRENT: "/rounds/current",

    CREATE: "/rounds",

    CLOSE: "/rounds/:id/close",

    WINNER: "/rounds/:id/winner"

};

/**
 * Bolsa de Premios
 */

export const PRIZEPOOL_API = {

    CURRENT: "/prize-pool/current",

    HISTORY: "/prize-pool/history"

};

/**
 * Dashboard
 */

export const DASHBOARD_API = {

    ADMIN: "/dashboard/admin",

    USER: "/dashboard/user",

    STATISTICS: "/dashboard/statistics"

};

/**
 * Reportes
 */

export const REPORTS_API = {

    PAYMENTS: "/reports/payments",

    USERS: "/reports/users",

    ROUNDS: "/reports/rounds",

    PRIZES: "/reports/prizes"

};

export default API_CONFIG;
