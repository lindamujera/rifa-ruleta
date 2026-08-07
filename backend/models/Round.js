// ==========================================
// backend/models/Round.js
// ==========================================

const mongoose = require("mongoose");

// ==========================================
// Participantes de la ronda
// ==========================================

const participanteSchema = new mongoose.Schema(
    {
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        ticket: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ticket",
            default: null
        },

        spin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Spin",
            default: null
             },

        fechaIngreso: {
            type: Date,
            default: Date.now
        }
    },
    {
        _id: false
    }
);

// ==========================================
// Esquema principal
// ==========================================

const roundSchema = new mongoose.Schema(
    {
        codigo: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        participantes: {
            type: [participanteSchema],
            default: []
        },

        totalParticipantes: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        },

        valorJugada: {
            type: Number,
            default: 25000,
            min: 0
        },

        totalRecaudado: {
            type: Number,
            default: 0,
            min: 0
        },

        fondoRuleta: {
            type: Number,
            default: 551000,
            min: 0
        },

        premioMayor: {
            type: Number,
            default: 1000000,
            min: 0
        },

        totalPremiosRuleta: {
            type: Number,
            default: 0,
            min: 0
        },

        ganancia: {
            type: Number,
            default: 949000,
            min: 0
        },

        ganador: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },

        ticketGanador: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ticket",
            default: null
        },

        estado: {
            type: String,
            enum: [
                "ABIERTA",
                "CERRADA",
                "FINALIZADA"
            ],
            default: "ABIERTA"
        },

        fechaInicio: {
            type: Date,
            default: Date.now
        },

        fechaFin: {
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

// NO crear índice para "codigo"
// porque unique:true ya crea el índice automáticamente.

roundSchema.index({
    estado: 1
});

roundSchema.index({
    fechaInicio: -1
});

roundSchema.index({
    ganador: 1
});

// ==========================================
// Exportar modelo
// ==========================================

module.exports = mongoose.model(
    "Round",
    roundSchema
);