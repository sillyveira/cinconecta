## Teste do Componente Modal

### Descrição

**Sistema**  
CinConecta.

**Módulo/Subsistema**  
Interface do Usuário (UI) - Tela de Login.

**Responsável**  
Angelina Santos **<@asc8>**

**Data**  
19/03/2025

**Breve descrição**  
Verifica se a tela de login carrega corretamente, exibindo os campos de email e senha, o botão de login e sem erros visuais ou funcionais. Garante que o sistema permite o login ao inserir um email e senha válidos, redirecionando corretamente para a página inicial.

---

## Testes de Funcionalidade

| ID | Caso de Teste | Passos | Resultado Esperado | Falha |
|-------|------|--------------------|-------|-------|
| 0 | Login com credenciais corretas | 1. Inserir um email válido.
2. Inserir a senha correta.
3. Clicar no botão "Entrar". | O usuário é autenticado e redirecionado para a página principal. | Não |
| 1 | Login com email inválido | 1. Inserir um email inválido (ex: "teste@com").
2. Inserir uma senha qualquer.
3. Clicar em "Entrar". | Mensagem de erro informando que o email é inválido. | Não |
| 2 | Login com senha incorreta | 1. Inserir um email válido.
2. Inserir uma senha incorreta.
3. Clicar em "Entrar". | Mensagem de erro informando que a senha está errada. | Não |
| 3 | Campos obrigatórios | 1. Deixar os campos vazios.
2. Clicar em "Entrar". | O sistema deve exibir uma mensagem de erro informando que os campos são obrigatórios. | Não |


## Teste de Usabilidada

| ID | Caso de Teste | Passos | Resultado Esperado | Falha |
|-------|------|--------------------|-------|-------|
| 4 | Placeholder visível nos campos | 1. Verificar se os campos de "Email" e "Senha" possuem placeholders visíveis. | Os placeholders devem orientar o usuário sobre o que inserir. | Não |


## Testes de Segurança

| ID | Caso de Teste | Passos | Resultado Esperado | Falha |
|-------|------|--------------------|-------|-------|
| 5 | Senha oculta | 1. Digitar uma senha no campo correspondente. | A senha deve estar oculta por asteriscos ("••••••"). | Não |
