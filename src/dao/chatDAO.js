import { chatsModel } from "../dao/models/chatsModel.js";

export class ChatDAO{
    constructor(){}
    async saveMessage(datos) {
        try {
            let userInCollection = await chatsModel.findOne({ user: datos.user });
            if (userInCollection) {
                await chatsModel.updateOne({ user: datos.user }, { $push: { message: datos.message } });
            } else {
                await chatsModel.create({ user: datos.user, message: [datos.message] });
            }
            return datos;
        } catch (error) {
            console.error("Error saving message:", error);
            return null;
        }
    }
 }    
