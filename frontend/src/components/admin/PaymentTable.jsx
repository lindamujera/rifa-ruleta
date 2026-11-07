import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import paymentService from "../../services/paymentService";

import Loader from "../common/Loader";
import Alert from "../common/Alert";
import Button from "../common/Button";

import "./PaymentTable.css";

function PaymentTable() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [processingId, setProcessingId] = useState(null);

    const navigate = useNavigate();

    // URL del backend publicado
    const API_BASE_URL = (
        import.meta.env.VITE_API_URL ||
        "https://rifa-ruleta-backend.onrender.com/api"
    )
        .replace(/\/api\/?$/, "")
        .replace(/\/$/, "");

    // ==========================================
    // CARGAR PAGOS
    // ==========================================

    useEffect(() => {
        loadPayments();
    }, []);

    const loadPayments = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await paymentService.obtenerTodos();

            const data = response?.data?.data || [];

            const pagosOrdenados = [...data].sort(
                (a, b) =>
                    new Date(b.createdAt || 0) -
                    new Date(a.createdAt || 0)
            );

            setPayments(pagosOrdenados);

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
    // APROBAR PAGO
    // ==========================================

    const approvePayment = async (paymentId) => {
        try {
            setProcessingId(paymentId);
            setError("");
            setSuccess("");

            const response =
                await paymentService.aprobarPago(paymentId);

            setSuccess("Pago aprobado correctamente.");

            const data = response?.data?.data;
            const spinId =
                data?.spinId ||
                data?.spin?._id ||
                data?.spin?.id;

            if (spinId) {
                navigate(`/roulette/${spinId}`);
                return;
            }

            await loadPayments();

        } catch (err) {
            console.error("Error aprobando pago:", err);

            setError(
                err.response?.data?.message ||
                "No fue posible aprobar el pago."
            );
        } finally {
            setProcessingId(null);
        }
    };

    // ==========================================
    // RECHAZAR PAGO
    // ==========================================

    const rejectPayment = async (paymentId) => {
        try {
            setProcessingId(paymentId);
            setError("");
            setSuccess("");

            await paymentService.rechazarPago(
                paymentId,
                "Pago rechazado por el administrador."
            );

            setSuccess("Pago rechazado correctamente.");

            await loadPayments();

        } catch (err) {
            console.error("Error rechazando pago:", err);

            setError(
                err.response?.data?.message ||
                "No fue posible rechazar el pago."
            );
        } finally {
            setProcessingId(null);
        }
    };

    // ==========================================
    // FORMATO MONEDA
    // ==========================================

    const formatCurrency = (value) => {
        const amount = Number(value);

        if (!Number.isFinite(amount)) return "0";

        return amount.toLocaleString("es-CO");
    };

    // ==========================================
    // FORMATO FECHA
    // ==========================================

    const formatDate = (date) => {
        if (!date) return "-";

        const fecha = new Date(date);

        if (Number.isNaN(fecha.getTime())) return "-";

        return fecha.toLocaleString("es-CO");
    };

    // ==========================================
    // ESTADO DEL PAGO
    // ==========================================

    const getStatusClass = (status = "") => {
        switch (String(status).toLowerCase()) {
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
    // URL DEL COMPROBANTE
    // ==========================================

    const getComprobanteUrl = (payment) => {
        const rawUrl =
            payment.comprobanteUrl ||
            payment.comprobante_url ||
            payment.proofUrl ||
            payment.comprobante;

        if (!rawUrl) return null;

        if (typeof rawUrl !== "string") return null;

        const value = rawUrl.trim();

        if (!value) return null;

        // URL completa
        if (/^https?:\/\//i.test(value)) {
            return value;
        }

        // Ruta relativa del archivo
        if (value.startsWith("/")) {
            return `${API_BASE_URL}${value}`;
        }

        // Si solo viene el nombre del archivo
        const fileName = value.split(/[/\\]/).pop();

        return `${API_BASE_URL}/uploads/comprobantes/${encodeURIComponent(fileName)}`;
    };

    // ==========================================
    // PREMIO DE LA RULETA
    // ==========================================

    const getPremioGiro = (payment) => {
        return (
            payment.spin?.premio ??
            payment.ticket?.premioRuleta ??
            payment.premioRuleta ??
            payment.premio ??
            null
        );
    };

    // ==========================================
    // PREMIO MAYOR
    // ==========================================

    const getPremioMayor = (payment) => {
        return (
            payment.ronda?.premioMayor ??
            payment.ronda?.premioAcumulado ??
            null
        );
    };

    // ==========================================
    // CANTIDAD DE TICKETS
    // ==========================================

    const getTickets = (payment) => {
        return (
            payment.usuario?.ticketsComprados ??
            payment.totalTickets ??
            (payment.ticket ? 1 : 0)
        );
    };

    // ==========================================
    // TOTAL PAGADO
    // ==========================================

    const getTotalPagado = (payment) => {
        return (
            payment.usuario?.totalPagado ??
            payment.totalPagado ??
            payment.valor ??
            0
        );
    };

    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return <Loader />;
    }

    // ==========================================
    // TABLA ADMINISTRACIÓN DE PAGOS
    // ==========================================

    return (
        <section className="payment-table-container">

            <div className="payment-table-header">
                <h2>💳 Administración de Pagos</h2>

                <Button onClick={loadPayments}>
                    Actualizar
                </Button>
            </div>

            {error && (
                <Alert type="error" message={error} />
            )}

            {success && (
                <Alert type="success" message={success} />
            )}

            {payments.length === 0 ? (

                <Alert
                    type="info"
                    message="No existen pagos registrados."
                />

            ) : (

                <div className="payment-table-wrapper">

                    <table className="payment-table">

                        <thead>
                            <tr>
                                <th>Usuario</th>
                                <th>Correo</th>
                                <th>Celular</th>
                                <th>Rol</th>
                                <th>Estado usuario</th>
                                <th>Tickets</th>
                                <th>Total pagado</th>
                                <th>Referencia</th>
                                <th>Valor</th>
                                <th>Ticket</th>
                                <th>Número</th>
                                <th>Ronda</th>
                                <th>Premio giro</th>
                                <th>Premio mayor</th>
                                <th>Fecha</th>
                                <th>Comprobante</th>
                                <th>Estado pago</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>

                        <tbody>

                            {payments.map((payment) => {
                                const paymentId =
                                    payment._id || payment.id;

                                const proofUrl =
                                    getComprobanteUrl(payment);

                                const premioGiro =
                                    getPremioGiro(payment);

                                const premioMayor =
                                    getPremioMayor(payment);

                                return (
                                    <tr key={paymentId}>

                                        <td>
                                            {payment.usuario?.nombre || "-"}
                                        </td>

                                        <td>
                                            {payment.usuario?.correo || "-"}
                                        </td>

                                        <td>
                                            {payment.usuario?.celular || "-"}
                                        </td>

                                        <td>
                                            {payment.usuario?.rol || "-"}
                                        </td>

                                        <td>
                                            <span className="user-status">
                                                {payment.usuario?.estado || "-"}
                                            </span>
                                        </td>

                                        <td>
                                            {getTickets(payment)}
                                        </td>

                                        <td>
                                            $ {formatCurrency(
                                                getTotalPagado(payment)
                                            )}
                                        </td>

                                        <td>
                                            {payment.referencia || "-"}
                                        </td>

                                        <td>
                                            $ {formatCurrency(payment.valor)}
                                        </td>

                                        <td>
                                            {payment.ticket?.codigo || "-"}
                                        </td>

                                        <td>
                                            {payment.ticket?.numeroRifa
                                                ? String(
                                                    payment.ticket.numeroRifa
                                                ).padStart(3, "0")
                                                : "-"}
                                        </td>

                                        <td>
                                            {payment.ronda?.numero ||
                                                payment.ronda?.codigo ||
                                                "-"}
                                        </td>

                                        <td>
                                            {premioGiro !== null
                                                ? `$ ${formatCurrency(premioGiro)}`
                                                : "Pendiente de giro"}
                                        </td>

                                        <td>
                                            {premioMayor !== null
                                                ? `$ ${formatCurrency(premioMayor)}`
                                                : "-"}
                                        </td>

                                        <td>
                                            {formatDate(payment.createdAt)}
                                        </td>

                                        {/* COMPROBANTE */}

                                        <td className="payment-proof-cell">

                                            {proofUrl ? (

                                                <a
                                                    href={proofUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="payment-proof-link"
                                                    title="Abrir comprobante completo"
                                                >

                                                    <img
                                                        src={proofUrl}
                                                        alt="Comprobante de pago"
                                                        className="payment-proof-thumb"
                                                        loading="lazy"
                                                        onError={(e) => {
                                                            e.currentTarget.style.display = "none";

                                                            const message =
                                                                e.currentTarget.parentElement
                                                                    ?.querySelector(".proof-error");

                                                            if (message) {
                                                                message.style.display = "inline";
                                                            }
                                                        }}
                                                    />

                                                    <span className="proof-error">
                                                        Imagen no disponible
                                                    </span>

                                                    <span className="proof-open">
                                                        Ver comprobante
                                                    </span>

                                                </a>

                                            ) : (

                                                <span className="no-proof-text">
                                                    Sin comprobante
                                                </span>

                                            )}

                                        </td>

                                        {/* ESTADO PAGO */}

                                        <td>
                                            <span
                                                className={`payment-status ${getStatusClass(
                                                    payment.estado
                                                )}`}
                                            >
                                                {payment.estado || "PENDIENTE"}
                                            </span>
                                        </td>

                                        {/* ACCIONES */}

                                        <td>

                                            {String(payment.estado).toUpperCase() ===
                                            "PENDIENTE" ? (

                                                <div className="payment-actions">

                                                    <Button
                                                        className="btn-approve"
                                                        disabled={
                                                            processingId === paymentId
                                                        }
                                                        onClick={() =>
                                                            approvePayment(paymentId)
                                                        }
                                                    >
                                                        {processingId === paymentId
                                                            ? "Procesando..."
                                                            : "Aprobar"}
                                                    </Button>

                                                    <Button
                                                        className="btn-reject"
                                                        disabled={
                                                            processingId === paymentId
                                                        }
                                                        onClick={() =>
                                                            rejectPayment(paymentId)
                                                        }
                                                    >
                                                        {processingId === paymentId
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

                </div>

            )}

        </section>
    );
}

export default PaymentTable;
