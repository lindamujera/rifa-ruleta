// ==========================================
// backend/controllers/RoundController.js
// ==========================================

const RoundBusiness = require("../business/RoundBusiness");
const RoundService = require("../services/RoundService");

class RoundController {

    // ==========================================
    // Obtener ronda activa
    // ==========================================

    async obtenerActiva(req, res) {

        try {

            const ronda =
                await RoundBusiness.obtenerRondaActiva();

            return res.status(200).json({

                success: true,

                data: ronda

            });

        } catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }

    // ==========================================
    // Obtener todas las rondas
    // ==========================================

    async obtenerTodas(req, res) {

        try {

            const rondas =
                await RoundService.obtenerTodas();

            return res.status(200).json({

                success: true,

                total: rondas.length,

                data: rondas

            });

        } catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }

    // ==========================================
    // Obtener rondas abiertas
    // ==========================================

    async obtenerAbiertas(req, res) {

        try {

            const rondas =
                await RoundService.obtenerAbiertas();

            return res.status(200).json({

                success: true,

                total: rondas.length,

                data: rondas

            });

        } catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }

    // ==========================================
    // Obtener rondas cerradas
    // ==========================================

    async obtenerCerradas(req, res) {

        try {

            const rondas =
                await RoundService.obtenerCerradas();

            return res.status(200).json({

                success: true,

                total: rondas.length,

                data: rondas

            });

        } catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }

    // ==========================================
    // Obtener rondas finalizadas
    // ==========================================

    async obtenerFinalizadas(req, res) {

        try {

            const rondas =
                await RoundService.obtenerFinalizadas();

            return res.status(200).json({

                success: true,

                total: rondas.length,

                data: rondas

            });

        } catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }

    // ==========================================
    // Obtener ronda por ID
    // ==========================================

    async obtenerPorId(req, res) {

        try {

            const ronda =
                await RoundService.obtenerPorId(
                    req.params.rondaId
                );

            if (!ronda) {

                return res.status(404).json({

                    success: false,

                    message: "Ronda no encontrada."

                });

            }

            return res.status(200).json({

                success: true,

                data: ronda

            });

        } catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }

    // ==========================================
    // Cerrar ronda
    // ==========================================

    async cerrar(req, res) {

        try {

            const ronda =
                await RoundBusiness.cerrarRonda(
                    req.params.rondaId
                );

            return res.status(200).json({

                success: true,

                message: "Ronda cerrada correctamente.",

                data: ronda

            });

        } catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }

    // ==========================================
    // Resumen financiero
    // ==========================================

    async resumen(req, res) {

        try {

            const resumen =
                await RoundBusiness.resumen(
                    req.params.rondaId
                );

            return res.status(200).json({

                success: true,

                data: resumen

            });

        } catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }

}

module.exports = new RoundController();