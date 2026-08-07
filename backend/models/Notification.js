// ==========================================
// backend/models/Notification.js
// ==========================================

const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
    {
        codigo: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        titulo: {
            type: String,
            required: true,
            trim: true
        },

        mensaje: {
            type: String,
            required: true,
            trim: true
        },

        tipo: {
            type: String,
            enum: [
                "INFO",
                "SUCCESS",
                "WARNING",
                "ERROR"
            ],
            default: "INFO"
        },

        modulo: {
            type: String,
            enum: [
                "AUTH",
                "PAGOS",
                "RULETA",
                "RIFA",
                "TICKETS",
                "USUARIOS",
                "CONFIGURACION",
                "SISTEMA"
            ],
            default: "SISTEMA"
        },

        referencia: {
            type: String,
            default: "",
            trim: true
        },

        leida: {
            type: Boolean,
            default: false
        },

        fechaLectura: {
            type: Date,
            default: null
        },

        fechaEnvio: {
            type: Date,
            default: Date.now
        },

        archivada: {
            type: Boolean,
            default: false
        }

    },
    {
        timestamps: true
    }
);

// ==========================================
// Índices
// ==========================================

// NO crear índice para "codigo"
// porque unique:true ya crea el índice automáticamente.

notificationSchema.index({
    usuario: 1
});

notificationSchema.index({
    leida: 1
});

notificationSchema.index({
    tipo: 1
});

notificationSchema.index({
    modulo: 1
});

notificationSchema.index({
    fechaEnvio: -1
});

// ==========================================
// Exportar modelo
// ==========================================

module.exports = mongoose.model(
    "Notification",
    notificationSchema
);