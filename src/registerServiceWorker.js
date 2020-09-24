/* eslint-disable no-console */

import { register } from 'register-service-worker'
const updateFound = worker => {
  console.log('updated and skip waiting', worker)
  worker.postMessage({action: 'skipWaiting'})
}
let UpdatedEvent = new CustomEvent('swUpdated', { detail: null });


if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered () {
      console.log('Service worker has been registered.')
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated (action) {
      console.log('New content is available; please refresh.')
      updateFound(action.waiting)
      UpdatedEvent.detail = action;
      document.dispatchEvent(UpdatedEvent);

    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
  let refreshing;
  if(navigator) {
    if(navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        // This fires when the service worker controlling this page
        // changes, eg a new worker has skipped waiting and become
        // the new active worker.

        if (refreshing) return;
        window.location.reload()
        refreshing = true
      })
    }
  }
}
