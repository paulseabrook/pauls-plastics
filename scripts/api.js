import { store } from './store.js';

// User actions
export const signUp = (data) => {
  return fetch(`http://localhost:8000/sign-up`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

export const signIn = (data) => {
  return fetch(`http://localhost:8000/sign-in`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};

// Disc Actions
export const indexDisc = () => {
  return fetch('http://localhost:8000/discs', {
    headers: {
      Authorization: `Bearer ${store.userToken}`,
    },
  });
};

export const showDisc = (id) => {
  return fetch(`http://localhost:8000/discs/${id}`, {
    headers: {
      Authorization: `Bearer ${store.userToken}`,
    },
  });
};

export const createReview = (data) => {
  return fetch(`http://localhost:8000/reviews`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${store.userToken}`,
    },
    body: JSON.stringify(data),
  });
};

export const createDisc = (data) => {
  return fetch(`http://localhost:8000/discs`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${store.userToken}`,
    },
    body: JSON.stringify(data),
  });
};

export const updateDisc = (data, id) => {
  return fetch(`http://localhost:8000/discs/${id}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${store.userToken}`,
    },
    body: JSON.stringify(data),
  });
};

export const deleteDisc = (id) => {
  return fetch(`http://localhost:8000/discs/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${store.userToken}`,
    },
  });
};
