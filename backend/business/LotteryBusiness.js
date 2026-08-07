// ==========================================
// backend/business/LotteryBusiness.js
// ==========================================

const RoundService = require("../services/RoundService");
const TransactionService = require("../services/TransactionService");
const NotificationService = require("../services/NotificationService");
const PrizePoolBusiness = require("./PrizePoolBusiness");

class LotteryBusiness {

    // ==========================================
    // Verificar si la ronda terminó
    // ==========================================
    async verificarRonda(rondaId, session = null) {

        const ronda = await RoundService.obtenerPorId(
            rondaId,
            session
        );

        if (!ronda) {
            throw new Error("La ronda no existe.");
        }

        if (
            ronda.totalParticipantes <
            PrizePoolBusiness.MAX_PARTICIPANTES
        ) {

            return {
                completa: false,
                ronda
            };

        }

        return {
            completa: true,
            ronda
        };

    }

    // ==========================================
    // Escoger ganador aleatorio
    // ==========================================
    async escogerGanador(rondaId, session = null) {

        const ronda = await RoundService.obtenerPorId(
            rondaId,
            session
        );

        if (!ronda) {
            throw new Error("La ronda no existe.");
        }

        if (!ronda.participantes.length) {

            throw new Error(
                "La ronda no tiene participantes."
            );

        }

        const indice = Math.floor(

            Math.random() *
            ronda.participantes.length

        );

        return ronda.participantes[indice];

    }

    // ==========================================
    // Registrar ganador
    // ==========================================
    async registrarGanador(
        rondaId,
        ganador,
        session = null
    ) {

        return await RoundService.registrarGanador(

            rondaId,

            ganador.usuario,

            ganador.ticket,

            session

        );

    }

    // ==========================================
    // Entregar premio mayor
    // ==========================================
    async entregarPremio(
        ronda,
        session = null,
        notificacionesPendientes = null
    ) {

        await TransactionService.crear({

            usuario: ronda.ganador,

            tipo: "PREMIO_RIFA",

            valor: ronda.premioMayor,

            referencia: ronda.codigo,

            descripcion:
                `Premio mayor de la ronda ${ronda.codigo}.`

        }, session);

        const notificacion = {
            usuario: ronda.ganador,
            titulo: "🏆 ¡Felicitaciones!",
            mensaje:
                `Ganaste $${ronda.premioMayor.toLocaleString()} en la ronda ${ronda.codigo}.`,
            tipo: "SUCCESS",
            modulo: "RIFA",
            referencia: ronda.codigo
        };

        if (Array.isArray(notificacionesPendientes)) {
            notificacionesPendientes.push(notificacion);
        } else {
            await NotificationService.crear({
                ...notificacion,
                session
            });
        }

    }

    // ==========================================
    // Finalizar la ronda completa
    // ==========================================
    async finalizarRonda(
        rondaId,
        session = null,
        notificacionesPendientes = null
    ) {

        const resultado =
            await this.verificarRonda(
                rondaId,
                session
            );

        if (!resultado.completa) {

            return null;

        }

        await RoundService.cerrarRonda(
            rondaId,
            session
        );

        const ganador =
            await this.escogerGanador(
                rondaId,
                session
            );

        const ronda =
            await this.registrarGanador(
                rondaId,
                ganador,
                session
            );

        await this.entregarPremio(
            ronda,
            session,
            notificacionesPendientes
        );

        const nuevaRonda =
            await RoundService.crearRonda(session);
        
        return {

            ronda,

            ganador,

            nuevaRonda

        };

    }

}

module.exports = new LotteryBusiness();