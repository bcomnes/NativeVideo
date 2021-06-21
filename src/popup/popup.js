import { render, Component, html } from 'uland'

export const Popup = Component(() => {

  const loading = false

  if (loading) return html`<div>Loading...</div>`

  return html`
  Hello world
`
})

const popupMount = document.querySelector('#popup-component')
render(popupMount, () => html`
  <div>
    ${Popup()}
  </div>
`)
