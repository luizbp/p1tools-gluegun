import { GluegunToolbox, build } from 'gluegun'

/**
 * Create the cli and kick it off
 */
async function run(argv) {
  // create a CLI runtime
  const cli = build()
    .brand('p1tools')
    .src(__dirname)
    .plugins('./node_modules', { matching: 'p1tools-*', hidden: true })
    .defaultCommand({
      run: async (toolbox: GluegunToolbox) => {
        const {
          print: { info, highlight, success },
          meta,
        } = toolbox
        info(`Welcome to p1tools! 🚀`)
        success(`${meta.packageJSON()?.description}`)
        highlight(`Version: ${meta.version()}`)
      },
    })
    .help() // provides default for help, h, --help, -h
    .version() // provides default for version, v, --version, -v
    .create()
  // enable the following method if you'd like to skip loading one of these core extensions
  // this can improve performance if they're not necessary for your project:
  // .exclude(['meta', 'strings', 'print', 'filesystem', 'semver', 'system', 'prompt', 'http', 'template', 'patching', 'package-manager'])
  // and run it
  const toolbox = await cli.run(argv)

  // send it back (for testing, mostly)
  return toolbox
}

module.exports = { run }
