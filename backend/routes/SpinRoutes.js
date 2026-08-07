// ==========================================
// backend/routes/SpinRoutes.js
// ==========================================

const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const roles = require("../middleware/roles");

const SpinController = require("../controllers/SpinController");

// ==========================================
// Crear Spin
// ==========================================
router.post(
    "/",
    auth, 
    roles("ADMIN"), 
    SpinController.crear
);

// ==========================================
// Ejecutar Ruleta
// ==========================================
router.put(
    "/:spinId/ejecutar",
    auth, // Solo verifica que haya sesión iniciada
    SpinController.ejecutar
);
// ==========================================
// Obtener Spin por ID
// ==========================================
router.get(
    "/:spinId",
    auth,
    SpinController.obtenerPorId
);

// ==========================================
// Obtener premio del Spin
// ==========================================
router.get(
    "/:spinId/premio",
    auth,
    SpinController.obtenerPremio
);

// ==========================================
// Obtener Spins del Usuario
// ==========================================
router.get(
    "/usuario/:usuarioId",
    auth,
    SpinController.obtenerPorUsuario
);

// ==========================================
// Obtener Spins de una Ronda
// ==========================================
router.get(
    "/ronda/:rondaId",
    auth,
    roles("ADMIN", "OPERADOR"),
    SpinController.obtenerPorRonda
);

module.exports = router; 