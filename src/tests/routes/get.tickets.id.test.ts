import request from "supertest";
import { describe, expect, test } from "@jest/globals";
import app from "../../app";


describe("Get /tickets/:id Route", () => {
    test("should return a ticket by ID with requester, assigned user and comments", async () => {
        // Act
        const response = await request(app).get("/api/tickets/ticket_1780329818375_109");

        // Assert
        // Check if the response status is 200 and the ticket has the required properties
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("id", "ticket_1780329818375_109");
        expect(response.body).toHaveProperty("title");
        expect(response.body).toHaveProperty("description");
        expect(response.body).toHaveProperty("category");
        expect(response.body).toHaveProperty("status");
        expect(response.body).toHaveProperty("priority");
        expect(response.body).toHaveProperty("requesterId");
        expect(response.body).toHaveProperty("createdAt");
        expect(response.body).toHaveProperty("updatedAt");

        // Check if the ticket has the expected values
        expect(response.body.id).toBe("ticket_1780329818375_109");
        expect(response.body.title).toBe("Nao consigo enviar atividade");
        expect(response.body.createdAt).toBe("2026-06-01T16:03:38.375Z");

        // Check if the ticket has the requester and assigned user details
        expect(response.body).toHaveProperty("requester");
        expect(response.body.requester).toHaveProperty("id");
        expect(response.body.requester).toHaveProperty("name");
        expect(response.body.requester).toHaveProperty("email");
        expect(response.body.requester).toHaveProperty("role");

        if (response.body.assigned) {
            expect(response.body.assigned).toHaveProperty("id");
            expect(response.body.assigned).toHaveProperty("name");
            expect(response.body.assigned).toHaveProperty("email");
            expect(response.body.assigned).toHaveProperty("role");
        }

        // Check if the ticket has the comments
        expect(response.body).toHaveProperty("comments");
        expect(Array.isArray(response.body.comments)).toBe(true);

        // Check if each comment has the required properties and the author details
        response.body.comments.forEach((comment: any) => {
            expect(comment).toHaveProperty("id");
            expect(comment).toHaveProperty("ticketId");
            expect(comment).toHaveProperty("authorId");
            expect(comment).toHaveProperty("content");

            expect(comment).toHaveProperty("author");
            expect(comment.author).toHaveProperty("id");
            expect(comment.author).toHaveProperty("name");
        });
    });

    test("should return 404 for a non-existing ticket ID", async () => {
        // Act
        const response = await request(app).get("/api/tickets/non_existing_ticket_id");

        // Assert
        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            error: "Ticket nao encontrado",
            id: "non_existing_ticket_id",
        });

    });
});