let interval;
let secondsCountdown;
let relax = false;
let work = true;
let time;
let start = false;

const display = document.querySelector("#display");
const state = document.querySelector("#state");

const play = document.querySelector("#play");
const reset = document.querySelector("#reset");

const pomodoroTime = document.querySelector("#pomodoro-time");
const breakTime = document.querySelector("#break-time");


function startPomodoro(timeInSeconds){
    displayTime(timeInSeconds);
    startCountdown(timeInSeconds);
}

function startBreak(timeInSeconds){
    displayTime(timeInSeconds);
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
                time = Number(breakTime.textContent) * 60;
                state.textContent = "Relaxing"
                startBreak(time);
            }else if(relax){
                relax = false;
                work = true;
                time = Number(pomodoroTime.textContent) * 60;
                state.textContent = "Working";
                startPomodoro(time);
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
    display.textContent = `${minutes > 9 ? minutes : '0' + minutes}:${seconds > 9 ? seconds : '0' + seconds }`;
    
}

play.addEventListener('click', () => {
    if(work){
        if(!start){
            start = true;
            play.textContent = "Pause";
            time = Number(pomodoroTime.textContent) * 60;
            startPomodoro(secondsCountdown);
        }else{
            start = false;
            play.textContent = "Start";
            clearInterval(interval);
            interval = -1;

        }

    }else if(relax){
        time = Number(breakTime.textContent) * 60;
        startBreak(time);
    }

})