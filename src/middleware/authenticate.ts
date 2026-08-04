import { Request, Response, NextFunction } from "express";
import { ERROR_MESSAGES } from "../constante.error";
import { getUser } from "../services/ticket-query";

export function authenticate(request: Request, response: Response, next: NextFunction) {
    const userId = request.header("X-User-Id");
    const password = request.header("X-Password");

    if (!userId || !password) {
        return response.status(401).json({ error: ERROR_MESSAGES.INVALID_CREDENTIALS, });
    }

    const user = getUser(userId);

    if (!user || user.password !== password) {
        return response.status(401).json({ "error": ERROR_MESSAGES.INVALID_CREDENTIALS });
    }

    next();
}