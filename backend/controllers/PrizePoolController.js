// ==========================================
// backend/controllers/PrizePoolController.js
// ==========================================

const PrizePoolBusiness = require("../business/PrizePoolBusiness");

class PrizePoolController {

    // ==========================================
    // Obtener Premio Actual
    // ==========================================
    async obtenerActual(req, res) {

        try {

            const premio =
                await PrizePoolBusiness.obtenerActual();

            return res.status(200).json({

                success: true,

                data: premio

            });

        } catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }

    // ==========================================
    // Obtener Premio por ID
    // ==========================================
    async obtenerPorId(req, res) {

        try {

            const premio =
                await PrizePoolBusiness.obtenerPorId(

                    req.params.prizePoolId

                );

            return res.status(200).json({

                success: true,

                data: premio

            });

        } catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }

    // ==========================================
    // Obtener Historial
    // ==========================================
    async obtenerHistorial(req, res) {

        try {

            const historial =
                await PrizePoolBusiness.obtenerHistorial();

            return res.status(200).json({

                success: true,

                total: historial.length,

                data: historial

            });

        } catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }

    // ==========================================
    // Incrementar Fondo
    // ==========================================
    async incrementar(req, res) {

        try {

            const {

                valor

            } = req.body;

            const premio =
                await PrizePoolBusiness.incrementar(

                    Number(valor)

                );

            return res.status(200).json({

                success: true,

                message:
                    "Fondo actualizado correctamente.",

                data: premio

            });

        } catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }

    // ==========================================
    // Reiniciar Fondo
    // ==========================================
    async reiniciar(req, res) {

        try {

            const premio =
                await PrizePoolBusiness.reiniciar();

            return res.status(200).json({

                success: true,

                message:
                    "Premio reiniciado correctamente.",

                data: premio

            });

        } catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }

    // ==========================================
    // Entregar Premio
    // ==========================================
    async entregar(req, res) {

        try {

            const {

                ganadorId,
                ticketId,
                rondaId

            } = req.body;

            const premio =
                await PrizePoolBusiness.entregar(

                    ganadorId,
                    ticketId,
                    rondaId

                );

            return res.status(200).json({

                success: true,

                message:
                    "Premio entregado correctamente.",

                data: premio

            });

        } catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }

    // ==========================================
    // Dashboard del Premio
    // ==========================================
    async dashboard(req, res) {

        try {

            const dashboard =
                await PrizePoolBusiness.dashboard();

            return res.status(200).json({

                success: true,

                data: dashboard

            });

        } catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }

}

module.exports = new PrizePoolController();