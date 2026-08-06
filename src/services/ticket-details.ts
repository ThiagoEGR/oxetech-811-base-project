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
        requester: requester ? toUserResponse(requester) : undefined,
        assigned: assigned ? toUserResponse(assigned) : undefined,
    };
}

interface UserResponseDTO {
    id: string;
    name: string;
    email: string;
}

export function toUserResponse(user: User): UserResponseDTO {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
    };
}

