import yargs from 'yargs'
import axios from 'axios'
import { terminal } from 'terminal-kit'
import _, { map } from 'underscore'

yargs
  .scriptName('swg')
  .usage(
    'Welcome to Sweaty Goals CLI! Keep up with all English Premier League games. \n'
  )
  .usage('Usage: $0 <command> [args]')
  .command('results', 'get latest results', {}, async (argv) => {
    var config = {
      method: 'get',
      url: 'https://footballapi.pulselive.com/football/fixtures?comps=1&teams=127,1,2,130,131,4,6,7,34,9,26,10,11,12,23,15,20,21,25,38&compSeasons=489&page=0&pageSize=40&sort=desc&statuses=C&altIds=true',
      headers: {
        authority: 'footballapi.pulselive.com',
        accept: '*/*',
        'accept-language': 'en-US,en;q=0.9,es-MX;q=0.8,es;q=0.7,la;q=0.6',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        origin: 'https://www.premierleague.com',
        referer: 'https://www.premierleague.com/',
      },
    }

    const res = await axios(config)
    const results = res.data.content.map(
      (item: { kickoff: { label: string } }) => {
        item.kickoff.label = item.kickoff.label.slice(0, 14)
        return item
      }
    )
    const g = _.groupBy(results, (item) => item.kickoff.label)
    Object.keys(g).forEach((item) => {
      console.log('DATE -------', item)
      g[item].forEach((result) => {
        let homeTeam = result.teams[0].team.shortName
        let homeTeamScore = result.teams[0].score
        let awayTeam = result.teams[1].team.shortName
        let awayTeamScore = result.teams[1].score
        console.log('res---', homeTeam, homeTeamScore, awayTeamScore, awayTeam)
      })
      console.log('\n')
    })
  })
  .showHelpOnFail(true)
  .demandCommand(1, '')
  .version('version 1.0.0')
  .help().argv
