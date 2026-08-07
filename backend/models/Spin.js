// ==========================================
// backend/models/Spin.js
// ==========================================

const mongoose = require("mongoose");

const spinSchema = new mongoose.Schema(
    {
        // ==========================================
        // Código único del Spin
        // ==========================================
        codigo: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        // ==========================================
        // Usuario propietario
        // ==========================================
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        // ==========================================
        // Ticket asociado
        // ==========================================
        ticket: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ticket",
            required: true
        },

        // ==========================================
        // Ronda asociada
        // ==========================================
        ronda: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Round",
            required: true
        },

        // ==========================================
        // Posición donde cayó la ruleta
        // ==========================================
        posicion: {
            type: Number,
            default: null,
            min: 1
            // ❌ Se eliminó "max: 16" para permitir valores dinámicos o superiores a 16
        },

        // ==========================================
        // Color obtenido
        // ==========================================
        color: {
            type: String,
            enum: [
                "ROJO",
                "AZUL",
                "VERDE",
                "AMARILLO",
                "MORADO",
                "NARANJA",
                null
            ],
            default: null
        },

        // ==========================================
        // Nombre del premio
        // ==========================================
        nombrePremio: {
            type: String,
            default: ""
        },

        // ==========================================
        // Valor del premio
        // ==========================================
        premio: {
            type: Number,
            default: 0,
            min: 0
        },

        // ==========================================
        // Estado del Spin
        // ==========================================
        estado: {
            type: String,
            enum: [
                "PENDIENTE",
                "HABILITADO",
                "EJECUTADO",
                "BLOQUEADO"
            ],
            default: "PENDIENTE"
        },

        // ==========================================
        // Fecha del giro
        // ==========================================
        fechaGiro: {
            type: Date,
            default: null
        },

        // ==========================================
        // Fecha de entrega del premio
        // ==========================================
        fechaPremio: {
            type: Date,
            default: null
        },

        // ==========================================
        // Premio reclamado
        // ==========================================
        premioReclamado: {
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

// Índices simples para búsquedas
spinSchema.index({ usuario: 1 });
spinSchema.index({ ronda: 1 });
spinSchema.index({ estado: 1 });

// Un Ticket solo puede tener un Spin
spinSchema.index({ ticket: 1 }, { unique: true });

// Un usuario solo puede tener un Spin por ronda
spinSchema.index({ usuario: 1, ronda: 1 }, { unique: true });

// ==========================================
// Exportar modelo
// ==========================================

module.exports = mongoose.model("Spin", spinSchema);