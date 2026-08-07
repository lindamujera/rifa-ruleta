// ==========================================
// backend/business/TicketBusiness.js
// ==========================================

const TicketService = require("../services/TicketService");

class TicketBusiness {

    // ==========================================
    // Crear Ticket
    // Lo ejecuta el Administrador
    // cuando aprueba el pago.
    // ==========================================

async crearTicket(
    usuarioId,
    pagoId,
    rondaId,
    session = null
) {

    return await TicketService.crearTicket(
        usuarioId,
        pagoId,
        rondaId,
        session
    );

}

// ==========================================
// El CLIENTE selecciona su número
// ==========================================

async escogerNumero(
    ticketId,
    numero,
    session = null
) {

    if (numero < 1 || numero > 99) {

        throw new Error(
            "El número debe estar entre 1 y 99."
        );

    }

    const ticket =
        await TicketService.obtenerTicket(
            ticketId,
            session
        );

    if (!ticket) {

        throw new Error(
            "El Ticket no existe."
        );

    }

    // El Ticket debe estar activo

    if (ticket.estado !== "ACTIVO") {

        throw new Error(
            "El Ticket aún no está activo."
        );

    }

    // Ya tiene un número asignado

    if (ticket.numeroRifa !== null) {

        throw new Error(
            "Ya seleccionaste un número."
        );

    }

    // Validar que tenga ronda

    if (!ticket.ronda) {

        throw new Error(
            "El Ticket no tiene una ronda asociada."
        );

    }

    const rondaId =
        ticket.ronda._id || ticket.ronda;

    const disponible =
        await TicketService.numeroDisponible(
            rondaId,
            numero,
            session
        );

    if (!disponible) {

        throw new Error(
            "Ese número ya fue seleccionado."
        );

    }

    const ticketActualizado =
        await TicketService.asignarNumero(
            ticketId,
            numero,
            session
        );

    return ticketActualizado;

}

    // ==========================================
    // Validar número disponible
    // ==========================================

    async validarNumero(

        rondaId,
        numero,
        session = null

    ) {

        if (!rondaId) {

            throw new Error(
                "Debe indicar la ronda."
            );

        }

        if (numero < 1 || numero > 99) {

            throw new Error(
                "El número debe estar entre 1 y 99."
            );

        }

        return await TicketService.numeroDisponible(

            rondaId,
            numero,
            session

        );

    }

    // ==========================================
    // Obtener Ticket
    // ==========================================

    async obtenerTicket(

        ticketId,
        session = null

    ) {

        const ticket =
            await TicketService.obtenerTicket(

                ticketId,
                session

            );

        if (!ticket) {

            throw new Error(
                "Ticket no encontrado."
            );

        }

        return ticket;

    }

    // ==========================================
    // Tickets por Ronda
    // ==========================================

    async obtenerTicketsRonda(

        rondaId,
        session = null

    ) {

        if (!rondaId) {

            throw new Error(
                "Debe indicar la ronda."
            );

        }

        return await TicketService.obtenerTicketsRonda(

            rondaId,
            session

        );

    }

    // ==========================================
    // Tickets por Usuario
    // ==========================================

    async obtenerTicketsUsuario(

        usuarioId,
        session = null

    ) {

        if (!usuarioId) {

            throw new Error(
                "Debe indicar el usuario."
            );

        }

        return await TicketService.obtenerTicketsUsuario(

            usuarioId,
            session

        );

    }
    // ==========================================
// Tickets activos del Usuario
// ==========================================

async obtenerTicketsActivos(

    usuarioId,
    session = null

) {

    const tickets =
        await TicketService.obtenerTicketsUsuario(

            usuarioId,
            session

        );

    return tickets.filter(

        ticket => ticket.estado === "ACTIVO"

    );

}
// ==========================================
// Validar propietario del Ticket
// ==========================================

async validarPropietario(

    ticketId,
    usuarioId,
    session = null

) {

    const ticket =
        await this.obtenerTicket(

            ticketId,
            session

        );

    if (

        ticket.usuario._id.toString() !==
        usuarioId.toString()

    ) {

        throw new Error(
            "El Ticket no pertenece al usuario."
        );

    }

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
            await this.obtenerTicket(

                ticketId,
                session

            );

        return ticket.numeroRifa;

    }

    // ==========================================
    //  Contar Tickets del Usuario
    // ==========================================
async contarTicketsUsuario(
    usuarioId,
    rondaId,
    session = null
) {

    return await TicketService.contarTicketsUsuario(
        usuarioId,
        rondaId,
        session
    ); 

}
// ==========================================
// Asignar giros disponibles
// ==========================================

async asignarGiroDisponible(
    ticketId,
    cantidad = 1,
    session = null
) {

    return await TicketService.asignarGiroDisponible(

        ticketId,
        cantidad,
        session

    );

}
// ==========================================
// Asociar Spin al Ticket
// ==========================================

async asignarSpin(
    ticketId,
    spinId,
    session = null
) {

    const ticket =
        await TicketService.obtenerTicket(
            ticketId,
            session
        );

    if (!ticket) {

        throw new Error(
            "El Ticket no existe."
        );

    }

    ticket.spin = spinId;

    await TicketService.guardar(
        ticket,
        session
    );

    return ticket;

}
}

module.exports = new TicketBusiness(); 