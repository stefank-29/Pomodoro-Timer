let interval;
let secondsCountdown;
let relax = false;
let work = true;

const display = document.querySelector("#display");

const play = document.querySelector("#play");
const reset = document.querySelector("#reset");


function startPomodoro(timeInSeconds){
    startCountdown(timeInSeconds);
}

function startBreak(timeInSeconds){
    startCountdown(timeInSeconds);
}

function startCountdown(timeInSeconds){
    const startTime = Date.now() + (Number(timeInSeconds) * 1000);
    interval = setInterval(() => {
        secondsCountdown = Math.round((startTime - Date.now()) / 1000);
        if(secondsCountdown < 0){
            clearInterval(interval);
            secondsCountdown = 0;
            if(work){
                work = false;
                relax = true;
                secondsCountdown = 0;
                startBreak(300);
            }else if(relax){
                relax = false;
                work = true;
                secondsCountdown = 0;
                startPomodoro(1500);
            }

        }else{
            displayTime(secondsCountdown);

        }      
        
    }, 1000);

}

// displaying time on display
function displayTime(timeInSeconds){
    let minutes = Math.floor(Number(timeInSeconds) / 60);
    let seconds = Number(timeInSeconds) % 60;
    display.textContent = `${minutes > 9 ? minutes : '0' +minutes}:${seconds > 9 ? seconds : '0' + seconds }`;
}

play.addEventListener('click', () => {
    startCountdown(10);

})