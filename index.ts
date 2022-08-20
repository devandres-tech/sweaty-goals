import yargs from 'yargs'
import colors from 'colors'
import _, { map } from 'underscore'
import { getResults, getFixtures } from './api/index'

yargs
  .scriptName('swg')
  .usage(
    'Welcome to Sweaty Goals CLI! Keep up with all English Premier League games. \n'
  )
  .usage('Usage: $0 <command> [args]')
  .command('results', 'get latest results', {}, async (argv) => {
    const results: any = await getResults()

    Object.keys(results).forEach((dateKey) => {
      console.log(colors.bgMagenta(dateKey))
      results[dateKey].forEach((result: any) => {
        let homeTeam = result.teams[0].team.shortName
        let homeTeamScore = colors.cyan.bold(result.teams[0].score)
        let awayTeam = result.teams[1].team.shortName
        let awayTeamScore = colors.cyan.bold(result.teams[1].score)
        console.log(
          `${homeTeam.padStart(
            20
          )} ${homeTeamScore} - ${awayTeamScore} ${awayTeam}`
        )
      })
      console.log('\n')
    })
  })
  .command('fixtures', 'get match fixtures', {}, async () => {
    const fixtures = await getFixtures()
    Object.keys(fixtures)
      .reverse()
      .forEach((fixtureDate) => {
        console.log(colors.bgMagenta(fixtureDate))
        fixtures[fixtureDate].forEach((fixture) => {
          let homeTeam = fixture.teams[0].team.shortName
          let bstDate = fixture.provisionalKickoff.label.split(',')[1]
          let awayTeam = fixture.teams[1].team.shortName
          console.log(`${homeTeam.padStart(20)} ${bstDate}  ${awayTeam}`)
        })
        console.log('\n')
      })
  })
  .showHelpOnFail(true)
  .demandCommand(1, '')
  .version('version 1.0.0')
  .help().argv
