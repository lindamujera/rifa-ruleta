// ==========================================
// backend/routes/TicketRoutes.js
// ==========================================

const express = require("express");

const router = express.Router();

const auth = require("../middleware/Auth");
const roles = require("../middleware/Roles");

const TicketController = require("../controllers/TicketController");

// ==========================================
// Crear Ticket
// ==========================================
router.post(
    "/",
    auth,
    TicketController.crear
);

// ==========================================
// Escoger número de rifa
// ==========================================
router.put(
    "/:ticketId/numero",
    auth,
    TicketController.escogerNumero
);

// ==========================================
// Validar número disponible
// ==========================================
router.get(
    "/validar/:rondaId/:numero",
    auth,
    TicketController.validarNumero
);

// ==========================================
// Verificar si un usuario ya tiene Ticket
// ==========================================
router.get(
    "/usuario/:usuarioId/ronda/:rondaId/total",
    auth,
    roles("ADMIN", "OPERADOR"),
    TicketController.contarTickets
);

// ==========================================
// Obtener Tickets de un usuario
// ==========================================
router.get(
    "/usuario/:usuarioId",
    auth,
    TicketController.obtenerPorUsuario
);

// ==========================================
// Obtener Tickets de una ronda
// ==========================================
router.get(
    "/ronda/:rondaId",
    auth,
    roles("ADMIN", "OPERADOR"),
    TicketController.obtenerPorRonda
);

// ==========================================
// Obtener número del Ticket
// ==========================================
router.get(
    "/:ticketId/numero",
    auth,
    TicketController.obtenerNumero
);

// ==========================================
// Obtener Ticket por ID
// ==========================================
router.get(
    "/:ticketId",
    auth,
    TicketController.obtenerPorId
);

module.exports = router; 
