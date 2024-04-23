import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
    {
        code: {},
        amount: Number,
        purchaser: String
    },
    {
        timestamps: {
            createdAt: 'DateOn',
            updatedAt: 'DateUltimateMod'
        }
    },
    {
        strict: false
    }
)

export const ticketsModel = mongoose.model('tickets', ticketSchema)