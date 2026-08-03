import { Request, Response, NextFunction } from "express";
import { getUser } from "../services/ticket-query";
import { ERROR_MESSAGES } from "../constante.error";

export function authorizeUsers(request: Request, response: Response, next: NextFunction) {
    const userId = request.header("X-User-Id");
    const password = request.header("X-Password");


    if (!userId || !password) {
        return response.status(401).json({
            error: ERROR_MESSAGES.INVALID_CREDENTIALS,
        });
    }

    const user = getUser(userId);

    if (!user || user.password !== password) {
        response.status(401).json({ "error": ERROR_MESSAGES.INVALID_CREDENTIALS });
        return;
    }

    if (user.role !== "support" && user.role !== "teacher") {
        response.status(403).json({ "error": ERROR_MESSAGES.FORBIDDEN });
        return;
    }

    next();
}