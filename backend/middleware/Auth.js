// ==========================================
// backend/middleware/auth.js
// Middleware de Autenticación JWT
// ==========================================

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Validar que exista el encabezado
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Acceso denegado. Token requerido."
            });
        }

        // Validar formato "Bearer <token>"
        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Formato del token inválido."
            });
        }

        const token = authHeader.replace("Bearer ", "").trim();

        // Verificar validez del token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Adjuntar usuario autenticado a la petición
        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Token inválido o expirado."
        });
    }
};