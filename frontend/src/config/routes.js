// ==========================================
// src/config/routes.js
// ==========================================

/**
 * Rutas públicas
 */

export const PUBLIC_ROUTES = {

    HOME: "/",

    LOGIN: "/login",

    REGISTER: "/register",

    FORGOT_PASSWORD: "/forgot-password",

    RESET_PASSWORD: "/reset-password"

};

/**
 * Rutas del usuario
 */

export const USER_ROUTES = {

    DASHBOARD: "/dashboard",

    PROFILE: "/profile",

    PAYMENT: "/payment",

    PAYMENT_HISTORY: "/payment/history",

    UPLOAD_VOUCHER: "/payment/upload",

    TICKET: "/ticket",

    TICKET_HISTORY: "/ticket/history",

    ROULETTE: "/roulette",

    SPIN_HISTORY: "/roulette/history"

};

/**
 * Panel Administrativo
 */

export const ADMIN_ROUTES = {

    DASHBOARD: "/admin",

    USERS: "/admin/users",

    PAYMENTS: "/admin/payments",

    ROUNDS: "/admin/rounds",

    PRIZE_POOL: "/admin/prize-pool",

    STATISTICS: "/admin/statistics"

};

/**
 * Configuración
 */

export const SETTINGS_ROUTES = {

    PROFILE: "/settings/profile",

    PASSWORD: "/settings/password"

};

/**
 * Ruta 404
 */

export const ERROR_ROUTES = {

    NOT_FOUND: "*"

};

/**
 * Todas las rutas
 */

const ROUTES = {

    ...PUBLIC_ROUTES,

    ...USER_ROUTES,

    ...ADMIN_ROUTES,

    ...SETTINGS_ROUTES,

    ...ERROR_ROUTES

};

export default ROUTES;