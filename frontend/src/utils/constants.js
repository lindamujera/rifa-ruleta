// ==========================================
// src/utils/constants.js
// ==========================================

/**
 * Configuración general del sistema
 */

export const APP_NAME = "Rifa & Ruleta";

export const APP_VERSION = "1.0.0";

export const CURRENCY = "COP";

export const PARTICIPATION_VALUE = 25000;

export const MAX_PARTICIPANTS = 100;

export const MAIN_PRIZE = 1000000;

/**
 * Estados de Pago
 */

export const PAYMENT_STATUS = {

    PENDING: "PENDING",

    APPROVED: "APPROVED",

    REJECTED: "REJECTED"

};

/**
 * Estados del Ticket
 */

export const TICKET_STATUS = {

    PENDING: "PENDING",

    ACTIVE: "ACTIVE",

    USED: "USED",

    WINNER: "WINNER",

    CANCELLED: "CANCELLED"

};

/**
 * Estados de la Ronda
 */

export const ROUND_STATUS = {

    OPEN: "OPEN",

    CLOSED: "CLOSED",

    FINISHED: "FINISHED"

};

/**
 * Estados del Giro
 */

export const SPIN_STATUS = {

    PENDING: "PENDING",

    PLAYED: "PLAYED",

    WINNER: "WINNER",

    LOSER: "LOSER"

};

/**
 * Roles del Usuario
 */

export const USER_ROLES = {

    ADMIN: "ADMIN",

    USER: "USER"

};

/**
 * Tipos de Notificación
 */

export const NOTIFICATION_TYPES = {

    SUCCESS: "success",

    INFO: "info",

    WARNING: "warning",

    ERROR: "error"

};

/**
 * Métodos de Pago
 */

export const PAYMENT_METHODS = {

    WOMPI: "WOMPI",

    PSE: "PSE",

    NEQUI: "NEQUI",

    DAVIPLATA: "DAVIPLATA",

    TRANSFER: "TRANSFER"

};

/**
 * Colores de Estados
 */

export const STATUS_COLORS = {

    SUCCESS: "#22c55e",

    WARNING: "#f59e0b",

    ERROR: "#ef4444",

    PRIMARY: "#2563eb",

    SECONDARY: "#64748b"

};

/**
 * Rutas de la API
 */

export const API_ENDPOINTS = {

    AUTH: "/auth",

    USERS: "/users",

    PAYMENTS: "/payments",

    TICKETS: "/tickets",

    ROUNDS: "/rounds",

    SPINS: "/spins",

    PRIZES: "/prizes",

    DASHBOARD: "/dashboard"

};

/**
 * Configuración de la Ruleta
 */

export const ROULETTE = {

    SEGMENTS: 12,

    SPIN_DURATION: 5000,

    MIN_ROTATIONS: 5,

    MAX_ROTATIONS: 8

};

/**
 * Límites de Archivos
 */

export const FILES = {

    MAX_IMAGE_SIZE: 5 * 1024 * 1024,

    ALLOWED_IMAGES: [

        "image/jpeg",

        "image/png",

        "image/webp"

    ]

};

/**
 * Mensajes Generales
 */

export const MESSAGES = {

    SAVE_SUCCESS: "Registro guardado correctamente.",

    UPDATE_SUCCESS: "Información actualizada correctamente.",

    DELETE_SUCCESS: "Registro eliminado correctamente.",

    PAYMENT_PENDING: "Pago pendiente de aprobación.",

    PAYMENT_APPROVED: "Pago aprobado correctamente.",

    PAYMENT_REJECTED: "Pago rechazado.",

    ROUND_OPEN: "La ronda está abierta.",

    ROUND_CLOSED: "La ronda ha sido cerrada.",

    ROUND_FINISHED: "La ronda ha finalizado."

};

/**
 * Configuración de Paginación
 */

export const PAGINATION = {

    PAGE_SIZE: 10,

    PAGE_OPTIONS: [10, 20, 50, 100]

};