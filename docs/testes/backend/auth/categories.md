# Teste do Controller de Categorias

## Descrição

**Sistema:**  
CinConecta

**Módulo/Subsistema:**  
Backend - Controller de Categorias

**Responsável:**  
Iranildo Felipe <@ifas>

**Data:**  
13/03/2025

**Breve Descrição:**  
Testes para validar o funcionamento dos métodos do controller de categorias, garantindo que as operações de consulta, criação, atualização e deleção se comportem conforme o esperado. Cada suite de testes aborda cenários positivos e negativos, incluindo verificações de resposta, tratamento de erros e simulação de falhas na conexão com o banco de dados.

**Arquivos:**  
- `backend/__tests__/controllers/category.test.js`

---

## Testes Realizados

### 1. Testes de Consulta de Categorias

| Teste | Ação                                                              | Resultado Esperado                                                              | Falha |
|-------|-------------------------------------------------------------------|---------------------------------------------------------------------------------|-------|
| 0     | Renderizar categorias com uma categoria cadastrada                | Retorno com status 200 e JSON contendo mensagem de sucesso e dados da categoria | Não   |
| 1     | Consulta quando não há categorias cadastradas para a ONG           | Retorno com status 200 e JSON contendo mensagem de sucesso e lista vazia         | Não   |
| 2     | Consulta utilizando um `ongId` inexistente                         | Retorno com status 404 e JSON com mensagem "Ong não encontrada."                | Não   |

---

### 2. Testes de Criação de Categorias

| Teste | Ação                                                            | Resultado Esperado                                                                                      | Falha |
|-------|-----------------------------------------------------------------|---------------------------------------------------------------------------------------------------------|-------|
| 0     | Criação de categoria com dados válidos                          | Retorno com status 200 e JSON com mensagem "Categoria criada com sucesso!"                              | Não   |
| 1     | Criação de categoria com nome vazio                             | Retorno com status 400 e JSON com mensagem "Nome e/ou ID da ONG não podem ser nulos."                     | Não   |
| 2     | Criação de categoria sem informar o ID da ONG                   | Retorno com status 400 e JSON com mensagem "Nome e/ou ID da ONG não podem ser nulos."                     | Não   |
| 3     | Simulação de erro na conexão com o banco durante a criação        | Retorno com status 400 e JSON de erro (após fechamento da conexão, simulando falha)                       | Não   |

---

### 3. Testes de Atualização de Categorias

| Teste | Ação                                                               | Resultado Esperado                                                         | Falha |
|-------|--------------------------------------------------------------------|----------------------------------------------------------------------------|-------|
| 0     | Atualizar o nome da categoria com dados válidos                     | Retorno com status 200 e JSON com mensagem "Categoria atualizada com sucesso!" | Não   |
| 1     | Atualização com `id_categoria` inválido (nulo)                        | Retorno com status 400 e JSON com mensagem "ID inválido."                   | Não   |
| 2     | Atualização com nome da categoria nulo                                | Retorno com status 400 e JSON com mensagem "Nome precisa ser preenchido."   | Não   |
| 3     | Simulação de erro na conexão com o banco durante a atualização          | Retorno com status 400 e JSON de erro (após fechamento da conexão)            | Não   |

---

### 4. Testes de Deleção de Categorias

| Teste | Ação                                                              | Resultado Esperado                                                                  | Falha |
|-------|-------------------------------------------------------------------|-------------------------------------------------------------------------------------|-------|
| 0     | Deleção de categoria com dados válidos                             | Retorno com status 200 e JSON com mensagem "Categoria deletada com sucesso."         | Não   |
| 1     | Deleção utilizando `id_categoria` inválido (nulo)                    | Retorno com status 400 e JSON com mensagem "ID inválido."                            | Não   |
| 2     | Simulação de erro na conexão com o banco durante a deleção           | Retorno com status 400 e JSON de erro (após fechamento da conexão)                   | Não   |

---

## Considerações

- **Isolamento dos Testes:**  
  Cada suite realiza operações de setup (com `beforeEach`) e teardown (com `afterEach`) para limpar e preparar o ambiente, garantindo a independência dos testes.

- **Cobertura de Cenários:**  
  Os testes abrangem tanto os cenários de sucesso quanto os de falha, como a ausência de dados obrigatórios e simulação de problemas na conexão com o banco.

- **Feedback de Erros:**  
  As mensagens de erro e os códigos de status HTTP retornados são verificados para assegurar que o controller lide corretamente com as falhas e condições inesperadas.

---

## Conclusão

Os testes do controller de categorias foram estruturados para garantir a confiabilidade das operações de CRUD (consulta, criação, atualização e deleção). Cada cenário foi pensado para validar não só a funcionalidade principal, mas também a resiliência do sistema frente a erros e entradas inválidas.
Uma observação: Foram adicionadas aos métodos do controller verificações de existência das ongs no banco de dados através de seus ids após uma falha de teste.
