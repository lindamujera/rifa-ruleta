// ==========================================
// backend/services/PrizePoolService.js
// ==========================================

const PrizePool = require("../models/PrizePool");

class PrizePoolService {

    // ==========================================
    // Crear Premio
    // ==========================================
    async crear(datos, session = null) {

        const premio = new PrizePool(datos);

        await premio.save({ session });

        return premio;

    }

    // ==========================================
    // Crear varios premios
    // ==========================================
    async crearMuchos(listaPremios, session = null) {

        return await PrizePool.insertMany(
            listaPremios,
            {
                session
            }
        );

    }

    // ==========================================
    // Obtener premios de una ronda
    // ==========================================
    async obtenerPorRonda(rondaId, session = null) {

        return await PrizePool.find({

            ronda: rondaId

        })

            .sort({

                posicion: 1

            })

            .populate("ganador")
            .populate("spin")

            .session(session)

            .lean();

    }

    // ==========================================
    // Obtener premios disponibles
    // ==========================================
    async disponibles(rondaId, session = null) {

        return await PrizePool.find({

            ronda: rondaId,
            estado: "DISPONIBLE"

        })

            .sort({

                posicion: 1

            })

            .session(session)

            .lean();

    }

    // ==========================================
    // Obtener premio disponible aleatorio
    // ==========================================
    async obtenerPremioAleatorio(rondaId, session = null) {

        const premios = await PrizePool.find({

            ronda: rondaId,
            estado: "DISPONIBLE"

        }).session(session);

        if (!premios.length) {

            throw new Error(
                "No quedan premios disponibles."
            );

        }

        const indice = Math.floor(
            Math.random() * premios.length
        );

        return premios[indice];

    }

    // ==========================================
    // Contar premios entregados
    // ==========================================
    async contarEntregados(rondaId, session = null) {

        return await PrizePool.countDocuments({

            ronda: rondaId,
            estado: "ENTREGADO"

        }).session(session);

    }

    // ==========================================
    // Obtener Premio Actual
    // ==========================================
    async obtenerActual(session = null) {

        return await PrizePool.findOne({

            estado: "DISPONIBLE"

        })

            .sort({

                posicion: 1

            })

            .session(session);

    }

    // ==========================================
    // Obtener Premio por ID
    // ==========================================
    async obtenerPorId(id, session = null) {

        return await PrizePool.findById(id)

            .populate("ronda")
            .populate("ganador")
            .populate("spin")

            .session(session)

            .lean();

    }

    // ==========================================
    // Historial de Premios
    // ==========================================
    async obtenerHistorial(session = null) {

        return await PrizePool.find()

            .populate("ronda")
            .populate("ganador")
            .populate("spin")

            .sort({

                createdAt: -1

            })

            .session(session)

            .lean();

    }

    // ==========================================
    // Incrementar Fondo
    // ==========================================
    async incrementar(valor, session = null) {

        const premio = await this.obtenerActual(session);

        if (!premio) {

            throw new Error(
                "No existe un premio disponible."
            );

        }

        premio.valor += valor;

        await premio.save({

            session

        });

        return premio;

    }

    // ==========================================
    // Reiniciar Fondo
    // ==========================================
    async reiniciar(session = null) {

        const premio = await this.obtenerActual(session);

        if (!premio) {

            throw new Error(
                "No existe un premio disponible."
            );

        }

        premio.valor = 0;
        premio.estado = "DISPONIBLE";
        premio.ganador = null;
        premio.spin = null;
        premio.fechaEntrega = null;

        await premio.save({

            session

        });

        return premio;

    }

    // ==========================================
    // Dashboard
    // ==========================================
    async dashboard(session = null) {

        const totalPremios = await PrizePool.countDocuments()

            .session(session);

        const entregados = await PrizePool.countDocuments({

            estado: "ENTREGADO"

        }).session(session);

        const disponibles = await PrizePool.countDocuments({

            estado: "DISPONIBLE"

        }).session(session);

        return {

            totalPremios,
            entregados,
            disponibles

        };

    }

}

module.exports = new PrizePoolService();