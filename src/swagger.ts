import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Ticket API",
            version: "1.0.0",
        },
    },
    apis: process.env.NODE_ENV === "production"
        ? ["./dist/docs/swagger/**/*.js"]
        : ["./docs/swagger/**/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);