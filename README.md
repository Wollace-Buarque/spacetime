# Spacetime
Colecione momentos marcantes da sua jornada e compartilhe (se quiser) com o mundo!

## Executando o projeto

Abaixo seguem as instruções para você executar o projeto na sua máquina.

Comece clonando o repositório:

```sh
git clone https://github.com/wollace-buarque/spacetime
cd spacetime
```
### Back-end

O back-end desse projeto é construído em Node.js, mais especificamente sua versão LTS.

```sh
cd apps/server

# Instalando suas dependências
npm install

# Copiar o arquivo com os dados de conexão e demais variáveis ambiente
cp .env.example .env

# Rodar as migrations do prisma
npx prisma migrate dev

# Subir o servidor HTTP
npm run dev
```

### Mobile

Para executar o app mobile utilizamos o Expo, uma ferramenta incrível da comunidade React Native. Além do Expo, é necessário que você utilize algum emulador local ou um dispositivo físico pra visualizar a aplicação.

Após configurar o ambiente mobile, você pode abrir o emulador e executar o projeto de acordo com a plataforma que estiver utilizando:

```sh
cd apps/mobile

# Instalando suas dependências
npm install

# Caso esteja usando Android
npm run android

# Caso esteja usando iOS
npm run ios

# Caso esteja usando um dispositivo físico
npm run start
```

### WEB

Para executar o site utilizamos o Next 13.

Após configurar o ambiente mobile, você pode abrir o emulador e executar o projeto de acordo com a plataforma que estiver utilizando:

```sh
cd apps/web

# Instalando suas dependências
npm install

# Copiar o arquivo com os dados de conexão
cp .env.example .env

# Subir o site
npm run start
```
