// ==========================================
// app.js
// Configuración principal del servidor
// ==========================================

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Cargar variables de entorno
dotenv.config();

// Crear aplicación
const app = express();

// ==========================================
// 1. DESHABILITAR ETAGS A NIVEL GLOBAL
// ==========================================
app.set("etag", false);
app.disable("etag");

// ==========================================
// 2. MIDDLEWARE ANTI-304 DEFINITIVO
// Borra de la petición cualquier intento de validación
// ==========================================
app.use((req, res, next) => {
    // Elimina cabeceras condicionales entrantes del navegador/React
    delete req.headers["if-none-match"];
    delete req.headers["if-modified-since"];
    req.headers["if-none-match"] = "";
    req.headers["if-modified-since"] = "";

    // Forzar cabeceras de respuesta sin caché
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Surrogate-Control", "no-store");

    next();
});

// ==========================================
// Middlewares Básicos
// ==========================================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ==========================================
// 3. ARCHIVOS ESTÁTICOS SIN CACHÉ (/uploads)
// ==========================================
app.use(
    "/uploads",
    express.static("uploads", {
        etag: false,
        lastModified: false,
        cacheControl: false,
        setHeaders: (res) => {
            res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
            res.setHeader("Pragma", "no-cache");
            res.setHeader("Expires", "0");
        },
    })
);

// ==========================================
// Conexión a MongoDB
// ==========================================

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("✅ Base de datos conectada.");
    })
    .catch((error) => {
        console.error("❌ Error de conexión:", error.message);
    });

// ==========================================
// Ruta principal
// ==========================================

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "API de Rifas y Ruleta funcionando correctamente.",
    });
});

// ==========================================
// Rutas
// ==========================================

app.use("/api/payments", require("./routes/PaymentRoutes"));

app.use("/api/tickets", require("./routes/TicketRoutes"));

app.use("/api/spins", require("./routes/SpinRoutes"));

app.use("/api/rounds", require("./routes/RoundRoutes"));

app.use("/api/transactions", require("./routes/TransactionRoutes"));

app.use("/api/notifications", require("./routes/NotificationRoutes"));

app.use("/api/audit", require("./routes/AuditRoutes"));

app.use("/api/auth", require("./routes/AuthRoutes"));

app.use("/api/users", require("./routes/UserRoutes"));

app.use("/api/roulette", require("./routes/RouletteRoutes"));

app.use("/api/prizepool", require("./routes/PrizePoolRoutes"));

// ==========================================
// Ruta no encontrada
// ==========================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Ruta no encontrada.",
    });
});

// ==========================================
// Manejo global de errores
// ==========================================

app.use((err, req, res, next) => {
    console.error("============== ERROR ==============");
    console.error(err);
    console.error(err.stack);
    console.error("===================================");

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Error interno del servidor.",
    });
});

// ==========================================
// Exportar aplicación
// ==========================================

module.exports = app;