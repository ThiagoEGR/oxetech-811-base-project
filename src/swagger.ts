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
        ? ["./dist/routes/**/*.js"]
        : ["./src/routes/**/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);