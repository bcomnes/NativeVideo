import { render, Component, html, useState, useEffect } from 'uland'
import get from 'lodash.get'

export const Popup = Component(() => {
  const [videoUrls, setVideoUrls] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchVideoUrls = async () => {
      setLoading(true)

      try {
        console.log('sending message')
        const tabs = await browser.tabs.query({ active: true, currentWindow: true })
        const currentTabId = get(tabs, '[0].id')
        const results = await browser.tabs.sendMessage(currentTabId, { fetchVideos: true })
        console.log(results)
        setVideoUrls(results)
      } catch (e) {
        console.error(e)
        setError(e)
      } finally {
        setLoading(false)
      }
    }

    fetchVideoUrls()
  }, [])

  if (loading) return html`<div>Loading...</div>`

  async function replaceVideo (src) {
    const tabs = await browser.tabs.query({ active: true, currentWindow: true })
    const currentTabId = get(tabs, '[0].id')
    const results = await browser.tabs.sendMessage(currentTabId, { replaceYoutubeVideo: { src } })
    console.log(results)
  }

  return html`
  <div>
    <ul>
      ${videoUrls
        ? videoUrls.filter(v => (v.hasAudio && v.hasVideo) || (v.hasAudi && v.container === 'mp4')).map(v => html.for(v)`
          <li>

            <div>
              <a href=${v.href}>
                ${v.itag
                  ? html`
                    <span>${v.itag} ${v.container} ${v.qualityLabel} ${v.hasVideo && !v.hasAudio ? 'Video Only' : ''} ${!v.hasVideo && v.hasAudio ? 'Audio Only' : ''}</span>
                    <button onclick=${() => { replaceVideo(v.href) }}>Replace</button>
                    `
                  : v.href
                }
              </a>
            </div>
          </li>
        `)
        : null
      }
    </ul>
  </div>
  ${error
    ? html`<div>${error.message || error}</div>`
    : null
  }
`
})

const popupMount = document.querySelector('#popup-component')
render(popupMount, () => html`
  <div>
    ${Popup()}
  </div>
`)
