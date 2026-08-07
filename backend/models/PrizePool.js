// ==========================================
// backend/models/PrizePool.js
// ==========================================

const mongoose = require("mongoose");

// ==========================================
// Esquema Bolsa de Premios
// ==========================================

const prizePoolSchema = new mongoose.Schema(
    {
        codigo: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        ronda: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Round",
            required: true
        },

        posicion: {
            type: Number,
            required: true,
            min: 1
        },

        valor: {
            type: Number,
            required: true,
            min: 0
        },

        estado: {
            type: String,
            enum: [
                "DISPONIBLE",
                "ENTREGADO"
            ],
            default: "DISPONIBLE"
        },

        ganador: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },

        spin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Spin",
            default: null
        },

        fechaEntrega: {
            type: Date,
            default: null
        }

    },
    {
        timestamps: true
    }
);

// ==========================================
// Índices
// ==========================================

// unique:true ya crea el índice de codigo

prizePoolSchema.index({
    ronda: 1
});

prizePoolSchema.index({
    estado: 1
});

prizePoolSchema.index({
    ganador: 1
});

prizePoolSchema.index({
    spin: 1
});

prizePoolSchema.index(
    {
        ronda: 1,
        posicion: 1
    },
    {
        unique: true
    }
);

// ==========================================
// Exportar Modelo
// ==========================================

module.exports = mongoose.model(
    "PrizePool",
    prizePoolSchema
);
