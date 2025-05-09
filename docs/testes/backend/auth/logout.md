## 0001 - Teste de autenticação

### Descrição

**Sistema**  
CinConecta.

**Módulo/Subsistema**  
Autenticação.

**Responsável**  
Wesley Silveira **<@wslc>**

**Data**  
03/03/2025

**Breve descrição**  
Teste para validar a funcionalidade de logout, garantindo que a sessão do usuário seja revogada corretamente e que o cookie da sessão seja removido.

**Arquivos**

- `backend/tests/controllers/userController.test.js` 
---

## Pré-condições

- O endpoint de logout (POST /usuarios/logout) deve estar acessível.
- O usuário deve estar autenticado e possuir uma sessão ativa.
---
## Testes realizados

| Teste | Ação | Resultado Esperado | Falha |
|-------|------|--------------------|-------|
| 0 | Criar um usuário e realizar login para gerar uma sessão ativa. | O sistema deve retornar status 200 e um token de sessão. | Não |
| 1 | Enviar requisição POST para /usuarios/logout com um token válido. | O sistema deve revogar a sessão, limpar o cookie e retornar status 200. | Não |
| 2 | Verificar se a sessão foi removida do banco de dados após o logout. | Nenhuma sessão deve existir para o usuário após o logout. | Não |

---

## Comentários

O teste garante que o sistema revoga corretamente a sessão do usuário e remove o cookie de autenticação. Isso impede que um usuário já deslogado continue acessando o sistema sem uma nova autenticação. O tratamento de erros também foi verificado para garantir que, caso ocorra uma falha na revogação da sessão, o erro seja tratado corretamente.

