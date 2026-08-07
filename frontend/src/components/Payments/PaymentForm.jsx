// ==========================================
// src/components/payment/PaymentForm.jsx
// ==========================================

import { useState } from "react";

import Button from "../common/Button";
import Alert from "../common/Alert";
import Card from "../common/Card";

import paymentService from "../../services/paymentService";

import "./PaymentForm.css";

function PaymentForm({

    onSuccess = () => {},

    onCancel = () => {}

}) {

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    const [form, setForm] = useState({

        metodo: "NEQUI",

        referencia: `NEQUI-${Date.now()}`,

        valor: 25000,

        observacion: ""

    });

    // ==========================================
    // Actualizar formulario
    // ==========================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        // If metodo changes, regenerate referencia using the selected metodo
        if (name === "metodo") {
            setForm((prev) => ({
                ...prev,
                metodo: value,
                referencia: `${value}-${Date.now()}`
            }));
            return;
        }

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));

    };

    // ==========================================
    // Enviar pago
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        setSuccess("");

        try {

            const response = await paymentService.create(

                form

            );

            setSuccess(

                response.message ||

                "Pago registrado correctamente."

            );

            onSuccess(response);

            setForm({

                metodo: "NEQUI",

                referencia: `NEQUI-${Date.now()}`,

                valor: 25000,

                observacion: ""

            });

        } catch (err) {

            setError(

                err.response?.data?.message ||

                err.message ||

                "No fue posible registrar el pago."

            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <Card className="payment-form-card">

            <h2>

                💳 Registrar Pago

            </h2>

            <p>

                Completa la información para registrar tu pago y continuar con la participación en la rifa.

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

            <form

                className="payment-form"

                onSubmit={handleSubmit}

            >

                {/* ========================================== */}
                {/* Método */}
                {/* ========================================== */}

                <div className="form-group">

                    <label>

                        Método de Pago

                    </label>

                    <select

                        name="metodo"

                        value={form.metodo}

                        onChange={handleChange}

                    >

                        <option value="NEQUI">

                            Nequi

                        </option>

                        <option value="DAVIPLATA">

                            Daviplata

                        </option>

                    </select>

                </div>

                {/* ========================================== */}
                {/* Referencia */}
                {/* ========================================== */}

                <div className="form-group">

                    <label>

                        Referencia

                    </label>

                    <input

                        type="text"

                        name="referencia"

                        value={form.referencia}

                        onChange={handleChange}

                        placeholder="Número de referencia"

                        required

                    />

                </div>

                {/* ========================================== */}
                {/* Valor */}
                {/* ========================================== */}

                <div className="form-group">

                    <label>

                        Valor

                    </label>

                    <input

                        type="number"

                        name="valor"

                        value={form.valor}

                        onChange={handleChange}

                        min="25000"

                        required

                    />

                </div>

                {/* ========================================== */}
                {/* Observaciones */}
                {/* ========================================== */}

                <div className="form-group">

                    <label>

                        Observaciones

                    </label>

                    <textarea

                        name="observacion"

                        value={form.observacion}

                        onChange={handleChange}

                        rows="4"

                        placeholder="Información adicional (opcional)"

                    />

                </div>

                {/* ========================================== */}
                {/* Botones */}
                {/* ========================================== */}

                <div className="payment-form-actions">

                    <Button

                        type="button"

                        variant="secondary"

                        onClick={onCancel}

                        disabled={loading}

                    >

                        Cancelar

                    </Button>

                    <Button

                        type="submit"

                        disabled={loading}

                    >

                        {

                            loading

                                ? "Registrando..."

                                : "Registrar Pago"

                        }

                    </Button>

                </div>

            </form>

        </Card>

    );

}

export default PaymentForm;