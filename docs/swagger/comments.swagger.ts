/**
 * @openapi
 * /api/tickets/{id}/comments:
 *   post:
 *     summary: Adiciona um novo comentário a um ticket existente.
 *     security:
 *       - userAuthentication: []
 *         passwordAuthentication: []
 *     tags:
 *       - Tickets
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id do ticket
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
 *                 description: Id do autor do comentário.
 *               message:
 *                 type: string
 *                 description: Conteúdo do comentário.
 *             required:
 *               - authorId
 *               - message
 *     responses:
 *       201:
 *         description: Comentário adicionado com sucesso.
 *       400:
 *         description: Requisição inválida. Um ou mais campos estão ausentes ou são inválidos.
 *       401:
 *         description: Usuário ou senha inválidos.
 *       404:
 *         description: Ticket não encontrado.
 */