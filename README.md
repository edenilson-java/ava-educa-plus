# AVA-EDUCA+

> Projeto avaliativo — Módulo 1: Fundamentos da Programação com JavaScript

| Identificação | Informação |
|---|---|
| **Projeto** | AVA-EDUCA+ |
| **Autor** | Edenilson Alves Gonçalves |
| **Curso** | Desenvolvedor Front-End Angular |
| **Turma** | T1 |
| **Módulo** | Módulo 1 — Fundamentos da Programação com JavaScript |

O **AVA-EDUCA+** é um Ambiente Virtual de Aprendizagem desenvolvido com HTML, CSS e JavaScript puro. A aplicação demonstra autenticação, sessão no navegador, listagem de cursos e cadastro de alunos com consulta de endereço.

## Objetivo

O projeto pratica os fundamentos do Módulo 1: tipos de dados, variáveis, condicionais, operadores lógicos, repetições, funções, callbacks, assincronicidade, arrays, objetos, Programação Orientada a Objetos, módulos, DOM, eventos, formulários, tabela, armazenamento de sessão, consumo de API e responsividade.

## Problema que resolve

O projeto organiza, em uma única aplicação web, o acesso de usuários a seus cursos e o cadastro de alunos. Com isso, substitui fluxos dispersos por uma interface única para autenticação, consulta de cursos e registro de dados cadastrais, com validações e consulta de endereço por CEP.

## Técnicas e tecnologias utilizadas

São utilizados HTML semântico, CSS com Flexbox, Grid e media queries, JavaScript com módulos ES, objetos, classe, Promises, `async/await`, manipulação do DOM e `sessionStorage`. Moment.js é usado para validação estrita de datas e ViaCEP é consumido por `fetch` para o preenchimento do endereço.

## Funcionalidades

A aplicação redireciona o acesso inicial ao login por JavaScript. Após uma autenticação válida, grava o usuário na `sessionStorage` e exibe os cursos relacionados a ele. O menu permite abrir o dashboard, acessar o cadastro de alunos ou sair; o item Cursos permanece desabilitado conforme o requisito.

O cadastro possui 13 campos de preenchimento. A data de nascimento aceita dia e mês com um ou dois dígitos e normaliza o valor para `DD/MM/YYYY` com Moment.js. O e-mail usa a validação nativa do HTML, e o CPF é textual e exige exatamente 11 dígitos para preservar zeros iniciais. Telefone, CEP e número também são tratados como strings numéricas. O endereço é consultado por CEP na API ViaCEP. Um cadastro válido cria um objeto da classe `Aluno`, gera o próximo identificador e atualiza a tabela na mesma página.

## Dados para demonstração

| Usuário | E-mail | Senha | Resultado esperado |
|---|---|---|---|
| Ana Carolina Silva | `ana.silva@edutech.com` | `123456` | 6 cursos |
| Carlos Eduardo Santos | `carlos.santos@edutech.com` | `654321` | 2 cursos |
| Mariana Oliveira Costa | `mariana.costa@edutech.com` | `edu2026` | Mensagem de ausência de cursos |

## Como executar

Não há dependências npm para instalar. O `package.json` existe apenas para declarar o uso de módulos JavaScript.

1. Clone ou copie o projeto para uma pasta local.
2. Abra a pasta no Visual Studio Code.
3. Instale a extensão **Live Server**, caso ainda não esteja disponível.
4. Abra `index.html` com **Open with Live Server**.
5. Use uma das contas da tabela para entrar.

> A aplicação precisa ser servida por HTTP. Os ES Modules não funcionam corretamente quando o arquivo é aberto diretamente por `file://`.

O navegador também precisa de acesso à internet para carregar o Moment.js pela CDN e consultar a API pública ViaCEP.

## Estrutura

```text
ava-educa-plus/
├── index.html
├── package.json
├── README.md
├── .gitignore
├── login/
│   ├── login.html
│   ├── login.js
│   └── login.css
├── dashboard/
│   ├── dashboard.html
│   ├── dashboard.js
│   └── dashboard.css
├── cadastro-aluno/
│   ├── cadastro-aluno.html
│   ├── cadastro-aluno.js
│   └── cadastro-aluno.css
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   ├── auth.js
│   ├── cursos.js
│   ├── Aluno.js
│   └── alunos.js
├── dados/
│   ├── listagem-usuarios.js
│   ├── listagem-cursos.js
│   └── listagem-alunos.js
└── assets/
    └── images/
        ├── logo-ava-educa.svg
        ├── logo-ava-educa-branco.svg
        └── simbolo-ava-educa.svg
```

## Dependências externas autorizadas

- **Moment.js**, carregado por CDN para validar a data de nascimento.
- **ViaCEP**, consultado por `fetch` para preencher os dados de endereço.

## Vídeo de apresentação

[LINK DO VÍDEO]

## Melhorias futuras

Como evolução do projeto, poderão ser implementadas:

- **Persistência em banco de dados:** armazenar usuários, alunos e cursos permanentemente.
- **CRUD completo de alunos:** permitir consultar, cadastrar, editar e excluir alunos.
- **Backend e API própria:** centralizar as regras de negócio, as validações, a autenticação e o acesso aos dados.
- **Autenticação segura:** proteger as senhas e controlar sessões e permissões no servidor.
- **Gerenciamento de cursos:** permitir cadastrar, consultar, editar e excluir cursos, além de habilitar a opção Cursos.

A versão atual permanece dentro do escopo do Módulo 1, utilizando arrays, módulos JavaScript e `sessionStorage` conforme os requisitos atuais. As funcionalidades acima são apenas possibilidades futuras e não estão implementadas nesta versão.

## Referências

- [Documentação do Moment.js](https://momentjs.com/docs/)
- [ViaCEP](https://viacep.com.br/)