# Technical Decisions

## Introdução

Este documento descreve as principais decisões técnicas adotadas durante a evolução da aplicação ao longo da disciplina de Engenharia de Software da Oxetech Academy. Cada decisão foi tomada buscando melhorar a organização da codebase, a qualidade do código e a facilidade de manutenção da aplicação.

## Arquitetura

Uma das principais mudanças realizadas na API foi a reorganização da arquitetura do projeto. Inicialmente, o arquivo de rotas concentrava diversas responsabilidades além da definição dos endpoints. Entre elas estavam o acesso ao banco de dados, validações de entrada, regras de negócio e a construção das respostas da aplicação.

Essa abordagem dificultava a manutenção do código, aumentava o acoplamento entre os componentes e tornava a evolução da aplicação mais complexa, já que qualquer alteração exigia modificações em arquivos responsáveis por diversas funcionalidades.

Para resolver esse problema, a aplicação foi reorganizada em camadas, separando cada responsabilidade em um componente específico:

Routes: responsáveis apenas pelo mapeamento das rotas e associação dos middlewares e controllers.
Controllers: responsáveis por receber a requisição HTTP, delegar a execução da lógica para os serviços e retornar a resposta apropriada ao cliente.
Services: responsáveis por implementar as regras de negócio da aplicação.
Middlewares: responsáveis por validações, autenticação e autorização antes da execução das regras de negócio.

Com essa reorganização, a lógica de negócio deixou de ficar espalhada pelos arquivos de rotas e passou a ser concentrada na camada de serviços. Essa separação tornou a aplicação mais organizada, reduziu o acoplamento entre os componentes e facilitou a manutenção e evolução do projeto.


## Refatoração

### Criação de Tickets

Contexto

A implementação original concentrava toda a lógica de criação de chamados em uma única função. Além de instanciar o ticket, essa função também era responsável por definir sua prioridade, tornando o código mais difícil de compreender, manter e estender.

Decisão

Para tornar a criação dos chamados mais organizada e modular, a responsabilidade foi dividida em componentes específicos.

Inicialmente, foi criada a classe Ticket, responsável por representar a entidade da aplicação e encapsular seus atributos. Essa mudança tornou a estrutura do objeto mais explícita e facilitou sua utilização em diferentes partes do sistema.

Em seguida, foi implementada a TicketFactory, centralizando o processo de criação dos chamados. Dessa forma, toda a lógica necessária para construir um ticket passou a ficar em um único ponto da aplicação, evitando duplicação de código e facilitando futuras alterações no processo de criação.

Além disso, o cálculo da prioridade foi desacoplado da criação do ticket por meio da interface TicketPriorityPolicy. Essa interface define um contrato para as regras de priorização, permitindo que diferentes estratégias sejam implementadas sem modificar a lógica de criação dos chamados.

### Gerenciamento da Persistência

Para melhorar a organização da aplicação, foi criada a classe DatabaseManager, responsável por centralizar o acesso ao banco de dados. A utilização do padrão Singleton garante que toda a aplicação compartilhe a mesma instância desse componente, tornando o gerenciamento da persistência mais organizado e evitando a duplicação da lógica de acesso aos dados.

### Separação entre Consultas e Comandos

A lógica de negócio foi dividida entre serviços de consulta e de comando. O TicketQueryService passou a reunir operações de leitura, como listagem, filtros e obtenção de detalhes dos chamados. Já o TicketCommandService ficou responsável pelas operações que modificam o estado da aplicação, como criação e atualização de tickets. Essa separação tornou os serviços mais coesos.


## Validação de Dados

A implementação original realizava poucas validações sobre os dados recebidos pela API, permitindo que informações inválidas fossem armazenadas na aplicação. Por exemplo, era possível cadastrar chamados com categorias inexistentes ou informar valores incompatíveis com os esperados pelo sistema.

Para aumentar a confiabilidade da aplicação, foram implementadas validações de entrada para os principais campos das requisições. Essas validações verificam se os dados obrigatórios foram informados, se os valores pertencem aos conjuntos permitidos, como categorias e status, e se o formato das informações está de acordo com o esperado antes da execução da lógica de negócio.

Com essa abordagem, a API passou a rejeitar requisições inválidas logo no início do processamento, garantindo maior consistência dos dados armazenados e fornecendo mensagens de erro mais claras para os clientes da aplicação.


## Autenticação e Autorização

Na implementação inicial, a API não possuía mecanismos de autenticação ou controle de acesso. Com isso, qualquer cliente que conhecesse os endpoints podia consultar informações dos usuários e realizar operações em nome de qualquer pessoa, como criar chamados utilizando o identificador de outro usuário.

Para reduzir esse problema, foram implementados mecanismos básicos de autenticação e autorização por meio de middlewares. A autenticação passou a validar a identidade do usuário antes do processamento da requisição, enquanto a autorização verifica se o usuário possui permissão para acessar determinados recursos ou executar operações específicas.

Embora a solução ainda seja simples e não utilize tecnologias como JWT, ela representa uma evolução importante na segurança da aplicação. Além de restringir o acesso aos recursos protegidos, essa implementação estabelece uma base para a adoção de mecanismos de autenticação mais robustos em futuras versões.

## Testes

A implementação dos testes foi uma das etapas mais desafiadoras do projeto, principalmente porque a codebase inicial não possuía qualquer teste automatizado que pudesse servir como referência. Foi necessário definir quais comportamentos eram mais importantes de validar e estruturar uma estratégia de testes para a aplicação.

Foram implementados testes unitários para o gerenciamento da persistência dos dados e testes de integração para validar os principais fluxos dos endpoints da API. Dessa forma, foi possível verificar tanto o funcionamento de componentes específicos quanto a integração entre as camadas da aplicação.

Como os testes de integração modificavam o banco de dados utilizado pela aplicação, foi criada uma cópia do arquivo de dados juntamente com um template para restaurar seu estado inicial antes de cada execução. Além disso, a configuração do ambiente de testes foi ajustada para executar os testes sequencialmente, evitando que alterações realizadas por um teste interferissem nos resultados dos demais.

Essa estratégia tornou a execução dos testes mais confiável e garantiu que todos fossem executados em um ambiente previsível e isolado.

## Documentação da API

Para facilitar o uso da API, foi implementada uma documentação utilizando Swagger (OpenAPI). A documentação descreve os endpoints disponíveis, parâmetros, corpos das requisições, respostas e códigos de retorno, permitindo que a API seja consultada e testada diretamente pelo navegador.

Além de facilitar o desenvolvimento e os testes, a documentação torna a utilização da API mais simples para outros desenvolvedores e reduz a necessidade de consultar o código para entender seu funcionamento.


## Docker

Para facilitar a execução da aplicação em diferentes ambientes, foi adicionada a containerização utilizando Docker. Com isso, a API pode ser executada sem a necessidade de configurar manualmente todas as dependências do projeto, bastando construir a imagem e iniciar o contêiner.

Embora a configuração seja simples, ela torna o ambiente de execução mais consistente e facilita tanto o desenvolvimento quanto a avaliação da aplicação.


## Considerações Finais

As decisões técnicas apresentadas neste documento tiveram como objetivo tornar a aplicação mais organizada, modular e de fácil manutenção. Ao longo do desenvolvimento, foram realizadas melhorias na arquitetura, na organização da lógica de negócio, na validação dos dados, na segurança, nos testes automatizados, na documentação da API e na execução da aplicação com Docker.

Embora ainda existam oportunidades de evolução, as mudanças implementadas representam um avanço significativo em relação à codebase inicial e estabelecem uma base mais sólida para futuras 