const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

async function reset() {
    await mongoose.connect(process.env.MONGO_URI);

    const hash = await bcrypt.hash("Admin123*", 10);

    const usuario = await User.findOneAndUpdate(
        { correo: "admin@rifa.com" },
        { password: hash },
        { new: true }
    );

    console.log("Contraseña actualizada:");
    console.log(usuario);

    process.exit();
}

reset();