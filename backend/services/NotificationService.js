// ==========================================
// backend/services/NotificationService.js
// ==========================================

const Notification = require("../models/Notification");
const CounterService = require("./CounterService");

class NotificationService {

    // ==========================================
    // Crear notificación
    // ==========================================
    async crear({

        usuario,
        titulo,
        mensaje,
        tipo = "INFO",
        modulo = "",
        referencia = "",
        session = null

    }) {

        const codigo = await CounterService.generar(

            "NOTIF",
            session

        );

        const notification = new Notification({

            codigo,
            usuario,
            titulo,
            mensaje,
            tipo,
            modulo,
            referencia

        });

        await notification.save({

            session

        });

        return notification;

    }

    // ==========================================
    // Obtener notificación por ID
    // ==========================================
    async obtenerPorId(

        id,
        session = null

    ) {

        return await Notification.findById(id)

            .populate("usuario")

            .session(session);

    }

    // ==========================================
    // Obtener todas las notificaciones
    // ==========================================
    async obtenerTodas() {

        return await Notification.find()

            .populate("usuario")

            .sort({

                createdAt: -1

            });

    }

    // ==========================================
    // Obtener notificaciones de un usuario
    // ==========================================
    async obtenerUsuario(usuarioId) {

        return await Notification.find({

            usuario: usuarioId

        })

            .sort({

                createdAt: -1

            });

    }

    // ==========================================
    // Obtener notificaciones no leídas
    // ==========================================
    async obtenerNoLeidas(usuarioId) {

        return await Notification.find({

            usuario: usuarioId,
            leida: false

        })

            .sort({

                createdAt: -1

            });

    }

    // ==========================================
    // Marcar una notificación como leída
    // ==========================================
    async marcarLeida(

        id,
        session = null

    ) {

        return await Notification.findByIdAndUpdate(

            id,

            {

                leida: true

            },

            {

                new: true,
                session

            }

        );

    }

    // ==========================================
    // Marcar todas las notificaciones
    // como leídas
    // ==========================================
    async marcarTodas(

        usuarioId,
        session = null

    ) {

        return await Notification.updateMany(

            {

                usuario: usuarioId,
                leida: false

            },

            {

                leida: true

            },

            {

                session

            }

        );

    }

    // ==========================================
    // Eliminar una notificación
    // ==========================================
    async eliminar(

        id,
        session = null

    ) {

        return await Notification.findByIdAndDelete(

            id,

            {

                session

            }

        );

    }

    // ==========================================
    // Eliminar todas las notificaciones
    // de un usuario
    // ==========================================
    async eliminarTodasUsuario(

        usuarioId,
        session = null

    ) {

        return await Notification.deleteMany(

            {

                usuario: usuarioId

            },

            {

                session

            }

        );

    }

}

module.exports = new NotificationService();