// ==========================================
// src/components/dashboard/RecentPayments.jsx
// ==========================================

import { useEffect, useState } from "react";

import paymentService from "../../services/paymentService";

import Loader from "../common/Loader";
import Alert from "../common/Alert";

import "./RecentPayments.css";

function RecentPayments({

    limit = 5

}) {

    const [payments, setPayments] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        loadPayments();

    }, []);

    const loadPayments = async () => {

        try {

            setLoading(true);

            setError("");

            const response = await paymentService.getMyPayments();

            const data = response.data || response || [];

            setPayments(data.slice(0, limit));

        } catch (err) {

            setError(

                err.response?.data?.message ||

                "No fue posible cargar los pagos."

            );

        } finally {

            setLoading(false);

        }

    };

    const formatCurrency = (value = 0) =>

        Number(value).toLocaleString("es-CO");

    const formatDate = (date) => {

        if (!date) return "-";

        return new Date(date).toLocaleDateString("es-CO");

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

    if (loading) {

        return <Loader />;

    }

    return (

        <section className="recent-payments">

            <div className="recent-payments-header">

                <h2>

                    💳 Últimos Pagos

                </h2>

            </div>

            {

                error && (

                    <Alert

                        type="error"

                        message={error}

                    />

                )

            }

            {

                payments.length === 0 ? (

                    <Alert

                        type="info"

                        message="Todavía no existen pagos registrados."

                    />

                ) : (

                    <table className="payments-table">

                        <thead>

                            <tr>

                                <th>Referencia</th>

                                <th>Valor</th>

                                <th>Fecha</th>

                                <th>Estado</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                payments.map((payment) => (

                                    <tr

                                        key={payment._id}

                                    >

                                        <td>

                                            {

                                                payment.reference ||

                                                payment.referencia ||

                                                "-"

                                            }

                                        </td>

                                        <td>

                                            $

                                            {

                                                formatCurrency(

                                                    payment.amount ||

                                                    payment.valor ||

                                                    0

                                                )

                                            }

                                        </td>

                                        <td>

                                            {

                                                formatDate(

                                                    payment.createdAt

                                                )

                                            }

                                        </td>

                                        <td>

                                            <span

                                                className={`payment-status ${

                                                    getStatusClass(

                                                        payment.status

                                                    )

                                                }`}

                                            >

                                                {

                                                    payment.status ||

                                                    "Pendiente"

                                                }

                                            </span>

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                )

            }

        </section>

    );

}

export default RecentPayments;