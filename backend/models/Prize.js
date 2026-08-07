// ==========================================
// backend/models/Prize.js
// ==========================================

const mongoose = require("mongoose");

const prizeSchema = new mongoose.Schema(
    {
        codigo: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        nombre: {
            type: String,
            required: true,
            trim: true
        },

        descripcion: {
            type: String,
            default: "",
            trim: true
        },

        tipo: {
            type: String,
            enum: [
                "DINERO",
                "GIRO_GRATIS",
                "BONO",
                "SIN_PREMIO",
                "PREMIO_ESPECIAL"
            ],
            required: true
        },

        valor: {
            type: Number,
            default: 0,
            min: 0
        },

        color: {
            type: String,
            default: "#FFFFFF"
        },

        icono: {
            type: String,
            default: "🎁"
        },

        probabilidad: {
            type: Number,
            required: true,
            min: 0
        },

        activo: {
            type: Boolean,
            default: true
        }

    },
    {
        timestamps: true
    }
);

// ==========================================
// No crear índices adicionales.
// "codigo" ya tiene unique:true,
// por lo que Mongoose crea el índice automáticamente.
// ==========================================

module.exports = mongoose.model(
    "Prize",
    prizeSchema
);