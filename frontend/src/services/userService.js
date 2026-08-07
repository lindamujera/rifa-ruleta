// ==========================================
// src/services/userService.js
// ==========================================

import api from "./api";

class UserService {

    // ==========================================
    // Obtener Perfil
    // ==========================================
    async obtenerPerfil() {

        try {

            const response = await api.get(

                "/users/profile"

            );

            return response.data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    // ==========================================
    // Actualizar Perfil
    // ==========================================
    async actualizarPerfil(datos) {

        try {

            const response = await api.put(

                "/users/profile",

                datos

            );

            return response.data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    // ==========================================
    // Obtener Usuario por ID
    // ==========================================
    async obtenerPorId(id) {

        try {

            const response = await api.get(

                `/users/${id}`

            );

            return response.data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    // ==========================================
    // Obtener Todos los Usuarios
    // ==========================================
    async obtenerTodos() {

        try {

            const response = await api.get(

                "/users"

            );

            return response.data;

        } catch (error) {

            throw this.handleError(error);

        }

    }

    // ==========================================
    // Manejo Centralizado de Errores
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

export default new UserService();