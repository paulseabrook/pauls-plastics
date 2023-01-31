import { store } from './store.js';

import { indexDisc, showDisc } from './api.js';

// grab from the DOM
const messageContainer = document.querySelector('.message-container');
const showDiscContainer = document.querySelector('#show-disc-container');
const indexDiscsContainer = document.querySelector('.index-disc-container');
const signUpContainer = document.querySelector('#sign-up-form-container');
const signInContainer = document.querySelector('#sign-in-form-container');
const mainNav = document.querySelector('.main-nav');
const secondaryNav = document.querySelector('.secondary-nav');
const createDiscForm = document.querySelector('.create-disc-form');
const reviewDiscForm = document.querySelector('.review-disc-form');
const footer = document.querySelector('.footer');
const inputs = document.querySelectorAll('input');
const mainReview = document.querySelector('main-review');

// Disc Actions
export const onIndexDiscSuccess = (discs) => {
  // clear the values within input forms upon successful sign in
  inputs.forEach((input) => {
    if (input.type != 'submit') {
      input.value = '';
    }
  });

  footer.classList.add('hide');
  // clear all of the children of indexDiscsContainer upon sign in before displaying them again
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
            <button type="button" class="button1-design" data-id="${disc._id}">info.</button>
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
  let html = '';
  let html1 = '';
  let i = 1;

  while (showDiscContainer.firstChild) {
    showDiscContainer.removeChild(showDiscContainer.lastChild);
  }

  messageContainer.innerHTML = `<h2>${disc.name}</h2>`;

  const div = document.createElement('div');
  const reviewDiv = document.createElement('div');
  const createDiv = document.createElement('div');
  const mainReview = document.createElement('div');

  indexDiscsContainer.classList.add('hide');
  showDiscContainer.classList.remove('hide');
  reviewDiscForm.classList.remove('hide');
  mainReview.classList.add('main-review');
  footer.classList.add('hide');

  div.innerHTML = `
  <div class="stats-update-div">
    <div class="stats">
      <h2>Stats.</h2>
      <p>name: ${disc.name}</p>
      <p>manufacturer: ${disc.manufacturer}</p>
      <p>plastic: ${disc.plastic}</p>
      <p>type: ${disc.type}</p>
      <p>speed: ${disc.speed}</p>
      <p>glide: ${disc.glide}</p>
      <p>turn: ${disc.turn}</p>
      <p>fade: ${disc.fade}</p>
    </div>
    <div class="update">
      <h2>Update.</h2>
      <form class="form-group" data-id="${disc._id}">
          <input class="form-control"class="form-control" type="text" name="name" value="${disc.name}">
          <input class="form-control" type="text" name="manufacturer" value="${disc.manufacturer}">
          <input class="form-control" type="text" name="plastic" value="${disc.plastic}">
          <input class="form-control" type="text" name="type" value="${disc.type}">
          <input class="form-control" type="number" name="speed" value="${disc.speed}">
          <input class="form-control" type="number" name="glide" value="${disc.glide}">
          <input class="form-control" type="number" name="turn" value="${disc.turn}">
          <input class="form-control" type="number" name="fade" value="${disc.fade}">
          <div class="btn-group">
            <button type="submit" class="btn button2-design">update disc.</button>
            <button type="button" class="btn button3-design" data-id="${disc._id}">delete disc.</button>
          </div>
        </form>
    </div>
  </div>
  `;

  reviews.forEach((review) => {
    html += `<h3><u>Review ${i}</u></h3>`;
    html += `<div>${review.comment}</div>`;
    html += `<div>rating: ${review.rating}/10</div>`;
    html += `<div>----------------------------------------</div>`;
    i++;
  });

  html1 += `<form class="review-form" data-id="${disc._id}">
          <div class="form-floating ">
            <input type="text" class="form-control" name="comment" placeholder="comment." />
            <label for="comment" class=form-label">comment.</label>
          </div>
          <div class="form-floating ">
            <input type="number" class="form-control " name="rating" placeholder="rating." />
            <label for="rating" class="form-label custom-select">rating.</label>
          </div>
            <input type="submit" class="button1-design" value="create review." />
          </form>`;

  reviewDiv.innerHTML = html;
  createDiv.innerHTML = html1;

  reviewDiv.classList.add('reviews');

  while (reviewDiscForm.firstChild) {
    reviewDiscForm.removeChild(reviewDiscForm.lastChild);
  }

  reviewDiscForm.appendChild(createDiv);
  showDiscContainer.appendChild(div);
  mainReview.appendChild(reviewDiv);
  mainReview.appendChild(reviewDiscForm);
  showDiscContainer.appendChild(mainReview);
};

export const onUpdateDiscSuccess = () => {
  messageContainer.innerHTML = 'You have updated a disc';
};

export const onUpdateDiscFailure = () => {
  messageContainer.innerHTML =
    'You do not have permissions to update this disc';
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

export const onDeleteDiscFailure = (id) => {
  messageContainer.innerHTML =
    'You do not have permissions to delete this disc';
  setTimeout(() => {
    showDisc(id)
      .then((res) => res.json())
      .then((res) => {
        onShowDiscSuccess(res.disc);
      })
      .catch(onFailure);
  }, 2000);
};

export const onCreateReviewSuccess = () => {
  messageContainer.innerHTML = 'You have left a review';
  reviewDiscForm.classList.add('hide');
  mainReview.classList.add('hide');
};

// User Actions
export const onSignUpSuccess = () => {
  messageContainer.innerHTML = "You've created a new user! Now Sign In";
  messageContainer.classList.remove('hide');
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

// General Functionality
export const onFailure = (error) => {
  messageContainer.classList.remove('hide');
  messageContainer.innerHTML = `
        <h3>You've encountered an error. Try again later</h3>
        <p>${error}</p>
    `;
};

export const homeFunc = () => {
  signUpContainer.classList.remove('hide');
  signInContainer.classList.remove('hide');
  mainNav.classList.remove('hide');
  secondaryNav.classList.add('hide');
  messageContainer.classList.add('hide');
  createDiscForm.classList.add('hide');
  showDiscContainer.classList.add('hide');
  reviewDiscForm.classList.add('hide');
  indexDiscsContainer.classList.add('hide');
  footer.classList.remove('hide');

  // clear the values within input forms upon successful sign out
  inputs.forEach((input) => {
    if (input.type != 'submit') {
      input.value = '';
    }
  });
};

export const addDiscFunc = () => {
  messageContainer.classList.remove('hide');
  reviewDiscForm.classList.add('hide');
  showDiscContainer.classList.add('hide');
  messageContainer.innerHTML = '<h3>add disc below.</h3>';
  createDiscForm.classList.remove('hide');
  indexDiscsContainer.classList.add('hide');
  footer.classList.add('hide');
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
  footer.classList.remove('hide');
};
