import { Router } from "express";
import { validateCreateTicket } from "../middleware/validateCreateTicket";
import { patchTicketStatusMiddleware } from "../middleware/ValidatepatchTicketStatus";
import { validateCreateComment } from "../middleware/validateCreateComment";
import { getHealth, getAllUsers, getTickets, getSummary, getTicketById } from "../controllers/ticket-query";
import { postTicket, postTicketComment, patchTicketStatus } from "../controllers/ticket-command";
import { authenticate } from "../middleware/authenticate";
import { authorizeRoles } from "../middleware/authorize-roles";

const router = Router();


router.get("/health", getHealth);
router.get("/users", authenticate, getAllUsers);
router.get("/tickets", getTickets);
router.get("/tickets/summary", getSummary);
router.get("/tickets/:id", getTicketById);

router.post("/tickets", authenticate, validateCreateTicket, postTicket);
router.patch("/tickets/:id/status", authenticate, authorizeRoles("teacher", "support"), patchTicketStatusMiddleware, patchTicketStatus);
router.post("/tickets/:id/comments", authenticate, validateCreateComment, postTicketComment);


export default router;