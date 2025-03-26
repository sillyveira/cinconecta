## Teste do Componente Tela de Auditoria

### Descrição

**Sistema**  
CinConecta.

**Módulo/Subsistema**  
Interface do Usuário (UI) - Tela de Auditoria.

**Responsável**  
Carlos Alexandre **<@cassj>**

**Data**  
17/03/2025

**Breve descrição**  
Teste para validar a funcionalidade da Tela de Auditoria, garantindo que os botões e filtros funcionem corretamente, além de verificar se os modais são ativados conforme esperado.

## Testes realizados

| Teste | Ação | Resultado Esperado | Falha |
|-------|------|--------------------|-------|
| 0 | Clicar nos botões de navegação | Os botões devem funcionar corretamente. | Não |
| 1 | Clicar nos botões para ativar os modais | Os modais devem ser ativados corretamente. | Não |
| 2 | Definir a mesma data inicial e final no filtro | O sistema deve exibir os itens corretamente. | Sim |
| 3 | Inserir uma data inválida nos textfields | O sistema deve impedir a inserção de datas inválidas. | Sim |
| 4 | Selecionar uma categoria | O espaço de seleção deve mudar e mostrar a opção selecionada. | Sim |

