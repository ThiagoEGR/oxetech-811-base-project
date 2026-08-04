/**
 * @openapi
 * /api/tickets:
 *   get:
 *     summary: Get a list of tickets
 *     description: Returns a list of tickets.
 *     tags:
 *       - Tickets
 *     parameters:
 *       - name: status
 *         in: query
 *         description: Filter tickets by status (open, in_progress, resolved, closed)
 *         required: false
 *         schema:
 *           type: string
 *           enum: [open, in_progress, resolved, closed]
 *       - name: category
 *         in: query
 *         description: Filter tickets by category (academico, infra, sistemas)
 *         required: false
 *         schema:
 *           type: string
 *           enum: [academico, infra, sistemas]
 *       - name: search
 *         in: query
 *         description: Search tickets by a word in the title, description or category
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of tickets.
 */


/**
 * @openapi
 * /api/tickets/summary:
 *   get:
 *     summary: Get ticket summary
 *     description: Returns a summary of tickets.
 *     tags:
 *       - Tickets
 *     responses:
 *       200:
 *         description: A summary of tickets.
 */

/**
 * @openapi
 * /api/tickets/{id}:
 *   get:
 *     summary: Get a ticket by ID
 *     description: Returns a ticket with requester, assigned user and comments.
 *     tags:
 *       - Tickets
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Ticket identifier
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ticket found.
 *       404:
 *         description: Ticket not found.
 */

/** 
 * @openapi
 * /api/tickets:
 *   post:
 *     summary: Create a new ticket
 *     description: Creates a new ticket with the provided information.
 *     tags:
 *       - Tickets
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the ticket.
 *               description:
 *                 type: string
 *                 description: The detailed description of the ticket.
 *               category:
 *                 type: string
 *                 enum: [academico, infra, sistemas]
 *                 description: The category of the ticket.
 *               requesterId:
 *                 type: string
 *                 description: The ID of the user requesting the ticket.
 *               assignedToId:
 *                 type: string
 *                 description: The ID of the user assigned to the ticket (optional).
 *           required:
 *              - title
 *              - description
 *              - category
 *              - requesterId
 *     responses:
 *       201:
 *         description: Ticket created successfully.
 *       400:
 *         description: Bad request. Missing or invalid fields.
*/

/**
 * @openapi
 * /api/tickets/{id}/status:
 *  patch:
 *    summary: Update ticket status
 *    description: Updates the status of a ticket.
 *    tags:
 *      - Tickets
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: Ticket identifier
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              status:
 *                type: string
 *                enum: [open, in_progress, resolved, closed]
 *                description: The new status of the ticket.
 *              comment:
 *                type: string
 *                description: Required when closing a ticket. A comment explaining the reason for closing the ticket.
 *          required:
 *            - status
 *    responses:
 *      200:
 *        description: Ticket status updated successfully.
 *      400:
 *        description: Bad request. Missing or invalid fields.
 *      404:
 *        description: Ticket not found.
 */