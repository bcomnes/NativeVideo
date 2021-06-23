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
    sendResponse(videoSrcs)
    return true
  }

  return false
})

console.log('NativeVideo Content Script')
