// ==========================================
// backend/models/User.js
// ==========================================

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
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
            trim: true,
            maxlength: 100
        },

        celular: {
            type: String,
            required: true,
            trim: true
        },

        correo: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
            minlength: 6
        },

        rol: {
            type: String,
            enum: [
                "ADMIN",
                "OPERADOR",
                "CLIENTE"
            ],
            default: "CLIENTE"
        },

        estado: {
            type: String,
            enum: [
                "ACTIVO",
                "BLOQUEADO",
                "SUSPENDIDO"
            ],
            default: "ACTIVO"
        },

        girosDisponibles: {
            type: Number,
            default: 0,
            min: 0
        },

        saldoGanado: {
            type: Number,
            default: 0,
            min: 0
        },

        totalGanado: {
            type: Number,
            default: 0,
            min: 0
        },

        totalPagado: {
            type: Number,
            default: 0,
            min: 0
        },

        ticketsComprados: {
            type: Number,
            default: 0,
            min: 0
        },

        ultimoIngreso: {
            type: Date,
            default: null
        },

        foto: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

// ==========================================
// Índices adicionales
// ==========================================
// No crear índices para:
// - codigo (unique:true ya crea el índice)
// - correo (unique:true ya crea el índice)

userSchema.index({ rol: 1 });
userSchema.index({ estado: 1 });

module.exports = mongoose.model("User", userSchema);