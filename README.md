
# OndaPerfeita

## Conteúdo do Capítulo 6

- [C06P02] - Produção - Continuous Integration (CI) com Github Actions Workflows e Node.js
- [C06P03] - Produção - Continuous Deployment com Github Actions Workflows e Umbler

## Acesso à Aplicação

A aplicação está disponível em [ondaperfeita](https://ondaperfeita-d27fff97cafb.herokuapp.com/).


## Descrição do Projeto:

Este é um projeto de uma API RESTful desenvolvida em Node.js utilizando TypeScript e MongoDB. 
A aplicação consiste em um serviço de previsão do tempo, que utiliza a API externa para obter os dados meteorológicos e realiza cálculos para gerar uma pontuação de rating para determinada localidade.

O projeto está dividido em 10 capítulos, que abordam desde a configuração do ambiente de desenvolvimento até a implementação de boas práticas de segurança e documentação. 
A API também inclui recursos como autenticação de usuário, criptografia de senha, validação de entrada e saída de dados, e integração com o banco de dados MongoDB.

Este projeto foi desenvolvido com o objetivo de fornecer um exemplo completo de como desenvolver uma API RESTful moderna e escalável em Node.js, utilizando TypeScript e MongoDB.


1. Capítulo

- Configuração do ambiente de desenvolvimento com Node.js
- EsLint
- Jest + TypeScript
- Tipos nos testes
- Teste de integração com Superteste+types
- Variáveis globais e tipos
- Setup de servidor Node.js com Overnightjs (express)

2. Capítulo

- Integração com o serviço de meteorologia externo (stormglass.io)
- Design da API
- Boas práticas de tratamento de erros
- Configuração dinâmica com node-config
- Uso de TypeScript da maneira correta

3. Capítulo

- Criação do serviço de Forecast
- Uso dos dados da área externa
- Cálculo de rating

4. Capítulo

- Modo de usuário
- Integração com o banco de dados MongoDB utilizando Mongoose
- Teste de integração com o Nock

5. Capítulo

- Validações avançadas com Mongoose
- Encriptação de senha com Bcrypt e Mongoose
- Unificação dos controles em um só usando o AbstractController
- Uso de Json web Token - Gerando e validando tokens
- Express Middleware
- TypeScript com modulo de argumentação - module augmentation

6. Capítulo

- Ambiente de produção e continuou deployment
- Setup do ambiente da Umber
- Setup do github Workflows para rodar os testes
- Setup do Github Workflows para fazer deploy automaticamente para o Umbler.

7. Capítulo

- Boas práticas de software na cloud
- Distribuição do login utilizando o Pino
- Aplicação de Graceful shutdown
- Formatação do padrão de erros da API

8. Capítulo

- Lógica de rating

9. Capítulo

- Teste ponta a ponta da aplicação usando front-end
- Entendimento da importância do limite - Rate limit
- Documentação com Open API
