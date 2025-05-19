# Projeto Integrador
# Integrantes do projeto
# André Luis Schroeder

## Primeiros passos

### Criação do arquivo .env
Para a integração com o Google maps, precisa-se criar primeiramente um arquivo chamado .env na raiz do projeto
deve-se então adicionar a seguinte linha no arquivo
```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=suaChaveAqui
```
A chave pode ser obtida seguindo os FAQs https://developers.google.com/maps/documentation/javascript/get-api-key?hl=pt-br

### Inicializar o banco de dados
para tal utilizamos o docker, iniciar o banco de dados com o comando 
``docker-compose up -d
caso o comando falhe, lembre de instalar o docker (ou docker desktop na maquina)

### Instalar as dependências
depois de ter o node instalado na maquina e configurado no PATH, rodar o comando 
``npm install

### Para rodar o projeto localmente
basta rodar o seguinte comando
``npm run dev

### Rotas da aplicação
para criar novos pontos, a url http://localhost:3000/admin é responsável pela administração dos pontos no mapa
a visão do usuário comum, com adição de comentários e/ou avaliações fica na rota http://localhost:3000

### Vídeo e revisitação do projeto estão na raiz
