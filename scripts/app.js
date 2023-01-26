import {
  signUp,
  signIn,
  indexDisc,
  createDisc,
  showDisc,
  updateDisc,
  deleteDisc,
} from './api.js';

import {
  onSignUpSuccess,
  onSignInSuccess,
  onIndexDiscSuccess,
  onCreateDiscSuccess,
  onShowDiscSuccess,
  onUpdateDiscSuccess,
  onDeleteDiscSuccess,
  onFailure,
  homeFunc,
  addDiscFunc,
  discListFunc,
} from './ui.js';

const signUpContainer = document.querySelector('#sign-up-form-container');
const signInContainer = document.querySelector('#sign-in-form-container');
const home = document.querySelector('.home');
const discList = document.querySelector('.disc-list');
const addDisc = document.querySelector('.add-disc');
const createDiscForm = document.querySelector('.create-disc-form');
const indexContainer = document.querySelector('#index-container');
const indexDiscsContainer = document.querySelector('#index-disc-container');
const showDiscContainer = document.querySelector('#show-disc-container');

// User Actions

signUpContainer.addEventListener('submit', (event) => {
  event.preventDefault();
  const userData = {
    credentials: {
      email: event.target['email'].value,
      password: event.target['password'].value,
    },
  };
  signUp(userData).then(onSignUpSuccess).catch(onFailure);
});

signInContainer.addEventListener('submit', (event) => {
  event.preventDefault();
  const userData = {
    credentials: {
      email: event.target['email'].value,
      password: event.target['password'].value,
    },
  };
  signIn(userData)
    .then((res) => res.json())
    .then((res) => onSignInSuccess(res.token))
    .then(indexDisc)
    .then((res) => res.json())
    .then((res) => onIndexDiscSuccess(res.discs))
    .catch(onFailure);
});

// Disc Actions

indexDiscsContainer.addEventListener('click', (event) => {
  const id = event.target.getAttribute('data-id');

  if (!id) return;

  showDisc(id)
    .then((res) => res.json())
    .then((res) => {
      onShowDiscSuccess(res.disc);
    })
    .catch(onFailure);
});

createDiscForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const discData = {
    disc: {
      name: event.target['name'].value,
      manufacturer: event.target['manufacturer'].value,
      plastic: event.target['plastic'].value,
      type: event.target['type'].value,
      speed: event.target['speed'].value,
      glide: event.target['glide'].value,
      turn: event.target['turn'].value,
      fade: event.target['fade'].value,
    },
  };
  createDisc(discData).then(onCreateDiscSuccess).catch(onFailure);
});

showDiscContainer.addEventListener('submit', (event) => {
  event.preventDefault();
  const id = event.target.getAttribute('data-id');
  const discData = {
    disc: {
      name: event.target['name'].value,
      manufacturer: event.target['manufacturer'].value,
      plastic: event.target['plastic'].value,
      type: event.target['type'].value,
      speed: event.target['speed'].value,
      glide: event.target['glide'].value,
      turn: event.target['turn'].value,
      fade: event.target['fade'].value,
    },
  };
  updateDisc(discData, id).then(onUpdateDiscSuccess).catch(onFailure);
});

showDiscContainer.addEventListener('click', (event) => {
  const id = event.target.getAttribute('data-id');

  if (!id) return;

  deleteDisc(id).then(onDeleteDiscSuccess).catch(onFailure);
});

// Nav Bar Actions

home.addEventListener('click', homeFunc);

addDisc.addEventListener('click', addDiscFunc);

discList.addEventListener('click', () => {
  // grab all discs
  indexDisc()
    .then((res) => res.json())
    .then((res) => onIndexDiscSuccess(res.discs))
    .then(discListFunc())
    .catch(onFailure);
});
