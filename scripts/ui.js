import { store } from './store.js';

const messageContainer = document.querySelector('#message-container');
//const authContainer = document.querySelector('.auth-container');
const indexContainer = document.querySelector('#index-container');
const indexDiscsContainer = document.querySelector('#index-disc-container');
const signUpContainer = document.querySelector('#sign-up-form-container');
const signInContainer = document.querySelector('#sign-in-form-container');
const mainNav = document.querySelector('.main-nav');
const secondaryNav = document.querySelector('.secondary-nav');
const createDiscForm = document.querySelector('.create-disc-form');

// Disc Actions
export const onIndexDiscSuccess = (discs) => {
  debugger;
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
  signUpContainer.classList.add('hide');
  signInContainer.classList.add('hide');
  indexContainer.classList.remove('hide');
  mainNav.classList.add('hide');
  secondaryNav.classList.remove('hide');
  createDiscForm.classList.add('hide');
};
