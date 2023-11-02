import throttle from 'lodash.throttle';

const FEEDBACK_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(handlerInput, 500));
form.addEventListener('submit', handlerSubmit);

let inputData = {};
refreshForm();

function handlerInput(event) {
  inputData[event.target.name] = event.target.value.trim();
  localStorage.setItem(FEEDBACK_KEY, JSON.stringify(inputData));
}

function handlerSubmit(event) {
  event.preventDefault();
  localStorage.removeItem(FEEDBACK_KEY);
  form.reset();

  console.log(inputData);
}

function refreshForm() {
  try {
    let savedData = localStorage.getItem(FEEDBACK_KEY);
    if (!savedData) return;
    inputData = JSON.parse(savedData);
    Object.entries(inputData).forEach(([key, value]) => {
      form.elements[key].value = value;
    });
  } catch ({ message }) {
    console.log(message);
  }
}
