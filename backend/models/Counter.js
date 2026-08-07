// ==========================================
// backend/models/Counter.js
// ==========================================

const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        valor: {
            type: Number,
            default: 0,
            min: 0
        }
    },
    {
        timestamps: false
    }
);

// ==========================================
// No crear índices adicionales.
// "nombre" ya tiene unique:true,
// por lo que Mongoose crea el índice automáticamente.
// ==========================================

module.exports = mongoose.model(
    "Counter",
    counterSchema
);