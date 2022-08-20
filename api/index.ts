import axios from 'axios'
import _, { map } from 'underscore'

export const getResults = async () => {
  var config = {
    method: 'get',
    url: 'https://footballapi.pulselive.com/football/fixtures?comps=1&teams=127,1,2,130,131,4,6,7,34,9,26,10,11,12,23,15,20,21,25,38&compSeasons=489&page=0&pageSize=40&sort=asc&statuses=C&altIds=true',
    headers: {
      authority: 'footballapi.pulselive.com',
      accept: '*/*',
      'accept-language': 'en-US,en;q=0.9,es-MX;q=0.8,es;q=0.7,la;q=0.6',
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      origin: 'https://www.premierleague.com',
      referer: 'https://www.premierleague.com/',
    },
  }
  try {
    let res = await axios(config)
    const results = res?.data.content.map(
      (item: { kickoff: { label: string } }) => {
        item.kickoff.label = item.kickoff.label.slice(0, 15).replace(',', '')
        return item
      }
    )
    return _.groupBy(results, (item) => item.kickoff.label)
  } catch (error) {
    throw error
  }
}

export const getFixtures = async () => {
  var config = {
    method: 'get',
    url: 'https://footballapi.pulselive.com/football/fixtures?comps=1&teams=127,1,2,130,131,4,6,7,34,9,26,10,11,12,23,15,20,21,25,38&compSeasons=489&page=0&pageSize=40&sort=asc&statuses=U,L&altIds=true',
    headers: {
      authority: 'footballapi.pulselive.com',
      accept: '*/*',
      'accept-language': 'en-US,en;q=0.9,es-MX;q=0.8,es;q=0.7,la;q=0.6',
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      origin: 'https://www.premierleague.com',
      referer: 'https://www.premierleague.com/',
    },
  }
  let result: any
  try {
    result = await axios(config)
    let data = result?.data.content.map(
      (item: { kickoff: { label: string } }) => {
        item.kickoff.label = item.kickoff.label.slice(0, 15).replace(',', '')
        return item
      }
    )
    return _.groupBy(data, (item) => item.kickoff.label)
  } catch (error) {
    throw error
  }
}
