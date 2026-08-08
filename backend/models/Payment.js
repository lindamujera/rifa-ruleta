// ==========================================
// backend/models/Payment.js
// ==========================================

const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    codigo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      default: () => `PAY-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`
    },

    referencia: { 
      type: String,
      required: true,
      trim: true
    },

    // ==========================================
    // Usuario que realizó el pago
    // ==========================================
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // ==========================================
    // Ronda en la que participa
    // ==========================================
    ronda: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Round",
      default: null
    },

    // ==========================================
    // Ticket generado después de aprobar el pago
    // ==========================================
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      default: null
    },

    // ==========================================
    // Spin generado para la ruleta
    // ==========================================
    spin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Spin",
      default: null
    },

    valor: {
      type: Number,
      required: true,
      default: 25000,
      min: 0
    },

    metodoPago: {
      type: String,
      enum: [
        "NEQUI",
        "DAVIPLATA",
        "BANCOLOMBIA",
        "PSE",
        "EFECTIVO"
      ],
      default: "NEQUI"
    },

    comprobante: {
      type: String,
      default: ""
    },

    estado: {
      type: String,
      enum: [
        "PENDIENTE",
        "APROBADO",
        "RECHAZADO"
      ],
      default: "PENDIENTE"
    },

    observacion: {
      type: String,
      default: ""
    },

    administrador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    fechaPago: {
      type: Date,
      default: Date.now
    },

    fechaAprobacion: {
      type: Date,
      default: null
    },

    fechaRechazo: {
      type: Date,
      default: null
    },

    motivoRechazo: {
      type: String,
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
paymentSchema.index({ usuario: 1 });
paymentSchema.index({ estado: 1 });
paymentSchema.index({ ronda: 1 });
paymentSchema.index({ ticket: 1 });
paymentSchema.index({ spin: 1 });

module.exports = mongoose.model("Payment", paymentSchema);
