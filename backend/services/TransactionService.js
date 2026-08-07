// ==========================================
// backend/services/TransactionService.js
// ==========================================

const Transaction = require("../models/Transaction");
const CounterService = require("./CounterService");

class TransactionService {

    // ==========================================
    // Crear transacción
    // ==========================================
    async crear({

        usuario,
        tipo,
        valor,
        referencia = "",
        descripcion = "",
        modulo = "SISTEMA",
        session = null

    }) {

        const codigo = await CounterService.generar(

            "TRANS",
            session

        );

        const transaction = new Transaction({

            codigo,
            usuario,
            tipo,
            valor,
            referencia,
            descripcion,
            modulo,
            estado: "CONFIRMADA",
            fechaTransaccion: new Date()

        });

        await transaction.save({

            session

        });

        return transaction;

    }

    // ==========================================
    // Obtener transacción por ID
    // ==========================================
    async obtenerPorId(

        id,
        session = null

    ) {

        return await Transaction.findById(id)

            .populate("usuario")

            .session(session);

    }

    // ==========================================
    // Obtener transacción por código
    // ==========================================
    async obtenerPorCodigo(codigo) {

        return await Transaction.findOne({

            codigo

        })

            .populate("usuario");

    }

    // ==========================================
    // Obtener todas las transacciones
    // ==========================================
    async obtenerTodas() {

        return await Transaction.find()

            .populate("usuario")

            .sort({

                fechaTransaccion: -1

            });

    }

    // ==========================================
    // Obtener transacciones de un usuario
    // ==========================================
    async obtenerPorUsuario(usuarioId) {

        return await Transaction.find({

            usuario: usuarioId

        })

            .populate("usuario")

            .sort({

                fechaTransaccion: -1

            });

    }

    // ==========================================
    // Obtener transacciones por tipo
    // ==========================================
    async obtenerPorTipo(tipo) {

        return await Transaction.find({

            tipo

        })

            .populate("usuario")

            .sort({

                fechaTransaccion: -1

            });

    }

    // ==========================================
    // Anular transacción
    // ==========================================
    async anular(

        id,
        session = null

    ) {

        const transaction = await Transaction.findById(

            id

        )

            .session(session);

        if (!transaction) {

            throw new Error(
                "La transacción no existe."
            );

        }

        transaction.estado = "ANULADA";

        await transaction.save({

            session

        });

        return transaction;

    }

    // ==========================================
    // Eliminar transacción
    // ==========================================
    async eliminar(

        id,
        session = null

    ) {

        return await Transaction.findByIdAndDelete(

            id,

            {

                session

            }

        );

    }

}

module.exports = new TransactionService();