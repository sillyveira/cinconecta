## Teste do Modal Categorias

### Descrição

**Sistema**  
CinConecta.

**Módulo/Subsistema**  
Interface do Usuário (UI) - Modal Categorias.

**Responsável**  
Adrielly Alexandre da Silva **<@aas12>**

**Data**  
19/03/2025

**Breve Descrição**  
Teste manual para validar o funcionamento do Modal de Categorias, garantindo que seja possível editar, excluir e criar categorias adequadamente, com a limitação de caracteres funcionando corretamente.

**Arquivos**  
- `frontend/docs/testes/frontend/componentes/gerais/ModalCategorias.jsx.md`

---

## Testes Realizados

| Teste | Ação                                                | Resultado Esperado                                                                                     | Falha |
| ----- | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ----- |
| 0     | Editar categorias pré-estabelecidas                 | O sistema deve permitir a edição adequada de categorias pré-estabelecidas.                             | Não   |
| 1     | Excluir categorias                                  | O sistema deve permitir a exclusão adequada de categorias.                                             | Não   |
| 2     | Criar categorias com o mesmo nome                   | O sistema permite criar mais de uma categoria com o mesmo nome, podendo gerar confusão para o usuário. | Sim   |
| 3     | Verificar limite de caracteres ao nomear categorias | O sistema deve aplicar a limitação de caracteres adequadamente no campo de nome das categorias.        | Não   |

---

## Comentários
- **Permitir que múltiplas categorias tenham o mesmo nome pode ser confuso para o usuário**. Sugiro a implementação de uma validação para garantir que nomes de categorias sejam únicos.
