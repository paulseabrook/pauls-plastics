import { store } from './store.js'

// for local dev - http://localhost:8000/

// User actions
export const signUp = (data) => {
  return fetch(`https://pauls-plastics-server.onrender.com/sign-up`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

export const signIn = (data) => {
  return fetch(`https://pauls-plastics-server.onrender.com/sign-in`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
}

// Disc Actions
export const indexDisc = () => {
  return fetch('https://pauls-plastics-server.onrender.com/discs', {
    headers: {
      Authorization: `Bearer ${store.userToken}`,
    },
  })
}

export const showDisc = (id) => {
  return fetch(`https://pauls-plastics-server.onrender.com/discs/${id}`, {
    headers: {
      Authorization: `Bearer ${store.userToken}`,
    },
  })
}

export const createReview = (data) => {
  return fetch(`https://pauls-plastics-server.onrender.com/reviews`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${store.userToken}`,
    },
    body: JSON.stringify(data),
  })
}

export const createDisc = (data) => {
  return fetch(`https://pauls-plastics-server.onrender.com/discs`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${store.userToken}`,
    },
    body: JSON.stringify(data),
  })
}

export const updateDisc = (data, id) => {
  return fetch(`https://pauls-plastics-server.onrender.com/discs/${id}`, {
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

export const deleteDisc = (id) => {
  return fetch(`https://pauls-plastics-server.onrender.com/discs/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${store.userToken}`,
    },
  }).then((response) => {
    return response.status
  })
}
