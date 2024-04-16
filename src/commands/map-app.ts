import { GluegunToolbox } from 'gluegun'
import { AccountsProcessedType } from '../types'

module.exports = {
  name: 'map-app',
  alias: ['m'],
  description: 'Maps in which accounts the informed apps are installed',
  run: async (toolbox: GluegunToolbox) => {
    const {
      print: { spin, table, error },
      strings,
      system,
      prompt,
    } = toolbox

    let { accounts } = await prompt.ask({
      type: 'input',
      name: 'accounts',
      message: 'Accounts (separated by ",")',
    })

    accounts = accounts.replace(/ /g, '')
    const listAccounts = accounts.split(',')

    let { apps } = await prompt.ask({
      type: 'input',
      name: 'apps',
      message: 'Name of apps (separated by ",")',
    })

    apps = apps.replace(/ /g, '')
    const listApps = apps.split(',')

    const spinner = spin('Mapping')

    const accountsProcessed: AccountsProcessedType[] = []

    try {
      for (const account of listAccounts) {
        await system.run(`vtex switch ${account}`)
        const listing = strings.trim(await system.run(`vtex ls`))

        for (const app of listApps) {
          accountsProcessed.push({
            app,
            account,
            exist: listing.includes(app) ? '✅' : '❌',
          })
        }
      }

      accountsProcessed.sort((a, b) => {
        return a.app.localeCompare(b.app)
      })

      spinner.succeed()

      table(
        [
          ['App', 'Account', 'Exist?'],
          ...accountsProcessed.map((item) => [
            item.app,
            item.account,
            `${item.exist}`,
          ]),
        ],
        {
          format: 'lean',
          style: {
            'padding-left': 0,
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
