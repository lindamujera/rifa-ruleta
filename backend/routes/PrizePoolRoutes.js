// ==========================================
// backend/routes/PrizePoolRoutes.js
// ==========================================

const express = require("express");

const router = express.Router();

const auth = require("../middleware/Auth");
const roles = require("../middleware/Roles");

const PrizePoolController = require("../controllers/PrizePoolController");

// ==========================================
// Obtener Premio Actual
// GET /api/prizepool/current
// ==========================================
router.get(
    "/current",
    auth,
    PrizePoolController.obtenerActual
);

// ==========================================
// Obtener Historial del Premio
// GET /api/prizepool/history
// ==========================================
router.get(
    "/history",
    auth,
    roles("ADMIN", "OPERADOR"),
    PrizePoolController.obtenerHistorial
);

// ==========================================
// Dashboard del Premio
// GET /api/prizepool/dashboard
// ==========================================
router.get(
    "/dashboard",
    auth,
    roles("ADMIN", "OPERADOR"),
    PrizePoolController.dashboard
);

// ==========================================
// Obtener Premio por ID
// GET /api/prizepool/:prizePoolId
// ==========================================
router.get(
    "/:prizePoolId",
    auth,
    PrizePoolController.obtenerPorId
);

// ==========================================
// Incrementar Fondo
// PUT /api/prizepool/increment
// ==========================================
router.put(
    "/increment",
    auth,
    roles("ADMIN"),
    PrizePoolController.incrementar
);

// ==========================================
// Reiniciar Fondo
// PUT /api/prizepool/reset
// ==========================================
router.put(
    "/reset",
    auth,
    roles("ADMIN"),
    PrizePoolController.reiniciar
);

// ==========================================
// Entregar Premio
// PUT /api/prizepool/deliver
// ==========================================
router.put(
    "/deliver",
    auth,
    roles("ADMIN"),
    PrizePoolController.entregar
);

module.exports = router;
