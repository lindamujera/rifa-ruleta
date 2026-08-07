const Counter = require("../models/Counter");

class CounterService {

    // ==========================================
    // Generar código consecutivo
    // Ejemplo:
    // PAY-2026-000001
    // TICKET-2026-000001
    // ROUND-2026-000001
    // ==========================================
    async generar(prefijo, session = null) {

        if (!prefijo) {
            throw new Error("Debe indicar un prefijo para generar el consecutivo.");
        }

        const contador = await Counter.findOneAndUpdate(
            {
                nombre: prefijo
            },
            {
                $inc: {
                    valor: 1
                }
            },
            {
                new: true,
                upsert: true,
                session
            }
        );

        const anio = new Date().getFullYear();

        const consecutivo = contador.valor
            .toString()
            .padStart(6, "0");

        return `${prefijo}-${anio}-${consecutivo}`;
    }

    // ==========================================
    // Consultar el valor actual del contador
    // ==========================================
    async obtener(prefijo) {

        return await Counter.findOne({
            nombre: prefijo
        });

    }

    // ==========================================
    // Reiniciar contador
    // (Solo para administración)
    // ==========================================
    async reiniciar(prefijo, session = null) {

        return await Counter.findOneAndUpdate(
            {
                nombre: prefijo
            },
            {
                valor: 0
            },
            {
                new: true,
                session
            }
        );

    }

}

module.exports = new CounterService();