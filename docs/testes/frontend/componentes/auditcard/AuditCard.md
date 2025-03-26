## Teste do AuditCard

### Descrição

**Sistema**  
CinConecta.

**Módulo/Subsistema**  
Interface do Usuário (UI) - AuditCard

**Responsável**  
Carlos Alexandre **<@cassj>**

**Data**  
17/03/2025

**Breve descrição**  
Testes unitários para verificar se o auditcard está exibindo todas as informações necessárias e se o botão funciona.

## Testes realizados

| Teste | Ação | Resultado Esperado | Falha |
|-------|------|--------------------|-------|
| 0 | Renderiza o AuditCard com título, horário e data | O título, horário e data devem ser exibidos corretamente na tela. | Não |
| 1 | Clicar no botão de info | A função `funcaoClique` deve ser chamada corretamente. | Não |
