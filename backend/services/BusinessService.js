const SessionService = require("./SessionService");

const PaymentService = require("./PaymentService");
const TransactionService = require("./TransactionService");
const AuditService = require("./AuditService");
const NotificationService = require("./NotificationService");
const TicketService = require("./TicketService");
const UserService = require("./UserService");

const RoundBusiness = require("../business/RoundBusiness");
const TicketBusiness = require("../business/TicketBusiness");
const SpinBusiness = require("../business/SpinBusiness");
const LotteryBusiness = require("../business/LotteryBusiness");
const PrizePoolBusiness = require("../business/PrizePoolBusiness");


class BusinessService {

    async seleccionarNumeroRifaDisponible(
        rondaId,
        session = null
    ) {

        const numeros = Array.from(
            { length: 99 },
            (_, index) => index + 1
        ).sort(() => Math.random() - 0.5);

        for (const numero of numeros) {
            const disponible = await TicketService.numeroDisponible(
                rondaId,
                numero,
                session
            );

            if (disponible) {
                return numero;
            }
        }

        throw new Error(
            "No hay números disponibles para esta ronda."
        );

    }

   // ==========================================
// APROBAR PAGO
// Método principal del negocio
// ==========================================

async aprobarPago(
    pagoId,
    administrador,
    req = null
) {

    console.log("===== BUSINESS SERVICE NUEVO =====");

    const auditoriasPendientes = [];
    const notificacionesPendientes = [];

    try {

        const resultado = await SessionService.ejecutar(

            async (session) => {

                // ==========================================
                // Buscar el pago
                // ==========================================

                const pago = await PaymentService.obtenerPorId(
                    pagoId,
                    session
                );

                if (!pago) {
                    throw new Error("El pago no existe.");
                }

                // ==========================================
                // Validar estado del pago
                // ==========================================

                if (pago.estado === "APROBADO") {
                    throw new Error("Este pago ya fue aprobado.");
                }

                if (pago.estado === "RECHAZADO") {
                    throw new Error("Este pago fue rechazado.");
                }

                // ==========================================
                // Validar usuario asociado
                // ==========================================

                if (!pago.usuario) {
                    throw new Error(
                        "El pago no tiene un usuario asociado."
                    );
                }

                // ==========================================
                // Validar administrador
                // ==========================================

                if (!administrador || !administrador.id) {
                    throw new Error(
                        "Administrador no válido."
                    );
                }

                // ==========================================
                // Validar valor del pago
                // ==========================================

                if (pago.valor <= 0) {
                    throw new Error(
                        "El valor del pago es inválido."
                    );
                }

                // ==========================================
                // Variables del proceso
                // ==========================================

                let ronda = null;
                let ticket = null;
                let spin = null;
                let auditoria = null;
                let notificacion = null;
                let resultadoLoteria = null;
                let nuevaRonda = null;
                let transaccion = null;

                // ==========================================
                // Aprobar pago
                // ==========================================

                const pagoAprobado =
                    await PaymentService.aprobar(
                        pago._id,
                        administrador.id,
                        session
                    );

                // ==========================================
                // Crear transacción financiera
                // ==========================================

                transaccion =
                    await TransactionService.crear(
                        {
                            usuario: pago.usuario._id,
                            tipo: "INGRESO",
                            valor: pago.valor,
                            referencia: pago.codigo,
                            descripcion:
                                "Pago aprobado para participar en la RIFA-RULETA."
                        },
                        session
                    );

                // ==========================================
                // Auditoría
                // ==========================================

                auditoriasPendientes.push({
                    usuario: administrador.id,
                    rol: administrador.rol,
                    accion: "APROBAR_PAGO",
                    modulo: "PAGOS",
                    descripcion:
                        `Pago ${pago.codigo} aprobado correctamente.`,
                    referencia: pago.codigo,
                    ip: req?.ip || "",
                    userAgent:
                        req?.headers["user-agent"] || "",
                    estado: "EXITOSO"
                });
// ==========================================
// Notificación
// ==========================================

notificacionesPendientes.push({
    usuario: pago.usuario._id,
    titulo: "✅ Pago aprobado",
    mensaje: "Tu pago fue aprobado. Ya puedes participar en la RIFA-RULETA.",
    tipo: "SUCCESS",
    modulo: "PAGOS",
    referencia: pago.codigo
});
           //  auditoriasPendientes.push(auditoriaPago); // 
           //  notificacionesPendientes.push(notificacionPago); // 

            // ==========================================
// BLOQUE 3
// Gestión de la Ronda
// ==========================================

// ==========================================
// Obtener o crear la ronda activa
// ==========================================

ronda = await RoundBusiness.obtenerRondaActiva(
    session
);


// ==========================================
// Crear Ticket por cada pago aprobado
// Cada pago genera un Ticket independiente
// ==========================================

console.log("===== CREANDO NUEVO TICKET =====");

ticket = await TicketBusiness.crearTicket(

    pago.usuario._id,
    pago._id,
    ronda._id,
    session

);

console.log("===== TICKET CREADO =====");
console.log(ticket.codigo);

// ==========================================
// El cliente seleccionará el número del Ticket
// ==========================================

console.log(
    "Ticket creado pendiente de selección de número:",
    ticket.codigo
);
 
// ==========================================
// Actualizar estadísticas del usuario
// ==========================================

await UserService.actualizarEstadisticas(

    pago.usuario._id,

    {

        $inc: {

            ticketsComprados: 1,

            girosDisponibles: 1

        }

    },

    session

);
console.log('after UserService.actualizarEstadisticas');
// ==========================================
// Habilitar un giro disponible si no tiene ninguno
// ==========================================

if (!ticket.girosDisponibles || ticket.girosDisponibles < 1) {

    ticket = await TicketBusiness.asignarGiroDisponible(

        ticket._id,
        1,
        session

    );

    console.log('after TicketBusiness.asignarGiroDisponible');

} else {

    console.log('Ticket ya tiene giros disponibles:', ticket.girosDisponibles);

}

// ==========================================
// Crear Spin asociado al Ticket
// ==========================================
spin = await SpinBusiness.crearSpin(
    pago.usuario._id,
    ticket._id,
    ronda._id,
    session
);

// ==========================================
// Asociar el Spin al Ticket
// ==========================================

ticket =
    await TicketBusiness.asignarSpin(

        ticket._id,
        spin._id,
        session

    );

// ==========================================
// Asociar Ronda, Ticket y Spin al Pago
// ==========================================
await PaymentService.actualizarRelacion(

    pago._id,

    {

        ronda: ronda._id,
        ticket: ticket._id,
        spin: spin._id

    },

    session
 
);
console.log('after PaymentService.actualizarRelacion');

// ==========================================
// Agregar participante a la ronda
// ==========================================

ronda =
    await RoundBusiness.agregarParticipante(

        ronda._id,

        pago.usuario._id,

        ticket._id,

        spin._id,

        session

    );
console.log('after RoundBusiness.agregarParticipante');

// ==========================================
// Obtener resumen financiero
// ==========================================

console.log('before PrizePoolBusiness.resumen');

const resumenBolsa =
    PrizePoolBusiness.resumen(

        ronda.totalParticipantes

    );

console.log('after PrizePoolBusiness.resumen');

// ==========================================
// Registrar auditoría
// ==========================================

auditoriasPendientes.push({
    usuario: administrador.id,
    rol: administrador.rol,
    accion: "REGISTRO_PARTICIPANTE",
    modulo: "RIFA",
    descripcion: `Usuario agregado correctamente a la ronda ${ronda.codigo}.`,
    referencia: ronda.codigo,
    ip: req?.ip || "",
    userAgent: req?.headers["user-agent"] || "",
    estado: "EXITOSO"
});

notificacionesPendientes.push({
    usuario: pago.usuario._id,
    titulo: "🎉 Ya estás participando",
    mensaje: `Tu Ticket ${ticket.codigo} fue creado correctamente.
    Ahora ingresa a "Mis Tickets" y selecciona el número de rifa que deseas participar.
    Participantes:
    ${ronda.totalParticipantes}/${PrizePoolBusiness.MAX_PARTICIPANTES}.`,
    tipo: "SUCCESS",
    modulo: "RIFA",
    referencia: ronda.codigo
});

// ==========================================
// Información temporal
// ==========================================

const informacionRonda = {

    codigo: ronda.codigo,

    participantes: ronda.totalParticipantes,

    totalRecaudado:
        resumenBolsa.totalRecaudado,

    fondoRuleta:
        resumenBolsa.fondoRuleta,

    premioMayor:
        resumenBolsa.premioMayor,

    ganancia:
        resumenBolsa.ganancia

};
// ==========================================
// BLOQUE 4
// Verificar si la ronda está completa
// ==========================================

const rondaCompleta =
    PrizePoolBusiness.rondaCompleta(
        ronda.totalParticipantes
    );

console.log('rondaCompleta:', rondaCompleta);

// ==========================================
// Si la ronda aún NO está completa
// ==========================================

if (!rondaCompleta) {

    console.log(
        `Ronda ${ronda.codigo}: ${ronda.totalParticipantes}/${PrizePoolBusiness.MAX_PARTICIPANTES} participantes.`
    );

} else {

    console.log('before LotteryBusiness.finalizarRonda');
    resultadoLoteria =
        await LotteryBusiness.finalizarRonda(
            ronda._id,
            session,
            notificacionesPendientes
        );
    console.log('after LotteryBusiness.finalizarRonda');

    // ==========================================
    // Si se generó correctamente el resultado
    // ==========================================

    if (resultadoLoteria) {

        ronda = resultadoLoteria.ronda;

        nuevaRonda = resultadoLoteria.nuevaRonda;

        // ==========================================
        // Registrar auditoría
        // ==========================================

        auditoriasPendientes.push({
            usuario: administrador.id,
            rol: administrador.rol,
            accion: "FINALIZAR_RONDA",
            modulo: "RIFA",
            descripcion: `La ronda ${ronda.codigo} fue finalizada automáticamente.`,
            referencia: ronda.codigo,
            ip: req?.ip || "",
            userAgent: req?.headers["user-agent"] || "",
            estado: "EXITOSO"
        });

        notificacionesPendientes.push({
            usuario: ronda.ganador,
            titulo: "🏆 ¡Felicitaciones!",
            mensaje: `Has ganado el premio mayor de $${ronda.premioMayor.toLocaleString()} en la ronda ${ronda.codigo}.`,
            tipo: "SUCCESS",
            modulo: "RIFA",
            referencia: ronda.codigo
        });

        // ==========================================
        // Abrir automáticamente una nueva ronda
        // ==========================================

        nuevaRonda = await RoundBusiness.abrirNuevaRonda(session);
        console.log('after RoundBusiness.abrirNuevaRonda');

        // ==========================================
        // bolsa de premios de la nueva ronda
        // ==========================================
        await PrizePoolBusiness.crearBolsaPremios(
            nuevaRonda._id,
            session
        );
        console.log('after PrizePoolBusiness.crearBolsaPremios');

        // ==========================================
        // Registrar auditoría de la nueva ronda
        // ==========================================

        auditoriasPendientes.push({
            usuario: administrador.id,
            rol: administrador.rol,
            accion: "CREAR_RONDA",
            modulo: "RIFA",
            descripcion: `Se creó automáticamente la ronda ${nuevaRonda.codigo}.`,
            referencia: nuevaRonda.codigo,
            ip: req?.ip || "",
            userAgent: req?.headers["user-agent"] || "",
            estado: "EXITOSO"
        });

    }

}

// ==========================================
// BLOQUE 5
// Confirmar la transacción
// ==========================================

// El commit se maneja desde SessionService.ejecutar

// ==========================================
// Respuesta final
// ==========================================

return {

    success: true,

    message: "Pago aprobado correctamente.",

    data: {

        // ======================================
        // Pago
        // ======================================

        pago: {

            id: pago._id,
            codigo: pago.codigo,
            referencia: pago.referencia,
            estado: "APROBADO",
            valor: pago.valor

        },

        // ======================================
        // Ticket
        // ======================================

        ticket: ticket
            ? {

                id: ticket._id,
                codigo: ticket.codigo,
                numeroRifa: ticket.numeroRifa,
                girosDisponibles: ticket.girosDisponibles,
                estado: ticket.estado

            }
            : null,

        // ======================================
        // Spin
        // ======================================

        spin: spin
            ? {

                id: spin._id,
                codigo: spin.codigo,
                estado: spin.estado,
                premio: spin.premio

            }
            : null,

        spinId: spin
            ? spin._id
            : null,

        // ======================================
        // Ronda
        // ======================================

        ronda: ronda
            ? {

                id: ronda._id,
                codigo: ronda.codigo,
                estado: ronda.estado,
                participantes: ronda.totalParticipantes,
                premioMayor: ronda.premioMayor

            }
            : null,

        // ======================================
        // Nueva ronda (si terminó)
        // ======================================

        nuevaRonda: nuevaRonda
            ? {

                id: nuevaRonda._id,
                codigo: nuevaRonda.codigo,
                estado: nuevaRonda.estado

            }
            : null,

        // ======================================
        // Transacción
        // ======================================

        transaccion: transaccion
            ? {

                id: transaccion._id,
                codigo: transaccion.codigo

            }
            : null,

        // ======================================
        // Auditoría
        // ======================================

        auditoria: auditoria
            ? {

                id: auditoria._id,
                codigo: auditoria.codigo

            }
            : null,

        // ======================================
        // Notificación
        // ======================================

        notificacion: notificacion
            ? {

                id: notificacion._id,
                codigo: notificacion.codigo

            }
            : null

    }

};

                });

        if (auditoriasPendientes.length || notificacionesPendientes.length) {
            const creadasAuditorias = [];
            const creadasNotificaciones = [];

            for (const datosAuditoria of auditoriasPendientes) {
                try {
                    creadasAuditorias.push(await AuditService.registrar(datosAuditoria));
                } catch (error) {
                    console.error("Error registrando auditoría fuera de transacción:", error);
                }
            }

            for (const datosNotificacion of notificacionesPendientes) {
                try {
                    creadasNotificaciones.push(await NotificationService.crear(datosNotificacion));
                } catch (error) {
                    console.error("Error creando notificación fuera de transacción:", error);
                }
            }

            if (resultado && resultado.data) {
                if (creadasAuditorias.length) {
                    resultado.data.auditoria = {
                        id: creadasAuditorias[0]._id,
                        codigo: creadasAuditorias[0].codigo
                    };
                }

                if (creadasNotificaciones.length) {
                    resultado.data.notificacion = {
                        id: creadasNotificaciones[0]._id,
                        codigo: creadasNotificaciones[0].codigo
                    };
                }
            }
        }

        return resultado;

            } catch (error) {

                console.error("=========== BUSINESS ERROR ===========");
                console.error(error);
                console.error(error.stack);
                console.error("======================================");

                throw error;

            }

        }

    }

module.exports = new BusinessService();