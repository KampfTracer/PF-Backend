import { CustomError } from "../utils/customError.js";
import { STATUS_CODES, ERRORES_INTERNOS } from "../utils/tiposError.js";
import { userModel } from "./models/usersModel.js";
import { hashearPass } from "../utils.js";

export class UserDAO {
    async getUserById(userId) {
        try {
            return await userModel.findOne({ _id: userId });
        } catch (error) {
            return CustomError.CustomError("NO SE ENCONTRO USUARIO", "NO SE ENCONTRO USUARIO", STATUS_CODES.ERROR_DATOS_ENVIADOS, ERRORES_INTERNOS.OTROS);
        }
    }

    async changeRol(user, rol) {
        let id = user._id;
        try {
            const userMod = await userModel.updateOne({ _id: id }, { rol: rol });
            if (userMod.modifiedCount > 0) {
                return userMod;
            } else {
                return null;
            }
        } catch (error) {
            return CustomError.CustomError("ERROR", "ERROR AL MODIFICAR", STATUS_CODES.ERROR_DATOS_ENVIADOS, ERRORES_INTERNOS.OTROS);
        }
    }

    async getUser(email) {
        try {
            return await userModel.findOne({ email }).lean();
        } catch (error) {
            return null;
        }
    }

    async updatePassUser(pass, email) {
        try {
            const user = await this.getUser(email);
            if (!user) {
                return null;
            }
            const hashPass = hashearPass(pass);
            if (!hashPass) {
                return null;
            }
            return await userModel.updateOne({ email: email }, { password: hashPass });
        } catch (error) {
            return null;
        }
    }

    async putUser(id) {
        const user = await this.getUserById(id);
        if (!user) {
            return null;
        }
        const date = new Date();
        const userMod = await userModel.updateOne({ _id: id }, { last_connection: date });
        if (!userMod) {
            return null;
        }
        return true;
    }

    async pushDoc(userId, nameFile, pathFile) {
        const user = await this.getUserById(userId);
        if (!user) {
            return null;
        }
        const newDoc = { name: nameFile, reference: pathFile };
        return await userModel.updateOne({ _id: userId }, { $push: { documents: newDoc } });
    }
}
