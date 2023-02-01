// import functionality from api.js
import {
  signUp,
  signIn,
  indexDisc,
  createDisc,
  showDisc,
  updateDisc,
  deleteDisc,
  createReview,
} from './api.js';

// import functionality from ui.js
import {
  onSignUpSuccess,
  onSignInSuccess,
  onIndexDiscSuccess,
  onCreateDiscSuccess,
  onShowDiscSuccess,
  onUpdateDiscSuccess,
  onDeleteDiscSuccess,
  onCreateReviewSuccess,
  onUpdateDiscFailure,
  onDeleteDiscFailure,
  onFailure,
  homeFunc,
  addDiscFunc,
  discListFunc,
} from './ui.js';

// grab our DOM elements
const signUpContainer = document.querySelector('#sign-up-form-container');
const signInContainer = document.querySelector('#sign-in-form-container');
const home = document.querySelector('.home');
const discList = document.querySelector('.disc-list');
const addDisc = document.querySelector('.add-disc');
const createDiscForm = document.querySelector('.create-disc-form');
const indexDiscsContainer = document.querySelector('.index-disc-container');
const showDiscContainer = document.querySelector('#show-disc-container');
const reviewDiscForm = document.querySelector('.review-disc-form');

// User Actions

// when signing up, prevent the form from refreshing, assign the email and password to userData, call the signup (API call) function on userData, and handle for success or failure
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

// when signing in, prevent the form from refreshing, assign the email and password to userData, call the signin (API call) function, and handle for success by showing the discs or handle for failure
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

// show a specific disc
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

// create a disc based on what the user input into the add disc form
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

// functionality for updating a disc based on the user's input
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

  updateDisc(discData, id)
    .then((response) => {
      // if response is 204, send success message
      if (response == 204) {
        onUpdateDiscSuccess();
        // else if response is 401. send failure message
      } else if (response == 401) {
        onUpdateDiscFailure();
      }
    })
    .catch(onFailure);

  setTimeout(() => {
    showDisc(id)
      .then((res) => res.json())
      .then((res) => {
        onShowDiscSuccess(res.disc);
      })
      .catch(onFailure);
  }, 2000);
});

// functionality for deleting a disc
showDiscContainer.addEventListener('click', (event) => {
  const id = event.target.getAttribute('data-id');

  if (!id) return;

  deleteDisc(id)
    .then((response) => {
      if (response == 204) {
        onDeleteDiscSuccess();
      } else if (response == 401) {
        onDeleteDiscFailure(id);
      }
    })
    .catch(onFailure);
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

// Review Actions

// functionality for creating a review and then showing the disc again.
reviewDiscForm.addEventListener('submit', (event) => {
  event.preventDefault();
  // pull the id from the event.target
  const id = event.target.getAttribute('data-id');

  // if no id, return out
  if (!id) return;
  // put the data in reviewData
  const reviewData = {
    review: {
      comment: event.target['comment'].value,
      rating: event.target['rating'].value,
      discId: id,
    },
  };

  // make the API Call, handle for success or failure
  createReview(reviewData).then(onCreateReviewSuccess).catch(onFailure);
  // show the disc that we just reviewed on based on the id above
  setTimeout(() => {
    showDisc(id)
      .then((res) => res.json())
      .then((res) => {
        onShowDiscSuccess(res.disc);
      })
      .catch(onFailure);
  }, 2000);
});
