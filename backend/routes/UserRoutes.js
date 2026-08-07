// ==========================================
// backend/routes/UserRoutes.js
// ==========================================

const express = require("express");

const router = express.Router();

const auth = require("../middleware/Auth");
const roles = require("../middleware/Roles");

const UserController = require("../controllers/UserController");

// ==========================================
// Obtener perfil del usuario autenticado
// GET /api/users/profile
// ==========================================

router.get(

    "/profile",

    auth,

    UserController.updateProfile

);

// ==========================================
// Obtener todos los usuarios
// Solo ADMIN
// GET /api/users
// ==========================================

router.get(

    "/",

    auth,

    roles("ADMIN"),

    UserController.listar

);

// ==========================================
// Obtener usuario por ID
// Solo ADMIN
// GET /api/users/:id
// ==========================================

router.get(

    "/:id",

    auth,

    roles("ADMIN"),

    UserController.obtenerPorId

);

// ==========================================
// Exportar Rutas
// ==========================================

module.exports = router;
