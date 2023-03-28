/////////////

import { store } from './store.js'

// User actions

// for local dev - http://localhost:8000/sign-up
// for render deployed app, use: https://pauls-plastics-server.onrender.com/sign-up
// for fly.io deployed app, use: https://pauls-plastics.fly.dev/sign-up
export const signUp = (data) => {
  return fetch(`https://pauls-plastics.fly.dev/sign-up`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

// for local dev - http://localhost:8000/sign-in
// for render deployed app, use: https://pauls-plastics-server.onrender.com/sign-in
// for fly.io deployed app, use: https://pauls-plastics.fly.dev/sign-in
export const signIn = (data) => {
  return fetch(`https://pauls-plastics.fly.dev/sign-in`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

// Disc Actions

// for local dev - http://localhost:8000/discs
// for render deployed app, use: https://pauls-plastics-server.onrender.com/discs
// for fly.io deployed app, use: https://pauls-plastics.fly.dev/discs
export const indexDisc = () => {
  return fetch(' https://pauls-plastics.fly.dev/discs', {
    headers: {
      Authorization: `Bearer ${store.userToken}`,
    },
  })
}

// for local dev - http://localhost:8000/discs/${id}
// for render deployed app, use: https://pauls-plastics-server.onrender.com/discs/${id}
// for fly.io deployed app, use: https://pauls-plastics.fly.dev/discs/${id}
export const showDisc = (id) => {
  return fetch(`https://pauls-plastics.fly.dev/discs/${id}`, {
    headers: {
      Authorization: `Bearer ${store.userToken}`,
    },
  })
}

// for local dev - http://localhost:8000/discs
// for render deployed app, use: https://pauls-plastics-server.onrender.com/discs
// for fly.io deployed app, use: https://pauls-plastics.fly.dev/discs
export const createDisc = (data) => {
  return fetch(`https://pauls-plastics.fly.dev/discs`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${store.userToken}`,
    },
    body: JSON.stringify(data),
  })
}

// for local dev - http://localhost:8000/discs/${id}
// for render deployed app, use:  https://pauls-plastics-server.onrender.com/discs/${id}
// for fly.io deployed app, use: https://pauls-plastics.fly.dev/discs/${id}
export const updateDisc = (data, id) => {
  return fetch(`https://pauls-plastics.fly.dev/discs/${id}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${store.userToken}`,
    },
    body: JSON.stringify(data),
  }).then((response) => {
    return response.status
  })
}

// for local dev - http://localhost:8000/discs/${id}
// for render deployed app, use:  https://pauls-plastics-server.onrender.com/discs/${id}
// for fly.io deployed app, use: https://pauls-plastics.fly.dev/discs/${id}
export const deleteDisc = (id) => {
  return fetch(`https://pauls-plastics.fly.dev/discs/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${store.userToken}`,
    },
  }).then((response) => {
    return response.status
  })
}

// Review Actions

// for local dev = http://localhost:8000/reviews
// for render deployed app, use: https://pauls-plastics-server.onrender.com/reviews
// for fly.io deployed app, use: https://pauls-plastics.fly.dev/reviews/
export const createReview = (data) => {
  return fetch(`https://pauls-plastics.fly.dev/reviews`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${store.userToken}`,
    },
    body: JSON.stringify(data),
  })
}

// for local dev = http://localhost:8000/reviews/${id}
// for fly.io deployed app, use: https://pauls-plastics.fly.dev/reviews/${id}
export const updateReview = (data, id) => {
  return fetch(`https://pauls-plastics.fly.dev/reviews/${id}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${store.userToken}`,
    },
    body: JSON.stringify(data),
  }).then((response) => {
    return response.status
  })
}

// for local dev = http://localhost:8000/reviews/${id}
// for fly.io deployed app, use: https://pauls-plastics.fly.dev/reviews/${id}
export const deleteReview = (data, id) => {
  return fetch(`https://pauls-plastics.fly.dev/reviews/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${store.userToken}`,
    },
    body: JSON.stringify(data),
  }).then((response) => {
    return response.status
  })
}
