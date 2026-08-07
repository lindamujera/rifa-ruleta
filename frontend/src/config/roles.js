// ==========================================
// src/config/roles.js
// ==========================================

/**
 * Roles del Sistema
 */

export const ROLES = {

    ADMIN: "ADMIN",

    USER: "USER"

};

/**
 * Permisos del Administrador
 */

export const ADMIN_PERMISSIONS = [

    "dashboard.view",

    "users.view",

    "users.create",

    "users.edit",

    "users.delete",

    "payments.view",

    "payments.approve",

    "payments.reject",

    "tickets.view",

    "tickets.generate",

    "rounds.view",

    "rounds.create",

    "rounds.close",

    "rounds.finish",

    "roulette.manage",

    "prizepool.view",

    "prizepool.update",

    "statistics.view",

    "reports.view"

];

/**
 * Permisos del Usuario
 */

export const USER_PERMISSIONS = [

    "profile.view",

    "profile.edit",

    "payment.create",

    "payment.history",

    "ticket.view",

    "ticket.history",

    "roulette.spin",

    "roulette.history",

    "dashboard.view"

];

/**
 * Obtiene los permisos según el rol.
 */

export const getPermissions = (role) => {

    switch (role) {

        case ROLES.ADMIN:

            return ADMIN_PERMISSIONS;

        case ROLES.USER:

            return USER_PERMISSIONS;

        default:

            return [];

    }

};

/**
 * Verifica si un rol posee un permiso.
 */

export const hasPermission = (

    role,

    permission

) => {

    return getPermissions(role).includes(permission);

};

/**
 * Verifica si el usuario es administrador.
 */

export const isAdmin = (role) => {

    return role === ROLES.ADMIN;

};

/**
 * Verifica si el usuario es un participante.
 */

export const isUser = (role) => {

    return role === ROLES.USER;

};

export default ROLES;