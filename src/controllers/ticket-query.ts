import { DatabaseManager } from "../repository";
import * as TicketQuery from "../services/ticket-query";
import { ERROR_MESSAGES } from "../constante.error";

export function getHealth(request: any, response: any) {
    response.json({ status: "ok", service: "oxetech-helpdesk" });
}

export function getAllUsers(request: any, response: any) {
    const users = TicketQuery.getAllUsers();
    response.json(users);
}

export function getAllTickets(request: any, response: any) {
    const result = TicketQuery.getTickets(request.query.status, request.query.category, request.query.search);
    response.json(result);
}

export function getSummary(request: any, response: any) {
    response.json(TicketQuery.getSummary());
}

export function getTicketById(request: any, response: any) {
    const ticket = TicketQuery.getTicketById(request.params.id);

    if (!ticket) {
        response.status(404).json({ "error": ERROR_MESSAGES.TICKET_NOT_FOUND, "id": request.params.id });
        return;
    }

    response.json(ticket);
}