<h1 align="center">
    P1TOOLS
</h1>
<p align="center">Program 1 Tool Pack developed using Gluegun</p>

<p align="center">
 <a href="#-pre-requisitos">💻 Pre requisites</a> •
 <a href="#-como-instalar">📦 How to install</a> •
 <a href="#-comandos">🎮 Commands</a> •
 <a href="#-customizing-your-cli">🚀 Customizing your CLI</a> • 
 <a href="#-publishing-to-npm">🚀 Publishing to NPM</a>
</p>

## 💻 Pre requisitos

Você deve ter a CLI VTEX instalada em seu computador. Para instalar, basta seguir o passo a passo fornecido pela VTEX [AQUI](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-vtex-io-cli-install)

## 📦 Como instalar

Para instalar, basta usar o gerenciador de pacotes `npm` executando o comando abaixo:

```shell
    npm i p1tools
```

## 🎮 Comandos

### map-apps

Mapeia em quais contas VTEX estão instaladas as aplicações informadas

```shell
    p1tools map-apps
```

Será solicitado um input das accounts que serão verificadas e deverá ser digitado separado por vírgulas (",") ex.:

```shell
    ? Accounts (separated by ",") » account1,account2,...
```

Em seguida será solicitado um input com os aplicativos que serão pesquisados, o input deve ser o nome dos apps separados por vírgula (",") ex.:

> [!WARNING]
> O nome do aplicativo é o que está no campo `name` do arquivo `manifest.json` dentro do repositório

> [!TIP]
> Como é analisado por comparação, também é possível colocar o nome da conta que o app foi publicado antes do nome do app, por exemplo. `account.app1`

```shell
    ? Name of apps (separated by ",") » app1,app2,...
```

Em seguida a aplicação irá logar em cada conta (se necessário, irá solicitar login, como comumente é feito ao utilizar a CLI da VTEX) e verificar se o app está instalado ou se está na edition, separando o retorno da seguinte forma:

```shell

Editions Apps
┌─────────┬──────────────┬──────────┐
│  App    │  Account     │  Exist?  │
├─────────┼──────────────┼──────────┤
│  app1   │  account1    │  ❌      │
├─────────┼──────────────┼──────────┤
│  app1   │  account2    │  ❌      │
└─────────┴──────────────┴──────────┘
Installed Apps
┌─────────┬──────────────┬──────────┐
│  App    │  Account     │  Exist?  │
├─────────┼──────────────┼──────────┤
│  app1   │  account1    │  ✅      │
├─────────┼──────────────┼──────────┤
│  app2   │  account2    │  ✅      │
└─────────┴──────────────┴──────────┘
```

### update-accounts

Faz login em cada account inserida e executa um “vtex update”

```shell
    p1tools update-accounts
```

Será solicitado um input com as contas que serão executadas e deverá ser digitado separado por vírgula (",") ex.:

```shell
    ? Accounts (separated by ",") » account1,account2,...
```

Será executado account por account mostrando o andamento.

Exemplo: 

```shell
√ Accounts (separated by ",") · account1,account2,account3
ℹ account1 ✅
ℹ account2 ✅
ℹ account3 ✅
✔ Running
```


## 🚀 Personalizando sua CLI

Confira a documentação em https://github.com/infinitered/gluegun/tree/master/docs.

MIT - see LICENSE
