const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({

    precioGiro: {
        type: Number,
        default: 25000
    },

    participantesPorRonda: {
        type: Number,
        default: 10
    },

    premioMayor: {
        type: Number,
        default: 100000
    },

    fondoRuleta: {
        type: Number,
        default: 100000
    },

    gananciaEsperada: {
        type: Number,
        default: 50000
    },

    numeroNequi: {
        type: String,
        default: ""
    },

    nombreNequi: {
        type: String,
        default: ""
    },

    qrNequi: {
        type: String,
        default: ""
    },

    estadoSistema: {

        type: String,

        enum: [

            "ACTIVO",

            "MANTENIMIENTO",

            "PAUSADO"

        ],

        default: "ACTIVO"

    }

},

{

    timestamps: true

});

module.exports = mongoose.model("Setting", settingSchema);