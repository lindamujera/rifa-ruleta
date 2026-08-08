// ==========================================
// middleware/upload.js
// Configuración de Multer para Comprobantes
// ==========================================

const multer = require("multer");
const path = require("path");
const fs = require("fs"); // 👈 Importamos el módulo de sistema de archivos

// ==========================================
// Almacenamiento
// ==========================================

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = "uploads/comprobantes";

        // 💡 Verificar y crear la carpeta si no existe en Render
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, dir);
    },

    filename: (req, file, cb) => {
        const nombre =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9) +
            path.extname(file.originalname).toLowerCase();

        cb(null, nombre);
    }
});

// ==========================================
// Filtro de archivos (Solo imágenes)
// ==========================================

const fileFilter = (req, file, cb) => {
    // Expresión regular para extensiones
    const extensiones = /jpg|jpeg|png|webp|heic|heif/;

    // Validar extensión del nombre del archivo
    const extensionValida = extensiones.test(
        path.extname(file.originalname).toLowerCase()
    );

    // Validar que el tipo MIME sea de imagen (ej: "image/jpeg", "image/png", etc.)
    const mimeValido = file.mimetype.startsWith("image/") || extensiones.test(file.mimetype);

    if (extensionValida || mimeValido) {
        return cb(null, true);
    }

    cb(new Error("Solo se permiten imágenes (JPG, JPEG, PNG, WEBP o HEIC)."));
};

// ==========================================
// Configuración final
// ==========================================

module.exports = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // Subido a 10MB para fotos de cámaras móviles
    }
});
