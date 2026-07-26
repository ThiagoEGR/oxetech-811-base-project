import { DatabaseManager } from "../repository";
import { TicketCategory, TicketStatus, User, TicketComment } from "../types";
import { TicketFactory } from "./TicketFactory";
import { ERROR_MESSAGES } from "../constante.error";
import { getUser } from "./ticket-query";


export function postTicket(params: {
    title: string;
    description: string;
    category: TicketCategory;
    requesterId: string;
    assignedToId?: string;
}) {

    const database = DatabaseManager.getInstance().readDatabase();
    const user = getUser(params.requesterId);

    if (!user) {
        return null;
    }

    const now = new Date().toISOString();
    const ticket = TicketFactory.create({
        title: params.title,
        description: params.description,
        category: params.category,
        requesterId: params.requesterId,
        assignedToId: params.assignedToId,
        status: "open",
        createdAt: now,
        updatedAt: now,
    });

    database.tickets.push(ticket);
    DatabaseManager.getInstance().writeDatabase(database);
    return ticket;
}

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


export function patchTicketStatus(ticketId: string, newStatus: TicketStatus, comment?: string, authorId?: string) {
    const database = DatabaseManager.getInstance().readDatabase();
    const ticket = database.tickets.find((item) => item.id === ticketId);

    if (!ticket) {
        return { success: false, error: ERROR_MESSAGES.TICKET_NOT_FOUND };
    }

    ticket.status = newStatus;
    ticket.updatedAt = new Date().toISOString();

    if (comment) {
        database.comments.push({
            id: DatabaseManager.generateId("comment"),
            ticketId: ticket.id,
            authorId: authorId || ticket.requesterId,
            message: comment,
            createdAt: new Date().toISOString(),
        });
    }

    DatabaseManager.getInstance().writeDatabase(database);
    return { success: true, ticket };
}
