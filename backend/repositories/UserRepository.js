const User = require("../models/User");

class UserRepository {

    async crear(datos) {
        return await User.create(datos);
    }

    async buscarPorCorreo(correo) {
        return await User.findOne({ correo });
    }

    async buscarPorId(id) {
        return await User.findById(id);
    }

    async actualizarUltimoIngreso(id) {
        return await User.findByIdAndUpdate(
            id,
            {
                ultimoIngreso: new Date()
            }
        );
    }

}

module.exports = new UserRepository();