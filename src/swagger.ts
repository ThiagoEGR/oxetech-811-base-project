import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Ticket API",
            version: "1.0.0",
        },

        components: {
            securitySchemes: {
                userAuthentication: {
                    type: "apiKey",
                    in: "header",
                    name: "X-User-Id",
                },
                passwordAuthentication: {
                    type: "apiKey",
                    in: "header",
                    name: "X-Password",
                },
            },
        },

    },

    apis: process.env.NODE_ENV === "production"
        ? ["./dist/swagger/**/*.js"]
        : ["./src/swagger/**/*.ts"]
};

export const swaggerSpec = swaggerJsdoc(options);