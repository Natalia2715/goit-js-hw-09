const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
}
let timerId = null;

refs.stopBtn.setAttribute('disabled', true);

refs.startBtn.addEventListener("click", () => {
  refs.startBtn.setAttribute('disabled', true);
 timerId = setInterval(() => {
    const color = getRandomHexColor();
     document.body.style.backgroundColor = color;
     
     refs.stopBtn.removeAttribute('disabled');
  }, 1000);
});

refs.stopBtn.addEventListener("click", () => {
    clearInterval(timerId);
    refs.startBtn.removeAttribute('disabled');
refs.stopBtn.setAttribute('disabled', true);

});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
