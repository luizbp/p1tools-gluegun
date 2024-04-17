import { GluegunToolbox } from 'gluegun'
import { ProcessedType } from '../types'
import { getAccount, getWS } from '../utils/regexMatchs'

module.exports = {
  name: 'map-apps',
  alias: ['m'],
  description:
    'Maps in which VTEX accounts the informed applications are installed',
  run: async (toolbox: GluegunToolbox) => {
    const {
      print: { spin, table, error, info },
      strings,
      system,
      prompt,
    } = toolbox

    const { accounts } = await prompt.ask({
      type: 'input',
      name: 'accounts',
      message: 'Accounts (separated by ",")',
    })
    const listAccounts = accounts.replace(/ /g, '').split(',')

    const { apps } = await prompt.ask({
      type: 'input',
      name: 'apps',
      message: 'Name of apps (separated by ",")',
    })
    const listApps = apps.replace(/ /g, '').split(',')

    const spinner = spin('Mapping')

    const editionApps: ProcessedType[] = []
    const installedApps: ProcessedType[] = []

    const whoami = strings.trim(await system.run(`vtex whoami`))
    const originAccount = getAccount(whoami)
    const originWs = getWS(whoami)

    try {
      for (const account of listAccounts) {
        await system.run(`vtex switch ${account}`)
        const listing = strings.trim(await system.run(`vtex ls`))

        const listingSplit = listing.split('Installed Apps')

        for (const app of listApps) {
          editionApps.push({
            app,
            account,
            exist: listingSplit[0].includes(app) ? '✅' : '❌',
          })

          if (listingSplit?.length > 1) {
            installedApps.push({
              app,
              account,
              exist: listingSplit[1].includes(app) ? '✅' : '❌',
            })
          }
        }
      }

      await system.run(`vtex switch ${originAccount}`)
      await system.run(`vtex use ${originWs}`)

      editionApps.sort((a, b) => {
        return a.app.localeCompare(b.app)
      })

      installedApps.sort((a, b) => {
        return a.app.localeCompare(b.app)
      })

      spinner.succeed()

      info('\nEditions Apps')

      table(
        [
          ['App', 'Account', 'Exist?'],
          ...editionApps.map((item) => [
            item.app,
            item.account,
            `${item.exist}`,
          ]),
        ],
        {
          format: 'lean',
          style: {
            'padding-left': 2,
            'padding-right': 2,
          },
        }
      )

      info('Installed Apps')

      table(
        [
          ['App', 'Account', 'Exist?'],
          ...installedApps.map((item) => [
            item.app,
            item.account,
            `${item.exist}`,
          ]),
        ],
        {
          format: 'lean',
          style: {
            'padding-left': 2,
            'padding-right': 2,
          },
        }
      )
    } catch (err) {
      spinner.fail()
      error(err)
    }

    process.exit()
  },
}
