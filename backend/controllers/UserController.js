// ==========================================
// UserController.js
// ==========================================

const User = require("../models/User");

class UserController {

    // ==========================================
    // Obtener perfil
    // ==========================================
    async profile(req, res) {

        try {

            const usuario = await User.findById(req.user.id)
                .select("-password");

            if (!usuario) {

                return res.status(404).json({
                    success: false,
                    message: "Usuario no encontrado."
                });

            }

            return res.status(200).json({
                success: true,
                data: usuario
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    // ==========================================
    // Actualizar perfil
    // ==========================================
    async updateProfile(req, res) {

        try {

            const { nombre, celular } = req.body;

            const usuario = await User.findByIdAndUpdate(

                req.user.id,

                {
                    nombre,
                    celular
                },

                {
                    new: true,
                    runValidators: true
                }

            ).select("-password");

            if (!usuario) {

                return res.status(404).json({
                    success: false,
                    message: "Usuario no encontrado."
                });

            }

            return res.status(200).json({
                success: true,
                message: "Perfil actualizado correctamente.",
                data: usuario
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    // ==========================================
    // Obtener usuario por ID
    // ==========================================
    async obtenerPorId(req, res) {

        try {

            const usuario = await User.findById(req.params.id)
                .select("-password");

            if (!usuario) {

                return res.status(404).json({
                    success: false,
                    message: "Usuario no encontrado."
                });

            }

            return res.status(200).json({
                success: true,
                data: usuario
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

    // ==========================================
    // Listar usuarios
    // ==========================================
    async listar(req, res) {

        try {

            const usuarios = await User.find()
                .select("-password")
                .sort({
                    createdAt: -1
                });

            return res.status(200).json({
                success: true,
                total: usuarios.length,
                data: usuarios
            });

        } catch (error) {

            return res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

}

module.exports = new UserController();