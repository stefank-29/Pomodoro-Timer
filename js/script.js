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

const workTime = document.querySelector("#spentWork");
const relaxTime = document.querySelector("#spentBreak");

/*const pmdDown = document.querySelector("#pmdDown");
const pmdUp = document.querySelector("#pmdUp");
const breakUp = document.querySelector("#breakUp");
const breakDown = document.querySelector("#breakDown");*/
const buttonsMod = document.querySelectorAll("div.settingsChange button")
buttonsMod.forEach(button => button.addEventListener('click', modifyTime));

function startPomodoro(seconds){
    startCountdown(seconds);
}

function startBreak(seconds){
    startCountdown(seconds);
}

function startCountdown(seconds){
    const now = Date.now();
    const then = now + seconds * 1000;
    clearInterval(interval);
    displayTime(seconds); // because of 1 sec delay
    // displayEndTime(then);
    interval = setInterval(() => {
        secondsCountdown = Math.round((then - Date.now()) / 1000);
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
function displayTime(seconds){
    const minutes = Math.floor(Number(seconds) / 60);
    const sec = Number(seconds) % 60;
    const dispTime = `${minutes > 9 ? minutes : '0' + minutes}:${sec > 9 ? sec : '0' + sec }`;
    display.textContent = dispTime;
    document.title = dispTime;
}

function displayEndTime(timestamp){
    const end = new Date(timestamp);
    const hours = end.getHours();
    const minutes = end.getMinutes();
    workTime.textContent =`Be back at ${hours > 9 ? hours : '0' + hours}:${minutes > 9 ? minutes : '0'+minutes}`;
}

play.addEventListener('click', () => {
    if(work){
        if(!start){
            state.textContent = "Working"
            start = true;
            play.textContent = "Pause";
            if(time == undefined){
                time = Number(pomodoroTime.textContent) * 60;
            }else{
                time = secondsCountdown;
            }
            startPomodoro(time);
        }else{
            start = false;
            state.textContent = "Paused"
            play.textContent = "Start";
            time = secondsCountdown;
            clearInterval(interval);
            interval = -1;
        }

    }else if(relax){
        if(!start){
            state.textContent = "Relaxing";
            start = true;
            play.textContent = "Pause";
            if(time == undefined){
                time = Number(breakTime.textContent) * 60;
            }else{
                time = secondsCountdown;
            }
            startBreak(time);
        }else{
            start = false;
            state.textContent = "Paused";
            play.textContent = "Start";
            time = secondsCountdown;
            clearInterval(interval);
        }
        
    }

})
reset.addEventListener('click', () => {
    if(work){
        clearInterval(interval);
        displayTime(pomodoroTime.textContent * 60);
    }else if(relax){
        clearInterval(interval);
        displayTime(breakTime.textContent * 60);
    }
    state.textContent = "";
    start = false;
    play.textContent = "Start";
    time = undefined;


});

function modifyTime(e){
    console.log(e.target.getAttribute('id'));
    

}
