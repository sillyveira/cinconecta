
# Uso de sessões stateful ao invés de stateless

**Data do Registro:** 20/02/2025  
**Status:** Aceito  

## Contexto  
Houve o embate entre seguir com sessões stateful ou com sessões stateless no contexto de autenticação do usuário.

## Opções Consideradas  
- **Sessão stateful**:
    - A sessão do usuário é guardada no banco de dados.
    - Permite rastrear usuários logados, remover sessões e controle de suas ações.
    - Mais carga para o backend.
- **Sessão stateless**:
    - A sessão do usuário é guardada no cliente (JWT).
    - A sessão não pode ser revogada, editada e nem consultada.
    - Menos carga para o backend, menos disco usado.

## Decisão  
Como estamos lidando com uma base de usuários pequena e nosso sistema é centrado no usuário, as vantagens da sessão stateful sobrepõem as suas desvantagens. A segurança é um brinde já que temos menos exposição a ataques como roubo de tokens JWT e podemos ter noção de quem são nossos usuários logados.

## Consequências  
- Maior consumo de memória no servidor devido ao armazenamento das sessões. (Não é um consumo gritante)
- Facilidade na revogação e expiração de sessões sem necessidade de esperar a expiração de um token.
- Melhor rastreamento e monitoramento de sessões ativas.
- Dificuldade na escabilidade. (Caso a plataforma cresça, precisaremos investir mais no banco de dados ou trocar a proposta das sessões stateful)

## Links consultados
- https://medium.com/@kennch/stateful-and-stateless-authentication-10aa3e3d4986
- https://www.redhat.com/en/topics/cloud-native-apps/stateful-vs-stateless

## Autor  
**Wesley Silveira <@wslc>**

