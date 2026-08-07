// ==========================================
// backend/services/RoundService.js
// ==========================================

const Round = require("../models/Round");
const CounterService = require("./CounterService");

class RoundService {
// ==========================================
// Abrir nueva ronda
// ==========================================

async abrirNuevaRonda(session = null) {

    return await this.crearRonda(session);

}
    // ==========================================
    // Crear nueva ronda
    // ==========================================

    async crearRonda(session = null) {

        const codigo = await CounterService.generar(
            "ROUND",
            session
        );

        const ronda = new Round({

            codigo,

            estado: "ABIERTA",

            totalParticipantes: 0,

            totalRecaudado: 0,

            fondoRuleta: 551000,

            premioMayor: 1000000,

            totalPremiosRuleta: 0,

            ganancia: 0

        });

        await ronda.save({ session });

        return ronda;

    }

    // ==========================================
    // Buscar ronda abierta
    // ==========================================

    async buscarRondaAbierta(session = null) {

        return await Round.findOne({

            estado: "ABIERTA"

        }).session(session);

    }

    // ==========================================
    // Obtener ronda activa
    // ==========================================

    async obtenerRondaActiva(session = null) {

        let ronda = await this.buscarRondaAbierta(session);

        if (!ronda) {

            ronda = await this.crearRonda(session);

        }

        return ronda;

    }

    // ==========================================
    // Obtener por ID
    // ==========================================

    async obtenerPorId(id, session = null) {

        console.log('RoundService.obtenerPorId:', id, 'session=' + !!session);

        try {
            const ronda = await Round.findById(id)

                .populate("participantes.usuario")
                .populate("participantes.ticket")
                .populate("participantes.spin")
                .populate("ganador")
                .populate("ticketGanador")

                .session(session);

            console.log('RoundService.obtenerPorId result:', ronda ? ronda._id : null);

            return ronda;
        } catch (error) {
            console.error('RoundService.obtenerPorId error:', error);
            throw error;
        }

    }

    // ==========================================
    // Obtener por código
    // ==========================================

    async obtenerPorCodigo(codigo) {

        return await Round.findOne({

            codigo

        })

            .populate("participantes.usuario")
            .populate("participantes.ticket")
            .populate("participantes.spin")
            .populate("ganador")
            .populate("ticketGanador");

    }

    // ==========================================
    // Obtener todas
    // ==========================================

    async obtenerTodas() {

        return await Round.find()

            .sort({

                createdAt: -1

            });

    }

    // ==========================================
    // Obtener abiertas
    // ==========================================

    async obtenerAbiertas() {

        return await Round.find({

            estado: "ABIERTA"

        }).sort({

            createdAt: -1

        });

    }

    // ==========================================
    // Obtener cerradas
    // ==========================================

    async obtenerCerradas() {

        return await Round.find({

            estado: "CERRADA"

        }).sort({

            createdAt: -1

        });

    }

    // ==========================================
    // Obtener finalizadas
    // ==========================================

    async obtenerFinalizadas() {

        return await Round.find({

            estado: "FINALIZADA"

        }).sort({

            createdAt: -1

        });

    }

    // ==========================================
    // Guardar cambios
    // ==========================================

    async guardar(ronda, session = null) {

        await ronda.save({ session });

        return ronda;

    }

    // ==========================================
    // Recalcular finanzas automáticamente
    // ==========================================

    async actualizarFinanzas(ronda, session = null) {
console.log("==================================");
console.log("TOTAL PARTICIPANTES:", ronda.participantes.length);

console.log(
    JSON.stringify(
        ronda.participantes,
        null,
        2
    )
);

console.log("==================================");
        const participantes = ronda.totalParticipantes;

        ronda.totalRecaudado = participantes * 25000;

        ronda.fondoRuleta = 551000;

        ronda.premioMayor = 1000000;

        ronda.ganancia =
            ronda.totalRecaudado -
            ronda.fondoRuleta;

        await ronda.save({

            session

        });

        return ronda;

    }

    // ==========================================
    // Agregar participante
    // ==========================================

    async agregarParticipante(

        ronda,

        participante,

        session = null

    ) {

        if (ronda.totalParticipantes >= 100) {

            throw new Error(

                "La ronda ya alcanzó el máximo de participantes."

            );

        }

        ronda.participantes.push(participante);

        ronda.totalParticipantes =
            ronda.participantes.length;

        await this.actualizarFinanzas(

            ronda,

            session

        );

        return ronda;

    }

    // ==========================================
    // Cambiar estado
    // ==========================================

    async cambiarEstado(

        rondaId,

        estado,

        session = null

    ) {

        const ronda = await Round.findById(

            rondaId

        ).session(session);

        if (!ronda) {

            throw new Error(

                "La ronda no existe."

            );

        }

        ronda.estado = estado;

        if (

            estado === "CERRADA" ||

            estado === "FINALIZADA"

        ) {

            ronda.fechaFin = new Date();

        }

        await ronda.save({

            session

        });

        return ronda;

    }

    // ==========================================
    // Registrar ganador
    // ==========================================

    async registrarGanador(

        rondaId,

        usuarioId,

        ticketId,

        session = null

    ) {

        const ronda = await Round.findById(

            rondaId

        ).session(session);

        if (!ronda) {

            throw new Error(

                "La ronda no existe."

            );

        }

        ronda.ganador = usuarioId;

        ronda.ticketGanador = ticketId;

        ronda.estado = "FINALIZADA";

        ronda.fechaFin = new Date();

        await ronda.save({

            session

        });

        return ronda;

    }

    // ==========================================
    // Eliminar
    // ==========================================

    async eliminar(

        rondaId,

        session = null

    ) {

        return await Round.findByIdAndDelete(

            rondaId,

            {

                session

            }

        );

    }

}

module.exports = new RoundService();