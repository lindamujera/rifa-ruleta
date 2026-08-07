// ==========================================
// backend/controllers/TicketController.js
// ==========================================

const TicketBusiness = require("../business/TicketBusiness");

class TicketController {

    // ==========================================
    // Crear Ticket
    // ==========================================
    async crear(req, res) {

        try {

            const usuarioId = req.user.id;

            const { pagoId, rondaId } = req.body;

            if (!pagoId || !rondaId) {

                return res.status(400).json({
                    success: false,
                    message: "Pago y ronda son obligatorios."
                });

            }

            const ticket = await TicketBusiness.crearTicket(
                usuarioId,
                pagoId,
                rondaId
            );

            return res.status(201).json({
                success: true,
                message: "Ticket creado correctamente.",
                data: ticket
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    // ==========================================
    // Escoger número
    // ==========================================
    async escogerNumero(req, res) {

        try {

            const { ticketId } = req.params;
            const { numero } = req.body;

            if (numero === undefined) {

                return res.status(400).json({
                    success: false,
                    message: "Debe seleccionar un número."
                });

            }

            // Validar propietario
            await TicketBusiness.validarPropietario(
                ticketId,
                req.user.id
            );

            const ticket = await TicketBusiness.escogerNumero(
                ticketId,
                Number(numero)
            );

            return res.json({
                success: true,
                message: "Número asignado correctamente.",
                data: ticket
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    // ==========================================
    // Validar número disponible
    // ==========================================
    async validarNumero(req, res) {

        try {

            const { rondaId, numero } = req.params;

            const disponible =
                await TicketBusiness.validarNumero(
                    rondaId,
                    Number(numero)
                );

            return res.json({
                success: true,
                disponible
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    // ==========================================
    // Obtener Tickets del Usuario
    // ==========================================
    async obtenerPorUsuario(req, res) {

        try {

            const usuarioId =

                req.user.rol === "ADMIN"
                    ? req.params.usuarioId
                    : req.user.id;

            const tickets =
                await TicketBusiness.obtenerTicketsUsuario(
                    usuarioId
                );

            return res.json({
                success: true,
                total: tickets.length,
                data: tickets
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    // ==========================================
    // Obtener Tickets Activos
    // ==========================================
    async obtenerActivos(req, res) {

        try {

            const tickets =
                await TicketBusiness.obtenerTicketsActivos(
                    req.user.id
                );

            return res.json({
                success: true,
                total: tickets.length,
                data: tickets
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    // ==========================================
    // Obtener Tickets por Ronda
    // ==========================================
    async obtenerPorRonda(req, res) {

        try {

            const tickets =
                await TicketBusiness.obtenerTicketsRonda(
                    req.params.rondaId
                );

            return res.json({
                success: true,
                total: tickets.length,
                data: tickets
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    // ==========================================
    // Obtener Ticket por ID
    // ==========================================
    async obtenerPorId(req, res) {

        try {

            const ticket =
                await TicketBusiness.obtenerTicket(
                    req.params.ticketId
                );

            return res.json({
                success: true,
                data: ticket
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    // ==========================================
    // Obtener Número del Ticket
    // ==========================================
    async obtenerNumero(req, res) {

        try {

            const numero =
                await TicketBusiness.obtenerNumero(
                    req.params.ticketId
                );

            return res.json({
                success: true,
                numero
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    // ==========================================
    // Contar Tickets del Usuario
    // ==========================================
    async contarTickets(req, res) {

        try {

            const { usuarioId, rondaId } = req.params;

            const total =
                await TicketBusiness.contarTicketsUsuario(
                    usuarioId,
                    rondaId
                );

            return res.json({
                success: true,
                total
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

}

module.exports = new TicketController();