const Setting = require("../models/Setting");

class SettingService {

    async obtenerConfiguracion() {

        let setting = await Setting.findOne();

        if (!setting) {

            setting = await Setting.create({});

        }

        return setting;

    }

    async actualizar(datos) {

        let setting = await Setting.findOne();

        if (!setting) {

            setting = await Setting.create(datos);

        } else {

            Object.assign(setting, datos);

            await setting.save();

        }

        return setting;

    }

}

module.exports = new SettingService();