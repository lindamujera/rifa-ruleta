// ==========================================
// src/components/common/Button.jsx
// ==========================================

import Spinner from "./Spinner";

import "./Button.css";

function Button({

    children,

    type = "button",

    variant = "primary",

    size = "medium",

    loading = false,

    disabled = false,

    fullWidth = false,

    icon = null,

    onClick

}) {

    const className = [

        "btn",

        `btn-${variant}`,

        `btn-${size}`,

        fullWidth ? "btn-full" : "",

        loading ? "btn-loading" : ""

    ].join(" ");

    return (

        <button

            type={type}

            className={className}

            disabled={disabled || loading}

            onClick={onClick}

        >

            {

                loading ? (

                    <Spinner

                        size="small"

                        color="white"

                    />

                ) : (

                    <>

                        {

                            icon && (

                                <span className="btn-icon">

                                    {icon}

                                </span>

                            )

                        }

                        <span className="btn-text">

                            {children}

                        </span>

                    </>

                )

            }

        </button>

    );

}

export default Button;