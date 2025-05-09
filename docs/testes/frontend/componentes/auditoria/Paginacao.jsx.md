## Teste do Componente Paginação

### Descrição

**Sistema**  
CinConecta.

**Módulo/Subsistema**  
Interface do Usuário (UI) - Paginação.

**Responsável**  
Wesley Silveira **<@wslc>**

**Data**  
03/03/2025

**Breve descrição**  
Teste para validar a renderização e a funcionalidade de navegação do componente de paginação, garantindo que a exibição das páginas e a navegação entre elas ocorram corretamente, além de verificar se a função setPagina é chamada corretamente nos cliques dos botões.

**Arquivos**

- `frontend/__tests__/componentes/auditoria/Paginacao.test.jsx` 

---

## Testes realizados

| Teste | Ação | Resultado Esperado | Falha |
|-------|------|--------------------|-------|
| 0 | Renderizar o componente Paginacao com as páginas corretas | O título deve ser exibido corretamente na tela. | Não |
| 1 | 	Chamar a função setPagina ao clicar nos botões de navegação | A função setPagina deve ser chamada com os valores de página corretos após os cliques nos botões de navegação. | Não |