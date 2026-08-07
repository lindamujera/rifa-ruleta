// ==========================================
// src/pages/Payments.jsx
// ==========================================

import { useContext, useEffect, useState, useRef } from "react";
import AuthContext from "../context/AuthContext";
import PaymentService from "../services/paymentService";
import { FaCreditCard } from "react-icons/fa";
import Swal from "sweetalert2";
import "../styles/Payments.css";

export default function Payments() {

    // ==========================================
    // CONTEXTO
    // ==========================================

    const { user } = useContext(AuthContext);

    // ==========================================
    // REFERENCIAS
    // ==========================================

    const fileInputRef = useRef(null);

    // ==========================================
    // ESTADOS
    // ==========================================

    const [metodo, setMetodo] = useState("NEQUI");

    const valor = 25000;

    const [comprobante, setComprobante] = useState(null);

    const [preview, setPreview] = useState(null);

    const [ultimoPago, setUltimoPago] = useState(null);

    const [historial, setHistorial] = useState([]);

    const [loading, setLoading] = useState(true);

    const [successMessage, setSuccessMessage] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const [keyInput, setKeyInput] = useState(Date.now());

    // ==========================================
    // AL CARGAR LA PÁGINA
    // ==========================================

    useEffect(() => {

        cargarPagos();

    }, []);

    // ==========================================
    // CARGAR PAGOS
    // ==========================================

    const cargarPagos = async () => {

        try {

            const response = await PaymentService.obtenerMisPagos();

            if (response.data.success) {

                setHistorial(response.data.data);

                if (response.data.data.length > 0) {

                    setUltimoPago(response.data.data[0]);

                }

            }

        } catch (error) {

            console.error(error);

        }

    };

    // ==========================================
    // SELECCIONAR COMPROBANTE
    // ==========================================

    const seleccionarArchivo = (e) => {

        const archivo = e.target.files[0];

        if (!archivo) return;

        setComprobante(archivo);

        setPreview(

            URL.createObjectURL(archivo)

        );

    };

    // ==========================================
    // REGISTRAR PAGO (Con SweetAlert2)
    // ==========================================

    const registrarPago = async (e) => {
        e.preventDefault();

        try {
            setErrorMessage("");
            setSuccessMessage("");

            const formData = new FormData();
            formData.append("metodoPago", metodo);
            formData.append("valor", valor);

            if (comprobante) {
                formData.append("comprobante", comprobante);
            }

            const response = await PaymentService.crearPago(formData);

            console.log("Respuesta del servidor al registrar pago:", response);

            // Validamos tanto response.success como response.data.success o status 200/201
            const esExitoso = response?.success || response?.data?.success || response?.status === 200 || response?.status === 201;

            if (esExitoso) {
                // 1. Limpiar estados de imagen e inputs de inmediato
                setComprobante(null);
                setPreview(null);
                setKeyInput(Date.now());

                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }

                // 2. Mostrar alerta emergente de éxito
                Swal.fire({
                    icon: "success",
                    title: "¡Pago realizado exitosamente!",
                    text: "Tu comprobante fue enviado a revisión. Tu ticket se activará cuando el administrador lo apruebe.",
                    confirmButtonColor: "#2563eb",
                    confirmButtonText: "Entendido"
                });

                // 3. Mensaje en pantalla opcional
                setSuccessMessage("✅ Pago registrado y en proceso de verificación.");

                // 4. Recargar el historial y estado de pagos
                await cargarPagos();
            } else {
                // Si la API responde OK pero el flag interno success viene false
                const msg = response?.data?.message || response?.message || "Ocurrió un problema al procesar el pago.";
                setErrorMessage(msg);
                Swal.fire({
                    icon: "warning",
                    title: "Atención",
                    text: msg,
                    confirmButtonColor: "#f59e0b"
                });
            }

        } catch (error) {
            console.error("Error al registrar pago:", error);

            const mensajeError =
                error.response?.data?.message ||
                error.message ||
                "No fue posible registrar el pago.";

            setErrorMessage(mensajeError);

            Swal.fire({
                icon: "error",
                title: "Error al registrar el pago",
                text: mensajeError,
                confirmButtonColor: "#ef4444"
            });
        }
    };
    // ==========================================
    // RENDER
    // ==========================================

    return (

        <div className="payments-page">

            {/* ========================================== */}
            {/* HEADER */}
            {/* ========================================== */}

            <section className="payments-header">

                <div className="payments-icon">

                    <FaCreditCard className="info-icon" />

                </div>

                <div className="payments-content">

                    <h1>

                        Pagos

                    </h1>

                    <p>

                        Registra tu pago para obtener tu Ticket,
                        participar en la Ruleta y concursar por el
                        Premio Mayor de

                        <strong>

                            {" "} $1.000.000 COP

                        </strong>

                    </p>

                </div>

                {

                    user && (

                        <div className="payment-user-info">

                            <p>

                                <strong>

                                    Usuario:

                                </strong>

                                {" "}

                                {user.nombre}

                            </p>

                            <p>

                                <strong>

                                    Correo:

                                </strong>

                                {" "}

                                {user.correo}

                            </p>

                        </div>

                    )

                }

            </section>

            {/* ========================================== */}
            {/* MENSAJES */}
            {/* ========================================== */}

            {
                successMessage && (
                    <div className="payment-success">
                        {successMessage}
                    </div>
                )
            }

            {
                errorMessage && (
                    <div className="payment-error">
                        {errorMessage}
                    </div>
                )
            }

            {/* ========================================== */}
            {/* RESUMEN */}
            {/* ========================================== */}

            <section className="payments-summary">

                <div className="summary-card">

                    <h3>

                        Valor

                    </h3>

                    <h2>

                        $

                        {valor.toLocaleString("es-CO")}

                    </h2>

                </div>

                <div className="summary-card">

                    <h3>

                        Método

                    </h3>

                    <h2>

                        {metodo}

                    </h2>

                </div>

                <div className="summary-card">

                    <h3>

                        Último Estado

                    </h3>

                    <span

                        className={`status ${ultimoPago?.estado?.toLowerCase() || "pending"}`}

                    >

                        {

                            ultimoPago?.estado ||

                            "SIN PAGOS"

                        }

                    </span>

                </div>

                <div className="summary-card">

                    <h3>

                        Historial

                    </h3>

                    <h2>

                        {historial.length}

                    </h2>

                </div>

            </section>

            {/* ========================================== */}
            {/* FORMULARIO */}
            {/* ========================================== */}

            <section className="payment-card">

                <h2>

                    Registrar Pago

                </h2>

                <form

                    onSubmit={registrarPago}

                >

                    <div className="form-group">

                        <label>

                            Método de Pago

                        </label>

                        <select

                            value={metodo}

                            onChange={(e) =>

                                setMetodo(

                                    e.target.value

                                )

                            }

                        >

                            <option value="NEQUI">

                                Nequi

                            </option>
                            
                            
                            <option value="DAVIPLATA">

                                Daviplata

                            </option>

                        </select>

                    </div>

                    <div className="form-group">

                        <label>

                            Valor

                        </label>

                        <input

                            type="number"

                            value={valor}

                            disabled

                        />

                        {/* ========================================== */}
                        {/* INFORMACIÓN DE PAGO */}
                        {/* ========================================== */}

                        <details className="payment-info-card">

                            <summary>

                                ¿Dónde realizar el pago?

                            </summary>

                            <div className="payment-info-content">

                                <div className="payment-number">

                                    <span>Nequi</span>

                                    <h2>315 501 2850</h2>

                                </div>

                                <p>

                                    Realiza una transferencia por

                                    <strong> $25.000 COP </strong>

                                    al número anterior.

                                </p>

                                <p>

                                    Después de realizar el pago,

                                    adjunta el comprobante en el campo inferior.

                                </p>

                                <div className="payment-note">

                                    ⚠️ Tu Ticket será generado únicamente cuando el administrador apruebe el pago.

                                </div>

                            </div>

                        </details>

                    </div>

                    <div className="form-group">

                        <label>

                            Comprobante

                        </label>

                        <input

                            key={keyInput}

                            ref={fileInputRef}

                            type="file"

                            accept="image/*"

                            onChange={seleccionarArchivo}

                        />

                    </div>

                    {

                        preview && (

                            <div className="preview">

                                <img

                                    src={preview}

                                    alt="Comprobante"

                                />

                            </div>

                        )

                    }

                    <button

                        type="submit"

                        className="btn-payment"

                    >

                        Registrar Pago

                    </button>

                </form>

            </section>

            {/* ========================================== */}
            {/* ÚLTIMO PAGO */}
            {/* ========================================== */}

            <div className="payment-status">

                <h2>Último Pago</h2>

                {

                    ultimoPago ? (

                        <div className="status-box">

                            <p>

                                <strong>Código:</strong>

                                {ultimoPago.codigo}

                            </p>

                            <p>

                                <strong>Referencia:</strong>

                                {ultimoPago.referencia}

                            </p>

                            <p>

                                <strong>Estado:</strong>

                                <span
                                    className={`status ${ultimoPago.estado.toLowerCase()}`}
                                >
                                    {ultimoPago.estado}
                                </span>

                            </p>

                            <p>

                                <strong>Valor:</strong>

                                ${Number(ultimoPago.valor).toLocaleString("es-CO")}

                            </p>

                            <p>

                                <strong>Método:</strong>

                                {ultimoPago.metodoPago}

                            </p>

                            <p>

                                <strong>Fecha:</strong>

                                {new Date(
                                    ultimoPago.createdAt
                                ).toLocaleString("es-CO")}

                            </p>

                        </div>

                    ) : (

                        <div className="status-box">

                            <p>

                                Aún no tienes pagos registrados.

                            </p>

                        </div>

                    )

                }

            </div>

            {/* ========================================== */}
            {/* HISTORIAL */}
            {/* ========================================== */}

            <section className="payment-history">

                <h2>

                    Historial de Pagos

                </h2>

                <table>

                    <thead>

                        <tr>

                            <th>

                                Código

                            </th>

                            <th>

                                Referencia

                            </th>

                            <th>

                                Método

                            </th>

                            <th>

                                Valor

                            </th>

                            <th>

                                Estado

                            </th>

                            <th>

                                Fecha

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            historial.length > 0 ?

                            (

                                historial.map((item)=>(

                                    <tr

                                        key={item._id}

                                    >

                                        <td>

                                            {item.codigo}

                                        </td>

                                        <td>

                                            {item.referencia}

                                        </td>

                                        <td>

                                            {item.metodoPago}

                                        </td>

                                        <td>

                                            $

                                            {item.valor.toLocaleString("es-CO")}

                                        </td>

                                        <td>

                                            <span

                                                className={`status ${item.estado.toLowerCase()}`}

                                            >

                                                {item.estado}

                                            </span>

                                        </td>

                                        <td>

                                            {

                                                new Date(

                                                    item.createdAt

                                                ).toLocaleDateString(

                                                    "es-CO"

                                                )

                                            }

                                        </td>

                                    </tr>

                                ))

                            )

                            :

                            (

                                <tr>

                                    <td

                                        colSpan="6"

                                        style={{

                                            textAlign:"center",

                                            padding:"30px"

                                        }}

                                    >

                                        No existen pagos registrados.

                                    </td>

                                </tr>

                            )

                        }

                    </tbody>

                </table>

            </section>

            {/* ========================================== */}
            {/* FOOTER */}
            {/* ========================================== */}

            <footer className="payments-footer">

                <p>

                    © {new Date().getFullYear()} RIFA & RULETA

                </p>

                <p>

                    Todos los pagos son almacenados,
                    auditados y protegidos automáticamente.

                </p>

            </footer>

        </div>

    );

}