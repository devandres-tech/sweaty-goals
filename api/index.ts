import axios from 'axios'

export const getResults = async () => {
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
  let results
  try {
    results = await axios(config)
  } catch (error) {
    throw error
  }
  return results
}
