import request from "supertest";
import { describe, expect, test } from "@jest/globals";
import app from "../../app";
import { DatabaseManager } from "../../repository";

describe("post /tickets Route", () => {
    test("should create a new ticket", async () => {
        // Arrange
        const newTicket = {
            title: "Test Ticket",
            description: "This is a test ticket",
            category: "academico",
            requesterId: "user_ana",
        };

        // Act
        const response = await request(app).
            post("/api/tickets")
            .set("X-User-Id", "user_test")
            .set("X-Password", "123456")
            .send(newTicket);

        const database = DatabaseManager.getInstance().readDatabase();
        const createdTicket = database.tickets.find((ticket) => ticket.title === newTicket.title);

        // Assert

        // Check if the ticket was created in the database
        expect(createdTicket).toBeDefined();
        expect(createdTicket?.title).toBe(newTicket.title);
        expect(createdTicket?.description).toBe(newTicket.description);
        expect(createdTicket?.category).toBe(newTicket.category);
        expect(createdTicket?.requesterId).toBe(newTicket.requesterId);
        expect(createdTicket?.status).toBe("open");

        // Check if the response status is 201 and the ticket has the required properties
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.title).toBe(newTicket.title);
        expect(response.body.description).toBe(newTicket.description);
        expect(response.body.category).toBe(newTicket.category);
        expect(response.body.requesterId).toBe(newTicket.requesterId);
        expect(response.body.status).toBe("open");

    });

    test("should return 400 for missing required field title", async () => {
        // Arrange
        const newTicket = {
            description: "This is a test ticket",
            category: "academico",
            requesterId: "user_ana",
        };

        // Act
        const response = await request(app)
            .post("/api/tickets")
            .set("X-User-Id", "user_test")
            .set("X-Password", "123456")
            .send(newTicket);

        // Assert
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message: "Campos obrigatorios ausentes",
            required: ["title", "description", "category", "requesterId"],
            received: newTicket,
        });
    });

    test("should return 400 for missing required field description", async () => {
        // Arrange
        const newTicket = {
            title: "Test Ticket",
            category: "academico",
            requesterId: "user_ana",
        };

        // Act
        const response = await request(app).
            post("/api/tickets").
            set("X-User-Id", "user_test").
            set("X-Password", "123456").
            send(newTicket);

        // Assert
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message: "Campos obrigatorios ausentes",
            required: ["title", "description", "category", "requesterId"],
            received: newTicket,
        });
    });

    test("should return 400 for missing required field category", async () => {
        // Arrange
        const newTicket = {
            title: "Test Ticket",
            description: "This is a test ticket",
            requesterId: "user_ana",
        };

        // Act
        const response = await request(app).
            post("/api/tickets").
            set("X-User-Id", "user_test").
            set("X-Password", "123456").
            send(newTicket);

        // Assert
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message: "Campos obrigatorios ausentes",
            required: ["title", "description", "category", "requesterId"],
            received: newTicket,
        });
    });

    test("should return 400 for missing required field requesterId", async () => {
        // Arrange
        const newTicket = {
            title: "Test Ticket",
            description: "This is a test ticket",
            category: "academico",
        };


        // Act
        const response = await request(app)
            .post("/api/tickets")
            .set("X-User-Id", "user_test")
            .set("X-Password", "123456")
            .send(newTicket);

        // Assert
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message: "Campos obrigatorios ausentes",
            required: ["title", "description", "category", "requesterId"],
            received: newTicket,
        });
    });

    test("should return 400 for invalid requesterId", async () => {
        // Arrange
        const newTicket = {
            title: "Test Ticket",
            description: "This is a test ticket",
            category: "academico",
            requesterId: "invalid_user_id",
        };

        // Act
        const response = await request(app)
            .post("/api/tickets")
            .set("X-User-Id", "user_ana")
            .set("X-Password", "123456")
            .send(newTicket);

        // Assert
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message: "Solicitante invalido",
        });
    });
});
