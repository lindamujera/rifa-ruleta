// ==========================================
// backend/controllers/SpinController.js
// ==========================================

const SpinBusiness = require("../business/SpinBusiness");

class SpinController {

    // ==========================================
    // Crear Spin
    // ==========================================
    async crear(req, res) {

        try {

            const {

                ticketId,
                rondaId

            } = req.body;

            if (!ticketId || !rondaId) {

                return res.status(400).json({

                    success: false,
                    message: "Ticket y Ronda son obligatorios."

                });

            }

            const spin = await SpinBusiness.crearSpin(

                req.user.id,
                ticketId,
                rondaId

            );

            return res.status(201).json({

                success: true,
                message: "Spin creado correctamente.",
                data: spin

            });

        } catch (error) {

            return res.status(500).json({

                success: false,
                message: error.message

            });

        }

    }

    // ==========================================
    // Ejecutar Ruleta
    // ==========================================
 async ejecutar(req, res) {
    try {
        const resultado = await SpinBusiness.ejecutarRuleta(
            req.params.spinId
        );

        return res.status(200).json({
            success: true,
            message: "Ruleta ejecutada correctamente.",
            data: resultado
        });

    } catch (error) {
        // 🔴 Imprime el error real en la terminal para depuración
        console.error("❌ Error en SpinController.ejecutar:", error);

        // Si la lógica de negocio envía un mensaje específico de validación
        if (
            error.message === "El Spin no existe." ||
            error.message.includes("no está habilitado") ||
            error.message.includes("ya fue utilizado")
        ) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
    // ==========================================
    // Obtener Spin por ID
    // ==========================================
    async obtenerPorId(req, res) {

        try {

            const spin = await SpinBusiness.obtenerSpin(

                req.params.spinId

            );

            return res.status(200).json({

                success: true,
                data: spin

            });

        } catch (error) {

            if (error.message === "El Spin no existe.") {

                return res.status(404).json({

                    success: false,
                    message: error.message

                });

            }

            return res.status(500).json({

                success: false,
                message: error.message

            });

        }

    }

    // ==========================================
    // Obtener Premio
    // ==========================================
    async obtenerPremio(req, res) {

        try {

            const premio = await SpinBusiness.obtenerPremio(

                req.params.spinId

            );

            return res.status(200).json({

                success: true,
                premio

            });

        } catch (error) {

            if (error.message === "El Spin no existe.") {

                return res.status(404).json({

                    success: false,
                    message: error.message

                });

            }

            return res.status(500).json({

                success: false,
                message: error.message

            });

        }

    }

// ==========================================
    // Obtener Spins de un Usuario
    // ==========================================
    async obtenerPorUsuario(req, res) {

        try {

            const spins = await SpinBusiness.obtenerPorUsuario(

                req.params.usuarioId

            );

            return res.status(200).json({

                success: true,
                data: spins

            });

        } catch (error) {

            return res.status(500).json({

                success: false,
                message: error.message

            });

        }

    }

    // ==========================================
    // Obtener Spins de una Ronda
    // ==========================================
    async obtenerPorRonda(req, res) {

        try {

            const spins = await SpinBusiness.obtenerPorRonda(

                req.params.rondaId

            );

            return res.status(200).json({

                success: true,
                data: spins

            });

        } catch (error) {

            return res.status(500).json({

                success: false,
                message: error.message

            });

        }

    }
}

module.exports = new SpinController();