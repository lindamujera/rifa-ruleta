// ==========================================
// backend/services/SpinService.js
// ==========================================

const Spin = require("../models/Spin");
const CounterService = require("./CounterService");
const TicketService = require("./TicketService");

class SpinService {

    // ==========================================
    // Crear Spin
    // ==========================================
    async crearSpin(
        usuarioId,
        ticketId,
        rondaId,
        session = null
    ) {

        if (!usuarioId) {
            throw new Error("Debe indicar el usuario.");
        }

        if (!ticketId) {
            throw new Error("Debe indicar el ticket.");
        }

        if (!rondaId) {
            throw new Error("Debe indicar la ronda.");
        }

        const ticket = await TicketService.obtenerTicket(ticketId, session);

        if (!ticket)
            throw new Error("El Ticket no existe.");

        // Verificar si ya existe un spin para este ticket
        const existentePorTicket = await this.obtenerPorTicket(ticketId, session);

        if (existentePorTicket) {
            return existentePorTicket;
        }

        // Verificar si ya existe un spin para este usuario en la misma ronda
        const existentePorUsuarioYRonda = await Spin.findOne({
            usuario: usuarioId,
            ronda: rondaId
        }).session(session);

        if (existentePorUsuarioYRonda) {
            return existentePorUsuarioYRonda;
        }

        const codigo = await CounterService.generar(
            "SPIN",
            session
        );

        const spin = new Spin({

            codigo,

            usuario: usuarioId,

            ticket: ticketId,

            ronda: rondaId,

            posicion: null,

            color: null,

            premio: 0,

            estado: "PENDIENTE",

            fechaGiro: null

        });

        await spin.save({
            session
        });

        return spin;

    }

    // ==========================================
    // Obtener Spin por ID
    // ==========================================
    async obtenerPorId(
        spinId,
        session = null
    ) {

        if (!spinId) {

            throw new Error(
                "Debe indicar el Spin."
            );

        }

        return await Spin.findById(spinId)

            .populate("usuario")
            .populate("ticket")
            .populate("ronda")

            .session(session);

    }

    // ==========================================
    // Obtener Spin por Código
    // ==========================================
    async obtenerPorCodigo(codigo) {

        if (!codigo) {

            throw new Error(
                "Debe indicar el código."
            );

        }

        return await Spin.findOne({

            codigo

        })

            .populate("usuario")
            .populate("ticket")
            .populate("ronda");

    }
    // ==========================================
    // Obtener giro por Ticket
    // ==========================================
    async obtenerPorTicket(
        ticketId,
        session = null
    ) {

        if (!ticketId) {
            throw new Error("Debe indicar el Ticket.");
        }

        return await Spin.findOne({

            ticket: ticketId

        })

            .populate("usuario")
            .populate("ticket")
            .populate("ronda")

            .session(session);

    }

    // ==========================================
    // Obtener giros por Usuario
    // ==========================================
    async obtenerPorUsuario(
        usuarioId,
        session = null
    ) {

        if (!usuarioId) {

            throw new Error(
                "Debe indicar el usuario."
            );

        }

        return await Spin.find({

            usuario: usuarioId

        })

            .populate("usuario")
            .populate("ticket")
            .populate("ronda")

            .sort({

                createdAt: -1

            })

            .session(session);

    }

    // ==========================================
    // Obtener giros por Ronda
    // ==========================================
    async obtenerPorRonda(
        rondaId,
        session = null
    ) {

        if (!rondaId) {

            throw new Error(
                "Debe indicar la ronda."
            );

        }

        return await Spin.find({

            ronda: rondaId

        })

            .populate("usuario")
            .populate("ticket")

            .sort({

                createdAt: 1

            })

            .session(session);

    }

    // ==========================================
    // Obtener Spins Pendientes
    // ==========================================
    async obtenerPendientes(
        session = null
    ) {

        return await Spin.find({

            estado: "PENDIENTE"

        })

            .populate("usuario")
            .populate("ticket")
            .populate("ronda")

            .sort({

                createdAt: -1

            })

            .session(session);

    }

    // ==========================================
    // Obtener Spins Ejecutados
    // ==========================================
    async obtenerEjecutados(
        session = null
    ) {

        return await Spin.find({

            estado: "EJECUTADO"

        })

            .populate("usuario")
            .populate("ticket")
            .populate("ronda")

            .sort({

                createdAt: -1

            })

            .session(session);

    }

    // ==========================================
    // Verificar si el usuario ya giró
    // ==========================================
    async usuarioYaGiro(
        usuarioId,
        rondaId,
        session = null
    ) {

        if (!usuarioId || !rondaId) {

            throw new Error(
                "Debe indicar usuario y ronda."
            );

        }

        const spin = await Spin.findOne({

            usuario: usuarioId,
            ronda: rondaId,
            estado: "EJECUTADO"

        }).session(session);

        return !!spin;

    }

    // ==========================================
    // Actualizar resultado del Spin
    // ==========================================
    async actualizarResultado(
        spinId,
        posicion,
        color,
        premio,
        session = null
    ) {

        const spin = await Spin.findById(spinId)
            .session(session);

        if (!spin) {

            throw new Error(
                "El Spin no existe."
            );

        }

        if (spin.estado === "EJECUTADO") {

            throw new Error(
                "Este Spin ya fue ejecutado."
            );

        }

        spin.posicion = posicion;
        spin.color = color;
        spin.premio = premio;
        spin.estado = "EJECUTADO";
        spin.fechaGiro = new Date();

        await spin.save({

            session

        });

        return spin;

    }
    // ==========================================
    // Actualizar estado del Spin
    // ==========================================
    async actualizarEstado(
        spinId,
        estado,
        session = null
    ) {

        const spin = await Spin.findById(spinId)
            .session(session);

        if (!spin) {

            throw new Error(
                "El Spin no existe."
            );

        }

        spin.estado = estado;

        await spin.save({
            session
        });

        return spin;

    }

    // ==========================================
    // Bloquear Spin
    // ==========================================
    async bloquearSpin(
        spinId,
        session = null
    ) {

        return await this.actualizarEstado(

            spinId,

            "BLOQUEADO",

            session

        );

    }

    // ==========================================
    // Habilitar Spin
    // ==========================================
    async habilitarSpin(
        spinId,
        session = null
    ) {

        return await this.actualizarEstado(

            spinId,

            "HABILITADO",

            session

        );

    }

    // ==========================================
    // Obtener premio
    // ==========================================
    async obtenerPremio(
        spinId,
        session = null
    ) {

        const spin = await Spin.findById(spinId)
            .session(session);

        if (!spin) {

            throw new Error(
                "El Spin no existe."
            );

        }

        return spin.premio;

    }

    // ==========================================
    // Verificar si el Spin fue ejecutado
    // ==========================================
    async fueEjecutado(
        spinId,
        session = null
    ) {

        const spin = await Spin.findById(spinId)
            .session(session);

        if (!spin) {

            throw new Error(
                "El Spin no existe."
            );

        }

        return spin.estado === "EJECUTADO";

    }

    // ==========================================
    // Reiniciar resultado del Spin
    // ==========================================
    async reiniciarResultado(
        spinId,
        session = null
    ) {

        const spin = await Spin.findById(spinId)
            .session(session);

        if (!spin) {

            throw new Error(
                "El Spin no existe."
            );

        }

        spin.posicion = null;
        spin.color = "";
        spin.premio = 0;
        spin.estado = "HABILITADO";
        spin.fechaGiro = null;

        await spin.save({
            session
        });

        return spin;

    }
    // ==========================================
    // Obtener Spin completo
    // ==========================================
    async obtenerSpin(
        spinId,
        session = null
    ) {

        const spin = await Spin.findById(spinId)

            .populate("usuario")
            .populate("ticket")
            .populate("ronda")

            .session(session);

        if (!spin) {

            throw new Error(
                "El Spin no existe."
            );

        }

        return spin;

    }

    // ==========================================
    // Eliminar Spin
    // ==========================================
    async eliminar(
        spinId,
        session = null
    ) {

        const spin = await Spin.findById(spinId)
            .session(session);

        if (!spin) {

            throw new Error(
                "El Spin no existe."
            );

        }

        await Spin.findByIdAndDelete(
            spinId,
            {
                session
            }
        );

        return true;

    }

}

// ==========================================
// Exportar servicio
// ==========================================

module.exports = new SpinService();