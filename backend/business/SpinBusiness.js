// ==========================================
// backend/business/SpinBusiness.js
// ==========================================

const SpinService = require("../services/SpinService");
const TicketService = require("../services/TicketService");
const UserService = require("../services/UserService");
const PrizePoolBusiness = require("./PrizePoolBusiness");

class SpinBusiness {
    constructor() {
        this.reiniciarBolsa();
    }

    // ==========================================
    // Reiniciar premios de la ruleta
    // ==========================================
    reiniciarBolsa() {
        this.segmentos = PrizePoolBusiness.obtenerPremiosRuleta();
    }

    // ==========================================
    // Crear Spin
    // ==========================================
    async crearSpin(usuarioId, ticketId, rondaId, session = null) {

        if (!usuarioId)
            throw new Error("Debe indicar el usuario.");

        if (!ticketId)
            throw new Error("Debe indicar el Ticket.");

        if (!rondaId)
            throw new Error("Debe indicar la ronda.");

        const ticket = await TicketService.obtenerTicket(ticketId, session);

        if (!ticket)
            throw new Error("El Ticket no existe.");

        if (ticket.usuario._id.toString() !== usuarioId.toString()) {
            throw new Error("El Ticket no pertenece al usuario.");
        }

        if (ticket.ronda._id.toString() !== rondaId.toString()) {
            throw new Error("El Ticket pertenece a otra ronda.");
        }

        const existente = await SpinService.obtenerPorTicket(ticketId, session);

        if (existente) {
            if (existente.estado !== "HABILITADO") {
                await SpinService.actualizarEstado(
                    existente._id,
                    "HABILITADO",
                    session
                );
            }

            if (!ticket.spin || ticket.spin.toString() !== existente._id.toString()) {
                await TicketService.actualizarSpin(
                    ticketId,
                    existente._id,
                    session
                );
            }

            return await SpinService.obtenerPorId(existente._id, session);
        }

        let spin = await SpinService.crearSpin(
            usuarioId,
            ticketId,
            rondaId,
            session
        );

        spin = await SpinService.actualizarEstado(
            spin._id,
            "HABILITADO",
            session
        );

        await TicketService.actualizarSpin(
            ticketId,
            spin._id,
            session
        );

        return await SpinService.obtenerPorId(spin._id, session);
    }

    // ==========================================
    // Validar Spin
    // ==========================================
    async validarSpin(spinId, session = null) {

        const spin = await SpinService.obtenerPorId(spinId, session);

        if (!spin)
            throw new Error("El Spin no existe.");

        switch (spin.estado) {

            case "EJECUTADO":
                throw new Error("Este Spin ya fue utilizado.");

            case "BLOQUEADO":
                throw new Error("Este Spin está bloqueado.");

            case "HABILITADO":
                return spin;

            default:
                throw new Error("Este Spin aún no está habilitado.");
        }
    }

    // ==========================================
    // Ejecutar Ruleta
    // ==========================================
    async ejecutarRuleta(spinId, session = null) {

        const spin = await this.validarSpin(spinId, session);

        if (!this.segmentos.length) {
            this.reiniciarBolsa();
        }

        const indice = Math.floor(
            Math.random() * this.segmentos.length
        );

        const premio = this.segmentos[indice];

        // Eliminar premio ya utilizado
        this.segmentos.splice(indice, 1);

        // Color del segmento
        let color = "AZUL";

        if (premio >= 1000000) {
            color = "ROJO";
        } else if (premio >= 551000) {
            color = "VERDE";
        } else if (premio >= 20000) {
            color = "AMARILLO";
        }

        // ==========================================
        // Guardar resultado del Spin
        // ==========================================
        const resultado = await SpinService.actualizarResultado(
            spin._id,
            indice,
            color,
            premio,
            session
        );

        // ==========================================
        // Obtener Ticket
        // ==========================================
        const ticket = await TicketService.obtenerTicket(
            spin.ticket,
            session
        );

        if (!ticket) {
            throw new Error("El Ticket no existe.");
        }

        // ==========================================
// Guardar premio en el Ticket
// ==========================================

ticket.premioRuleta = premio;

await TicketService.guardar(
    ticket,
    session
);

// ==========================================
// Actualizar saldo del usuario
// ==========================================

await UserService.actualizarPremio(

    ticket.usuario._id,

    premio,

    session

);

        // ==========================================
        // Retornar resultado
        // ==========================================
         return {
           spin: resultado,
           ticket,
           posicion: indice,
           color,
           premio,
           premiosRestantes: this.segmentos.length
          };
        }
    // ==========================================
    // Obtener Spins por Usuario 
    // ==========================================
    async obtenerPorUsuario(usuarioId, session = null) {

        if (!usuarioId) {
            throw new Error("Debe indicar el usuario.");
        }

        return await SpinService.obtenerPorUsuario(
            usuarioId,
            session
        );
    }

    // ==========================================
    // Obtener Spins por Ronda
    // ==========================================
    async obtenerPorRonda(rondaId, session = null) {

        if (!rondaId) {
            throw new Error("Debe indicar la ronda.");
        }

        return await SpinService.obtenerPorRonda(
            rondaId,
            session
        );
    }

    // ==========================================
    // Obtener Premio
    // ==========================================
    async obtenerPremio(spinId, session = null) {

        const spin = await SpinService.obtenerPorId(
            spinId,
            session
        );

        if (!spin) {
            throw new Error("El Spin no existe.");
        }

        return spin.premio;
    }

    // ==========================================
    // Obtener Spin
    // ==========================================
    async obtenerSpin(spinId, session = null) {

        const spin = await SpinService.obtenerPorId(
            spinId,
            session
        );

        if (!spin) {
            throw new Error("El Spin no existe.");
        }

        return spin;
    }
}

module.exports = new SpinBusiness();