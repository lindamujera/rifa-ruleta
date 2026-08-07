// ==========================================
// backend/controllers/PaymentController.js
// ==========================================

const PaymentService = require("../services/PaymentService");
const BusinessService = require("../services/BusinessService");

class PaymentController {

    // ==========================================
    // Crear Pago
    // ==========================================

    async crear(req, res) {

        try {

            console.log("=================================");
            console.log("REQ.FILE");
            console.log(req.file);

            console.log("REQ.BODY");
            console.log(req.body);

            const datos = {

                ...req.body,

                usuario: req.user.id,

                comprobante: req.file
                    ? req.file.filename
                    : null

            };

            console.log("DATOS");
            console.log(datos);
            console.log("=================================");

            const pago = await PaymentService.crear(datos);

            return res.status(201).json({

                success: true,

                message: "Pago registrado correctamente.",

                data: pago

            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }

    // ==========================================
    // Aprobar Pago
    // ==========================================

    async aprobar(req, res) {

        try {

            const resultado = await BusinessService.aprobarPago(

                req.params.pagoId,

                req.user,

                req

            );

            return res.status(200).json({

                success: true,

                message: "Pago aprobado correctamente.",

                data: resultado

            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }

    // ==========================================
    // Rechazar Pago
    // ==========================================

    async rechazar(req, res) {

        try {

            const pago = await PaymentService.rechazar(

                req.params.pagoId,

                req.user.id,

                req.body.motivo

            );

            return res.status(200).json({

                success: true,

                message: "Pago rechazado correctamente.",

                data: pago

            });

        } catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }

    // ==========================================
    // Pagos Pendientes
    // ==========================================

    async pendientes(req, res) {

        try {

          const pagos = await PaymentService.obtenerPendientes();

const host = process.env.APP_URL || "http://localhost:5001";

const pagosConImagen = pagos.map(pago => ({

    ...pago.toObject(),

    comprobanteUrl:

        pago.comprobante

            ? `${host}/uploads/comprobantes/${pago.comprobante}`

            : null

}));

return res.json({

    success: true,

    data: pagosConImagen

});

        } catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message 

            });

        }

    }

    // ==========================================
    // Pagos Aprobados
    // ==========================================

    async aprobados(req, res) {

        try {

            const pagos = await PaymentService.obtenerAprobados();

            return res.status(200).json({

                success: true,

                total: pagos.length,

                data: pagos

            });

        } catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }

    // ==========================================
    // Pagos Rechazados
    // ==========================================

    async rechazados(req, res) {

        try {

            const pagos = await PaymentService.obtenerRechazados();

            return res.status(200).json({

                success: true,

                total: pagos.length,

                data: pagos

            });

        } catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }

    // ==========================================
    // Pagos del Usuario
    // ==========================================

    async pagosUsuario(req, res) {

        try {

            const pagos = await PaymentService.obtenerPorUsuario(req.user.id);

            return res.status(200).json({

                success: true,

                total: pagos.length,

                data: pagos

            });

        } catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }

    // ==========================================
    // Buscar Pago por ID
    // ==========================================

    async obtenerPorId(req, res) {

        try {

            const pago = await PaymentService.obtenerPorId(req.params.id);

            if (!pago) {

                return res.status(404).json({

                    success: false,

                    message: "Pago no encontrado."

                });

            }

            return res.status(200).json({

                success: true,

                data: pago

            });

        } catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }

    // ==========================================
    // Buscar Pago por Código
    // ==========================================

    async obtenerPorCodigo(req, res) {

        try {

            const pago = await PaymentService.obtenerPorCodigo(req.params.codigo);

            if (!pago) {

                return res.status(404).json({

                    success: false,

                    message: "Pago no encontrado."

                });

            }

            return res.status(200).json({

                success: true,

                data: pago

            });

        } catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }

    // ==========================================
    // Eliminar Pago
    // ==========================================

    async eliminar(req, res) {

        try {

            await PaymentService.eliminar(req.params.id);

            return res.status(200).json({

                success: true,

                message: "Pago eliminado correctamente."

            });

        } catch (error) {

            return res.status(500).json({

                success: false,

                message: error.message

            });

        }

    }

}

module.exports = new PaymentController(); 