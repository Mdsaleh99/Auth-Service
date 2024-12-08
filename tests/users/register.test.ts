import app from "../../src/app";
import request from "supertest";

describe("POST /auth/register", () => {
    describe("Given all fields", () => {
        it("Should return the 201 status code", async () => {
            // AAA
            // Arrange
            const userData = {
                firstName: "Saleh",
                lastName: "Mulla",
                email: "saleh@gmail.com",
                password: "secret",
            };

            // Act
            const response = await request(app)
                .post("/auth/register")
                .send(userData);

            // Assert
            expect(response.statusCode).toBe(201);
        });

        it("Should return valid json response", async () => {
            // Arrange
            const userData = {
                firstName: "Saleh",
                lastName: "Mulla",
                email: "saleh@gmail.com",
                password: "secret",
            };

            // Act
            const response = await request(app)
                .post("/auth/register")
                .send(userData);

            // Assert
            expect(
                (response.headers as Record<string, string>)["content-type"],
            ).toEqual(expect.stringContaining("json"));
        });
    });

    describe("Fields are missing", () => {});
});
