import type { TicketStatus } from "../types";
import { DatabaseManager, } from "../repository";
import { postTicket, postTicketComment, patchTicketStatus } from "../services/ticket-command";
import { getTickets, getSummary, getTicketById } from "../services/ticket-query";
import { ERROR_MESSAGES } from "../constante.error";


export class TicketController {
    static getHealth(request: any, response: any) {
        response.json({ status: "ok", service: "oxetech-helpdesk" });
    }

    static getAllUsers(request: any, response: any) {
        const database = DatabaseManager.getInstance().readDatabase();
        response.json(database.users);
    }

    static getAllTickets(request: any, response: any) {
        const result = getTickets(request.query.status, request.query.category, request.query.search);
        response.json(result);
    }

    static getSummary(request: any, response: any) {
        response.json(getSummary());
    }

    static getTicketById(request: any, response: any) {
        const ticket = getTicketById(request.params.id);

        if (!ticket) {
            response.status(404).json({ "error": ERROR_MESSAGES.TICKET_NOT_FOUND, "id": request.params.id });
            return;
        }

        response.json(ticket);
    }

    static postTicket(request: any, response: any) {
        const body = request.body;

        const ticket = postTicket({
            title: body.title,
            description: body.description,
            category: body.category,
            requesterId: body.requesterId,
            assignedToId: body.assignedToId,
        });

        if (!ticket) {
            return response.status(400).json({
                message: ERROR_MESSAGES.INVALID_REQUEST
            });
        }

        response.status(201).json(ticket);
    }

    static patchTicketStatus(request: any, response: any) {
        const ticketId = request.params.id;
        const newStatus = request.body.status as TicketStatus;
        const comment = request.body.comment;
        const authorId = request.body.authorId;

        const result = patchTicketStatus(ticketId, newStatus, comment, authorId);

        if (result.error === ERROR_MESSAGES.TICKET_NOT_FOUND) {
            return response.status(404).json({ error: ERROR_MESSAGES.TICKET_NOT_FOUND });
        }

        response.json(result.ticket);
    }

    static postTicketComment(request: any, response: any) {
        const ticketId = request.params.id;
        const authorId = request.body.authorId;
        const message = request.body.message;

        const result = postTicketComment(ticketId, authorId, message);


        if (result.error === ERROR_MESSAGES.TICKET_NOT_FOUND) {
            response.status(404).json({ error: ERROR_MESSAGES.TICKET_NOT_FOUND });
            return;
        }

        response.status(201).json(result.comment);
    }
}


