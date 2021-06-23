import { getInfo } from 'ytdl-core/lib/info.js'

function getBrowser () {
  if (window.browser) return window.browser
  else {
    console.log('polyfilling web extensions')
    return require('webextension-polyfill')
  }
}

const browser = getBrowser()

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Received request: ', message)

  if (message.fetchVideos) {
    const videoTags = document.querySelectorAll('video')
    const sourceTags = document.querySelectorAll('source')
    const videoSrcs = [...sourceTags, ...videoTags].filter(n => !!n.src).map(node => ({ href: node.src }))
    console.log(videoSrcs)
    getYoutubeVideos.then((moreVideos) => sendResponse(videoSrcs))
    return true
  }

  return false
})

async function getYoutubeVideos () {
  if (window.location.host.includes('youtube.com')) {
    const info = await getInfo(window.location.href)
    console.log(info)
    return []
  } else {
    return []
  }
}
