// ==========================================
// backend/routes/notificationRoutes.js
// ==========================================

const express = require("express");

const router = express.Router();

const auth = require("../middleware/Auth");
const roles = require("../middleware/Roles");

const NotificationController = require("../controllers/NotificationController");

// ==========================================
// Obtener todas las notificaciones
// Solo ADMIN y OPERADOR
// ==========================================
router.get(
    "/",
    auth,
    roles("ADMIN", "OPERADOR"),
    NotificationController.listar
);

// ==========================================
// Obtener notificaciones de un usuario
// ==========================================
router.get(
    "/usuario/:usuarioId",
    auth,
    NotificationController.obtenerPorUsuario
);

// ==========================================
// Marcar una notificación como leída
// ==========================================
router.put(
    "/leer/:id",
    auth,
    NotificationController.marcarLeida
);

// ==========================================
// Marcar todas las notificaciones como leídas
// ==========================================
router.put(
    "/leer-todas/:usuarioId",
    auth,
    NotificationController.marcarTodas
);

module.exports = router;
