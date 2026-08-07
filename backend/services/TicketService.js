// ==========================================
// backend/services/TicketService.js
// ==========================================

const Ticket = require("../models/Ticket");
const CounterService = require("./CounterService");

class TicketService {

    // ==========================================
    // Crear Ticket
    // ==========================================

    async crearTicket(
    usuarioId,
    pagoId,
    rondaId,
    session = null
) {

    console.log("===== ENTRÓ A CREAR TICKET =====");

    const codigo = await CounterService.generar(
        "TICKET",
        session
    );

    console.log("Código:", codigo);

    const ticket = new Ticket({

        codigo,
        usuario: usuarioId,
        pago: pagoId,
        ronda: rondaId,
        numeroRifa: null,
        girosDisponibles: 0,
        spin: null,
        estado: "PENDIENTE"

    });

    console.log("ANTES DE GUARDAR");
    console.log(ticket);

    await ticket.save({ session });

    console.log("TICKET GUARDADO");

    return ticket;
}

    // ==========================================
    // Obtener Ticket
    // ==========================================

    async obtenerTicket(
        ticketId,
        session = null
    ) {

        return await Ticket.findById(ticketId)

            .populate("usuario")
            .populate("pago")
            .populate("ronda")
            .populate("spin")

            .session(session);

    }

    // ==========================================
    // Buscar por código
    // ==========================================

    async obtenerPorCodigo(codigo) {

        return await Ticket.findOne({

            codigo

        })

            .populate("usuario")
            .populate("pago")
            .populate("ronda")
            .populate("spin");

    }

    // ==========================================
    // Tickets del usuario
    // ==========================================

    async obtenerTicketsUsuario(
        usuarioId,
        session = null
    ) {

        return await Ticket.find({

            usuario: usuarioId

        })

            .populate("usuario")
            .populate("pago")
            .populate("ronda")
            .populate("spin")

            .sort({

                createdAt: -1

            })

            .session(session);

    }

    // ==========================================
    // Tickets de la ronda
    // ==========================================

    async obtenerTicketsRonda(
        rondaId,
        session = null
    ) {

        return await Ticket.find({

            ronda: rondaId

        })

            .populate("usuario")
            .populate("spin")

            .sort({

                numeroRifa: 1

            })

            .session(session);

    }

    // ==========================================
    // Buscar Ticket usuario-ronda
    // ==========================================

    async buscarPorUsuarioYRonda(
        usuarioId,
        rondaId,
        session = null
    ) {

        return await Ticket.findOne({

            usuario: usuarioId,
            ronda: rondaId

        })

            .populate("usuario")
            .populate("pago")
            .populate("ronda")
            .populate("spin")

            .session(session);

    }

    // ==========================================
    // Usuario ya participa
    // ==========================================

    async usuarioTieneTicket(
        usuarioId,
        rondaId,
        session = null
    ) {

        const ticket = await Ticket.findOne({

            usuario: usuarioId,
            ronda: rondaId

        }).session(session);

        return !!ticket;

    }
    // ==========================================
// Contar Tickets del Usuario en una Ronda
// ==========================================

async contarTicketsUsuario(
    usuarioId,
    rondaId,
    session = null
) {

    return await Ticket.countDocuments({

        usuario: usuarioId,
        ronda: rondaId

    }).session(session);

}

    // ==========================================
    // Validar número disponible
    // ==========================================

    async numeroDisponible(
        rondaId,
        numero,
        session = null
    ) {

        const existe = await Ticket.findOne({

            ronda: rondaId,
            numeroRifa: numero

        }).session(session);

        return !existe;

    }

    // ==========================================
    // Asignar número
    // ==========================================

    async asignarNumero(
        ticketId,
        numero,
        session = null
    ) {

        const ticket = await Ticket.findById(ticketId)
            .session(session);

        if (!ticket)
            throw new Error("El Ticket no existe.");

        if (ticket.numeroRifa !== null)
            throw new Error("El Ticket ya tiene número.");

        if (numero < 1 || numero > 99)
            throw new Error("Número inválido.");

        const disponible =
            await this.numeroDisponible(
                ticket.ronda,
                numero,
                session
            );

        if (!disponible)
            throw new Error("Ese número ya fue seleccionado.");

        ticket.numeroRifa = numero;

        ticket.estado = "ACTIVO";

        ticket.fechaSeleccion = new Date();

        await ticket.save({ session });

        return ticket;

    }

    // ==========================================
    // Activar Ticket
    // ==========================================

    async actualizarEstado(
        ticketId,
        estado,
        session = null
    ) {

        const ticket =
            await Ticket.findById(ticketId)
                .session(session);

        if (!ticket)
            throw new Error("Ticket no encontrado.");

        ticket.estado = estado;

        await ticket.save({ session });

        return ticket;

    }

    // ==========================================
    // Dar giros disponibles
    // ==========================================

    async asignarGiroDisponible(
        ticketId,
        cantidad = 1,
        session = null
    ) {

        const ticket =
            await Ticket.findById(ticketId)
                .session(session);

        if (!ticket)
            throw new Error("Ticket no encontrado.");

        ticket.girosDisponibles = cantidad;

        ticket.estado = "ACTIVO";

        ticket.fechaActivacion = new Date();

        await ticket.save({ session });

        return ticket;

    }

    // ==========================================
    // Descontar un giro
    // ==========================================

    async descontarGiro(
        ticketId,
        session = null
    ) {

        const ticket =
            await Ticket.findById(ticketId)
                .session(session);

        if (!ticket)
            throw new Error("Ticket no encontrado.");

        if (ticket.girosDisponibles <= 0)
            throw new Error("El Ticket no tiene giros.");

        ticket.girosDisponibles--;

        await ticket.save({ session });

        return ticket;

    }

    // ==========================================
    // Asociar Spin al Ticket
    // ==========================================

    async actualizarSpin(
        ticketId,
        spinId,
        session = null
    ) {

        const ticket =
            await Ticket.findById(ticketId)
                .session(session);

        if (!ticket)
            throw new Error("Ticket no encontrado.");

        ticket.spin = spinId;

        await ticket.save({ session });

        return ticket;

    }

    // ==========================================
    // Obtener número
    // ==========================================

    async obtenerNumero(
        ticketId,
        session = null
    ) {

        const ticket =
            await Ticket.findById(ticketId)
                .session(session);

        if (!ticket)
            throw new Error("El Ticket no existe.");

        return ticket.numeroRifa;

    }


// ==========================================
// Guardar cambios del Ticket
// ==========================================

async guardar(
    ticket,
    session = null
) {

    await ticket.save({
        session
    });

    return ticket;

}

// ==========================================
// Eliminar Ticket
// ==========================================

async eliminar(
    ticketId,
    session = null
) {

    return await Ticket.findByIdAndDelete(
        ticketId,

            {
                session
            }

        );

    }

}

module.exports = new TicketService();