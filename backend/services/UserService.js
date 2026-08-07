// ==========================================
// backend/services/UserService.js
// ==========================================

const User = require("../models/User");

class UserService {

    // ==========================================
    // Obtener por ID
    // ==========================================
    async obtenerPorId(
        usuarioId,
        session = null
    ) {

        return await User.findById(usuarioId)
            .session(session);

    }

    // ==========================================
    // Obtener por correo
    // ==========================================
    async obtenerPorCorreo(
        correo,
        session = null
    ) {

        return await User.findOne({
            correo
        }).session(session);

    }

    // ==========================================
    // Obtener por código
    // ==========================================
    async obtenerPorCodigo(
        codigo,
        session = null
    ) {

        return await User.findOne({
            codigo
        }).session(session);

    }

    // ==========================================
    // Obtener todos
    // ==========================================
    async obtenerTodos(
        session = null
    ) {

        return await User.find()

            .sort({
                createdAt: -1
            })

            .session(session);

    }

    // ==========================================
    // Guardar cambios
    // ==========================================
    async guardar(
        usuario,
        session = null
    ) {

        await usuario.save({
            session
        });

        return usuario;

    }

    // ==========================================
    // Actualizar saldo ganado
    // ==========================================
    async actualizarSaldoGanado(
        usuarioId,
        valor,
        session = null
    ) {

        const usuario =
            await this.obtenerPorId(
                usuarioId,
                session
            );

        if (!usuario) {

            throw new Error(
                "Usuario no encontrado."
            );

        }

        usuario.saldoGanado += valor;

        await usuario.save({
            session
        });

        return usuario;

    }

    // ==========================================
    // Actualizar total ganado
    // ==========================================
    async actualizarTotalGanado(
        usuarioId,
        valor,
        session = null
    ) {

        const usuario =
            await this.obtenerPorId(
                usuarioId,
                session
            );

        if (!usuario) {

            throw new Error(
                "Usuario no encontrado."
            );

        }

        usuario.totalGanado += valor;

        await usuario.save({
            session
        });

        return usuario;

    }

    // ==========================================
    // Actualizar saldo y total ganado
    // ==========================================
    async actualizarPremio(
        usuarioId,
        premio,
        session = null
    ) {

        const usuario =
            await this.obtenerPorId(
                usuarioId,
                session
            );

        if (!usuario) {

            throw new Error(
                "Usuario no encontrado."
            );

        }

        usuario.saldoGanado += premio;

        usuario.totalGanado += premio;

        await usuario.save({
            session
        });

        return usuario;

    }

    // ==========================================
    // Actualizar estadísticas del usuario
    async actualizarEstadisticas(
        usuarioId,
        datos,
        session = null
    ) {

        const usuario =
            await this.obtenerPorId(
                usuarioId,
                session
            );

        if (!usuario) {

            throw new Error(
                "Usuario no encontrado."
            );

        }

        if (datos && datos.$inc) {
            for (const [key, value] of Object.entries(datos.$inc)) {
                usuario[key] = (usuario[key] || 0) + value;
            }
        }

        if (datos && datos.$set) {
            Object.assign(usuario, datos.$set);
        }

        await usuario.save({
            session
        });

        return usuario;

    }

    // ==========================================
    // Actualizar giros disponibles
    // ==========================================
    async actualizarGiros(
        usuarioId,
        cantidad,
        session = null
    ) {

        const usuario =
            await this.obtenerPorId(
                usuarioId,
                session
            );

        if (!usuario) {

            throw new Error(
                "Usuario no encontrado."
            );

        }

        usuario.girosDisponibles = cantidad;

        await usuario.save({
            session
        });

        return usuario;

    }

    // ==========================================
    // Incrementar tickets comprados
    // ==========================================
    async incrementarTickets(
        usuarioId,
        cantidad = 1,
        session = null
    ) {

        const usuario =
            await this.obtenerPorId(
                usuarioId,
                session
            );

        if (!usuario) {

            throw new Error(
                "Usuario no encontrado."
            );

        }

        usuario.ticketsComprados += cantidad;

        await usuario.save({
            session
        });

        return usuario;

    }

    // ==========================================
    // Actualizar último ingreso
    // ==========================================
    async actualizarUltimoIngreso(
        usuarioId,
        session = null
    ) {

        const usuario =
            await this.obtenerPorId(
                usuarioId,
                session
            );

        if (!usuario) {

            throw new Error(
                "Usuario no encontrado."
            );

        }

        usuario.ultimoIngreso = new Date();

        await usuario.save({
            session
        });

        return usuario;

    }

    // ==========================================
    // Eliminar Usuario
    // ==========================================
    async eliminar(
        usuarioId,
        session = null
    ) {

        return await User.findByIdAndDelete(
            usuarioId,
            {
                session
            }
        );

    }

}

module.exports = new UserService();