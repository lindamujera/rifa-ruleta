// ==========================================
// src/components/payment/PaymentStatus.jsx
// ==========================================

import Card from "../common/Card";

import "./PaymentStatus.css";

function PaymentStatus({ payment }) {

    if (!payment) {

        return null;

    }

    // ==========================================
    // Estado
    // ==========================================

    const status = (
        payment.estado ||
        "PENDIENTE"
    ).toUpperCase();

    // ==========================================
    // Configuración visual
    // ==========================================

    const statusConfig = {

        PENDIENTE: {

            icon: "🟡",

            title: "Pago Pendiente",

            message:
                "Tu pago fue registrado correctamente y está esperando la validación del administrador."

        },

        APROBADO: {

            icon: "✅",

            title: "Pago Aprobado",

            message:
                "Tu pago fue aprobado. Ya puedes participar en la ruleta y recibir tu ticket."

        },

        RECHAZADO: {

            icon: "❌",

            title: "Pago Rechazado",

            message:
                "El pago fue rechazado. Verifica la información o vuelve a subir el comprobante."

        },

        PROCESANDO: {

            icon: "⏳",

            title: "Pago en Proceso",

            message:
                "Estamos verificando tu pago. Este proceso puede tardar algunos minutos."

        }

    };

    const info =

        statusConfig[status] ||

        statusConfig.PENDIENTE;

    // ==========================================
    // Formateadores
    // ==========================================

    const formatCurrency = (value = 0) =>

        Number(value).toLocaleString("es-CO");

    const formatDate = (date) => {

        if (!date) {

            return "No disponible";

        }

        return new Date(date).toLocaleString("es-CO");

    };

    return (

        <Card className="payment-status-card">

            {/* ========================================== */}
            {/* Estado */}
            {/* ========================================== */}

            <div className="payment-status-header">

                <div className="payment-status-icon">

                    {info.icon}

                </div>

                <h2>

                    {info.title}

                </h2>

                <p>

                    {info.message}

                </p>

            </div>

            {/* ========================================== */}
            {/* Información */}
            {/* ========================================== */}

            <div className="payment-status-grid">

                <div className="status-item">

                    <span>

                        Código

                    </span>

                    <strong>

                        {payment.codigo}

                    </strong>

                </div>

                <div className="status-item">

                    <span>

                        Referencia

                    </span>

                    <strong>

                        {payment.referencia}

                    </strong>

                </div>

                <div className="status-item">

                    <span>

                        Valor

                    </span>

                    <strong>

                        $

                        {formatCurrency(

                            payment.valor

                        )}

                    </strong>

                </div>

                <div className="status-item">

                    <span>

                        Método

                    </span>

                    <strong>

                        {

                            payment.metodo ||

                            "Transferencia"

                        }

                    </strong>

                </div>

                <div className="status-item">

                    <span>

                        Estado

                    </span>

                    <strong>

                        {status}

                    </strong>

                </div>

            </div>
    </Card>
    );
}