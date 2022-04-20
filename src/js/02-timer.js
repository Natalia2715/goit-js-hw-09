import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
require("flatpickr/dist/themes/material_blue.css");
import Notiflix from 'notiflix';
const refs = {
    startBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}
const inputData = document.querySelector("#datetime-picker");
refs.startBtn.setAttribute('disabled', true);
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const finishTime = selectedDates[0].getTime();
        console.log(selectedDates);
        refs.startBtn.removeAttribute('disabled')
        if (finishTime < Date.now()) {
            console.log(selectedDates);
            refs.startBtn.setAttribute('disabled', true);
            Notiflix.Notify.warning('Please choose a date in the future');
            return;
        }
        else {refs.startBtn.removeAttribute('disabled')}
  const timer = {
    timerId: null,
    isActive: false,
      start() {
        if (this.isActive) {
            return;
        }
        this.isActive = true;
        this.timerId = setInterval(() => {
            refs.startBtn.setAttribute('disabled', true);
            const currentTime = Date.now();
            const deltaTime = finishTime - currentTime;
            const time = convertMs(deltaTime);
            console.log(finishTime);
            refs.days.innerHTML = time.days;
            refs.hours.innerHTML = time.hours;
            refs.minutes.innerHTML = time.minutes;
            refs.seconds.innerHTML = time.seconds;
            if (time.days === "00" && time.hours === "00" && time.minutes === "00" && time.seconds === "00") {
                clearInterval(this.timerId);
                refs.startBtn.removeAttribute('disabled');
                this.isActive = true;
                Notiflix.Report.success('Time is over');
            }
        }, 1000);
    }
        }
        refs.startBtn.addEventListener("click", () => { timer.start() });
    },
};
flatpickr(inputData, options);
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}