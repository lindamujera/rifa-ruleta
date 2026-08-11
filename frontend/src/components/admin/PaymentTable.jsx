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

            const response = await paymentService.obtenerPendientes();

            console.log("Respuesta backend pagos:", response.data);

            const data = response.data?.data || response.data || [];

            setPayments(Array.isArray(data) ? data : []);

        } catch (err) {

            console.error("Error cargando pagos:", err);

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

            const response = await paymentService.aprobarPago(paymentId);

            setSuccess("Pago aprobado correctamente.");

            const data = response?.data?.data;
            const spin = data?.spin;

            const spinId = data?.spinId || spin?.id || spin?._id;

            if (spinId) {
                navigate(`/roulette/${spinId}`);
                return;
            }

            await loadPayments();

        } catch (err) {

            console.error("Error aprobando pago:", err);

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

            await paymentService.rechazarPago(paymentId);

            setSuccess("Pago rechazado correctamente.");

            await loadPayments();

        } catch (err) {

            console.error("Error rechazando pago:", err);

            alert(
                err.response?.data?.message ||
                "No fue posible rechazar el pago."
            );

        } finally {
            setProcessingId(null);
        }
    };

    // ==========================================
    // Formatos y Utilidades
    // ==========================================

    const formatCurrency = (value = 0) => {
        return Number(value).toLocaleString("es-CO");
    };

    const formatDate = (date) => {
        if (!date) return "-";
        return new Date(date).toLocaleString("es-CO");
    };

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

    // 🟢 AQUÍ PEGAS ESTA VERSIÓN ACTUALIZADA PARA RENDER
    const getComprobanteUrl = (payment) => {
        const rawUrl = (
            payment.comprobanteUrl ||
            payment.comprobante ||
            payment.comprobante_url ||
            payment.proofUrl ||
            null
        );

        if (!rawUrl) return null;

        // 1. Si ya viene con https:// completa, se usa directo
        if (typeof rawUrl === "string" && rawUrl.startsWith("https://")) {
            return rawUrl;
        }

        // 2. Obtener URL base de la variable de entorno o Render
        const apiBase = import.meta.env.VITE_API_URL || "https://rifa-ruleta-backend.onrender.com";

        // 3. Limpiar '/api' del final y asegurar HTTPS
        const serverDomain = apiBase
            .replace(/\/api\/?$/, "")
            .replace(/\/$/, "")
            .replace("http://", "https://");

        // 4. Extraer el nombre del archivo (ej: 1786473273927-206378426.png)
        const fileName = rawUrl.split(/[/\\]/).pop();

        // 5. Retornar URL apuntando a la subcarpeta /uploads/comprobantes/ en Render
        return `${serverDomain}/uploads/comprobantes/${fileName}`;
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
                <h2>💳 Administración de Pagos</h2>
            </div>

            {error && <Alert type="error" message={error} />}

            {success && <Alert type="success" message={success} />}

            {payments.length === 0 ? (

                <Alert type="info" message="No existen pagos registrados." />

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
                        {payments.map((payment) => {
                            const proofUrl = getComprobanteUrl(payment);

                            return (
                                <tr key={payment._id || payment.id}>

                                    <td>{payment.usuario?.nombre || "-"}</td>

                                    <td>{payment.usuario?.correo || "-"}</td>

                                    <td>{payment.usuario?.celular || "-"}</td>

                                    <td>{payment.referencia || "-"}</td>

                                    <td>${formatCurrency(payment.valor || 0)}</td>

                                    <td>{payment.ticket?.codigo || "-"}</td>

                                    <td>
                                        {
                                            payment.ticket?.numeroRifa ||
                                            payment.ronda?.numero ||
                                            payment.ronda?.codigo ||
                                            "-"
                                        }
                                    </td>

                                    <td>
                                        {
                                            payment.ronda?.premio
                                                ? `$ ${formatCurrency(payment.ronda.premio)}`
                                                : "$ 0"
                                        }
                                    </td>

                                    <td>{formatDate(payment.createdAt)}</td>

                                    <td>
                                        {proofUrl ? (
                                            <a 
                                                href={proofUrl} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="payment-proof-link"
                                            >
                                                <img
                                                    src={proofUrl}
                                                    alt="Comprobante de pago"
                                                    className="payment-proof-thumb"
                                                    onError={(e) => {
                                                        console.error("Error cargando la imagen desde:", proofUrl);
                                                    }}
                                                />
                                            </a>
                                        ) : (
                                            <span className="no-proof-text">
                                                Sin comprobante
                                            </span>
                                        )}
                                    </td>

                                    <td>
                                        <span
                                            className={`payment-status ${getStatusClass(
                                                payment.estado || "PENDIENTE"
                                            )}`}
                                        >
                                            {payment.estado || "PENDIENTE"}
                                        </span>
                                    </td>

                                    <td>

                                        {payment.estado === "PENDIENTE" ? (

                                            <div className="payment-actions">

                                                <Button
                                                    className="btn-approve"
                                                    disabled={processingId === payment._id}
                                                    onClick={() => approvePayment(payment._id)}
                                                >
                                                    {processingId === payment._id
                                                        ? "Procesando..."
                                                        : "Aprobar"}
                                                </Button>

                                                <Button
                                                    className="btn-reject"
                                                    disabled={processingId === payment._id}
                                                    onClick={() => rejectPayment(payment._id)}
                                                >
                                                    {processingId === payment._id
                                                        ? "Procesando..."
                                                        : "Rechazar"}
                                                </Button>

                                            </div>

                                        ) : (

                                            <span>✔ Procesado</span>

                                        )}

                                    </td>

                                </tr>
                            );
                        })}
                    </tbody>

                </table>

            )}

        </section>
    );
}

export default PaymentTable;
