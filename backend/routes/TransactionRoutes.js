// ==========================================
// backend/routes/transactionRoutes.js
// ========================================== 

const express = require("express");

const router = express.Router();

const auth = require("../middleware/Auth");
const roles = require("../middleware/Roles");

const TransactionController = require("../controllers/TransactionController");

// ==========================================
// Obtener todas las transacciones
// ==========================================
router.get(
    "/",
    auth,
    roles("ADMIN", "OPERADOR"),
    TransactionController.listar
);

// ==========================================
// Obtener transacciones de un usuario
// ==========================================
router.get(
    "/usuario/:usuarioId",
    auth,
    roles("ADMIN", "OPERADOR"),
    TransactionController.obtenerPorUsuario
);

// ==========================================
// Buscar transacción por código
// ==========================================
router.get(
    "/codigo/:codigo",
    auth,
    roles("ADMIN", "OPERADOR"),
    TransactionController.obtenerPorCodigo
);

module.exports = router;
