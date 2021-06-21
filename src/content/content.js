function getBrowser () {
  if (window.browser) return window.browser
  else {
    console.log('polyfilling web extensions')
    return require('webextension-polyfill')
  }
}

const browser = getBrowser()

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Received request: ', request)
})

console.log('NativeVideo Content Script')
