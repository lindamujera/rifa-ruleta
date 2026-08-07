// ==========================================
// backend/models/AuditLog.js
// ==========================================

const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
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
            default: null
        },

        rol: {
            type: String,
            default: "",
            trim: true
        },

        accion: {
            type: String,
            required: true,
            trim: true
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

        descripcion: {
            type: String,
            default: "",
            trim: true
        },

        referencia: {
            type: String,
            default: "",
            trim: true
        },

        ip: {
            type: String,
            default: ""
        },

        userAgent: {
            type: String,
            default: ""
        },

        estado: {
            type: String,
            enum: [
                "EXITOSO",
                "ERROR",
                "ADVERTENCIA"
            ],
            default: "EXITOSO"
        },

        fechaEvento: {
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
// porque unique:true ya crea ese índice.

auditLogSchema.index({
    usuario: 1
});

auditLogSchema.index({
    modulo: 1
});

auditLogSchema.index({
    accion: 1
});

auditLogSchema.index({
    estado: 1
});

auditLogSchema.index({
    fechaEvento: -1
});

// ==========================================
// Exportar modelo
// ==========================================

module.exports = mongoose.model(
    "AuditLog",
    auditLogSchema
);