# Escolha do Banco de Dados - MongoDB vs MySQL

## Status
Aceito

## Contexto
Nosso sistema de estoque precisava armazenar muitos dados de forma organizada e flexível. Além disso, queríamos um banco de dados que funcionasse bem, mesmo com um grande número de acessos.

## Opções Consideradas
- **MySQL**: Banco de dados tradicional que usa tabelas para armazenar informações e garante alta segurança e organização dos dados.
- **MongoDB**: Banco de dados mais flexível, que permite armazenar informações em formato de documentos, facilitando mudanças na estrutura dos dados.

## Decisão
Escolhemos usar o **MongoDB** como banco de dados principal em vez de MySQL.

## Justificativa
Optamos pelo MongoDB pelos seguintes motivos:
- **Maior flexibilidade**: Podemos armazenar dados sem precisar seguir um formato rígido.
- **Melhor escalabilidade**: O MongoDB permite dividir os dados entre vários servidores para evitar sobrecarga.
- **Desempenho otimizado**: Ele lida melhor com muitas escritas e leituras simultâneas.
- **Alta disponibilidade**: Possui um sistema de cópias automáticas dos dados para evitar falhas.
- **Facilidade para os membros da equipe**: Como não exige um formato fixo, os desenvolvedores podem ajustar os dados rapidamente sem muitas complicações.

## Consequências
- **Curva de aprendizado**: A equipe precisou aprender a usar um banco de dados diferente do que havia sido eleito antes.
- **Possível atraso na atualização dos dados**: Como o MongoDB prioriza velocidade, algumas mudanças podem demorar um pouco para aparecer em todos os servidores.

## Links consultados
- [Guia do Host: MongoDB – Análise das Vantagens e Desvantagens](https://guiadohost.com/2023/04/12/mongodb-uma-analise-das-vantagens-e-desvantagens-desse-banco-de-dados-nosql)
- [Introduction to MongoDB - Advantages and Disadvantages](https://igotocode.com/pt/introduction-to-mongodb-advantages-and-disadvantages)

## Autor
Thiago Fernandes <tfls>
