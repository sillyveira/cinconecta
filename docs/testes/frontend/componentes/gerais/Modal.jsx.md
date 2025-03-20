## Teste do Componente Modal

### Descrição

**Sistema**  
CinConecta.

**Módulo/Subsistema**  
Interface do Usuário (UI) - Modal.

**Responsável**  
Angelina Santos **<@asc8>**

**Data**  
13/03/2025

**Breve descrição**  
Teste para validar a renderização correta do componente Modal, garantindo que o título e o conteúdo sejam exibidos corretamente quando o modal estiver aberto, que ele não seja renderizado quando fechado e que a função de fechamento seja acionada corretamente ao clicar no botão "x".

**Arquivos**

- `frontend/__tests__/componentes/gerais/Modal.test.jsx` 

---

## Testes realizados

| Teste | Ação | Resultado Esperado | Falha |
|-------|------|--------------------|-------|
| 0 | Renderizar o modal aberto | Definir isOpen=true, o título e o conteúdo do modal são exibidos corretamente | Não |
| 1 | Renderizar o modal fechado | Definir isOpen=false, o modal não deve ser renderizado na tela | Não |
| 2 | Clicar no botão de fechar ("x") | A função onClose deve ser chamada corretamente | Não |