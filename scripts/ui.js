import { store } from './store.js';

import { indexDisc } from './api.js';

const messageContainer = document.querySelector('.message-container');
//const authContainer = document.querySelector('.auth-container');
const showDiscContainer = document.querySelector('#show-disc-container');
const indexContainer = document.querySelector('#index-container');
const indexDiscsContainer = document.querySelector('#index-disc-container');
const signUpContainer = document.querySelector('#sign-up-form-container');
const signInContainer = document.querySelector('#sign-in-form-container');
const mainNav = document.querySelector('.main-nav');
const secondaryNav = document.querySelector('.secondary-nav');
const createDiscForm = document.querySelector('.create-disc-form');

const reviewDiscForm = document.querySelector('.review-disc-form');

// Disc Actions
export const onIndexDiscSuccess = (discs) => {
  while (indexDiscsContainer.firstChild) {
    indexDiscsContainer.removeChild(indexDiscsContainer.lastChild);
  }
  messageContainer.innerHTML = '<h3>discs.</h3>';
  messageContainer.classList.remove('hide');
  discs.forEach((disc) => {
    const div = document.createElement('div');
    div.classList.add('content-card');
    div.innerHTML = `
            <h3>${disc.name}</h3>
            <button type="button" class="button1-design" data-id="${disc._id}">show disc.</button>
        `;
    indexDiscsContainer.appendChild(div);
  });
};

export const onCreateDiscSuccess = () => {
  indexDiscsContainer.classList.add('hide');
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
  let reviews = disc.reviews;
  while (showDiscContainer.firstChild) {
    showDiscContainer.removeChild(showDiscContainer.lastChild);
  }
  messageContainer.classList.add('hide');
  indexDiscsContainer.classList.add('hide');
  showDiscContainer.classList.remove('hide');
  reviewDiscForm.classList.remove('hide');
  const div = document.createElement('div');
  const reviewDiv = document.createElement('div');
  const createDiv = document.createElement('div');
  div.innerHTML = `
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
      <button type="submit" class="button2-design">update disc.</button>
  </form>
  <button type="button" class="button3-design" data-id="${disc._id}">delete disc.</button>
  `;
  let html = '';
  let html1 = '';
  let i = 1;
  reviews.forEach((review) => {
    console.log(review);
    html += `<h3>Review ${i}</h3>`;
    html += `<div>${review.comment}</div>`;
    html += `<div>${review.rating}</div>`;
    i++;
  });
  html1 += `<form data-id="${disc._id}">
            <input type="text" name="comment" placeholder="comment" />
            <input type="text" name="rating" placeholder="rating" />
            <input type="submit" value="create review." />
          </form>`;

  reviewDiv.innerHTML = html;
  createDiv.innerHTML = html1;
  console.log(createDiv);
  showDiscContainer.appendChild(div);
  showDiscContainer.appendChild(reviewDiv);
  while (reviewDiscForm.firstChild) {
    reviewDiscForm.removeChild(reviewDiscForm.lastChild);
  }
  reviewDiscForm.appendChild(createDiv);
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

export const onCreateReviewSuccess = () => {
  messageContainer.innerHTML = 'You have left a review';
  reviewDiscForm.classList.add('hide');
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
  indexDiscsContainer.classList.remove('hide');
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
  location.reload();
};

export const addDiscFunc = () => {
  reviewDiscForm.classList.add('hide');
  showDiscContainer.classList.add('hide');
  messageContainer.innerHTML = '<h3>add disc.</h3>';
  createDiscForm.classList.remove('hide');
  indexDiscsContainer.classList.add('hide');
};

export const discListFunc = () => {
  reviewDiscForm.classList.add('hide');
  messageContainer.innerHTML = '';
  signUpContainer.classList.add('hide');
  signInContainer.classList.add('hide');
  indexDiscsContainer.classList.remove('hide');
  mainNav.classList.add('hide');
  secondaryNav.classList.remove('hide');
  createDiscForm.classList.add('hide');
  showDiscContainer.classList.add('hide');
};
