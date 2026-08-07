require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const connectDB = require("../config/db");

const User = require("../models/User");
const CounterService = require("../services/CounterService");

async function crearUsuario(datos) {

    const existe = await User.findOne({

        correo: datos.correo

    });

    if (existe) {

        console.log(`✔ ${datos.rol} ya existe`);

        return;

    }

    const codigo = await CounterService.generar("USER");

    const password = await bcrypt.hash(

        datos.password,

        10

    );

    await User.create({

        codigo,

        nombre: datos.nombre,

        celular: datos.celular,

        correo: datos.correo,

        password,

        rol: datos.rol,

        estado: "ACTIVO"

    });

    console.log(`✅ ${datos.rol} creado correctamente`);

}

async function seed() {

    try {

        await connectDB();

        console.log("MongoDB conectado");

        await crearUsuario({

            nombre: "Administrador",

            celular: "3000000000",

            correo: "admin@rifaruleta.com",

            password: "Admin123*",

            rol: "ADMIN"

        });

        await crearUsuario({

            nombre: "Operador",

            celular: "3000000001",

            correo: "operador@rifaruleta.com",

            password: "Operador123*",

            rol: "OPERADOR"

        });

        await crearUsuario({

            nombre: "Cliente Demo",

            celular: "3000000002",

            correo: "cliente@rifaruleta.com",

            password: "Cliente123*",

            rol: "CLIENTE"

        });

        console.log("");
        console.log("================================");
        console.log("Usuarios creados correctamente");
        console.log("================================");

        process.exit();

    }

    catch (error) {

        console.log(error);

        process.exit(1);

    }

}

seed();

const PORT = process.env.PORT || 5000;

localStorage.setItem("token", "eyJhbGci...0oVyA");
localStorage.setItem("users", JSON.stringify({"id":"6a46e6f47ee7affad0c121b0","codigo":"USER-2026-000001","nombre":"Administrador","correo":"admin@rifaruleta.com","celular":"3000000000","rol":"ADMIN","estado":"ACTIVO","girosDisponibles":0,"saldoGanado":0,"totalGanado":0,"totalPagado":0,"ticketsComprados":0,"foto":"","ultimoIngreso":"2026-07-19T23:43:42.524Z"}));