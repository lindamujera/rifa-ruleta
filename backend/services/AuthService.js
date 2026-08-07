// ==========================================
// backend/services/AuthService.js
// ==========================================

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const CounterService = require("./CounterService");
const UserRepository = require("../repositories/UserRepository");

class AuthService {

    // ==========================================
    // Registrar Usuario
    // ==========================================
    async registrar(datos) {

        // Verificar si el correo ya existe
        const existe = await UserRepository.buscarPorCorreo(
            datos.correo.toLowerCase()
        );

        if (existe) {

            throw new Error(
                "El correo ya está registrado."
            );

        }

        // Generar código
        const codigo = await CounterService.generar(
            "USER"
        );

        // Encriptar contraseña
        const password = await bcrypt.hash(
            datos.password,
            10
        );

        // Crear usuario
        const usuario = await UserRepository.crear({

            codigo,

            nombre: datos.nombre,

            celular: datos.celular,

            correo: datos.correo.toLowerCase(),

            password,

            rol: datos.rol || "CLIENTE",

            estado: "ACTIVO"

        });

        return {

            id: usuario._id,

            codigo: usuario.codigo,

            nombre: usuario.nombre,

            celular: usuario.celular,

            correo: usuario.correo,

            rol: usuario.rol,

            estado: usuario.estado

        };

    }

    // ==========================================
    // Iniciar Sesión
    // ==========================================
    async login(
        correo,
        password
    ) {

        const usuario = await UserRepository.buscarPorCorreo(

            correo.toLowerCase()

        );

        if (!usuario) {

            throw new Error(
                "Usuario no encontrado."
            );

        }

        // Validar estado
        if (usuario.estado !== "ACTIVO") {

            throw new Error(
                "La cuenta no está disponible."
            );

        }

        // Validar contraseña
        const coincide = await bcrypt.compare(

            password,

            usuario.password

        );

        if (!coincide) {

            throw new Error(
                "Contraseña incorrecta."
            );

        }

        // Actualizar último ingreso
        await UserRepository.actualizarUltimoIngreso(

            usuario._id

        );

        // Crear Token
        const token = jwt.sign(

            {

                id: usuario._id,

                rol: usuario.rol

            },

            process.env.JWT_SECRET,

            {

                expiresIn: "7d"

            }

        );

        return {

            token,

            usuario: {

                id: usuario._id,

                codigo: usuario.codigo,

                nombre: usuario.nombre,

                celular: usuario.celular,

                correo: usuario.correo,

                rol: usuario.rol,

                estado: usuario.estado,

                foto: usuario.foto,

                girosDisponibles:
                    usuario.girosDisponibles,

                saldoGanado:
                    usuario.saldoGanado,

                totalGanado:
                    usuario.totalGanado,

                totalPagado:
                    usuario.totalPagado,

                ticketsComprados:
                    usuario.ticketsComprados,

                ultimoIngreso:
                    usuario.ultimoIngreso

            }

        };

    }

}

module.exports = new AuthService();