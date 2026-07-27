import type { TicketStatus } from "../types";
import * as TicketCommand from "../services/ticket-command";
import { ERROR_MESSAGES } from "../constante.error";


export function postTicket(request: any, response: any) {
    const body = request.body;

    const ticket = TicketCommand.postTicket({
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

export function patchTicketStatus(request: any, response: any) {
    const ticketId = request.params.id;
    const newStatus = request.body.status as TicketStatus;
    const comment = request.body.comment;
    const authorId = request.body.authorId;

    const result = TicketCommand.patchTicketStatus(ticketId, newStatus, comment, authorId);

    if (result.error === ERROR_MESSAGES.TICKET_NOT_FOUND) {
        return response.status(404).json({ error: ERROR_MESSAGES.TICKET_NOT_FOUND });
    }

    response.json(result.ticket);
}

export function postTicketComment(request: any, response: any) {
    const ticketId = request.params.id;
    const authorId = request.body.authorId;
    const message = request.body.message;

    const result = TicketCommand.postTicketComment(ticketId, authorId, message);


    if (result.error === ERROR_MESSAGES.TICKET_NOT_FOUND) {
        response.status(404).json({ error: ERROR_MESSAGES.TICKET_NOT_FOUND });
        return;
    }

    response.status(201).json(result.comment);
}