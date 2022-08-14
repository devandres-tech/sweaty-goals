import yargs from 'yargs'

yargs
  .scriptName('swg')
  .usage('$0 <cmd> [args]')
  .command('results', 'get latest results', {}, (argv) => {
    console.log('arvg is', argv)
  })
  .showHelpOnFail(true)
  .demandCommand(1, '')
  .version('version 1.0.0')
  .help().argv
