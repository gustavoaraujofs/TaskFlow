<h1>TaskFlow</h1>
<i>Mantenha o fluxo de produtividade em suas mãos.</i>

<h2>Sobre</h2>
<ul>
    <li>
    O TaskFlow é um <strong>sistema de gerenciamento de tarefas</strong> projetado para simplificar e otimizar sua rotina diária.
    </li>
    <li>
    Com uma abordagem centrada no usuário, nosso objetivo é proporcionar uma experiência fluida e intuitiva, permitindo que você mantenha o controle total sobre suas tarefas de forma eficiente.
    </li>
</ul>

<h2>Propósito</h2>
O objetivo principal deste projeto é criar uma plataforma intuitiva e eficiente para o gerenciamento de tarefas dos usuários. O sistema fornecerá ferramentas essenciais para facilitar a criação, edição, priorização e organização das atividades diárias. Além disso, permitirá aos usuários definir datas de vencimento, configurar lembretes e realizar outras ações para acompanhar suas tarefas de forma eficaz.

<h2>Funcionalidades</h2>
<ul>
    <li>
        Criar / editar / excluir tarefas
    </li>
    <li>
        Organizar por categoria
    </li>
    <li>
        Priorizar tarefas
    </li>
    <li>
        Atribuir prazos
    </li>
    <li>
        Filtrar e pesquisar
    </li>
</Ul>

<h2>Tecnologias</h2>
<h3>Front-end:</h3>
<ul>
    <li>
        Html
    </li>
    <li>
        CSS
    </li>
    <li>
        Javascript
    </li>
</ul>

<h3>Back-end:</h3>
<ul>
    <li>
        Node.js
    </li>
    <li>
        Express
    </li>
    <li>
        MySQL
    </li>
</ul>

<br>

# Como Usar

## Clonando o Repositório

Para começar, clone o repositório:

```bash
# comando para clonar o repositório
$ git clone https://github.com/gustavoaraujofs/TaskFlow.git
```

## Configuração do Banco de Dados

Após clonar o repositório, é necessário criar um banco de dados MySQL e as tabelas necessárias.

```bash
# Comando para criar o banco de dados no MySQL
$ CREATE DATABASE database_name;
```

### Criando as Tabelas

Certifique-se de seguir a ordem de criação das tabelas para evitar erros de dependência:

-   usuarios
    <br>
-   categorias
    <br>
-   tarefas

As tabelas devem ser criadas nessa ordem específica para garantir que as chaves estrangeiras sejam configuradas corretamente. Primeiro, criamos a tabela `usuarios`, já que as outras tabelas dependem dela. Em seguida, criamos a tabela `categorias`, que referencia `usuarios`. Por último, criamos a tabela tarefas, que depende tanto de `usuarios` quanto de `categorias`.

```bash
# Código SQL para criar a tabela USUARIOS
$ CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL
);
```

```bash
# Código SQL para criar a tabela CATEGORIAS

CREATE TABLE categorias (
    id_categoria INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nome VARCHAR(55) NOT NULL,
    usuario_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id_usuario)
);
```

```bash
# Código SQL para criar a tabela TAREFAS

CREATE TABLE tarefas (
    id_tarefa INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    titulo VARCHAR(55) NOT NULL,
    descricao VARCHAR(255),
    prioridade VARCHAR(10),
    prazo_final DATE,
    status VARCHAR(12) NOT NULL,
    usuario_id INT NOT NULL,
    categoria_id INT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (categoria_id) REFERENCES categorias(id_categoria)
);
```

## Arquivo de Configuração de Ambiente

Na raiz do projeto, há um arquivo chamado .env.example. Este arquivo contém 5 campos que precisam ser preenchidos em um arquivo nomeado .env. Você pode criar este arquivo ou renomear o arquivo de exemplo. Preencha os campos com os dados relacionados ao seu banco de dados.

```bash
PORT= (Porta em que o servidor será executado)
MYSQL_HOST= (O host da sua máquina, por padrão é 'localhost')
MYSQL_USER= (Seu nome de usuário, por padrão o MySQL usa 'root')
MYSQL_PASSWORD= (A senha que você escolheu ao instalar o MySQL)
MYSQL_DB= (O nome do banco de dados que você criou anteriormente.)
JWT_SECRET= (Uma sequência qualquer de letras números e caráteres que será usada para criação do token de autenticação)
```

## Instalando as Dependências
Antes de iniciar a aplicação, precisamos instalar as dependências `node_modules`. Para isso, abra o terminal da sua IDE e navegue até a pasta "backend".


```bash
# Comando para instalar as dependências
$ npm install
```

## Iniciando o Servidor
Finalmente, execute o comando para iniciar o servidor (ainda dentro da pasta "backend") e abra o arquivo "login.html".

```bash
# Comando para iniciar o servidor
$ npm start
```

## Autores

- **Gustavo Araújo** - [@gustavoaraujofs](https://github.com/gustavoaraujofs)
- **Welison Andrade** - [@welisonandrade](https://github.com/welisonandrade)
