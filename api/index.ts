import axios from 'axios'
import _, { map } from 'underscore'
import dotEnv from 'dotenv'
dotEnv.config()

export const getResults = async () => {
  var config = {
    method: 'get',
    url: `${process.env.BASE_URL}/fixtures?comps=1&teams=127,1,2,130,131,4,6,7,34,9,26,10,11,12,23,15,20,21,25,38&compSeasons=489&page=0&pageSize=40&sort=asc&statuses=C&altIds=true`,
    headers: {
      origin: 'https://www.premierleague.com',
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
    url: `${process.env.BASE_URL}/fixtures?comps=1&teams=127,1,2,130,131,4,6,7,34,9,26,10,11,12,23,15,20,21,25,38&compSeasons=489&page=0&pageSize=40&sort=asc&statuses=U,L&altIds=true`,
    headers: {
      origin: 'https://www.premierleague.com',
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

export const getStandings = async () => {
  var config = {
    method: 'get',
    url: `${process.env.BASE_URL}/compseasons/489/standings/?live=true`,
    headers: {
      origin: 'https://www.premierleague.com',
    },
  }
  let result: any
  try {
    result = await axios(config)
    return result.data.tables[0].entries
  } catch (error) {
    throw error
  }
}
