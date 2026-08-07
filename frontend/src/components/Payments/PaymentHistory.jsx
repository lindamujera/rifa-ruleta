// ==========================================
// src/components/payment/PaymentHistory.jsx
// ==========================================

import { useEffect, useState } from "react";

import paymentService from "../../services/paymentService";

import Loader from "../common/Loader";
import Alert from "../common/Alert";
import PaymentCard from "./PaymentCard";

import "./PaymentHistory.css";

function PaymentHistory({

    userId = null,

    onView = () => {},

    onUploadVoucher = () => {},

    onApprove = () => {},

    onReject = () => {}

}) {

    const [payments, setPayments] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    // ==========================================
    // Cargar historial
    // ==========================================

    useEffect(() => {

        loadPayments();

    }, [userId]);

    // ==========================================
    // Obtener pagos
    // ==========================================

    const loadPayments = async () => {

        try {

            setLoading(true);

            setError("");

            let response;

            if (userId) {

                response = await paymentService.getByUser(userId);

            } else {

                response = await paymentService.getHistory();

            }

            setPayments(

                response.data ||

                response ||

                []

            );

        } catch (err) {

            setError(

                err.response?.data?.message ||

                err.message ||

                "No fue posible cargar el historial de pagos."

            );

        } finally {

            setLoading(false);

        }

    };

    // ==========================================
    // Resumen
    // ==========================================

    const totalPagos = payments.length;

    const totalValor = payments.reduce(

        (total, payment) =>

            total + (payment.valor || 0),

        0

    );

    const pagosAprobados = payments.filter(

        (payment) =>

            payment.estado === "APROBADO"

    ).length;

    const pagosPendientes = payments.filter(

        (payment) =>

            payment.estado === "PENDIENTE"

    ).length;

    const pagosRechazados = payments.filter(

        (payment) =>

            payment.estado === "RECHAZADO"

    ).length;

    // ==========================================
    // Render
    // ==========================================

    if (loading) {

        return <Loader />;

    }

    return (

        <div className="payment-history">

            {/* ========================================== */}
            {/* Encabezado */}
            {/* ========================================== */}

            <div className="payment-history-header">

                <h2>

                    📄 Historial de Pagos

                </h2>

                <p>

                    Consulta todos los pagos registrados.

                </p>

            </div>

            {/* ========================================== */}
            {/* Error */}
            {/* ========================================== */}

            {

                error && (

                    <Alert

                        type="error"

                        message={error}

                    />

                )

            }

            {/* ========================================== */}
            {/* Resumen */}
            {/* ========================================== */}

            {

                payments.length > 0 && (

                    <div className="payment-history-summary">

                        <div className="summary-box">

                            <span>

                                Total Pagos

                            </span>

                            <strong>

                                {totalPagos}

                            </strong>

                        </div>

                        <div className="summary-box">

                            <span>

                                Valor Total

                            </span>

                            <strong>

                                $

                                {

                                    totalValor.toLocaleString(

                                        "es-CO"

                                    )

                                }

                            </strong>

                        </div>

                        <div className="summary-box approved">

                            <span>

                                Aprobados

                            </span>

                            <strong>

                                {pagosAprobados}

                            </strong>

                        </div>

                        <div className="summary-box pending">

                            <span>

                                Pendientes

                            </span>

                            <strong>

                                {pagosPendientes}

                            </strong>

                        </div>

                        <div className="summary-box rejected">

                            <span>

                                Rechazados

                            </span>

                            <strong>

                                {pagosRechazados}

                            </strong>

                        </div>

                    </div>

                )

            }

            {/* ========================================== */}
            {/* Sin registros */}
            {/* ========================================== */}

            {

                payments.length === 0 ? (

                    <Alert

                        type="info"

                        message="Todavía no existen pagos registrados."

                    />

                ) : (

                    <div className="payment-history-list">

                        {

                            payments.map((payment) => (

                                <PaymentCard

                                    key={payment._id}

                                    payment={payment}

                                    onView={onView}

                                    onUploadVoucher={onUploadVoucher}

                                    onApprove={onApprove}

                                    onReject={onReject}

                                />

                            ))

                        }

                    </div>

                )

            }

        </div>

    );

}

export default PaymentHistory;