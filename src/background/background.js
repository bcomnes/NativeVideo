window.browser = browser

browser.runtime.onInstalled.addListener(async ({ reason, temporary }) => {
  console.log('NativeVideo installed')
})

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  /*
    Debug logging
  */
  console.log({ message, sender, onMessage: true })

  // Safari doesn't like it when you return a data containing promise. Stick with sendResponse

  return false
})

browser.storage.onChanged.addListener(async (changes, areaName) => {
  /*
    update interval settings
  */
  console.log({ changes, areaName, storageListener: true })
})
