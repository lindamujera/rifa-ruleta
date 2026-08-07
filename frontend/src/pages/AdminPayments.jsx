// ==========================================
// src/pages/AdminPayments.jsx
// ==========================================

import PaymentTable from "../components/admin/PaymentTable";
import "../styles/Admin.css";

export default function AdminPayments() {
    return (
        <div className="admin-page">
            <section className="admin-header">
                <h1>Pagos Pendientes</h1>
                <p>
                    Revisa los pagos enviados por los usuarios para aprobarlos y activar la ruleta.
                </p>
            </section>

            <PaymentTable />
        </div>
    );
}
