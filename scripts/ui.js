import { store } from './store.js';

import { indexDisc } from './api.js';

const messageContainer = document.querySelector('#message-container');
//const authContainer = document.querySelector('.auth-container');
const showDiscContainer = document.querySelector('#show-disc-container');
const indexContainer = document.querySelector('#index-container');
const indexDiscsContainer = document.querySelector('#index-disc-container');
const signUpContainer = document.querySelector('#sign-up-form-container');
const signInContainer = document.querySelector('#sign-in-form-container');
const mainNav = document.querySelector('.main-nav');
const secondaryNav = document.querySelector('.secondary-nav');
const createDiscForm = document.querySelector('.create-disc-form');

// Disc Actions
export const onIndexDiscSuccess = (discs) => {
  while (indexDiscsContainer.firstChild) {
    indexDiscsContainer.removeChild(indexDiscsContainer.lastChild);
  }
  discs.forEach((disc) => {
    const div = document.createElement('div');
    div.classList.add('content-card');
    div.innerHTML = `
            <h3>${disc.name}</h3>
            <button type="button" class="btn btn-primary" data-id="${disc._id}">Show Disc</button>
        `;
    indexDiscsContainer.appendChild(div);
  });
};

export const onCreateDiscSuccess = () => {
  messageContainer.innerText = 'You have created a disc!';
  setTimeout(() => {
    indexDisc()
      .then((res) => res.json())
      .then((res) => onIndexDiscSuccess(res.discs))
      .then(discListFunc())
      .catch(onFailure);
  }, 2000);
};

export const onShowDiscSuccess = (disc) => {
  while (showDiscContainer.firstChild) {
    showDiscContainer.removeChild(showDiscContainer.lastChild);
  }
  indexContainer.classList.add('hide');
  showDiscContainer.classList.remove('hide');
  const div = document.createElement('div');
  div.innerHTML = `
            <div class="stats">
              <h2>Disc</h2>
              <h3>${disc.name}</h3>
              <p>${disc.manufacturer}</p>
              <p>${disc.plastic}</p>
              <p>${disc.type}</p>
              <p>${disc.speed}</p>
              <p>${disc.glide}</p>
              <p>${disc.turn}</p>
              <p>${disc.fade}</p>

              <form data-id="${disc._id}">
                  <input class="form-control"class="form-control" type="text" name="firstName" value="${disc.name}">
                  <input class="form-control" type="text" name="manufacturer" value="${disc.manufacturer}">
                  <input class="form-control" type="text" name="plastic" value="${disc.plastic}">
                  <input class="form-control" type="text" name="type" value="${disc.type}">
                  <input class="form-control" type="number" name="speed" value="${disc.speed}">
                  <input class="form-control" type="number" name="glide" value="${disc.glide}">
                  <input class="form-control" type="number" name="turn" value="${disc.turn}">
                  <input class="form-control" type="number" name="fade" value="${disc.fade}">
                  <button type="submit" class="btn btn-warning">Update Disc</button>
              </form>
              <button type="button" class="btn btn-danger" data-id="${disc._id}">Delete Disc</button>
            </div>
  `;
  showDiscContainer.appendChild(div);
};

export const onUpdateDiscSuccess = () => {
  messageContainer.innerHTML = 'You have updated a disc';
  setTimeout(() => {
    indexDisc()
      .then((res) => res.json())
      .then((res) => onIndexDiscSuccess(res.discs))
      .then(discListFunc())
      .catch(onFailure);
  }, 2000);
};

export const onDeleteDiscSuccess = () => {
  messageContainer.innerHTML = 'You have deleted a disc';
  setTimeout(() => {
    indexDisc()
      .then((res) => res.json())
      .then((res) => onIndexDiscSuccess(res.discs))
      .then(discListFunc())
      .catch(onFailure);
  }, 2000);
};

// User Actions
export const onSignUpSuccess = () => {
  messageContainer.innerHTML = "You've created a new user! Now Sign In";
};

export const onSignInSuccess = (userToken) => {
  messageContainer.innerHTML = '';
  store.userToken = userToken;
  signUpContainer.classList.add('hide');
  signInContainer.classList.add('hide');
  indexContainer.classList.remove('hide');
  mainNav.classList.add('hide');
  secondaryNav.classList.remove('hide');
};

export const onFailure = (error) => {
  messageContainer.innerHTML = `
        <h3>You've encountered an error. Try again later</h3>
        <p>${error}</p>
    `;
};

export const homeFunc = () => {
  // signUpContainer.classList.remove('hide');
  // signInContainer.classList.remove('hide');
  // indexContainer.classList.add('hide');
  // mainNav.classList.remove('hide');
  // secondaryNav.classList.add('hide');
  // signInContainer.reset();
  // signUpContainer.reset();
  location.reload();
};

export const addDiscFunc = () => {
  createDiscForm.classList.remove('hide');
  indexContainer.classList.add('hide');
};

export const discListFunc = () => {
  messageContainer.innerHTML = '';
  signUpContainer.classList.add('hide');
  signInContainer.classList.add('hide');
  indexContainer.classList.remove('hide');
  mainNav.classList.add('hide');
  secondaryNav.classList.remove('hide');
  createDiscForm.classList.add('hide');
  showDiscContainer.classList.add('hide');
};
