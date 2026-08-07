// ==========================================
// src/utils/storage.js
// ==========================================

/**
 * Guarda un valor en LocalStorage.
 *
 * @param {string} key
 * @param {*} value
 */

export const setStorage = (key, value) => {

    try {

        localStorage.setItem(

            key,

            JSON.stringify(value)

        );

    } catch (error) {

        console.error("Error al guardar en LocalStorage:", error);

    }

};

/**
 * Obtiene un valor de LocalStorage.
 *
 * @param {string} key
 * @param {*} defaultValue
 * @returns {*}
 */

export const getStorage = (

    key,

    defaultValue = null

) => {

    try {

        const item = localStorage.getItem(key);

        return item

            ? JSON.parse(item)

            : defaultValue;

    } catch (error) {

        console.error("Error al leer LocalStorage:", error);

        return defaultValue;

    }

};

/**
 * Elimina un elemento de LocalStorage.
 */

export const removeStorage = (key) => {

    try {

        localStorage.removeItem(key);

    } catch (error) {

        console.error("Error al eliminar LocalStorage:", error);

    }

};

/**
 * Limpia todo el LocalStorage.
 */

export const clearStorage = () => {

    try {

        localStorage.clear();

    } catch (error) {

        console.error("Error al limpiar LocalStorage:", error);

    }

};

/**
 * Verifica si existe una clave.
 */

export const hasStorage = (key) => {

    return localStorage.getItem(key) !== null;

};

/* ==========================================
   Session Storage
========================================== */

/**
 * Guarda un valor en SessionStorage.
 */

export const setSession = (key, value) => {

    try {

        sessionStorage.setItem(

            key,

            JSON.stringify(value)

        );

    } catch (error) {

        console.error("Error al guardar SessionStorage:", error);

    }

};

/**
 * Obtiene un valor de SessionStorage.
 */

export const getSession = (

    key,

    defaultValue = null

) => {

    try {

        const item = sessionStorage.getItem(key);

        return item

            ? JSON.parse(item)

            : defaultValue;

    } catch (error) {

        console.error("Error al leer SessionStorage:", error);

        return defaultValue;

    }

};

/**
 * Elimina un elemento de SessionStorage.
 */

export const removeSession = (key) => {

    try {

        sessionStorage.removeItem(key);

    } catch (error) {

        console.error("Error al eliminar SessionStorage:", error);

    }

};

/**
 * Limpia SessionStorage.
 */

export const clearSession = () => {

    try {

        sessionStorage.clear();

    } catch (error) {

        console.error("Error al limpiar SessionStorage:", error);

    }

};

/* ==========================================
   Token JWT
========================================== */

/**
 * Guarda el token de autenticación.
 */

export const saveToken = (token) => {

    setStorage("token", token);

};

/**
 * Obtiene el token.
 */

export const getToken = () => {

    return getStorage("token");

};

/**
 * Elimina el token.
 */

export const removeToken = () => {

    removeStorage("token");

};

/* ==========================================
   Usuario
========================================== */

/**
 * Guarda el usuario autenticado.
 */

export const saveUser = (user) => {

    setStorage("user", user);

};

/**
 * Obtiene el usuario.
 */

export const getUser = () => {

    return getStorage("user");

};

/**
 * Elimina el usuario.
 */

export const removeUser = () => {

    removeStorage("user");

};

/**
 * Cierra la sesión del usuario.
 */

export const logout = () => {

    removeToken();

    removeUser();

    clearSession();

};

export default {

    setStorage,

    getStorage,

    removeStorage,

    clearStorage,

    hasStorage,

    setSession,

    getSession,

    removeSession,

    clearSession,

    saveToken,

    getToken,

    removeToken,

    saveUser,

    getUser,

    removeUser,

    logout

};