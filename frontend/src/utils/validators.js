// ==========================================
// src/utils/validators.js
// ==========================================

/**
 * Valida que un valor no esté vacío.
 */

export const isRequired = (value) => {

    return value !== undefined &&
           value !== null &&
           String(value).trim() !== "";

};

/**
 * Valida un correo electrónico.
 */

export const isEmail = (email) => {

    if (!email) return false;

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);

};

/**
 * Valida una contraseña.
 *
 * Mínimo:
 * - 8 caracteres
 * - una mayúscula
 * - una minúscula
 * - un número
 */

export const isStrongPassword = (password) => {

    if (!password) return false;

    const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    return regex.test(password);

};

/**
 * Valida un número telefónico colombiano.
 */

export const isPhone = (phone) => {

    if (!phone) return false;

    const regex = /^3\d{9}$/;

    return regex.test(phone);

};

/**
 * Valida una cédula.
 */

export const isDocument = (document) => {

    if (!document) return false;

    const regex = /^[0-9]{5,15}$/;

    return regex.test(document);

};

/**
 * Valida un nombre.
 */

export const isName = (name) => {

    if (!name) return false;

    return name.trim().length >= 3;

};

/**
 * Valida longitud mínima.
 */

export const minLength = (

    value,

    length

) => {

    if (!value) return false;

    return value.trim().length >= length;

};

/**
 * Valida longitud máxima.
 */

export const maxLength = (

    value,

    length

) => {

    if (!value) return false;

    return value.trim().length <= length;

};

/**
 * Valida un número positivo.
 */

export const isPositiveNumber = (value) => {

    return !isNaN(value) &&

        Number(value) > 0;

};

/**
 * Valida un entero.
 */

export const isInteger = (value) => {

    return Number.isInteger(

        Number(value)

    );

};

/**
 * Valida un monto.
 */

export const isValidAmount = (

    amount,

    min = 1000

) => {

    return (

        !isNaN(amount) &&

        Number(amount) >= min

    );

};

/**
 * Valida un archivo de imagen.
 */

export const isImage = (file) => {

    if (!file) return false;

    return [

        "image/jpeg",

        "image/jpg",

        "image/png",

        "image/webp"

    ].includes(file.type);

};

/**
 * Valida tamaño máximo.
 */

export const maxFileSize = (

    file,

    maxMB = 5

) => {

    if (!file) return false;

    return file.size <= maxMB * 1024 * 1024;

};

/**
 * Compara dos contraseñas.
 */

export const passwordsMatch = (

    password,

    confirmPassword

) => {

    return password === confirmPassword;

};

/**
 * Valida URL.
 */

export const isURL = (url) => {

    if (!url) return false;

    try {

        new URL(url);

        return true;

    } catch {

        return false;

    }

};

/**
 * Elimina espacios.
 */

export const cleanText = (text = "") => {

    return text.trim();

};

/**
 * Convierte a mayúsculas.
 */

export const toUpper = (text = "") => {

    return text.toUpperCase();

};

/**
 * Convierte a minúsculas.
 */

export const toLower = (text = "") => {

    return text.toLowerCase();

};

/**
 * Capitaliza texto.
 */

export const capitalize = (text = "") => {

    return text

        .toLowerCase()

        .replace(/\b\w/g, letter =>

            letter.toUpperCase()

        );

};

/**
 * Valida si dos valores son iguales.
 */

export const equals = (

    value1,

    value2

) => {

    return value1 === value2;

};

export default {

    isRequired,

    isEmail,

    isStrongPassword,

    isPhone,

    isDocument,

    isName,

    minLength,

    maxLength,

    isPositiveNumber,

    isInteger,

    isValidAmount,

    isImage,

    maxFileSize,

    passwordsMatch,

    isURL,

    cleanText,

    toUpper,

    toLower,

    capitalize,

    equals

};