// ==========================================
// src/components/admin/PaymentTable.jsx
// ==========================================

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import paymentService from "../../services/paymentService";

import Loader from "../common/Loader";
import Alert from "../common/Alert";
import Button from "../common/Button";

import "./PaymentTable.css";

function PaymentTable() {

    // ==========================================
    // Estados
    // ==========================================

    const [payments, setPayments] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    const [processingId, setProcessingId] = useState(null);

    const navigate = useNavigate();

    // ==========================================
    // Cargar Pagos
    // ==========================================

    useEffect(() => {

        loadPayments();

    }, []);

    const loadPayments = async () => {

        try {

            setLoading(true);

            setError("");

            setSuccess("");

            const response =
                await paymentService.obtenerPendientes();

            const data =
                response.data?.data || [];

            setPayments(data);

        } catch (err) {

            console.error(
                "Error cargando pagos:",
                err
            );

            setError(

                err.response?.data?.message ||

                "No fue posible cargar los pagos."

            );

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Aprobar Pago
    // ==========================================

    const approvePayment = async (paymentId) => {

        try {

            setProcessingId(paymentId);

            const response =
                await paymentService.aprobarPago(
                    paymentId
                );

            setSuccess(
                "Pago aprobado correctamente."
            );

            // ==========================================
            // Obtener Spin
            // ==========================================

            const data =
                response?.data?.data;

            const spin =
                data?.spin;

            const spinId =
                data?.spinId ||
                spin?.id ||
                spin?._id;

            // ==========================================
            // Redirigir a la ruleta
            // ==========================================

            if (spinId) {

                navigate(
                    `/roulette/${spinId}`
                );

                return;

            }

            // ==========================================
            // Recargar pagos
            // ==========================================

            await loadPayments();

        } catch (err) {

            console.error(
                "Error aprobando pago:",
                err
            );

            alert(

                err.response?.data?.message ||

                "No fue posible aprobar el pago."

            );

        } finally {

            setProcessingId(null);

        }

    };

    // ==========================================
    // Rechazar Pago
    // ==========================================

    const rejectPayment = async (paymentId) => {

        try {

            setProcessingId(paymentId);

            await paymentService.rechazarPago(
                paymentId
            );

            setSuccess(
                "Pago rechazado correctamente."
            );

            await loadPayments();

        } catch (err) {

            console.error(
                "Error rechazando pago:",
                err
            );

            alert(

                err.response?.data?.message ||

                "No fue posible rechazar el pago."

            );

        } finally {

            setProcessingId(null);

        }

    };

    // ==========================================
    // Formato Moneda
    // ==========================================

    const formatCurrency = (value = 0) => {

        return Number(value).toLocaleString(
            "es-CO"
        );

    };

    // ==========================================
    // Formato Fecha
    // ==========================================

    const formatDate = (date) => {

        if (!date) {

            return "-";

        }

        return new Date(date).toLocaleString(
            "es-CO"
        );

    };

    // ==========================================
    // Estado
    // ==========================================

    const getStatusClass = (status = "") => {

        switch (status.toLowerCase()) {

            case "approved":

            case "aprobado":

                return "approved";

            case "pending":

            case "pendiente":

                return "pending";

            case "rejected":

            case "rechazado":

                return "rejected";

            default:

                return "processing";

        }

    };

    // ==========================================
    // Loading
    // ==========================================

    if (loading) {

        return <Loader />;

    }

    // ==========================================
    // Render
    // ==========================================

    return (

        <section className="payment-table-container">

            <div className="payment-table-header">

                <h2>
                    💳 Administración de Pagos
                </h2>

            </div>

            {/* ==========================================
                Mensaje de Error
                ========================================== */}

            {

                error && (

                    <Alert
                        type="error"
                        message={error}
                    />

                )

            }

            {/* ==========================================
                Mensaje de Éxito
                ========================================== */}

            {

                success && (

                    <Alert
                        type="success"
                        message={success}
                    />

                )

            }

            {/* ==========================================
                Tabla
                ========================================== */}

            {

                payments.length === 0 ? (

                    <Alert
                        type="info"
                        message="No existen pagos registrados."
                    />

                ) : (

                    <table className="payment-table">

                        <thead>

                            <tr>

                                <th>Usuario</th>

                                <th>Correo</th>

                                <th>Celular</th>

                                <th>Referencia</th>

                                <th>Valor</th>

                                <th>Ticket</th>

                                <th>Ronda</th>

                                <th>Premio</th>

                                <th>Fecha</th>

                                <th>Comprobante</th>

                                <th>Estado</th>

                                <th>Acciones</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                payments.map(
                                    (payment) => (

                                        <tr
                                            key={
                                                payment._id
                                            }
                                        >

                                            {/* ==========================================
                                                Usuario
                                                ========================================== */}

                                            <td>

                                                {

                                                    payment.usuario?.nombre ||

                                                    "-"

                                                }

                                            </td>

                                            {/* ==========================================
                                                Correo
                                                ========================================== */}

                                            <td>

                                                {

                                                    payment.usuario?.correo ||

                                                    "-"

                                                }

                                            </td>

                                            {/* ==========================================
                                                Celular
                                                ========================================== */}

                                            <td>

                                                {

                                                    payment.usuario?.celular ||

                                                    "-"

                                                }

                                            </td>

                                            {/* ==========================================
                                                Referencia
                                                ========================================== */}

                                            <td>

                                                {

                                                    payment.referencia ||

                                                    "-"

                                                }

                                            </td>

                                            {/* ==========================================
                                                Valor
                                                ========================================== */}

                                            <td>

                                                $

                                                {

                                                    formatCurrency(
                                                        payment.valor ||
                                                        0
                                                    )

                                                }

                                            </td>

                                            {/* ==========================================
                                                Ticket
                                                ========================================== */}

                                            <td>

                                                {

                                                    payment.ticket?.codigo ||

                                                    "-"

                                                }

                                            </td>

                                            {/* ==========================================
                                                Ronda / Número de Rifa
                                                ========================================== */}

                                            <td>

                                                {

                                                    payment.ticket?.numeroRifa ||

                                                    payment.ronda?.numero ||

                                                    payment.ronda?.codigo ||

                                                    "-"

                                                }

                                            </td>

                                            {/* ==========================================
                                                Premio de la Ronda
                                                ========================================== */}

                                            <td>

                                                {

                                                    payment.ronda?.premio

                                                        ? `$ ${formatCurrency(
                                                            payment.ronda.premio
                                                        )}`

                                                        : "$ 0"

                                                }

                                            </td>

                                            {/* ==========================================
                                                Fecha
                                                ========================================== */}

                                            <td>

                                                {

                                                    formatDate(
                                                        payment.createdAt
                                                    )

                                                }

                                            </td>

                                            {/* ==========================================
                                                Comprobante
                                                ========================================== */}

                                            <td>

                                                {

                                                    payment.comprobanteUrl ? (

                                                        <img
                                                            src={
                                                                payment.comprobanteUrl
                                                            }
                                                            alt="Comprobante de pago"
                                                            width="120"
                                                            style={{
                                                                borderRadius:
                                                                    "10px",

                                                                cursor:
                                                                    "pointer",

                                                                objectFit:
                                                                    "cover",

                                                                transition:
                                                                    ".3s"
                                                            }}

                                                            onClick={() =>
                                                                window.open(
                                                                    payment.comprobanteUrl,
                                                                    "_blank"
                                                                )
                                                            }

                                                            onMouseOver={(e) => {

                                                                e.target.style.transform =
                                                                    "scale(1.08)";

                                                            }}

                                                            onMouseOut={(e) => {

                                                                e.target.style.transform =
                                                                    "scale(1)";

                                                            }}

                                                        />

                                                    ) : (

                                                        <span>

                                                            Sin comprobante

                                                        </span>

                                                    )

                                                }

                                            </td>

                                            {/* ==========================================
                                                Estado
                                                ========================================== */}

                                            <td>

                                                <span

                                                    className={
                                                        `payment-status ${
                                                            getStatusClass(
                                                                payment.estado ||
                                                                "PENDIENTE"
                                                            )
                                                        }`
                                                    }

                                                >

                                                    {

                                                        payment.estado ||

                                                        "PENDIENTE"

                                                    }

                                                </span>

                                            </td>

                                            {/* ==========================================
                                                Acciones
                                                ========================================== */}

                                            <td>

                                                {

                                                    payment.estado ===
                                                    "PENDIENTE"

                                                        ? (

                                                            <div className="payment-actions">

                                                                {/* Aprobar */}

                                                                <Button

                                                                    className="btn-approve"

                                                                    disabled={
                                                                        processingId ===
                                                                        payment._id
                                                                    }

                                                                    onClick={() =>
                                                                        approvePayment(
                                                                            payment._id
                                                                        )
                                                                    }

                                                                >

                                                                    {

                                                                        processingId ===
                                                                        payment._id

                                                                            ? "Procesando..."

                                                                            : "Aprobar"

                                                                    }

                                                                </Button>

                                                                {/* Rechazar */}

                                                                <Button

                                                                    className="btn-reject"

                                                                    disabled={
                                                                        processingId ===
                                                                        payment._id
                                                                    }

                                                                    onClick={() =>
                                                                        rejectPayment(
                                                                            payment._id
                                                                        )
                                                                    }

                                                                >

                                                                    {

                                                                        processingId ===
                                                                        payment._id

                                                                            ? "Procesando..."

                                                                            : "Rechazar"

                                                                    }

                                                                </Button>

                                                            </div>

                                                        )

                                                        : (

                                                            <span>

                                                                ✔ Procesado

                                                            </span>

                                                        )

                                                }

                                            </td>

                                        </tr>

                                    )
                                )

                            }

                        </tbody>

                    </table>

                )

            }

        </section>

    );

}

export default PaymentTable;
