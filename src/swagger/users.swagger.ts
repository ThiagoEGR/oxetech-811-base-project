
/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Retorna a lista de todos os usuários.
 *     security:
 *       - userAuthentication: []
 *         passwordAuthentication: []
 *     responses:
 *       200:
 *         description: Retorna a lista de todos os usuários.
 *       401:
 *         description: Usuário ou senha inválidos.
 *     tags:
 *       - Usuários
 * 
 */