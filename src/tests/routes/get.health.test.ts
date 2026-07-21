import request from "supertest";
import { describe, expect, test } from "@jest/globals";
import app from "../../app";


describe("Health Route", () => {
    test("should return the API status", async () => {
        // Act
        const response = await request(app).get("/api/health");

        // Assert
        expect(response.body).toEqual({
            status: "ok",
            service: "oxetech-helpdesk",
        });
    });
});












