// ==========================================
// src/components/admin/PaymentTable.jsx
// ==========================================

import { useEffect, useState } from "react";

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

  // ==========================================
  // Cargar todos los pagos
  // Pendientes + Aprobados + Rechazados
  // ==========================================

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      setLoading(true);
      setError("");

      // ======================================
      // Obtener los tres estados
      // ======================================

      const [
        pendientesResponse,
        aprobadosResponse,
        rechazadosResponse,
      ] = await Promise.all([
        paymentService.obtenerPendientes(),
        paymentService.obtenerAprobados(),
        paymentService.obtenerRechazados(),
      ]);

      // ======================================
      // Extraer información
      // ======================================

      const pendientes = pendientesResponse?.data?.data || [];
      const aprobados = aprobadosResponse?.data?.data || [];
      const rechazados = rechazadosResponse?.data?.data || [];

      // ======================================
      // Unificar todos los pagos
      // ======================================

      const todosLosPagos = [
        ...pendientes,
        ...aprobados,
        ...rechazados,
      ];

      // ======================================
      // Eliminar duplicados
      // ======================================

      const pagosUnicos = Array.from(
        new Map(
          todosLosPagos.map(
            (payment) => [payment._id, payment]
          )
        ).values()
      );

      // ======================================
      // Ordenar del más reciente al más antiguo
      // ======================================

      pagosUnicos.sort((a, b) => {
        const fechaA = new Date(
          a.createdAt || 0
        ).getTime();

        const fechaB = new Date(
          b.createdAt || 0
        ).getTime();

        return fechaB - fechaA;
      });

      // ======================================
      // Guardar pagos
      // ======================================

      setPayments(pagosUnicos);
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
      setError("");
      setSuccess("");

      // ======================================
      // Aprobar pago
      // ======================================

      const response =
        await paymentService.aprobarPago(
          paymentId
        );

      // ======================================
      // Obtener pago actualizado
      // ======================================

      const pagoActualizado =
        response?.data?.data?.pago;

      // ======================================
      // Actualizar inmediatamente la tabla
      // ======================================

      if (pagoActualizado) {
        setPayments((prevPayments) =>
          prevPayments.map((payment) =>
            payment._id === paymentId
              ? {
                  ...payment,
                  estado: "APROBADO",
                }
              : payment
          )
        );
      }

      setSuccess(
        "Pago aprobado correctamente."
      );

      // ======================================
      // Recargar todos los pagos
      // ======================================

      await loadPayments();
    } catch (err) {
      console.error(
        "Error aprobando pago:",
        err
      );

      setError(
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
      setError("");
      setSuccess("");

      // ======================================
      // Rechazar pago
      // ======================================

      await paymentService.rechazarPago(
        paymentId,
        "Pago rechazado por el administrador."
      );

      // ======================================
      // Actualizar inmediatamente
      // ======================================

      setPayments((prevPayments) =>
        prevPayments.map((payment) =>
          payment._id === paymentId
            ? {
                ...payment,
                estado: "RECHAZADO",
              }
            : payment
        )
      );

      setSuccess(
        "Pago rechazado correctamente."
      );

      // ======================================
      // Recargar información
      // ======================================

      await loadPayments();
    } catch (err) {
      console.error(
        "Error rechazando pago:",
        err
      );

      setError(
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

    const fecha = new Date(date);

    if (Number.isNaN(fecha.getTime())) {
      return "-";
    }

    return fecha.toLocaleString("es-CO");
  };

  // ==========================================
  // Clase del Estado
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
  // Obtener premio del giro
  // ==========================================

  const getPremioGiro = (payment) => {
    return (
      payment.spin?.premio ??
      0
    );
  };

  // ==========================================
  // Obtener premio mayor de la ronda
  // ==========================================

  const getPremioMayor = (payment) => {
    return (
      payment.ronda?.premioMayor ??
      0
    );
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
    <div className="payment-table-container">
      {/* ======================================
          ENCABEZADO
      ====================================== */}

      <h2>💳 Administración de Pagos</h2>

      {/* ======================================
          ERROR
      ====================================== */}

      {error && (
        <Alert type="error">
          {error}
        </Alert>
      )}

      {/* ======================================
          ÉXITO
      ====================================== */}

      {success && (
        <Alert type="success">
          {success}
        </Alert>
      )}

      {/* ======================================
          SIN PAGOS
      ====================================== */}

      {payments.length === 0 ? (
        <p>No hay pagos registrados.</p>
      ) : (
        /* ==================================
            TABLA
        ================================== */

        <div className="payment-table-wrapper">
          <table className="payment-table">
            {/* ==================================
                CABECERA
            ================================== */}

            <thead>
              <tr>
                <th>Usuario</th>
                <th>Correo</th>
                <th>Celular</th>
                <th>Referencia</th>
                <th>Valor</th>
                <th>Ticket</th>
                <th>Número</th>
                <th>Ronda</th>
                <th>Premio Giro</th>
                <th>Premio Mayor</th>
                <th>Fecha</th>
                <th>Comprobante</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            {/* ==================================
                CUERPO
            ================================== */}

            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id}>
                  {/* ==============================
                      Usuario
                  ============================== */}

                  <td>
                    {payment.usuario?.nombre || "-"}
                  </td>

                  {/* ==============================
                      Correo
                  ============================== */}

                  <td>
                    {payment.usuario?.correo || "-"}
                  </td>

                  {/* ==============================
                      Celular
                  ============================== */}

                  <td>
                    {payment.usuario?.celular || "-"}
                  </td>

                  {/* ==============================
                      Referencia
                  ============================== */}

                  <td>
                    {payment.referencia || "-"}
                  </td>

                  {/* ==============================
                      Valor
                  ============================== */}

                  <td>
                    $ {formatCurrency(payment.valor || 0)}
                  </td>

                  {/* ==============================
                      Ticket
                  ============================== */}

                  <td>
                    {payment.ticket?.codigo || "-"}
                  </td>

                  {/* ==============================
                      Número de Rifa
                  ============================== */}

                  <td>
                    {payment.ticket?.numeroRifa || "-"}
                  </td>

                  {/* ==============================
                      Ronda
                  ============================== */}

                  <td>
                    {payment.ronda?.numero ||
                      payment.ronda?.codigo ||
                      "-"}
                  </td>

                  {/* ==============================
                      Premio Giro (Ruleta)
                  ============================== */}

                  <td>
                    $ {formatCurrency(getPremioGiro(payment))}
                  </td>

                  {/* ==============================
                      Premio Mayor (Sorteo)
                  ============================== */}

                  <td>
                    $ {formatCurrency(getPremioMayor(payment))}
                  </td>

                  {/* ==============================
                      Fecha
                  ============================== */}

                  <td>
                    {formatDate(payment.createdAt)}
                  </td>

                  {/* ==============================
                      Comprobante
                  ============================== */}

                  <td>
                    {payment.comprobante ? (
                      <img
                        src={`http://localhost:5001/uploads/comprobantes/${payment.comprobante}`}
                        alt="Comprobante de pago"
                        width="120"
                        style={{
                          borderRadius: "10px",
                          cursor: "pointer",
                          objectFit: "cover",
                          transition: ".3s",
                        }}
                        onClick={() =>
                          window.open(
                            `http://localhost:5001/uploads/comprobantes/${payment.comprobante}`,
                            "_blank"
                          )
                        }
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform =
                            "scale(1.08)";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform =
                            "scale(1)";
                        }}
                      />
                    ) : (
                      <span>Sin comprobante</span>
                    )}
                  </td>

                  {/* ==============================
                      Estado
                  ============================== */}

                  <td>
                    <span
                      className={`payment-status ${getStatusClass(
                        payment.estado || "PENDIENTE"
                      )}`}
                    >
                      {payment.estado || "PENDIENTE"}
                    </span>
                  </td>

                  {/* ==============================
                      Acciones
                  ============================== */}

                  <td>
                    {payment.estado === "PENDIENTE" ? (
                      <>
                        {/* ==========================
                            APROBAR
                        ========================== */}

                        <Button
                          className="btn-approve"
                          disabled={
                            processingId === payment._id
                          }
                          onClick={() =>
                            approvePayment(payment._id)
                          }
                        >
                          {processingId === payment._id
                            ? "Procesando..."
                            : "Aprobar"}
                        </Button>

                        {/* ==========================
                            RECHAZAR
                        ========================== */}

                        <Button
                          className="btn-reject"
                          disabled={
                            processingId === payment._id
                          }
                          onClick={() =>
                            rejectPayment(payment._id)
                          }
                        >
                          {processingId === payment._id
                            ? "Procesando..."
                            : "Rechazar"}
                        </Button>
                      </>
                    ) : (
                      <span>✔ Procesado</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default PaymentTable; 