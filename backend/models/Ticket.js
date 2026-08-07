// ==========================================
// backend/models/Ticket.js
// ==========================================

const mongoose = require("mongoose");

// ==========================================
// Esquema Ticket
// ==========================================

const ticketSchema = new mongoose.Schema(
{
    // ======================================
    // Código interno
    // ======================================

    codigo: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    // ======================================
    // Usuario propietario
    // ======================================

    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    // ======================================
    // Pago asociado
    // ======================================

    pago: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payment",
        required: true
    },

    // ======================================
    // Ronda
    // ======================================

    ronda: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Round",
        required: true
    },

    // ======================================
    // Spin asociado
    // ======================================

    spin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Spin",
        default: null
    },

    // ======================================
    // Número de la rifa
    // ======================================

    numeroRifa: {
        type: Number,
        default: null,
        min: 1,
        max: 100
    },

    // ======================================
    // Giros disponibles
    // ======================================

    girosDisponibles: {
        type: Number,
        default: 0,
        min: 0
    },

    // ======================================
    // Giros utilizados
    // ======================================

    girosUsados: {
        type: Number,
        default: 0,
        min: 0
    },

    // ======================================
    // Premio obtenido en la ruleta
    // ======================================

    premioRuleta: {
        type: Number,
        default: 0
    },

    // ======================================
    // Fecha selección número
    // ======================================

    fechaSeleccion: {
        type: Date,
        default: null
    },

    // ======================================
    // Fecha activación
    // ======================================

    fechaActivacion: {
        type: Date,
        default: null
    },

    // ======================================
    // Fecha ganador
    // ======================================

    fechaGanador: {
        type: Date,
        default: null
    },

    // ======================================
    // Estado
    // ======================================

    estado: {
        type: String,
        enum: [
            "PENDIENTE",
            "ACTIVO",
            "GANADOR",
            "PERDIDO",
            "ANULADO"
        ],
        default: "PENDIENTE"
    },

    // ======================================
    // Observación
    // ======================================

    observacion: {
        type: String,
        trim: true,
        default: ""
    }

},
{
    timestamps: true
}
);

// ==========================================
// Índices
// ==========================================

ticketSchema.index({
    usuario: 1
});

ticketSchema.index({
    ronda: 1
});

ticketSchema.index({
    estado: 1
});

ticketSchema.index({
    pago: 1
});

ticketSchema.index({
    spin: 1
});

ticketSchema.index(
{
    ronda: 1,
    numeroRifa: 1
},
{
    unique: true,
    partialFilterExpression: {
        numeroRifa: {
            $type: "number"
        }
    }
}
);
 
// ==========================================
// Exportar
// ==========================================

module.exports = mongoose.model(
    "Ticket",
    ticketSchema
);