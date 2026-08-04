/**
 * @openapi
 * /api/tickets/{id}/comments:
 *   post:
 *     summary: Add a comment to a ticket
 *     description: Adds a new comment to an existing ticket.
 *     tags:
 *       - Tickets
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Ticket identifier
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               authorId:
 *                 type: string
 *                 description: Identifier of the comment author.
 *               message:
 *                 type: string
 *                 description: Comment text.
 *             required:
 *               - authorId
 *               - message
 *     responses:
 *       201:
 *         description: Comment added successfully.
 *       400:
 *         description: Invalid request.
 *       404:
 *         description: Ticket not found.
 */