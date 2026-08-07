// ==========================================
// src/components/common/Card.jsx
// ==========================================

import "./Card.css";

function Card({

    children,

    title = "",

    subtitle = "",

    header = null,

    footer = null,

    className = "",

    hover = true,

    padding = true

}) {

    const classes = [

        "card",

        hover ? "card-hover" : "",

        padding ? "card-padding" : "",

        className

    ].join(" ");

    return (

        <div className={classes}>

            {

                (title || subtitle || header) && (

                    <div className="card-header">

                        {

                            header ? (

                                header

                            ) : (

                                <>

                                    {

                                        title && (

                                            <h2 className="card-title">

                                                {title}

                                            </h2>

                                        )

                                    }

                                    {

                                        subtitle && (

                                            <p className="card-subtitle">

                                                {subtitle}

                                            </p>

                                        )

                                    }

                                </>

                            )

                        }

                    </div>

                )

            }

            <div className="card-body">

                {children}

            </div>

            {

                footer && (

                    <div className="card-footer">

                        {footer}

                    </div>

                )

            }

        </div>

    );

}

export default Card;