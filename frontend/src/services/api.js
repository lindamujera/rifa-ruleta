// ==========================================
// src/services/api.js
// Cliente HTTP para consumir la API
// ==========================================

import axios from "axios";

// ==========================================
// Configuración Base
// ==========================================

const api = axios.create({

    baseURL:
        import.meta.env.VITE_API_URL ||
        "http://localhost:5001/api",

    timeout: 30000

});

// ==========================================
// Interceptor Request
// Agrega automáticamente el Token JWT
// ==========================================

api.interceptors.request.use(

    (config) => {

        const token =
            localStorage.getItem("token");

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;

        }

        return config;

    },

    (error) => {

        return Promise.reject(error);

    }

);

// ==========================================
// Interceptor Response
// Manejo global de errores
// ==========================================

api.interceptors.response.use(

    (response) => response,

    (error) => {

        if (error.response) {

            switch (error.response.status) {

                case 401:

                    console.warn(
                        "Sesión expirada."
                    );

                    localStorage.removeItem(
                        "token"
                    );

                    localStorage.removeItem(
                        "user"
                    );

                    window.location.href = "/login";

                    break;

                case 403:

                    console.warn(
                        "Acceso denegado."
                    );

                    break;

                case 404:

                    console.warn(
                        "Recurso no encontrado."
                    );

                    break;

                case 500:

                    console.error(
                        "Error interno del servidor."
                    );

                    break;

                default:

                    console.error(
                        error.response.data?.message ||
                        "Error desconocido."
                    );

            }

        } else {

            console.error(
                "No fue posible conectar con el servidor."
            );

        }

        return Promise.reject(error);

    }

);

// ==========================================
// Métodos auxiliares
// ==========================================

export const get = (url, config = {}) =>
    api.get(url, config);

export const post = (url, data = {}, config = {}) =>
    api.post(url, data, config);

export const put = (url, data = {}, config = {}) =>
    api.put(url, data, config);

export const patch = (url, data = {}, config = {}) =>
    api.patch(url, data, config);

export const del = (url, config = {}) =>
    api.delete(url, config);

// ==========================================
// Exportar instancia principal
// ==========================================

export default api;