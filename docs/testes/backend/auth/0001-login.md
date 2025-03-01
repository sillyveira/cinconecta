## 0001 - Teste de autenticação

### Descrição

**Sistema**  
CinConecta.

**Módulo/Subsistema**  
Autenticação.

**Responsável**  
Wesley Silveira **<@wslc>**

**Data**  
01/03/2025

**Breve descrição**  
Teste para validar a funcionalidade de login e registro, verificando diferentes cenários, como login bem-sucedido, login com sessão ativa, falha por credenciais inválidas e registro de novos usuários com ONG existente ou não.

**Arquivos**

- `backend/tests/controllers/authController.test.js` 
- `backend/tests/api/api.test.js` 
---

## Pré-condições

- O endpoint de login (POST usuarios/login) deve estar acessível.
- O login e registro serão feitos ao endpoint de login.
---
## Testes realizados

| Teste | Ação | Resultado Esperado | Falha |
|-------|------|--------------------|-------|
| 0 | Teste com a API do ConectaRecife | O sistema deve retornar 200 para credenciais válidas e 401 para credenciais inválidas | Não |
| 1 | Enviar requisição POST para `/usuarios/login` com credenciais inválidas. | O sistema deve retornar status 404 e a mensagem "Credenciais inválidas". | Não |
| 2 | Registro com novo usuário e nova ONG. | O sistema deve retornar status 200 e os dados do usuário registrado, incluindo nome, e-mail, nome da ONG, cookie da sessão e um registro na auditoria. | Não |
| 3 | Registro com novo usuário e ONG pré-existente. | O sistema deve retornar status 200 e os dados do usuário registrado, incluindo nome, e-mail, nome da ONG, cookie da sessão e um registro na auditoria de registro. | Não |
| 4 | Login de um usuário existente sem sessão prévia. | O sistema deve retornar status 200 e os dados do usuário logado, incluindo nome, e-mail, nome da ONG, cookie da sessão e um registro na auditoria de login. | Não |
| 5 | Login de um usuário existente com sessão prévia. | O sistema deve retornar status 200 e os dados do usuário logado, incluindo nome, e-mail, nome da ONG e o cookie da sessão prévia. | Não |


---

## Comentários

Um erro foi descoberto e resolvido com esse teste. O tratamento de erros para a falha na conexão com a API não estava acontecendo da forma que deveria.


