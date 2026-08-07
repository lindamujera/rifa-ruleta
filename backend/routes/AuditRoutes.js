// ==========================================
// backend/routes/auditRoutes.js
// ==========================================

const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const roles = require("../middleware/roles");

const AuditController = require("../controllers/AuditController");

// ==========================================
// Obtener todos los registros de auditoría
// Solo ADMIN
// ==========================================
router.get(
    "/",
    auth,
    roles("ADMIN"),
    AuditController.listar
);

// ==========================================
// Obtener auditoría por usuario
// ==========================================
router.get(
    "/usuario/:usuarioId",
    auth,
    roles("ADMIN"),
    AuditController.obtenerPorUsuario
);

// ==========================================
// Buscar auditoría por código
// ==========================================
router.get(
    "/codigo/:codigo",
    auth,
    roles("ADMIN"),
    AuditController.obtenerPorCodigo
);

module.exports = router;