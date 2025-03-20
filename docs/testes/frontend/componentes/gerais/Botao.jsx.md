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

| ID | Teste | Ação | Resultado Esperado | Falha |
|-------|------|--------------------|-------|
| 0 | Renderizar de tesxto | Renderizar o botão com um texto específicoa. | O botão deve exibir o texto corretamente | Não |
| 1 | Aplicação de classe CSS | Passar uma classe TailwindCSS via className. | O botão deve conter a classe aplicada | Não |
| 2 | Clique no botão ativo | Clicar no botão quando habilitado | A função onClick deve ser chamada | Não |
| 3 | Clique no botão desativado | A função onCliClicar no botão quando disabled=true | A função onClick não deve ser chamada | Não |
| 4 | Estilização do botão desativado | Definir disabled=true | O botão deve conter a classe "cursor-not-allowed" | Não |
| 5 | Estilização do botão ativo | Definir ativo=true | O botão deve conter a classe "bg-cor-primaria" | Não |