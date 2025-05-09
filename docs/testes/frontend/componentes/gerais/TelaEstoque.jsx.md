## Teste da Tela Estoque

### Descrição

**Sistema**  
CinConecta.

**Módulo/Subsistema**  
Interface do Usuário (UI) - Tela Estoque.

**Responsável**  
Adrielly Alexandre da Silva **<@aas12>**

**Data**  
19/03/2025

**Breve Descrição**  
Teste manual para validar o funcionamento da tela de estoque, garantindo que todos os campos de entrada, botões e interações estejam funcionando corretamente, de acordo com as especificações e limites de usabilidade.

**Arquivos**  
- `frontend/docs/testes/frontend/componentes/auditoria/TelaEstoque.jsx.md`

---

## Testes Realizados

| Teste | Ação                                                                | Resultado Esperado                                                                                                                                                 | Falha |
| ----- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| 0     | Verificar formatação dos IDs dos produtos                           | A formatação de IDs dos produtos está funcionando adequadamente.                                                                                                   | Não   |
| 1     | Testar campos obrigatórios (nome e quantidade)                      | Apenas os campos de "nome" e "quantidade" são obrigatórios; outros campos devem exibir N/A ou ficar vazios.                                                        | Não   |
| 2     | Limitação de caracteres nos campos "descrição" e "nome"             | O limite máximo de caracteres nos campos de "descrição" e "nome" está funcionando corretamente. Mensagens correspondentes estão sendo exibidas.                    | Não   |
| 3     | Testar comportamento do campo "quantidade" com limite máximo        | Quando o campo "quantidade" atinge o limite máximo de caracteres, ele exibe: "A quantidade deve ser um número inteiro". O que não condiz com a limitação atingida. | Sim   |
| 4     | Verificar campo "preço"                                             | O campo "preço" não tem limite de caracteres.                                                                                                                      | Sim   |
| 5     | Verificar campo "validade"                                          | O campo "validade" permite datas anteriores, como 01/01/2000.                                                                                                      | Sim   |
| 6     | Verificar comportamento do campo "quantidade"                       | O campo "quantidade" só aceita números inteiros.                                                                                                                   | Não   |
| 7     | Testar campo "preço" com int e float                                | O campo "preço" aceita tanto números inteiros quanto flutuantes, ajustando ponto e vírgula corretamente.                                                           | Não   |
| 8     | Verificar adição de produtos com campos iguais                      | O sistema permite adicionar produtos com campos idênticos, diferenciados apenas pelo ID.                                                                           | Não   |
| 9     | Testar botões de "Seleção Geral" e "ID"                             | Os botões de "Seleção Geral" e "ID" funcionam adequadamente.                                                                                                       | Não   |
| 10    | Verificar funcionamento dos botões de Adicionar, Atualizar e Apagar | Os botões de Adicionar, Atualizar e Apagar funcionam corretamente.                                                                                                 | Não   |
| 11    | Testar aba de Pesquisa e Botão de Filtro                            | A aba de Pesquisa e o Botão de Filtro funcionam corretamente.                                                                                                      | Não   |
| 12    | Verificar esquema de exibição de linhas por página e navegação      | O esquema de exibição de linhas por página e a navegação entre as páginas funcionam adequadamente.                                                                 | Não   |

---

## Comentários

- O **campo "quantidade" exibe a mensagem incorreta ao atingir o limite de caracteres**, revisar a lógica que valida o tipo e o comprimento do valor inserido. A mensagem "A quantidade deve ser um número inteiro" pode ser gerada erroneamente devido a um tratamento inadequado de limites.
- No caso do **campo "preço", se ele aceitar valores sem limitação**, é necessário garantir que esse comportamento não afete a integridade dos dados de preços no sistema. Uma validação adicional pode ser considerada para garantir a coerência nos dados inseridos.
- O **campo "validade" permitindo datas anteriores é um comportamento inadequado**, é necessário implementar uma validação para impedir datas inválidas.
