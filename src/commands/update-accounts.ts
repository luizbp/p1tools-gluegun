import { GluegunToolbox } from 'gluegun'
import { getAccount, getWS } from '../utils/regexMatchs'

module.exports = {
  name: 'update-accounts',
  alias: ['u'],
  description: 'Run the "vtex update" command on all informed accounts',
  run: async (toolbox: GluegunToolbox) => {
    const {
      print: { spin, error },
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

    const spinner = spin('Running')

    const whoami = strings.trim(await system.run(`vtex whoami`))
    const originAccount = getAccount(whoami)
    const originWs = getWS(whoami)

    try {
      for (const account of listAccounts) {
        await system.run(`vtex switch ${account}`)
        await system.run(`yes | vtex update`)

        spinner.info(`${account} ✅`)
        spinner.start()
      }

      await system.run(`vtex switch ${originAccount}`)
      await system.run(`vtex use ${originWs}`)

      spinner.succeed()
    } catch (err) {
      spinner.fail()
      error(err)
    }

    process.exit()
  },
}
