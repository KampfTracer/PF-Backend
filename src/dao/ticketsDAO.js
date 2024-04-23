import { ticketsModel } from "./models/ticketModel.js";

export class TicketsDAO {
    constructor() {}

    async createTicket(content, total) {
        try {
            let newTicket = await ticketsModel.create(content);
            return newTicket;
        } catch (error) {
            throw new Error("Error creating ticket: " + error.message);
        }
    }

    async getTicketByID(tid) {
        try {
            let ticket = await ticketsModel.findOne({ _id: tid });
            return ticket;
        } catch (error) {
            throw new Error("Error getting ticket by ID: " + error.message);
        }
    }
}