// ==========================================
// backend/routes/RoundRoutes.js
// ==========================================

const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const roles = require("../middleware/roles");

const RoundController = require("../controllers/RoundController");

// ==========================================
// Obtener la ronda activa
// GET /api/rounds/current
// ==========================================

router.get(

    "/current",

    auth,

    RoundController.obtenerActiva

);

// ==========================================
// Obtener todas las rondas
// GET /api/rounds
// ==========================================

router.get(

    "/",

    auth,

    roles("ADMIN", "OPERADOR"),

    RoundController.obtenerTodas

);

// ==========================================
// Obtener rondas abiertas
// GET /api/rounds/open
// ==========================================

router.get(

    "/open",

    auth,

    roles("ADMIN", "OPERADOR"),

    RoundController.obtenerAbiertas

);

// ==========================================
// Obtener rondas cerradas
// GET /api/rounds/closed
// ==========================================

router.get(

    "/closed",

    auth,

    roles("ADMIN", "OPERADOR"),

    RoundController.obtenerCerradas

);

// ==========================================
// Obtener rondas finalizadas
// GET /api/rounds/finished
// ==========================================

router.get(

    "/finished",

    auth,

    roles("ADMIN", "OPERADOR"),

    RoundController.obtenerFinalizadas

);

// ==========================================
// Obtener ronda por ID
// GET /api/rounds/:rondaId
// ==========================================

router.get(

    "/:rondaId",

    auth,

    RoundController.obtenerPorId

);

// ==========================================
// Resumen financiero
// GET /api/rounds/:rondaId/resumen
// ==========================================

router.get(

    "/:rondaId/resumen",

    auth,

    roles("ADMIN", "OPERADOR"),

    RoundController.resumen

);

// ==========================================
// Cerrar ronda
// PUT /api/rounds/:rondaId/cerrar
// ==========================================

router.put(

    "/:rondaId/cerrar",

    auth,

    roles("ADMIN"),

    RoundController.cerrar

);

// ==========================================
// Exportar rutas
// ==========================================

module.exports = router;