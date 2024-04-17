<h1 align="center">
    P1TOOLS
</h1>
<p align="center">Program 1 Tool Pack developed using Gluegun</p>

<p align="center">
 <a href="#-pre-requisites">💻 Pre requisites</a> •
 <a href="#-how-to-install">📦 How to install</a> •
 <a href="#-commands">🎮 Commands</a> •
 <a href="#-customizing-your-cli">🚀 Customizing your CLI</a> • 
 <a href="#-publishing-to-npm">🚀 Publishing to NPM</a>
</p>

## 💻 Pre requisites

You must have the VTEX CLI installed on your computer. To install, simply follow the step-by-step instructions provided by VTEX [HERE](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-vtex-io-cli-install)

## 📦 How to install

To install, simply use the `npm` package manager by executing the command below:

```shell
    npm i p1tools
```

## 🎮 Commands

### map-apps

Maps in which VTEX accounts the informed applications are installed

```shell
    p1tools map-apps
```

An entry will be requested with the accounts that will be verified and must be entered separated by commas (",") e.g.:

```shell
    ? Accounts (separated by ",") » account1,account2,...
```

Then you will be asked for an input with the apps that were searched for, the input must be the name of the apps separated by a comma (",") e.g.:

> [!WARNING]
> The name of the app is what is in the `name` field of the `manifest.json` file within the repository

> [!TIP]
> As it is analyzed by comparison, it is also possible to place the name of the account that the app was published in front of the app name, e.g. `account1.app1`

```shell
    ? Name of apps (separated by ",") » app1,app2,...
```

Then the application will log into each account (if necessary, it will request login, as is commonly done when using the VTEX CLI) and check whether the app is installed or whether it is in the edition, separating the return as follows:

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

## 🚀 Customizing your CLI

Check out the documentation at https://github.com/infinitered/gluegun/tree/master/docs.

## 🚀 Publishing to NPM

To package your CLI up for NPM, do this:

```shell
$ npm login
$ npm whoami
$ npm test

$ npm run build

$ npm publish
```

# License

MIT - see LICENSE
