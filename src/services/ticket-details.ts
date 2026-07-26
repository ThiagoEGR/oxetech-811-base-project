import { User } from "../types";
import { Ticket } from "./Ticket";

export function addTicketUsers(
    ticket: Ticket,
    users: User[],

) {

    const requester = users.find((user) => user.id === ticket.requesterId);
    const assigned = users.find((user) => user.id === ticket.assignedToId);

    return {
        ...ticket,
        requester,
        assigned,
    };
}

