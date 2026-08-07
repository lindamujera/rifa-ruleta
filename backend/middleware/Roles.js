// ==========================================
// middleware/roles.js
// Verifica los permisos por rol
// ==========================================

module.exports = (...rolesPermitidos) => {

    return (req, res, next) => {

        // Verificar que exista un usuario autenticado
        if (!req.user) {

            return res.status(401).json({
                success: false,
                message: "Usuario no autenticado."
            });

        }

        // Verificar permisos
        if (!rolesPermitidos.includes(req.user.rol)) {

            return res.status(403).json({
                success: false,
                message: "No tienes permisos para realizar esta acción."
            });

        }

        next();

    };

};