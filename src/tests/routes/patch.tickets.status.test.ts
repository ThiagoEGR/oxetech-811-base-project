import request from "supertest";
import { describe, expect, test } from "@jest/globals";
import app from "../../app";
import { DatabaseManager } from "../../repository";

describe("patch /tickets/:id/status Route", () => {
    test("should update the status of a ticket", async () => {
        // Arrange
        const status = "in_progress";
        const authorId = "user_ana";
        const comment = "Starting to work on this ticket";
        const ticketId = "ticket_1780329818375_109";

        // Act
        const response = await request(app)
            .patch(`/api/tickets/${ticketId}/status`)
            .send({ status, authorId, comment });

        const database = DatabaseManager.getInstance().readDatabase();
        const updatedTicket = database.tickets.find((ticket) => ticket.id === ticketId);
        const createdComment = database.comments.find(
            (comment) =>
                comment.ticketId === ticketId &&
                comment.message === "Starting to work on this ticket"
        );

        // Assert
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id", ticketId);
        expect(response.body).toHaveProperty("status", status);

        expect(createdComment).toBeDefined();
        expect(createdComment?.authorId).toBe("user_ana");

        expect(updatedTicket).toBeDefined();
        expect(updatedTicket?.status).toBe(status);

    });

    test("should return 404 for a non-existing ticket ID", async () => {
        // Arrange
        const status = "in_progress";
        const authorId = "user_ana";
        const comment = "Starting to work on this ticket";
        const ticketId = "non_existing_ticket_id";

        // Act
        const response = await request(app)
            .patch(`/api/tickets/${ticketId}/status`)
            .send({ status, authorId, comment });

        // Assert
        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            error: "Ticket nao encontrado",
        });
    });

    test("should return 400 for an invalid status", async () => {
        // Arrange
        const status = "invalid_status";
        const authorId = "user_ana";
        const comment = "Starting to work on this ticket";
        const ticketId = "ticket_1780329818375_109";

        // Act
        const response = await request(app)
            .patch(`/api/tickets/${ticketId}/status`)
            .send({ status, authorId, comment });

        // Assert
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            error: "Status invalido",
            allowed: ["open", "in_progress", "resolved", "closed"],
        });
    });

    test("should return 400 when closing a ticket without a comment", async () => {
        // Arrange
        const status = "closed";
        const authorId = "user_ana";
        const ticketId = "ticket_1780329818375_109";

        // Act
        const response = await request(app)
            .patch(`/api/tickets/${ticketId}/status`)
            .send({ status, authorId });

        // Assert
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            error: "Informe um comentario para fechar o chamado",
        });
    });
});