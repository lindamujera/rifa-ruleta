// ==========================================
// backend/business/PrizePoolBusiness.js
// ==========================================

const PrizePoolService = require("../services/PrizePoolService");

class PrizePoolBusiness {

    constructor() {

        // ==========================================
        // Configuración general del negocio
        // ==========================================

        this.VALOR_JUGADA = 25000;

        this.MAX_PARTICIPANTES = 100;

        this.PREMIO_MAYOR = 1000000;

        // Fondo destinado exclusivamente
        // a los premios de la ruleta.
        this.FONDO_RULETA = 551000;

    }

    // ==========================================
    // Calcular información financiera
    // ==========================================
    calcularBolsa(totalParticipantes) {

        totalParticipantes = Math.max(
            0,
            Math.min(
                totalParticipantes,
                this.MAX_PARTICIPANTES
            )
        );

        const totalRecaudado =
            totalParticipantes *
            this.VALOR_JUGADA;

        const fondoRuleta =
            this.FONDO_RULETA;

        const premioMayor =
            this.PREMIO_MAYOR;

        const ganancia =
            this.calcularGanancia(
                totalRecaudado,
                fondoRuleta,
                premioMayor
            );

        return {

            totalParticipantes,

            valorJugada:
                this.VALOR_JUGADA,

            totalRecaudado,

            fondoRuleta,

            premioMayor,

            ganancia

        };

    }

    // ==========================================
    // Calcular utilidad del sistema
    // ==========================================
    calcularGanancia(
        totalRecaudado,
        fondoRuleta,
        premioMayor
    ) {

        return Math.max(
            0,
            totalRecaudado -
            fondoRuleta -
            premioMayor
        );

    }

    // ==========================================
    // Validar si la ronda llegó al límite
    // ==========================================
    rondaCompleta(totalParticipantes) {

        return (
            totalParticipantes >=
            this.MAX_PARTICIPANTES
        );

    }

    // ==========================================
    // Fondo disponible para la ruleta
    // ==========================================
    calcularDisponibleRuleta() {

        return this.FONDO_RULETA;

    }

    // ==========================================
    // Validar un premio
    // ==========================================
    validarPremio(
        valorPremio,
        saldoDisponible
    ) {

        return (
            valorPremio > 0 &&
            valorPremio <= saldoDisponible
        );

    }
    // ==========================================
    // Descontar premio entregado
    // ==========================================
    descontarPremio(
        saldoDisponible,
        valorPremio
    ) {

        return Math.max(
            0,
            saldoDisponible - valorPremio
        );

    }

    // ==========================================
    // Total entregado en premios
    // ==========================================
    calcularPremiosEntregados(
        fondoInicial,
        saldoActual
    ) {

        return Math.max(
            0,
            fondoInicial - saldoActual
        );

    }

    // ==========================================
    // Bolsa oficial de premios
    // 100 premios
    // Total: $551.000
    // ==========================================
    obtenerPremiosRuleta() {

        const premios = [];

        // 70 premios de $5.000
        premios.push(...Array(70).fill(5000));

        // 15 premios de $6.000
        premios.push(...Array(15).fill(6000));

        // 11 premios de $7.000
        premios.push(...Array(11).fill(7000));

        // 2 premios de $8.000
        premios.push(...Array(2).fill(8000));

        // 2 premios de $9.000
        premios.push(...Array(2).fill(9000));

        // Mezclar aleatoriamente
        return premios.sort(() => Math.random() - 0.5);

    }

    // ==========================================
    // Crear bolsa de premios para una ronda
    // ==========================================
    async crearBolsaPremios(
        rondaId,
        session = null
    ) {

        const premios = this.obtenerPremiosRuleta();

        const registros = premios.map((valor, index) => ({

            codigo: `PP-${String(index + 1).padStart(3, "0")}`,

            ronda: rondaId,

            posicion: index + 1,

            valor,

            estado: "DISPONIBLE"

        }));

        return await PrizePoolService.crearMuchos(
            registros,
            session
        );

    }

    // ==========================================
    // Entregar premio aleatorio
    // ==========================================
    async entregarPremio(
        rondaId,
        usuarioId,
        session = null
    ) {

        const premio =
            await PrizePoolService.obtenerPremioAleatorio(
                rondaId,
                session
            );

        await PrizePoolService.entregar(
            premio._id,
            usuarioId,
            session
        );

        return premio;

    }

    // ==========================================
    // Obtener saldo disponible de la bolsa
    // ==========================================
    async obtenerSaldoDisponible(
        rondaId
    ) {

        const premios =
            await PrizePoolService.disponibles(
                rondaId
            );

        return premios.reduce(

            (total, premio) => total + premio.valor,

            0

        );

    }

    // ==========================================
    // Obtener total entregado
    // ==========================================
    async obtenerTotalEntregado(
        rondaId
    ) {

        const premios =
            await PrizePoolService.obtenerPorRonda(
                rondaId
            );

        return premios

            .filter(
                premio => premio.estado === "ENTREGADO"
            )

            .reduce(

                (total, premio) => total + premio.valor,

                0

            );

    }

    // ==========================================
    // Resumen financiero
    // ==========================================
    resumen(
        totalParticipantes
    ) {

        const bolsa =
            this.calcularBolsa(
                totalParticipantes
            );

        return {

            ...bolsa,

            estado:
                this.rondaCompleta(
                    totalParticipantes
                )
                    ? "COMPLETA"
                    : "ABIERTA"

        };

    }

}

module.exports = new PrizePoolBusiness();