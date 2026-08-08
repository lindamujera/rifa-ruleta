// ==========================================
// backend/routes/paymentRoutes.js
// ==========================================

const express = require("express");

const router = express.Router();

const auth = require("../middleware/Auth");
const roles = require("../middleware/Roles");
const upload = require("../middleware/Upload");

const PaymentController = require("../controllers/PaymentController");

// ==========================================
// Crear Pago
// POST /api/payments
// ==========================================
router.post( 
    "/",
    auth,
    upload.single("comprobante"),
    PaymentController.crear
);

// ==========================================
// Aprobar Pago
// PUT /api/payments/:pagoId/aprobar
// ==========================================
router.put(
    "/:pagoId/aprobar",
    auth,
    roles("ADMIN"),
    PaymentController.aprobar
);

// ==========================================
// Rechazar Pago
// PUT /api/payments/:pagoId/rechazar
// ==========================================
router.put(
    "/:pagoId/rechazar",
    auth,
    PaymentController.rechazar
);

// ==========================================
// Obtener Pagos Pendientes
// ==========================================
router.get(
    "/pendientes",
    auth,
    PaymentController.pendientes
);

// ==========================================
// Obtener Pagos Aprobados
// ==========================================
router.get(
    "/aprobados",
    auth,
    PaymentController.aprobados
);

// ==========================================
// Obtener Pagos Rechazados
// ==========================================
router.get(
    "/rechazados",
    auth,
    PaymentController.rechazados
);

// ==========================================
// Obtener Pagos del Usuario
// ==========================================
router.get(
    "/usuario",
    auth,
    PaymentController.pagosUsuario
);

// ==========================================
// Buscar Pago por Código
// ==========================================
router.get(
    "/codigo/:codigo",
    auth,
    PaymentController.obtenerPorCodigo
);

// ==========================================
// Obtener Pago por ID
// ==========================================
router.get(
    "/:id",
    auth,
    PaymentController.obtenerPorId
);

// ==========================================
// Eliminar Pago
// ==========================================
router.delete(
    "/:id",
    auth,
    PaymentController.eliminar
);

module.exports = router;
