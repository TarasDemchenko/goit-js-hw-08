const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
let saveFormStateTimeout;

const saveFormState = () => {
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formState));
};

const throttle = (callback, delay) => {
  let previousCall = new Date().getTime();
  return function () {
    const time = new Date().getTime();
    if (time - previousCall >= delay) {
      previousCall = time;
      callback.apply(null, arguments);
    }
  };
};

const throttledSaveFormState = throttle(saveFormState, 1000);

const loadFormState = () => {
  const savedState = localStorage.getItem('feedback-form-state');
  if (savedState) {
    const formState = JSON.parse(savedState);
    emailInput.value = formState.email;
    messageInput.value = formState.message;
  }
};

const clearFormState = () => {
  localStorage.removeItem('feedback-form-state');
  emailInput.value = '';
  messageInput.value = '';
};

form.addEventListener('input', () => {
  clearTimeout(saveFormStateTimeout);
  saveFormStateTimeout = setTimeout(throttledSaveFormState, 1000);
});

form.addEventListener('submit', event => {
  event.preventDefault();
  console.log({
    email: emailInput.value,
    message: messageInput.value,
  });
  clearFormState();
});

window.addEventListener('DOMContentLoaded', loadFormState);

window.addEventListener('unload', saveFormState);
