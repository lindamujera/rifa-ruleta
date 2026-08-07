// ==========================================
// backend/business/RoundBusiness.js
// ==========================================

const RoundService = require("../services/RoundService");
const PrizePoolBusiness = require("./PrizePoolBusiness");

class RoundBusiness {

    // ==========================================
    // Obtener o crear ronda activa
    // ==========================================

    async obtenerRondaActiva(session = null) {

        let ronda = await RoundService.buscarRondaAbierta(session);

        if (!ronda) {

            ronda = await RoundService.crearRonda(session);

        }

        return ronda;

    }
// ==========================================
// Agregar participante
// ==========================================

async agregarParticipante(

    rondaId,
    usuarioId,
    ticketId,
    spinId = null,
    session = null

) {

    const ronda = await RoundService.obtenerPorId(
        rondaId,
        session
    );

    if (!ronda) {

        throw new Error(
            "La ronda no existe."
        );

    }

    if (ronda.estado !== "ABIERTA") {

        throw new Error(
            "La ronda ya fue cerrada."
        );

    }

    // ==========================
    // Validar máximo participantes
    // ==========================

    if (

        ronda.totalParticipantes >=
        PrizePoolBusiness.MAX_PARTICIPANTES

    ) {

        throw new Error(
            "La ronda ya alcanzó el máximo de participantes."
        );

    }

    // ==========================
    // Validar usuario repetido
    // ==========================

    console.log("========== PARTICIPANTES ==========");

ronda.participantes.forEach((participante, index) => {

    console.log({
        index,
        usuario: participante.usuario,
        ticket: participante.ticket,
        spin: participante.spin
    });

});

console.log("Usuario que intenta ingresar:", usuarioId.toString());

const usuarioExiste = ronda.participantes.find((participante) => {

    if (!participante.usuario) return false;

    const usuarioActual = participante.usuario._id
        ? participante.usuario._id.toString()
        : participante.usuario.toString();

    console.log(
        "Comparando:",
        usuarioActual,
        "==",
        usuarioId.toString()
    );

    return usuarioActual === usuarioId.toString();

});
    if (usuarioExiste) {

        let actualizado = false;

        if (!usuarioExiste.ticket && ticketId) {

            usuarioExiste.ticket = ticketId;
            actualizado = true;

        }

        if (!usuarioExiste.spin && spinId) {

            usuarioExiste.spin = spinId;
            actualizado = true;

        }

        if (actualizado) {

            await RoundService.guardar(ronda, session);

        }

        return ronda;

    }

    // ==========================
    // Validar ticket repetido
    // ==========================

    const ticketExiste = ronda.participantes.find((participante) => {

        if (!participante.ticket) {

            return false;

        }

        const ticketActual = participante.ticket._id
            ? participante.ticket._id.toString()
            : participante.ticket.toString();

        return ticketActual === ticketId.toString();

    });

    if (ticketExiste) {

        return ronda;

    }

    // ==========================
    // Agregar participante
    // ==========================

    ronda.participantes.push({

        usuario: usuarioId,

        ticket: ticketId,

        spin: spinId,

        fechaIngreso: new Date()

    });

    ronda.totalParticipantes = ronda.participantes.length;

    // ==========================
    // Recalcular bolsa
    // ==========================

    const bolsa = PrizePoolBusiness.calcularBolsa(

        ronda.totalParticipantes

    );

    ronda.totalRecaudado = bolsa.totalRecaudado;

    ronda.fondoRuleta = bolsa.fondoRuleta;

    ronda.premioMayor = bolsa.premioMayor;

    ronda.ganancia = bolsa.ganancia;

    // ==========================
    // Guardar cambios
    // ==========================

    await RoundService.guardar(

        ronda,
        session

    );

    console.log('after RoundService.guardar in RoundBusiness.agregarParticipante');

    return ronda;

}

    // ==========================================
    // Verificar si la ronda está completa
    // ==========================================

    async rondaCompleta(

        rondaId,
        session = null

    ) {

        console.log('RoundBusiness.rondaCompleta start:',
            'rondaId=', rondaId,
            'session=', !!session
        );

        const ronda = await RoundService.obtenerPorId(
            rondaId,
            session
        );

        console.log('RoundBusiness.rondaCompleta got ronda:',
            ronda ? ronda._id : null
        );

        if (!ronda) {

            throw new Error(
                "La ronda no existe."
            );

        }

        const result = PrizePoolBusiness.rondaCompleta(

            ronda.totalParticipantes

        );

        console.log('RoundBusiness.rondaCompleta result:', result);

        return result;

    }

    // ==========================================
    // Cerrar ronda
    // ==========================================

    async cerrarRonda(

        rondaId,
        session = null

    ) {

        return await RoundService.cambiarEstado(

            rondaId,

            "CERRADA",

            session

        );

    }

    // ==========================================
    // Abrir nueva ronda
    // ==========================================

    async abrirNuevaRonda(session = null) {

        return await RoundService.crearRonda(session);

    }

    // ==========================================
    // Obtener resumen
    // ==========================================

    async resumen(

        rondaId,
        session = null

    ) {

        const ronda =
            await RoundService.obtenerPorId(

                rondaId,

                session

            );

        if (!ronda) {

            throw new Error(
                "La ronda no existe."
            );

        }

        return {

            codigo: ronda.codigo,

            estado: ronda.estado,

            participantes: ronda.totalParticipantes,

            totalRecaudado: ronda.totalRecaudado,

            fondoRuleta: ronda.fondoRuleta,

            premioMayor: ronda.premioMayor,

            ganancia: ronda.ganancia

        };

    }

}

module.exports = new RoundBusiness();