// ==========================================
// backend/models/Transaction.js
// ==========================================

const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
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

        tipo: {
            type: String,
            enum: [
                "INGRESO",
                "PREMIO_RULETA",
                "PREMIO_RIFA",
                "DEVOLUCION",
                "RETIRO"
            ],
            required: true
        },

        valor: {
            type: Number,
            required: true,
            min: 0
        },

        referencia: {
            type: String,
            default: "",
            trim: true
        },

        descripcion: {
            type: String,
            default: "",
            trim: true
        },

        modulo: {
            type: String,
            enum: [
                "PAGOS",
                "RULETA",
                "RIFA",
                "RETIROS",
                "SISTEMA"
            ],
            default: "SISTEMA"
        },

        estado: {
            type: String,
            enum: [
                "PENDIENTE",
                "CONFIRMADA",
                "ANULADA"
            ],
            default: "CONFIRMADA"
        },

        fechaTransaccion: {
            type: Date,
            default: Date.now
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

transactionSchema.index({
    usuario: 1
});

transactionSchema.index({
    tipo: 1
});

transactionSchema.index({
    estado: 1
});

transactionSchema.index({
    referencia: 1
});

transactionSchema.index({
    fechaTransaccion: -1
});

// ==========================================
// Exportar modelo
// ==========================================

module.exports = mongoose.model(
    "Transaction",
    transactionSchema
);