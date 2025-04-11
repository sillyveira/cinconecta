## Teste Automatizado do OngUserList

### Descrição

**Sistema**  
CinConecta.

**Módulo/Subsistema**  
Interface do Usuário (UI) - OngUserList.

**Responsável**  
Adrielly Alexandre da Silva **<@aas12>**

**Data**  
22/03/2025

**Breve descrição**  
Testes automatizados executados para validar o componente `OngUserList`, verificando sua renderização correta e a exibição das informações do usuário.

---

## Pré-condições

- Projeto configurado corretamente.
- Dependências instaladas (`npm install`).
- Ambiente de testes configurado (`vitest`, `@testing-library/react` e `@testing-library/jest-dom`).
- Código do componente `OngUserList` implementado.

---

## Passos do Teste

| Passo | Ação | Resultado Esperado | Falha |
|-------|------|-------------------|-------|
| 1 | Executar `npm test` no terminal. | Iniciar a suíte de testes. | Não |
| 2 | Testar renderização do componente `OngUserList`. | O componente é renderizado corretamente. | Não |
| 3 | Verificar exibição do nome do usuário. | O nome do usuário é exibido corretamente. | Não |
| 4 | Verificar exibição do email do usuário. | O email do usuário é exibido corretamente. | Não |
| 5 | Verificar exibição da data do último login formatada. | A data do último login é exibida no formato correto (pt-BR). | Não |
| 6 | Verificar a presença dos separadores visuais. | Dois separadores estão presentes no componente. | Não |
| 7 | Verificar logs do terminal para status dos testes. | Todos os testes passam. | Não |

---

## Pós-condições

- O componente `OngUserList` é renderizado corretamente.
- As informações do usuário (nome, email e data do último login) são exibidas corretamente.
- Os separadores visuais estão presentes e corretos.
- Nenhum erro ou falha identificada nos testes.

---

## Comentários

- **Sem comentários.**