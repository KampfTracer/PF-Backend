import { UserDAO } from "../dao/userDAO.js";

export class UserService {
    constructor() {
        this.dao = new UserDAO(); // Corregido: se instancia la clase UserDAO correctamente
    }

    async getUserById(id) {
        return await this.dao.getUserById(id);
    }

    async changeRol(user, rol) {
        return await this.dao.changeRol(user, rol);
    }

    async getUser(email) {
        return await this.dao.getUser(email);
    }

    async updatePassUser(pass, email) {
        return await this.dao.updatePassUser(pass, email);
    }

    async putUser(id) {
        return await this.dao.putUser(id);
    }

    async pushDoc(userId, nameFile, pathFile) {
        return await this.dao.pushDoc(userId, nameFile, pathFile);
    }
}

export const userService = new UserService(); // Corregido: se instancia la clase UserService correctamente
