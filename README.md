# Frontend do Projeto Top 5 Tião Carreiro e Pardinho
Bem-vindo ao repositório do frontend do projeto "Top 5 Tião Carreiro e Pardinho". Este projeto exibe uma lista das músicas mais tocadas da dupla e permite que usuários sugiram novas músicas através de links do YouTube. Além disso, oferece funcionalidades como registro e login de usuários, autenticação, e operações administrativas para gerenciamento das músicas sugeridas.

## Implementado com ReactJS e Material-UI.


## Para facilitar o desenvolvimento e a execução, os repositórios devem ser organizados da seguinte forma:
project-root/
├── backend/   # Repositório da API (este repositório)
└── frontend/  # Repositório do frontend

## Funcionalidades Principais
Autenticação de Usuários: Permite que usuários se registrem, façam login e logout.

Sugestão de Músicas: Usuários autenticados podem sugerir novas músicas através de links do YouTube.

Gerenciamento de Sugestões: Administradores podem aprovar ou rejeitar sugestões de músicas.

CRUD de Músicas: Administradores podem adicionar, editar e excluir músicas da lista.

Paginação: Exibe a lista de músicas com paginação, destacando as 5 primeiras e listando as demais com paginação.

#Pré-requisitos
Antes de iniciar, certifique-se de ter instalado em sua máquina:

Node.js (versão 14 ou superior)

Docker (opcional, caso opte por executar via Docker)

## Configuração e Execução do Frontend
Você pode executar o frontend de duas maneiras: diretamente com npm ou utilizando Docker.

### 1. Execução com NPM
Instale as dependências:

npm install

Isso define a URL onde o frontend irá acessar a API do backend.

Inicie o servidor de desenvolvimento:

npm start

O aplicativo estará disponível em http://localhost:3000.

### 2. Execução com Docker
Configure as variáveis de ambiente:

Isso define a URL interna para comunicação entre os contêineres do frontend e backend.

Crie o arquivo docker-compose.yml:

No diretório frontend, execute:

docker-compose up --build

Isso construirá as imagens e iniciará os contêineres para o frontend e o backend.



## Para garantir que o frontend se comunique corretamente com o backend:
Execução com NPM: O backend deve estar rodando em http://localhost:8000. Certifique-se de que o backend esteja em execução antes de iniciar o frontend.

Execução com Docker: O Docker Compose configura uma rede interna (app-network) onde os serviços frontend e backend podem se comunicar diretamente. O frontend acessa o backend através do nome do serviço backend definido no docker-compose.yml.

Funcionalidades Detalhadas
Autenticação de Usuários
Utilizamos o Material-UI para criar os componentes de interface relacionados à autenticação, como formulários de login e registro. Para mais informações sobre como implementar autenticação com Material-UI, consulte este exemplo de autenticação com Material-UI.

Paginação
A lista de músicas é paginada utilizando o componente de paginação do Material-UI. Para implementar a paginação no seu projeto, você pode seguir este guia de paginação com Material-UI.

Gerenciamento de Músicas
Administradores têm acesso a funcionalidades de CRUD (Criar, Ler, Atualizar, Deletar) para gerenciar as músicas sugeridas. Isso inclui a aprovação ou rejeição de sugestões feitas por usuários. Para implementar operações CRUD no Laravel 11, você pode seguir este tutorial de CRUD com Laravel 11.

Considerações Finais
Variáveis de Ambiente: Certifique-se de que as variáveis de ambiente estão corretamente configuradas para refletir o ambiente em que a aplicação está sendo executada.


