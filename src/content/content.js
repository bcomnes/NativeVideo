import { querySelectorAllDeep } from 'query-selector-shadow-dom'

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
    const searchArray = []
    const videoTags = querySelectorAllDeep('video')
    const audioTags = querySelectorAllDeep('audio')
    const sourceTags = querySelectorAllDeep('source')
    const iframeTags = querySelectorAllDeep('iframe')
    searchArray.push(...sourceTags, ...audioTags, ...videoTags, ...iframeTags)

    const videoSrcs = searchArray.filter(n => !!n.src).map(node => ({ href: node.src }))
    getYoutubeVideos().then(moreVideos => {
      console.log(moreVideos)
      sendResponse([...moreVideos, ...videoSrcs])
    }).catch(console.error)

    return true
  }

  if (message.replaceYoutubeVideo) {
    if (window.location.host.includes('youtube.com')) {
      document.querySelector('#player-container').innerHTML = `<video style="height: 100%; width: auto;" controls src="${message.replaceYoutubeVideo.src}" />`
    }
    return true
  }

  return false
})

async function getYoutubeVideos () {
  if (window.location.host.includes('youtube.com')) {
    const { getInfo } = require('../polyfills/ytdl')
    const info = await getInfo(window.location.href)

    if (info.formats) {
      return info.formats.map(f => ({
        href: f.url,
        itag: f.itag,
        mimeType: f.mimeType,
        qualityLabel: f.qualityLabel,
        hasVideo: f.hasVideo,
        hasAudio: f.hasAudio,
        container: f.container,
        codecs: f.codecs,
        videoCodec: f.videoCodec,
        audioCodec: f.audioCodec
      }))
    } else {
      return []
    }
  } else {
    return []
  }
}
