import Notiflix from 'notiflix';


const form = document.querySelector(".form");

const getInput = (event) => {
  event.preventDefault();
  const { elements: { delay, step, amount }
  } = event.currentTarget;

  const finishAm = Number(amount.value);
  let position = 1;
  let startDelay = Number(delay.value);
  let finishDelay = Number(step.value);
  let timerId = null;
  
  for (let i = 0; i < finishAm; i += 1) {
    let delayInit = startDelay;
    // position += 1;
    createPromise(position, delayInit)
      .then(() => {
    
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delayInit}ms`);
        console.log(`✅ Fulfilled promise ${position} in ${delayInit}ms`);
      })
    .catch(() => { 
   
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delayInit}ms`);
        console.log(`❌ Rejected promise ${position} in ${delayInit}ms`);
      })
      .finally(() => {
        position += 1;
        if (i > 1) { delayInit += finishDelay }
      
      });
    startDelay += finishDelay;
    console.log(startDelay);
  }
}
       
   form.addEventListener("submit", getInput);

function createPromise(position, delay) {

  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve();
        // Fulfill
      } else {
        reject();
      }
      // Reject
    }, delay)
  })
}
