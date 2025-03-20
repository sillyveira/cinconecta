## Teste do Componente Modal

### Descrição

**Sistema**  
CinConecta.

**Módulo/Subsistema**  
Interface do Usuário (UI) - Tela de Analise Geral.

**Responsável**  
Angelina Santos **<@asc8>**

**Data**  
19/03/2025

**Breve descrição**  
Valida se a página de Análise Geral carrega corretamente, sem erros, e exibe os dados disponíveis. Confirma se os cartões "Quantidade total de itens", "Valor estimado do estoque" e "Produtos próximos à validade" mostram corretamente os valores armazenados no banco de dados. Verifica se o botão "Expandir" exibe informações detalhadas sobre produtos próximos à validade.

---

## Testes de Funcionalidade

| ID | Caso de Teste | Passos | Resultado Esperado | Falha |
|-------|------|--------------------|-------|-------|
| 0 | Carregamento da página | 1. Acessar a página de "Análise Geral". | A página deve carregar sem erros e exibir os dados corretamente. | Não |
| 1 | Exibição de dados | 1. Verificar se os cartões "Quantidade total de itens", "Valor estimado do estoque" e "Produtos próximos à validade" exibem os valores corretamente quando há dados. | Os dados devem ser exibidos corretamente, sem valores negativos ou inconsistentes. | Não |
| 2 | Funcionamento do botão "Expandir" | 1. Clicar no botão "Expandir" em "Produtos próximos à validade". | O sistema deve exibir mais detalhes sobre os produtos próximos da validade. | Não |
| 3 | Atualização do gráfico de entrada e saída | 1. Selecionar diferentes períodos no dropdown "3 meses". | O gráfico deve se atualizar corretamente de acordo com o período selecionado. | Não |


## Teste de Usabilidada

| ID | Caso de Teste | Passos | Resultado Esperado | Falha |
|-------|------|--------------------|-------|-------|
| 4 | Responsividade da página | 1. Redimensionar a janela do navegador ou testar em diferentes dispositivos. | A página deve se ajustar corretamente a diferentes tamanhos de tela. | Sim |
| 5 | Legibilidade dos gráficos | 1. Verificar se os rótulos e valores dos gráficos são legíveis. | Os dados devem estar visíveis, sem sobreposições ou cortes. | Não |
| 6 | Feedback visual ao carregar dados | 1. Adicionar produtos e carregar a página e observar como os gráficos carregam. | Os dados devem carregar as informações novas nos gráficos. | Sim |


## Testes de Validação de Dados

| ID | Caso de Teste | Passos | Resultado Esperado | Falha |
|-------|------|--------------------|-------|-------|
| 7 | Exibição correta dos valores | 1. Inserir dados fictícios no banco e acessar a página. | Os valores exibidos devem corresponder aos dados do banco. | Não |
| 8 | Prevenção de valores negativos incorretos | 1. Verificar os gráficos e cartões para possíveis valores negativos inesperados. | Nenhum valor deve ser negativo, a menos que faça sentido. (Ex: estoque não pode ter valor negativo). | Não |
