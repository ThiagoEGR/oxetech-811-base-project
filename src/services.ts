import type { TicketPriority } from "./types";


export function calculateTicketPriority(category: string, description: string): TicketPriority {
    if (category === "infra" || description.toLowerCase().includes("urgente")) {
        return "urgent";
    }

    if (category === "sistemas" || description.length > 220) {
        return "high";
    }

    if (category === "academico") {
        return "medium";
    }

    return "low";
}
