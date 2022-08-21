#!/usr/bin/env node

const yargs = require('yargs')
const colors = require('colors')
const api = require('./api/index')

yargs
  .scriptName('swg')
  .usage(
    'Welcome to Sweaty Goals CLI! Keep up with all English Premier League games. \n'
  )
  .usage('Usage: $0 <command> [args]')
  .command('results', 'get latest results', {}, async (argv) => {
    const results = await api.getResults()
    Object.keys(results).forEach((dateKey) => {
      console.log(`${colors.bgMagenta(dateKey)}`)
      results[dateKey].forEach((result) => {
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
    const fixtures = await api.getFixtures()
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
  .command('table', 'get current standings', {}, async () => {
    console.log(
      `${'Position'.padEnd(11)}${'Club'}${'MP'.padStart(26)}${'W'.padStart(
        5
      )}${'D'.padStart(5)}${'L'.padStart(5)} ${'GF'.padStart(
        5
      )} ${'GA'.padStart(5)} ${'GD'.padStart(5)} ${'Pts'.padStart(5)}\n`
    )

    let table = await api.getStandings()
    table.forEach((entry) => {
      let goalDifference =
        entry.overall.goalsDifference > 0
          ? '+' + entry.overall.goalsDifference
          : entry.overall.goalsDifference
      console.log(
        `${entry.position.toString().padEnd(10)} ${entry.team.name.padEnd(
          28
        )} ${entry.overall.played.toString().padEnd(4)} ${entry.overall.won
          .toString()
          .padEnd(4)} ${entry.overall.drawn
          .toString()
          .padEnd(4)} ${entry.overall.lost
          .toString()
          .padEnd(5)} ${entry.overall.goalsFor
          .toString()
          .padEnd(5)} ${entry.overall.goalsAgainst
          .toString()
          .padEnd(4)} ${goalDifference
          .toString()
          .padEnd(5)} ${colors.bold.magenta(entry.overall.points)}`
      )
      console.log(colors.dim('-'.repeat(80)))
    })
  })
  .showHelpOnFail(true)
  .demandCommand(1, '')
  .version('version 1.0.0')
  .help().argv
