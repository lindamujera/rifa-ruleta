const AuditLog = require("../models/AuditLog");
const CounterService = require("./CounterService");

class AuditService {

    // ==========================================
    // Registrar auditoría
    // ==========================================
    async registrar({
        usuario = null,
        rol = "",
        accion,
        modulo,
        descripcion = "",
        referencia = "",
        ip = "",
        userAgent = "",
        estado = "EXITOSO",
        session = null
    }) {

        const codigo = await CounterService.generar(
            "AUDIT",
            session
        );

        const audit = new AuditLog({

            codigo,

            usuario,

            rol,

            accion,

            modulo,

            descripcion,

            referencia,

            ip,

            userAgent,

            estado

        });

        await audit.save({

            session

        });

        return audit;

    }

    // ==========================================
    // Obtener por ID
    // ==========================================
    async obtenerPorId(id, session = null) {

        return await AuditLog.findById(id)

            .populate("usuario")

            .session(session);

    }

    // ==========================================
    // Buscar por código
    // ==========================================
    async buscarPorCodigo(codigo) {

        return await AuditLog.findOne({

            codigo

        })

        .populate("usuario");

    }

    // ==========================================
    // Buscar por usuario
    // ==========================================
    async buscarPorUsuario(usuarioId) {

        return await AuditLog.find({

            usuario: usuarioId

        })

        .populate("usuario")

        .sort({

            createdAt: -1

        });

    }

    // ==========================================
    // Buscar por módulo
    // ==========================================
    async buscarPorModulo(modulo) {

        return await AuditLog.find({

            modulo

        })

        .populate("usuario")

        .sort({

            createdAt: -1

        });

    }

    // ==========================================
    // Buscar por estado
    // ==========================================
    async buscarPorEstado(estado) {

        return await AuditLog.find({

            estado

        })

        .populate("usuario")

        .sort({

            createdAt: -1

        });

    }

    // ==========================================
    // Obtener todos
    // ==========================================
    async obtenerTodos() {

        return await AuditLog.find()

            .populate("usuario")

            .sort({

                createdAt: -1

            });

    }

    // ==========================================
    // Eliminar registro
    // ==========================================
    async eliminar(id, session = null) {

        return await AuditLog.findByIdAndDelete(

            id,

            {

                session

            }

        );

    }

}

module.exports = new AuditService();