// ==========================================
// src/components/payment/UploadVoucher.jsx
// ==========================================

import { useState } from "react";

import Button from "../common/Button";
import Card from "../common/Card";
import Alert from "../common/Alert";

import paymentService from "../../services/paymentService";

import "./UploadVoucher.css";

function UploadVoucher({

    paymentId,

    onSuccess = () => {},

    onCancel = () => {}

}) {

    const [file, setFile] = useState(null);

    const [preview, setPreview] = useState("");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    // ==========================================
    // Seleccionar archivo
    // ==========================================

    const handleFileChange = (event) => {

        const selectedFile = event.target.files[0];

        if (!selectedFile) {

            return;

        }

        // ==========================================
        // Validar tamaño
        // ==========================================

        if (selectedFile.size > 5 * 1024 * 1024) {

            setError(

                "El comprobante no puede superar los 5 MB."

            );

            return;

        }

        // ==========================================
        // Validar tipo (solo imágenes)
        // ==========================================

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/jpg",
            "image/webp"
        ];

        if (!allowedTypes.includes(selectedFile.type)) {
            setError("Solo se permiten imágenes JPG, PNG o WEBP.");
            return;
        }

        setError("");

        setFile(selectedFile);

        // ==========================================
        // Vista previa
        // ==========================================

        if (

            selectedFile.type.startsWith(

                "image"

            )

        ) {

            setPreview(

                URL.createObjectURL(

                    selectedFile

                )

            );

        } else {

            setPreview("");

        }

    };

    // ==========================================
    // Subir comprobante
    // ==========================================

    const handleUpload = async () => {

        if (!file) {

            setError(

                "Seleccione un comprobante."

            );

            return;

        }

        try {

            setLoading(true);

            setError("");

            setSuccess("");

            const formData = new FormData();

            formData.append(

                "voucher",

                file

            );

            const response =

                await paymentService.uploadVoucher(

                    paymentId,

                    formData

                );

            setSuccess(

                response.message ||

                "Comprobante cargado correctamente."

            );

            onSuccess(response);

        } catch (err) {

            setError(

                err.response?.data?.message ||

                err.message ||

                "No fue posible subir el comprobante."

            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <Card className="upload-voucher-card">

            <h2>

                📄 Subir Comprobante

            </h2>

            <p>

                Adjunta el comprobante del pago para que un administrador pueda validarlo.

            </p>

            {

                error && (

                    <Alert

                        type="error"

                        message={error}

                    />

                )

            }

            {

                success && (

                    <Alert

                        type="success"

                        message={success}

                    />

                )

            }

            {/* ========================================== */}
            {/* Seleccionar archivo */}
            {/* ========================================== */}

            <div className="voucher-upload">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </div>

            {/* ========================================== */}
            {/* Vista previa */}
            {/* ========================================== */}

            {

                preview && (

                    <div className="voucher-preview">

                        <img

                            src={preview}

                            alt="Comprobante"

                        />

                    </div>

                )

            }

            {/* No PDF preview: only images are allowed */}

            {/* ========================================== */}
            {/* Información */}
            {/* ========================================== */}

            {

                file && (

                    <div className="voucher-info">

                        <p>

                            <strong>

                                Archivo:

                            </strong>

                            {" "}

                            {file.name}

                        </p>

                        <p>

                            <strong>

                                Tamaño:

                            </strong>

                            {" "}

                            {

                                (

                                    file.size /

                                    1024

                                ).toFixed(2)

                            }

                            {" "}KB

                        </p>

                    </div>

                )

            }

            {/* ========================================== */}
            {/* Botones */}
            {/* ========================================== */}

            <div className="voucher-actions">

                <Button

                    variant="secondary"

                    onClick={onCancel}

                    disabled={loading}

                >

                    Cancelar

                </Button>

                <Button

                    onClick={handleUpload}

                    disabled={

                        loading ||

                        !file

                    }

                >

                    {

                        loading

                            ? "Subiendo..."

                            : "Subir Comprobante"

                    }

                </Button>

            </div>

        </Card>

    );

}

export default UploadVoucher;