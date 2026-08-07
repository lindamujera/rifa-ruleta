// ==========================================
// backend/services/PaymentService.js
// ==========================================

const Payment = require("../models/Payment");
const CounterService = require("./CounterService");

class PaymentService {

    // ==========================================
// Crear Pago
// ==========================================
async crear(datos, session = null) {

    console.log("====================================");
    console.log("===== CREANDO PAGO =====");
    console.log("Datos recibidos:");
    console.log(datos);

    // ======================================
    // Generar código
    // ======================================

    const codigo = await CounterService.generar(
        "PAY",
        session
    );

    console.log("Código generado:", codigo);

    // ======================================
    // Crear documento
    // ======================================

    const payment = new Payment({

        codigo,

        referencia:
            datos.referencia ||
            `NEQUI-${Date.now()}`,

        usuario: datos.usuario,

        ronda: datos.ronda || null,

        ticket: null,

        spin: null,

        valor: datos.valor || 25000,

        metodoPago:
            datos.metodoPago || "NEQUI",

        comprobante:
            datos.comprobante || "",

        estado: "PENDIENTE",

        observacion:
            datos.observacion || ""

    });

    console.log("ANTES DE GUARDAR");
    console.log(payment);

    // ======================================
    // Guardar
    // ======================================

    await payment.save({
        session
    });

    console.log("PAGO GUARDADO CORRECTAMENTE");
    console.log(payment);

    console.log("====================================");

    // Devuelve el pago completo

    return await this.obtenerPorId(
        payment._id,
        session
    );

}

// ==========================================
// Obtener Pago por ID
// ==========================================
async obtenerPorId(
    id,
    session = null
) {

    return await Payment.findById(id)

        // ==========================
        // Usuario
        // ==========================

        .populate(
            "usuario",
            `
            nombre
            correo
            celular
            saldoGanado
            totalGanado
            `
        )

        // ==========================
        // Administrador
        // ==========================

        .populate(
            "administrador",
            `
            nombre
            correo
            `
        )

        // ==========================
        // Ronda
        // ==========================

        .populate(
            "ronda",
            `
            codigo
            numero
            estado
            premioMayor
            premioAcumulado
            totalParticipantes
            ganador
            `
        )

        // ==========================
        // Ticket
        // ==========================

        .populate(
            "ticket",
            `
            codigo
            numeroRifa
            estado
            girosDisponibles
            `
        )

        // ==========================
        // Spin
        // ==========================

        .populate(
            "spin",
            `
            codigo
            numero
            estado
            premio
            `
        )

        .session(session);

}

// ==========================================
// Obtener Pago por Código
// ==========================================
async obtenerPorCodigo(codigo) {

    return await Payment.findOne({

        codigo

    })

        .populate(
            "usuario",
            `
            nombre
            correo
            celular
            saldoGanado
            totalGanado
            `
        )

        .populate(
            "administrador",
            `
            nombre
            correo
            `
        )

        .populate(
            "ronda",
            `
            codigo
            numero
            estado
            premioMayor
            premioAcumulado
            totalParticipantes
            ganador
            `
        )

        .populate(
            "ticket",
            `
            codigo
            numeroRifa
            estado
            girosDisponibles
            `
        )

        .populate(
            "spin",
            `
            codigo
            numero
            estado
            premio
            `
        );

}

// ==========================================
// Obtener Pago por Referencia
// ==========================================
async obtenerPorReferencia(referencia) {

    return await Payment.findOne({

        referencia

    })

        .populate(
            "usuario",
            `
            nombre
            correo
            celular
            saldoGanado
            totalGanado
            `
        )

        .populate(
            "administrador",
            `
            nombre
            correo
            `
        )

        .populate(
            "ronda",
            `
            codigo
            numero
            estado
            premioMayor
            premioAcumulado
            totalParticipantes
            ganador
            `
        )

        .populate(
            "ticket",
            `
            codigo
            numeroRifa
            estado
            girosDisponibles
            `
        )

        .populate(
            "spin",
            `
            codigo
            numero
            estado
            premio
            `
        );

}

   // ==========================================
// Obtener Pagos Pendientes
// ==========================================
async obtenerPendientes(session = null) {

    return await Payment.find({

        estado: "PENDIENTE"

    })

        // ==============================
        // Usuario
        // ==============================

        .populate(
            "usuario",
            `
            nombre
            correo
            celular
            saldoGanado
            totalGanado
            `
        )

        // ==============================
        // Administrador
        // ==============================

        .populate(
            "administrador",
            `
            nombre
            correo
            `
        )

        // ==============================
        // Ticket
        // ==============================

        .populate(
            "ticket",
            `
            codigo
            numeroRifa
            estado
            girosDisponibles
            `
        )

        // ==============================
        // Spin
        // ==============================

        .populate(
            "spin",
            `
            codigo
            numero
            estado
            premio
            `
        )

        // ==============================
        // Ronda
        // ==============================

        .populate(
            "ronda",
            `
            codigo
            numero
            estado
            premioMayor
            premioAcumulado
            totalParticipantes
            ganador
            `
        )

        .sort({

            createdAt: -1

        })

        .session(session);

}

// ==========================================
// Obtener Pagos Aprobados
// ==========================================
async obtenerAprobados(session = null) {

    return await Payment.find({

        estado: "APROBADO"

    })

        .populate(
            "usuario",
            `
            nombre
            correo
            celular
            saldoGanado
            totalGanado
            `
        )

        .populate(
            "administrador",
            `
            nombre
            correo
            `
        )

        .populate(
            "ticket",
            `
            codigo
            numeroRifa
            estado
            girosDisponibles
            `
        )

        .populate(
            "spin",
            `
            codigo
            numero
            estado
            premio
            `
        )

        .populate(
            "ronda",
            `
            codigo
            numero
            estado
            premioMayor
            premioAcumulado
            totalParticipantes
            ganador
            `
        )

        .sort({

            createdAt: -1

        })

        .session(session);

}

// ==========================================
// Obtener Pagos Rechazados
// ==========================================
async obtenerRechazados(session = null) {

    return await Payment.find({

        estado: "RECHAZADO"

    })

        .populate(
            "usuario",
            `
            nombre
            correo
            celular
            saldoGanado
            totalGanado
            `
        )

        .populate(
            "administrador",
            `
            nombre
            correo
            `
        )

        .populate(
            "ticket",
            `
            codigo
            numeroRifa
            estado
            girosDisponibles
            `
        )

        .populate(
            "spin",
            `
            codigo
            numero
            estado
            premio
            `
        )

        .populate(
            "ronda",
            `
            codigo
            numero
            estado
            premioMayor
            premioAcumulado
            totalParticipantes
            ganador
            `
        )

        .sort({

            createdAt: -1

        })

        .session(session);

}

// ==========================================
// Obtener Pagos por Usuario
// ==========================================
async obtenerPorUsuario(
    usuarioId,
    session = null
) {

    return await Payment.find({

        usuario: usuarioId

    })

        .populate(
            "usuario",
            `
            nombre
            correo
            celular
            saldoGanado
            totalGanado
            `
        )

        .populate(
            "administrador",
            `
            nombre
            correo
            `
        )

        .populate(
            "ticket",
            `
            codigo
            numeroRifa
            estado
            girosDisponibles
            `
        )

        .populate(
            "spin",
            `
            codigo
            numero
            estado
            premio
            `
        )

        .populate(
            "ronda",
            `
            codigo
            numero
            estado
            premioMayor
            premioAcumulado
            totalParticipantes
            ganador
            `
        )

        .sort({

            createdAt: -1

        })

        .session(session);

}
// ==========================================
// Aprobar Pago
// ==========================================

async aprobar(
    id,
    administradorId,
    session = null
) {

    const payment = await Payment.findById(id)
        .session(session);

    if (!payment) {

        throw new Error(
            "Pago no encontrado."
        );

    }

    if (payment.estado === "APROBADO") {

        throw new Error(
            "El pago ya fue aprobado."
        );

    }

    if (payment.estado === "RECHAZADO") {

        throw new Error(
            "El pago fue rechazado."
        );

    }

    payment.estado = "APROBADO";

    payment.administrador = administradorId;

    payment.fechaAprobacion = new Date();

    await payment.save({

        session

    });

    // ==========================================
    // Retornar el pago actualizado con relaciones
    // ==========================================

    return await this.obtenerPorId(
        payment._id,
        session
    );

}

// ==========================================
// Rechazar Pago
// ==========================================

async rechazar(
    id,
    administradorId,
    motivo = "",
    session = null
) {

    const payment = await Payment.findById(id)
        .session(session);

    if (!payment) {

        throw new Error(
            "Pago no encontrado."
        );

    }

    if (payment.estado === "RECHAZADO") {

        throw new Error(
            "El pago ya fue rechazado."
        );

    }

    if (payment.estado === "APROBADO") {

        throw new Error(
            "El pago ya fue aprobado."
        );

    }

    payment.estado = "RECHAZADO";

    payment.administrador = administradorId;

    payment.fechaRechazo = new Date();

    payment.observacion = motivo;

    payment.motivoRechazo = motivo;

    await payment.save({

        session

    });

    // ==========================================
    // Retornar el pago actualizado con relaciones
    // ==========================================

    return await this.obtenerPorId(
        payment._id,
        session
    );

}

// ==========================================
// Actualizar Comprobante
// ==========================================

async actualizarComprobante(
    id,
    comprobante,
    session = null
) {

    const payment = await Payment.findById(id)
        .session(session);

    if (!payment) {

        throw new Error(
            "Pago no encontrado."
        );

    }

    payment.comprobante = comprobante;

    await payment.save({

        session

    });

    // ==========================================
    // Retornar el pago actualizado
    // ==========================================

    return await this.obtenerPorId(
        payment._id,
        session
    );

}

// ==========================================
// Asociar Ticket, Spin y Ronda
// ==========================================

async actualizarRelacion(
    paymentId,
    datos,
    session = null
) {

    const payment = await Payment.findById(
        paymentId
    ).session(session);

    if (!payment) {

        throw new Error(
            "Pago no encontrado."
        );

    }

    if (datos.ronda) {

        payment.ronda = datos.ronda;

    }

    if (datos.ticket) {

        payment.ticket = datos.ticket;

    }

    if (datos.spin) {

        payment.spin = datos.spin;

    }

    await payment.save({

        session

    });

    // ==========================================
    // Retornar el pago actualizado con populate
    // ==========================================

    return await this.obtenerPorId(
        payment._id,
        session
    );

}
// ==========================================
// Actualizar Comprobante
// ==========================================

async actualizarComprobante(
    id,
    comprobante,
    session = null
) {

    const payment = await Payment.findById(id)
        .session(session);

    if (!payment) {

        throw new Error(
            "Pago no encontrado."
        );

    }

    // ==========================================
    // Actualizar comprobante
    // ==========================================

    payment.comprobante = comprobante;

    await payment.save({

        session

    });

    // ==========================================
    // Retornar completamente poblado
    // ==========================================

    return await this.obtenerPorId(
        payment._id,
        session
    );

}

// ==========================================
// Asociar Ticket, Spin y Ronda
// ==========================================

async actualizarRelacion(
    paymentId,
    datos,
    session = null
) {

    const payment = await Payment.findById(
        paymentId
    ).session(session);

    if (!payment) {

        throw new Error(
            "Pago no encontrado."
        );

    }

    if (datos.ronda) {

        payment.ronda = datos.ronda;

    }

    if (datos.ticket) {

        payment.ticket = datos.ticket;

    }

    if (datos.spin) {

        payment.spin = datos.spin;

    }

    await payment.save({

        session

    });

    // ==========================================
    // Retornar completamente poblado
    // ==========================================

    return await this.obtenerPorId(
        payment._id,
        session
    );

}

// ==========================================
// Eliminar Pago
// ==========================================

async eliminar(
    id,
    session = null
) {

    return await Payment.findByIdAndDelete(

        id,

        {

            session

        }

    );

}

// ==========================================
// Eliminar Pago
// ==========================================
async eliminar(
    id,
    session = null
) {

    return await Payment.findByIdAndDelete(

        id,

        {

            session

        }

    );

}

}
// ==========================================
// Exportar Servicio
// ==========================================

module.exports = new PaymentService();