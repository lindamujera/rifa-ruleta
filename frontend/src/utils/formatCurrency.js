// ==========================================
// src/utils/formatCurrency.js
// ==========================================

/**
 * Formatea un número como moneda colombiana.
 *
 * @param {number|string} value
 * @param {boolean} withSymbol
 * @returns {string}
 */

export function formatCurrency(value = 0, withSymbol = true) {

    const amount = Number(value) || 0;

    const formatted = amount.toLocaleString("es-CO", {

        style: "decimal",

        minimumFractionDigits: 0,

        maximumFractionDigits: 0

    });

    return withSymbol

        ? `$ ${formatted}`

        : formatted;

}
/**
 * Formatea un número con decimales.
 */

export function formatDecimal(value = 0, decimals = 2) {

    return Number(value).toLocaleString(

        "es-CO",

        {

            minimumFractionDigits: decimals,

            maximumFractionDigits: decimals

        }

    );

}

/**
 * Convierte un valor a número seguro.
 */

export function toNumber(value) {

    const number = Number(value);

    return isNaN(number)

        ? 0

        : number;

}

/**
 * Convierte un porcentaje.
 */

export function formatPercentage(value = 0) {

    return `${Number(value).toFixed(2)} %`;

}

/**
 * Convierte centavos a pesos.
 */

export function centsToPesos(cents = 0) {

    return Number(cents) / 100;

}

/**
 * Convierte pesos a centavos.
 */

export function pesosToCents(pesos = 0) {

    return Math.round(Number(pesos) * 100);

}

export default formatCurrency;