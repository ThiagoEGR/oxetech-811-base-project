import { DatabaseManager } from "../repository";
import { TicketCategory, TicketStatus, User, TicketComment } from "../types";
import { Ticket } from "./Ticket";
import { TicketFactory } from "./TicketFactory";
import { ERROR_MESSAGES } from "../constante.error";


export function postTicketComment(ticketId: string, authorId: string, message: string) {
    const database = DatabaseManager.getInstance().readDatabase();
    const ticket = database.tickets.find((item) => item.id === ticketId);

    if (!ticket) {
        return { success: false, error: ERROR_MESSAGES.TICKET_NOT_FOUND };
    }

    const comment = {
        id: DatabaseManager.generateId("comment"),
        ticketId: ticket.id,
        authorId: authorId,
        message: message,
        createdAt: new Date().toISOString(),
    };

    database.comments.push(comment);
    ticket.updatedAt = new Date().toISOString();
    DatabaseManager.getInstance().writeDatabase(database);

    return { success: true, comment };
}


