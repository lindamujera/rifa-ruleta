// ==========================================
// src/components/payment/PaymentCard.jsx
// ==========================================

import Card from "../common/Card";
import Button from "../common/Button";

import "./PaymentCard.css";

function PaymentCard({

    payment,

    onView = () => {},

    onUploadVoucher = () => {},

    onApprove = () => {},

    onReject = () => {}

}) {

    if (!payment) {

        return null;

    }

    // ==========================================
    // Formateadores
    // ==========================================

    const formatCurrency = (value = 0) =>

        Number(value).toLocaleString(

            "es-CO"

        );

    const formatDate = (date) => {

        if (!date) {

            return "No disponible";

        }

        return new Date(date).toLocaleString(

            "es-CO"

        );

    };

    const status = (

        payment.estado ||

        "PENDIENTE"

    ).toUpperCase();

    return (

        <Card className="payment-card">

            {/* ========================================== */}
            {/* Encabezado */}
            {/* ========================================== */}

            <div className="payment-header">

                <div>

                    <h2>

                        💳 Pago

                    </h2>

                    <p>

                        {payment.codigo}

                    </p>

                </div>

                <span

                    className={`payment-status ${status.toLowerCase()}`}

                >

                    {status}

                </span>

            </div>

            {/* ========================================== */}
            {/* Información */}
            {/* ========================================== */}

            <div className="payment-body">

                <div className="payment-row">

                    <span>

                        Referencia

                    </span>

                    <strong>

                        {payment.referencia}

                    </strong>

                </div>

                <div className="payment-row">

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

                <div className="payment-row">

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

                <div className="payment-row">

                    <span>

                        Fecha

                    </span>

                    <strong>

                        {

                            formatDate(

                                payment.createdAt

                            )

                        }

                    </strong>

                </div>

                <div className="payment-row">

                    <span>

                        Usuario

                    </span>

                    <strong>

                        {

                            payment.usuario?.nombre ||

                            payment.usuario?.nombres ||

                            "No disponible"

                        }

                    </strong>

                </div>

                <div className="payment-row">

                    <span>

                        Comprobante

                    </span>

                    <strong>

                        {

                            payment.comprobante

                                ? "Adjuntado"

                                : "Pendiente"

                        }

                    </strong>

                </div>

            </div>

            {/* ========================================== */}
            {/* Botones */}
            {/* ========================================== */}

            <div className="payment-footer">

                <Button

                    variant="secondary"

                    onClick={() =>

                        onView(payment)

                    }

                >

                    Ver Detalle

                </Button>

                {

                    !payment.comprobante && (

                        <Button

                            onClick={() =>

                                onUploadVoucher(

                                    payment

                                )

                            }

                        >

                            Subir Comprobante

                        </Button>

                    )

                }

                {

                    status === "PENDIENTE" && (

                        <>

                            <Button

                                variant="success"

                                onClick={() =>

                                    onApprove(

                                        payment

                                    )

                                }

                            >

                                Aprobar

                            </Button>

                            <Button

                                variant="danger"

                                onClick={() =>

                                    onReject(

                                        payment

                                    )

                                }

                            >

                                Rechazar

                            </Button>

                        </>

                    )

                }

            </div>

        </Card>

    );

}

export default PaymentCard;