// ==========================================
// backend/middleware/Upload.js
// Configuración de Multer para Comprobantes
// ==========================================

const multer = require("multer");
const path = require("path");
const fs = require("fs");

// ==========================================
// Carpeta de almacenamiento
// ==========================================

const uploadDir = path.join(
    __dirname,
    "..",
    "uploads",
    "comprobantes"
);

// ==========================================
// Crear carpeta si no existe
// ==========================================

if (!fs.existsSync(uploadDir)) {

    fs.mkdirSync(
        uploadDir,
        {
            recursive: true
        }
    );

}

// ==========================================
// Almacenamiento
// ==========================================

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(
            null,
            uploadDir
        );

    },

    filename: (req, file, cb) => {

        const extension =
            path.extname(
                file.originalname
            ).toLowerCase();

        const nombre =
            Date.now() +
            "-" +
            Math.round(
                Math.random() * 1e9
            ) +
            extension;

        cb(
            null,
            nombre
        );

    }

});

// ==========================================
// Filtro de archivos
// Solo imágenes
// ==========================================

const fileFilter = (
    req,
    file,
    cb
) => {

    const extensiones =
        /\.(jpg|jpeg|png|webp|heic|heif)$/i;

    const extensionValida =
        extensiones.test(
            file.originalname
        );

    const mimeValido =
        file.mimetype.startsWith(
            "image/"
        );

    if (
        extensionValida &&
        mimeValido
    ) {

        return cb(
            null,
            true
        );

    }

    cb(
        new Error(
            "Solo se permiten imágenes JPG, JPEG, PNG, WEBP, HEIC o HEIF."
        )
    );

};

// ==========================================
// Configuración final
// ==========================================

const upload = multer({

    storage,

    fileFilter,

    limits: {

        fileSize:
            10 * 1024 * 1024

    }

});

// ==========================================
// Exportar
// ==========================================

module.exports = upload;
