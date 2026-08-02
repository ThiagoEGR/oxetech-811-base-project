import { DatabaseManager } from "../repository";
import { TicketCategory, TicketStatus } from "../types";
import { addTicketUsers } from "./ticket-details";
import { filterTickets } from "./ticket-filter"


export function getTickets(status?: TicketStatus, category?: TicketCategory, search?: string) {
    const database = DatabaseManager.getInstance().readDatabase();
    let tickets = database.tickets;

    tickets = filterTickets(tickets, status, category, search);
    const ticketsWithUsers = tickets.map((ticket) => addTicketUsers(ticket, database.users));

    return ticketsWithUsers.map((tickets) => ({
        ...tickets,
        commentsCount: database.comments.filter(
            (comment) => comment.ticketId === tickets.id
        ).length,
    }));
}

export function getSummary() {
    const database = DatabaseManager.getInstance().readDatabase();
    const summary = {
        open: 0,
        in_progress: 0,
        resolved: 0,
        closed: 0,
        urgent: 0,
    };

    for (const ticket of database.tickets) {
        if (ticket.status === "open") summary.open++;
        if (ticket.status === "in_progress") summary.in_progress++;
        if (ticket.status === "resolved") summary.resolved++;
        if (ticket.status === "closed") summary.closed++;
        if (ticket.priority === "urgent") summary.urgent++;
    }

    return summary;
}

export function getTicketById(ticketId: string) {
    const database = DatabaseManager.getInstance().readDatabase();
    const ticket = database.tickets.find((item) => item.id === ticketId);

    if (!ticket) {
        return null;
    }


    const ticketsWithUsers = addTicketUsers(ticket, database.users);
    const comments = database.comments
        .filter((comment) => comment.ticketId === ticket.id)
        .map((comment) => ({
            ...comment,
            author: database.users.find((user) => user.id === comment.authorId),
        }));

    return {
        ...ticketsWithUsers,
        comments,
    };
}

export function getAllUsers() {
    const database = DatabaseManager.getInstance().readDatabase();
    return database.users.map(({ password, ...user }) => user);
}

export function getUser(userId: string) {
    const database = DatabaseManager.getInstance().readDatabase();
    const user = database.users.find((item) => item.id === userId);

    return user || null;
}