import request from "supertest";
import { describe, expect, test } from "@jest/globals";
import app from "../../app";

describe("Get /tickets/summary Route", () => {
    test("should return the summary of tickets", async () => {
        // Act
        const response = await request(app).get("/api/tickets/summary");

        // Assert
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("open");
        expect(response.body).toHaveProperty("in_progress");
        expect(response.body).toHaveProperty("resolved");
        expect(response.body).toHaveProperty("closed");
        expect(response.body).toHaveProperty("urgent");

        expect(typeof response.body.open).toBe("number");
        expect(typeof response.body.in_progress).toBe("number");
        expect(typeof response.body.resolved).toBe("number");
        expect(typeof response.body.closed).toBe("number");
        expect(typeof response.body.urgent).toBe("number");

        expect(response.body.open).toBe(8);
        expect(response.body.in_progress).toBe(2);
        expect(response.body.resolved).toBe(1);
        expect(response.body.closed).toBe(0);
        expect(response.body.urgent).toBe(1);
    });

});
