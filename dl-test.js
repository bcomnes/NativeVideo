const { getInfo } = require('./ytdl')
const get = require('lodash.get')

async function test () {
  const results = await getInfo('https://www.youtube.com/watch?v=PLfDAxf1dH0')
  console.log(results.formats)

}

test().then(() => { console.log('done') }).catch(console.error)
