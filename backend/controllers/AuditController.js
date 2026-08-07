// ==========================================
// backend/controllers/AuditController.js
// ==========================================

const AuditLog = require("../models/AuditLog");
const AuditService = require("../services/AuditService");

class AuditController {

    // ==========================================
    // Obtener todos los registros
    // ==========================================
    async listar(req, res) {

        try {

            const registros = await AuditLog.find()
                .populate("usuario")
                .sort({
                    createdAt: -1
                });

            return res.status(200).json({
                success: true,
                total: registros.length,
                data: registros
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    // ==========================================
    // Buscar registros por usuario
    // ==========================================
    async obtenerPorUsuario(req, res) {

        try {

            const registros =
                await AuditService.buscarPorUsuario(
                    req.params.usuarioId
                );

            return res.status(200).json({
                success: true,
                total: registros.length,
                data: registros
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    // ==========================================
    // Buscar por código
    // ==========================================
    async obtenerPorCodigo(req, res) {

        try {

            const registro =
                await AuditService.buscarPorCodigo(
                    req.params.codigo
                );

            if (!registro) {

                return res.status(404).json({
                    success: false,
                    message: "Registro de auditoría no encontrado."
                });

            }

            return res.status(200).json({
                success: true,
                data: registro
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

}

module.exports = new AuditController();