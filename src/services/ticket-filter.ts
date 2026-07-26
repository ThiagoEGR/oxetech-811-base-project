import { TicketCategory, TicketStatus } from "../types";
import { Ticket } from "./Ticket";


export function filterTickets(tickets: Ticket[], status?: TicketStatus, category?: TicketCategory, search?: string) {
    if (status) {
        tickets = tickets.filter((ticket) => ticket.status === status);
    }

    if (category) {
        tickets = tickets.filter((ticket) => ticket.category === category);
    }

    if (search) {
        const ticketSearch = String(search).toLowerCase();
        tickets = tickets.filter(
            (ticket) =>
                ticket.title.toLowerCase().includes(ticketSearch) ||
                ticket.description.toLowerCase().includes(ticketSearch) ||
                ticket.category.toLowerCase().includes(ticketSearch),
        );
    }

    return tickets;
}
