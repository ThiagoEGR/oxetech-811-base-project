import request from "supertest";
import { describe, expect, test } from "@jest/globals";
import app from "../../app";
import { DatabaseManager } from "../../repository";


describe("post /tickets/:id/comments Route", () => {
    test("should create a new comment for a ticket", async () => {
        // Arrange
        const ticketId = "ticket_1780329818375_109";
        const newComment = {
            authorId: "user_ana",
            message: "This is a test comment",
        };

        // Act
        const response = await request(app)
            .post(`/api/tickets/${ticketId}/comments`)
            .send(newComment);

        const database = DatabaseManager.getInstance().readDatabase();
        const createdComment = database.comments.find(
            (comment) =>
                comment.ticketId === ticketId &&
                comment.message === newComment.message
        );

        // Assert
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("ticketId", ticketId);
        expect(response.body).toHaveProperty("authorId", newComment.authorId);
        expect(response.body).toHaveProperty("message", newComment.message);

        // Check if the comment was created in the database
        expect(createdComment).toBeDefined();
        expect(createdComment?.ticketId).toBe(ticketId);
        expect(createdComment?.authorId).toBe(newComment.authorId);
        expect(createdComment?.message).toBe(newComment.message);

    });

    test("should return 404 for a non-existing ticket ID", async () => {
        // Arrange
        const ticketId = "non_existing_ticket_id";
        const newComment = {
            authorId: "user_ana",
            message: "This is a test comment",
        };

        // Act
        const response = await request(app)
            .post(`/api/tickets/${ticketId}/comments`)
            .send(newComment);

        // Assert
        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            error: "Ticket nao encontrado",
        });
    });

    test("should return 400 for missing authorId", async () => {
        // Arrange
        const ticketId = "ticket_1780329818375_109";
        const newComment = {
            message: "This is a test comment",
        };

        // Act
        const response = await request(app)
            .post(`/api/tickets/${ticketId}/comments`)
            .send(newComment);

        // Assert
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            error: "Comentario e autor sao obrigatorios",
        });
    });

    test("should return 400 for missing message", async () => {
        // Arrange
        const ticketId = "ticket_1780329818375_109";
        const newComment = {
            authorId: "user_ana",
        };

        // Act
        const response = await request(app)
            .post(`/api/tickets/${ticketId}/comments`)
            .send(newComment);

        // Assert
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            error: "Comentario e autor sao obrigatorios",
        });
    });
});
