// ==========================================
// src/services/authService.js
// Servicio de Autenticación
// ==========================================

import api from "./api";

class AuthService {

    // ==========================================
    // Registrar Usuario
    // ==========================================
    async register(datos) {

        try {

            const response = await api.post(
                "/auth/register",
                datos
            );

            return response.data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    // ==========================================
    // Iniciar Sesión
    // ==========================================
    async login(correo, password) {

        try {

            const response = await api.post(
                "/auth/login",
                {
                    correo,
                    password
                }
            );

            return response.data;

        } catch (error) {

            throw this.handleError(error);

        }

    } 

    // ==========================================
    // Cerrar Sesión
    // ==========================================
    logout() {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    sessionStorage.clear();

}

    // ==========================================
    // Guardar Sesión
    // ==========================================
    saveSession(token, usuario) {

        localStorage.setItem(
            "token",
            token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(usuario)
        );

    }

    // ==========================================
    // Obtener Token
    // ==========================================
    getToken() {

        return localStorage.getItem(
            "token"
        );

    }

    // ==========================================
    // Obtener Usuario
    // ==========================================
    getUser() {

        const user =
            localStorage.getItem("user");

        return user
            ? JSON.parse(user)
            : null;

    }

    // ==========================================
    // Verificar si hay sesión
    // ==========================================
    isAuthenticated() {

        return !!this.getToken();

    }

    // ==========================================
    // Verificar Rol
    // ==========================================
    hasRole(rol) {

        const usuario =
            this.getUser();

        return usuario?.rol === rol;

    }

    // ==========================================
    // Actualizar Usuario
    // ==========================================
    updateUser(datos) {

        const usuario = {

            ...this.getUser(),

            ...datos

        };

        localStorage.setItem(

            "user",

            JSON.stringify(usuario)

        );

        return usuario;

    }

    // ==========================================
    // Manejo de errores
    // ==========================================
    handleError(error) {

        if (error.response) {

            return new Error(

                error.response.data?.message ||

                "Error del servidor."

            );

        }

        if (error.request) {

            return new Error(

                "No fue posible conectar con el servidor."

            );

        }

        return new Error(

            error.message ||

            "Ocurrió un error inesperado."

        );

    }

}

export default new AuthService();