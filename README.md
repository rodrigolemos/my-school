# My School
<p>
  <img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/rodrigolemos/my-school">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/rodrigolemos/my-school">
  <img alt="GitHub" src="https://img.shields.io/github/license/rodrigolemos/my-school">
</p>

## Sobre

My School é um simples projeto de gerenciamento de usuários feito com o intuito de aplicar ferramentas que tenho estudado recentemente. Nele é possível ver na prática a utilização da stack ReactJS, NextJS e styled-components; material-ui e react-hook-form além de várias outras APIs bastante úteis no desenvolvimento deste tipo de software. Por ser uma aplicação de estudos, não há intenção em disponibilizá-la como produto ou publicá-la para uso em produção. Caso considere alguma parte do código interessante ou acredite que algo possa ser melhorado, fique à vontade para comentar. Todo feedback é bem-vindo.

## Front-end

Para facilitar a manutenção e separar as responsabilidades da aplicação, o front-end encontra-se [neste repositório](https://github.com/rodrigolemos/my-school-front).

## Definições

O projeto foi dividido em 4 partes separadas por níveis de usuário da seguinte maneira:

- **Visitante** - Esse é o nível mais básico de acesso. Usuários com esse perfil ainda não criaram uma conta ou ainda não estão logados na plataforma. Dessa maneira, é possível acessar a página inicial, a lista de cursos, os detalhes de cada curso, a página de criação de perfil e o login;

- **Aluno** - Esse é o nível mais básico de acesso logado. Usuários com esse perfil, além de poderem fazer tudo o que um visitante faz, podem se cadastrar nos cursos que desejarem, acompanhar seu dashboard de acessos, atualizar seu perfil e posteriormente poderão assistir às aulas cadastradas na plataforma;

- **Professor** - Esse é um nível especial de acesso logado. Professores só podem ser cadastrados na plataforma por administradores. Além de todas as funcionalidades presentes no nível de acesso dos alunos, professores posteriormente poderão cadastrar aulas na plataforma e apontar as notas dos alunos;

- **Administrador** - Esse é o nível de maior privilégio logado. Administradores podem incluir, alterar, atualizar e excluir cursos; incluir ou atualizar acessos de professores e outros administradores; aprovar ou excluir matrículas em determinados cursos. Entretanto, administradores não podem estar matriculados em curso algum.

## Layout

Exemplo do design adotado para páginas públicas.

<p align="left">
  <img alt="Principal" src="https://github.com/rodrigolemos/my-school-front/blob/main/public/images/my-school.png" style="width: 1100px; margin-top: 10px; margin-right: 5px;">
</p>

## Autor

Rodrigo Lemos
