// ==========================================
// backend/controllers/TransactionController.js
// ==========================================

const TransactionService = require("../services/TransactionService");

class TransactionController {

    // ==========================================
    // Obtener todas las transacciones
    // ==========================================
    async listar(req, res) {

        try {

            const transacciones =
                await TransactionService.obtenerTodas();

            return res.status(200).json({
                success: true,
                total: transacciones.length,
                data: transacciones
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    // ==========================================
    // Obtener transacciones por usuario
    // ==========================================
    async obtenerPorUsuario(req, res) {

        try {

            const transacciones =
                await TransactionService.obtenerPorUsuario(
                    req.params.usuarioId
                );

            return res.status(200).json({
                success: true,
                total: transacciones.length,
                data: transacciones
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    // ==========================================
    // Obtener transacción por código
    // ==========================================
    async obtenerPorCodigo(req, res) {

        try {

            const transaccion =
                await TransactionService.obtenerPorCodigo(
                    req.params.codigo
                );

            if (!transaccion) {

                return res.status(404).json({
                    success: false,
                    message: "Transacción no encontrada."
                });

            }

            return res.status(200).json({
                success: true,
                data: transaccion
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

}

module.exports = new TransactionController();