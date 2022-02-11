# Boas vindas ao repositório do API de Blogs!


## Habilidades

Nesse projeto, foi desenvolvida uma API de um CRUD posts de blog com o Sequelize e autenticação com JWT. Fui capaz de:
 - Criar e associar tabelas usando `models` do `sequelize`
 - Construir endpoints para consumir os models que foram criados 
 - Fazer um `CRUD` com o `ORM`

### Instalação do projeto localmente

1. Clone o repositório:
  * git clone https://github.com/ntozato/blogs-api.git
  * Entre na pasta do repositório que você acabou de clonar:
    * cd blogs-api

2. Instale as dependências:
  * `npm install`


**Você irá precisar configurar as variáveis globais do MySQL.**

  Crie um arquivo .env na raiz do projeto com as seguintes variáveis:
    
    - MYSQL_USER          // Seu usuário mysql server
    - MYSQL_PASSWORD      // Sua senha mysql server
    - HOSTNAME=localhost
    - JWT_SECRET          // Sua escolha
    
**Após feitas as configurações acima, inicie o projeto com npm start no terminal**

