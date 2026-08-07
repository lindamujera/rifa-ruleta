// ==========================================
// backend/controllers/NotificationController.js
// ==========================================

const NotificationService = require("../services/NotificationService");

class NotificationController {

    // ==========================================
    // Obtener todas las notificaciones
    // ==========================================
    async listar(req, res) {

        try {

            const notificaciones =
                await NotificationService.obtenerTodas();

            return res.status(200).json({
                success: true,
                total: notificaciones.length,
                data: notificaciones
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    // ==========================================
    // Obtener notificaciones de un usuario
    // ==========================================
    async obtenerPorUsuario(req, res) {

        try {

            const notificaciones =
                await NotificationService.obtenerUsuario(
                    req.params.usuarioId
                );

            return res.status(200).json({
                success: true,
                total: notificaciones.length,
                data: notificaciones
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    // ==========================================
    // Marcar una notificación como leída
    // ==========================================
    async marcarLeida(req, res) {

        try {

            const notificacion =
                await NotificationService.marcarLeida(
                    req.params.id
                );

            if (!notificacion) {

                return res.status(404).json({
                    success: false,
                    message: "Notificación no encontrada."
                });

            }

            return res.status(200).json({
                success: true,
                message: "Notificación actualizada correctamente.",
                data: notificacion
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    // ==========================================
    // Marcar todas como leídas
    // ==========================================
    async marcarTodas(req, res) {

        try {

            await NotificationService.marcarTodas(
                req.params.usuarioId
            );

            return res.status(200).json({
                success: true,
                message: "Todas las notificaciones fueron marcadas como leídas."
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

}

module.exports = new NotificationController();