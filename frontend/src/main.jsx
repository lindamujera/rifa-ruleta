// ==========================================
// src/main.jsx
// ==========================================

import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import App from "./App";

// ==========================================
// Estilos
// ==========================================

import "./styles/Variables.css";
import "./styles/Global.css";
import "./styles/Animations.css";
import "./styles/Responsive.css";

// ==========================================
// Contextos
// ==========================================

import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationContext";
import { RoundProvider } from "./context/RoundContext";
import { PaymentProvider } from "./context/PaymentContext";
import { TicketProvider } from "./context/TicketContext";
import { SpinProvider } from "./context/SpinContext";
import { TransactionProvider } from "./context/TransactionContext";
import { AuditProvider } from "./context/AuditContext";

// ==========================================
// Renderizar Aplicación
// ==========================================

ReactDOM.createRoot(
    document.getElementById("root")
).render(

    <React.StrictMode>

        <BrowserRouter>

            <NotificationProvider>

                <AuthProvider>

                    <RoundProvider>

                        <PaymentProvider>

                            <TicketProvider>

                                <SpinProvider>

                                    <TransactionProvider>

                                        <AuditProvider>

                                            <App />

                                        </AuditProvider>

                                    </TransactionProvider>

                                </SpinProvider>

                            </TicketProvider>

                        </PaymentProvider>

                    </RoundProvider>

                </AuthProvider>

            </NotificationProvider>

        </BrowserRouter>

    </React.StrictMode>

);