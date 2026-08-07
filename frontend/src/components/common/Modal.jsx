// ==========================================
// src/components/common/Modal.jsx
// ==========================================

import { useEffect } from "react";

import "./Modal.css";

function Modal({

    show = false,

    title = "",

    children,

    footer = null,

    size = "medium",

    closable = true,

    closeOnOverlay = true,

    onClose

}) {

    // ==========================================
    // Cerrar con ESC
    // ==========================================

    useEffect(() => {

        const handleKeyDown = (event) => {

            if (
                event.key === "Escape" &&
                show &&
                closable
            ) {

                onClose?.();

            }

        };

        document.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {

            document.removeEventListener(
                "keydown",
                handleKeyDown
            );

        };

    }, [show, closable, onClose]);

    if (!show) return null;

    // ==========================================
    // Cerrar haciendo clic fuera
    // ==========================================

    const handleOverlayClick = (event) => {

        if (

            event.target === event.currentTarget &&

            closeOnOverlay

        ) {

            onClose?.();

        }

    };

    return (

        <div

            className="modal-overlay"

            onClick={handleOverlayClick}

        >

            <div

                className={`modal modal-${size}`}

            >

                {/* ====================== */}

                {/* Header */}

                {/* ====================== */}

                <div className="modal-header">

                    <h2 className="modal-title">

                        {title}

                    </h2>

                    {

                        closable && (

                            <button

                                className="modal-close"

                                onClick={onClose}

                                type="button"

                            >

                                ×

                            </button>

                        )

                    }

                </div>

                {/* ====================== */}

                {/* Body */}

                {/* ====================== */}

                <div className="modal-body">

                    {children}

                </div>

                {/* ====================== */}

                {/* Footer */}

                {/* ====================== */}

                {

                    footer && (

                        <div className="modal-footer">

                            {footer}

                        </div>

                    )

                }

            </div>

        </div>

    );

}

export default Modal;