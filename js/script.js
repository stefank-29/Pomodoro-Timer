let startTimer = false;
let startBrake = false;
let minutes = 25;
let seconds = 60;
let interval;
let relax = false;
let work = true;
let secondsCountdown;
const display = document.querySelector("#display");

const play = document.querySelector("#play");
const reset = document.querySelector("#reset");

play.addEventListener('click', startCountdown);

function startCountdown(timeInSeconds){
    const startTime = Date.now() + (Number(timeInSeconds) * 1000);
    interval = setInterval(() => {
        secondsCountdown = Math.round((startTime - Date.now()) / 1000);
        if(secondsCountdown >= 0){
            displayTime(secondsCountdown);
            

        }else{
           if(work){
               work = false;
               relax = true;
               startCountdown(300);
           }else if(relax){
               relax = false;
               work = true;
           }

        }      
        
    }, 1000);

}

function displayTime(timeInSeconds){
    let minutes = Math.floor(Number(timeInSeconds) / 60);
    let seconds = Number(timeInSeconds) % 60;
    display.textContent = `${minutes > 9 ? minutes : "0" +minutes}:${seconds > 9 ? seconds : "0" + seconds }`;
}

startCountdown(10);