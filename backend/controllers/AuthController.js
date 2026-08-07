// ==========================================
// backend/controllers/AuthController.js
// ==========================================

const User = require("../models/User");
const CounterService = require("../services/CounterService");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ==========================================
// Registrar usuario
// ==========================================

exports.register = async (req, res) => {

    try {

        const {
            nombre,
            celular,
            correo,
            password
        } = req.body;

        // Validar datos
        if (!nombre || !celular || !correo || !password) {

            return res.status(400).json({
                success: false,
                message: "Todos los campos son obligatorios."
            });

        }

        // Verificar si existe
        const existe = await User.findOne({
            correo: correo.toLowerCase()
        });

        if (existe) {

            return res.status(400).json({
                success: false,
                message: "El correo ya está registrado."
            });

        }

        // Generar código
        const codigo = await CounterService.generar("USER");

        // Encriptar contraseña
        const hash = await bcrypt.hash(password, 10);

        // Crear usuario
        const usuario = await User.create({

            codigo,

            nombre,

            celular,

            correo: correo.toLowerCase(),

            password: hash,

            rol: "CLIENTE",

        });

        return res.status(201).json({

            success: true,

            message: "Usuario registrado correctamente.",

            usuario: {

                id: usuario._id,

                codigo: usuario.codigo,

                nombre: usuario.nombre,

                correo: usuario.correo,

                celular: usuario.celular,

                rol: usuario.rol

            }

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// ==========================================
// Iniciar sesión
// ==========================================

exports.login = async (req, res) => {

    try {

        const {
            correo,
            password
        } = req.body;

        if (!correo || !password) {

            return res.status(400).json({

                success: false,

                message: "Correo y contraseña son obligatorios."

            });

        }

        // Buscar usuario
        const usuario = await User.findOne({

            correo: correo.toLowerCase()

        });

        if (!usuario) {

            return res.status(404).json({

                success: false,

                message: "Usuario no encontrado."

            });

        }

        // Estado
        if (usuario.estado !== "ACTIVO") {

            return res.status(403).json({

                success: false,

                message: "La cuenta no está disponible."

            });

        }

        // Validar contraseña
        const coincide = await bcrypt.compare(

            password,

            usuario.password

        );

        if (!coincide) {

            return res.status(400).json({

                success: false,

                message: "Contraseña incorrecta."

            });

        }

        // Actualizar último ingreso
        usuario.ultimoIngreso = new Date();

        await usuario.save();

        // Crear token
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

        return res.status(200).json({

            success: true,

            message: "Inicio de sesión exitoso.",

            token,

            usuario: {

                id: usuario._id,

                codigo: usuario.codigo,

                nombre: usuario.nombre,

                correo: usuario.correo,

                celular: usuario.celular,

                rol: usuario.rol,

                estado: usuario.estado,

                girosDisponibles: usuario.girosDisponibles,

                saldoGanado: usuario.saldoGanado,

                totalGanado: usuario.totalGanado,

                totalPagado: usuario.totalPagado,

                ticketsComprados: usuario.ticketsComprados,

                foto: usuario.foto,

                ultimoIngreso: usuario.ultimoIngreso

            }

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

}
