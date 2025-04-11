## Teste do Componente Botão

### Descrição

**Sistema**  
CinConecta.

**Módulo/Subsistema**  
Interface do Usuário (UI) - Botão.

**Responsável**  
Angelina Santos **<@asc8>**

**Data**  
13/03/2025

**Breve descrição**  
Teste para validar a renderização correta do componente Botao, garantindo que o texto seja exibido corretamente, que as classes do TailwindCSS sejam aplicadas conforme esperado e a interação com cliques funcione corretamente, incluindo o comportamento quando o botão está desabilitado.

**Arquivos**

- `frontend/__tests__/componentes/gerais/Botao.test.jsx` 

---

## Testes realizados

| Teste | Ação | Resultado Esperado | Falha |
|-------|------|--------------------|-------|
| 0 | Renderizar o botão com um texto específico. | O botão deve exibir o texto corretamente | Não |
| 1 | Aplicar uma classe do TailwindCSS via className | O botão deve conter a classe aplicada | Não |
| 2 | Clique no botão ativo |A função onClick deve ser chamada | Não |
| 3 | Clique no botão desativado | A função onCliClicar no botão quando disabled=true | Não |
| 4 | Estilização do botão ativo | O botão deve conter a classe "bg-cor-primaria" | Não |
| 5 | Estilização do botão desativado | O botão deve conter a classe "cursor-not-allowed" | Não |