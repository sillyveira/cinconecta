## Teste do Componente Modal

### Descrição

**Sistema**  
CinConecta.

**Módulo/Subsistema**  
Interface do Usuário (UI) - Modal de Adição.

**Responsável**  
Angelina Santos **<@asc8>**

**Data**  
19/03/2025

**Breve descrição**  
Garante que ao clicar no botão de adicionar produto, o modal abre corretamente, exibindo todos os campos necessários. Verifica se o sistema impede o envio do formulário caso os campos obrigatórios (Nome e Quantidade) não sejam preenchidos. Assegura que ao preencher todos os campos corretamente e clicar em "Adicionar", o produto é salvo e o modal é fechado. Verifica se o botão de edição de categoria funciona corretamente, permitindo a seleção ou adição de uma nova categoria.

---

## Testes de Funcionalidade

| ID | Caso de Teste | Passos | Resultado Esperado | Falha |
|-------|------|--------------------|-------|-------|
| 0 | Abrir e fechar o modal | 1. Clicar no botão para adicionar um novo produto.
2. Verificar se o modal abre corretamente.
3. Clicar no botão "X" no canto superior direito. | O modal deve abrir e fechar corretamente. | Não |
| 1 | Preenchimento obrigatório | 1. Deixar os campos obrigatórios (Nome e Quantidade) vazios.
2. Clicar em "Adicionar". | O sistema deve exibir mensagens informando que os campos obrigatórios precisam ser preenchidos. | Sim |
| 2 | Seleção de categoria | 1. Clicar no botão de edição da categoria.
2. Escolher uma categoria.
3. Confirmar a seleção. | A categoria deve ser selecionada corretamente e aparecer no campo. | Não |
| 3 | Adicionar um produto válido | 1. Preencher todos os campos corretamente.
2. Clicar em "Adicionar". | O sistema deve salvar o produto e fechar o modal. | Não |


## Teste de Usabilidada

| ID | Caso de Teste | Passos | Resultado Esperado | Falha |
|-------|------|--------------------|-------|-------|
| 4 | Placeholder e legendas | 1. Verificar se cada campo tem um placeholder informativo. | Os placeholders devem indicar o que deve ser preenchido. | Não |
| 5 | Botão "Adicionar" desativado sem dados | 1. Abrir o modal e não preencher nenhum campo. | O botão "Adicionar" deve permanecer desativado até que os campos obrigatórios sejam preenchidos. | Não |


## Testes de Validação de Dados

| ID | Caso de Teste | Passos | Resultado Esperado | Falha |
|-------|------|--------------------|-------|-------|
| 6 | Inserção de caracteres inválidos | 1. Digitar caracteres especiais no campo "Nome". |O sistema deve impedir caracteres inválidos. | Sim |
| 7 | Inserção de quantidade negativa | 1. Inserir um valor negativo no campo "Quantidade". | O sistema deve exibir uma mensagem de erro. | Não |
| 8 | Formato do preço | 1. Inserir um valor inválido no campo "Preço" (ex: "abc", "-10"). | O sistema deve impedir a inserção e exibir um aviso. | Não |
