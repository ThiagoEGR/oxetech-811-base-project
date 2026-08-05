/**
 * @openapi
 * /api/tickets:
 *   get:
 *     summary: Retorna uma lista de tickets de acordo com os filtros informados.
 *     tags:
 *       - Tickets
 *     parameters:
 *       - name: status
 *         in: query
 *         description: Filtra tickets por status (open, in_progress, resolved, closed)
 *         required: false
 *         schema:
 *           type: string
 *           enum: [open, in_progress, resolved, closed]
 *       - name: category
 *         in: query
 *         description: Filtra tickets por categoria (academico, infra, sistemas)
 *         required: false
 *         schema:
 *           type: string
 *           enum: [academico, infra, sistemas]
 *       - name: search
 *         in: query
 *         description: Busca tickets por uma palavra no título, descrição ou categoria
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retorna uma lista de tickets de acordo com os filtros informados.
 */


/**
 * @openapi
 * /api/tickets/summary:
 *   get:
 *     summary: Retorna um resumo dos tickets.
 *     tags:
 *       - Tickets
 *     responses:
 *       200:
 *         description: Retorna um resumo dos tickets.
 */

/**
 * @openapi
 * /api/tickets/{id}:
 *   get:
 *     summary: Retorna um ticket pelo ID, incluindo informações do solicitante, usuário atribuído e comentários.
 *     tags:
 *       - Tickets
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id do ticket
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ticket encontrado.
 *       404:
 *         description: Ticket não encontrado.
 */

/** 
 * @openapi
 * /api/tickets:
 *   post:
 *     summary: Cria um novo ticket com as informações fornecidas.
 *     security:
 *       - userAuthentication: []
 *         passwordAuthentication: []
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
 *                 description: O título do ticket.
 *               description:
 *                 type: string
 *                 description: A descrição detalhada do ticket.
 *               category:
 *                 type: string
 *                 enum: [academico, infra, sistemas]
 *                 description: A categoria do ticket.
 *               requesterId:
 *                 type: string
 *                 description: O ID do usuário que está solicitando o ticket.
 *               assignedToId:
 *                 type: string
 *                 description: O ID do usuário atribuído ao ticket (opcional).
 *           required:
 *              - title
 *              - description
 *              - category
 *              - requesterId
 *     responses:
 *       201:
 *         description: Ticket criado com sucesso.
 *       401:
 *         description: Usuário ou senha inválido.
 *       400:
 *         description: Requisição inválida. Um ou mais campos estão ausentes ou são inválidos. 
 */


/**
 * @openapi
 * /api/tickets/{id}/status:
 *  patch:
 *    summary: Atualiza o status de um ticket.
 *    description: Apenas usuários com a role 'teacher' ou 'support' podem acessar este endpoint.
 *    security:
 *      - userAuthentication: []
 *        passwordAuthentication: []
 *    tags:
 *      - Tickets
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: Idenrificador do ticket a ser atualizado.
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
 *                description: O novo status do ticket.
 *              comment:
 *                type: string
 *                description: Um comentário explicando a mudança de status (necessário se o status for alterado para "closed").
 *          required:
 *            - status
 *    responses:
 *      200:
 *        description: O status do ticket foi atualizado com sucesso.
 *      401:
 *        description: Usuário ou senha inválido.
 *      403:
 *        description: Acesso negado. O usuário não tem permissão para atualizar o status do ticket.
 *      400:
 *        description: Requisição inválida. Um ou mais campos estão ausentes ou são inválidos.
 *      404:
 *        description: Ticket não encontrado.
 */