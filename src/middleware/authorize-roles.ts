import { Request, Response, NextFunction } from "express";
import { getUser } from "../services/ticket-query";
import { ERROR_MESSAGES } from "../constante.error";
import { UserRole } from "../types";

export function authorizeRoles(...roles: UserRole[]) {
    return (request: Request, response: Response, next: NextFunction,) => {
        const userId = request.header("X-User-Id");

        if (!userId) {
            return response.status(401).json({
                error: ERROR_MESSAGES.INVALID_CREDENTIALS,
            });
        }

        const user = getUser(userId);

        if (!user || !roles.includes(user.role)) {
            return response.status(403).json({
                error: ERROR_MESSAGES.FORBIDDEN,
            });
        }

        next();
    };
}