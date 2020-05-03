let interval;
let secondsCountdown;
let time;
let relax = false;
let work = true;
let start = false;
let stopped = true;

let workingHours = 0;
let workingMinutes = 0;
let relaxHours = 0;
let relaxMinutes = 0;


const state = document.querySelector("#state");
const display = document.querySelector("#display");


const play = document.querySelector("#play");
const reset = document.querySelector("#reset");

const pomodoroTime = document.querySelector("#pomodoro-time");
const breakTime = document.querySelector("#break-time");

const endTime = document.querySelector("#endTime");
const workTime = document.querySelector("#spentWork");
const relaxTime = document.querySelector("#spentBreak");

const pmdDown = document.querySelector("#pmdDown");
const pmdUp = document.querySelector("#pmdUp");
const breakUp = document.querySelector("#breakUp");
const breakDown = document.querySelector("#breakDown");

const pomodoroBtn = document.querySelector("#pomodoroBtn");
const breakBtn = document.querySelector("#breakBtn");


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
    displayEndTime(then); // end of timer time
    interval = setInterval(() => {
        secondsCountdown = Math.round((then - Date.now()) / 1000);
        if(secondsCountdown < 0){
            clearInterval(interval);
            secondsCountdown = 0;
            if(work){
                displaySpentTime(pomodoroTime.textContent); // prikaz proteklog ucenja
                work = false;
                relax = true;
                time = Number(breakTime.textContent) * 60;
                state.textContent = "Relaxing"
                startBreak(time);
            }else if(relax){
                displaySpentTime(breakTime.textContent); // ukupno odmora
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
    if(work){
        document.title = dispTime + " - Time to work!";
    }else if(relax){
        document.title = dispTime + " - Time for a break";
    }
}

function displayEndTime(timestamp){
    const end = new Date(timestamp);
    const hours = end.getHours();
    const minutes = end.getMinutes();
    if(work){
        endTime.textContent =`Work until: ${hours > 9 ? hours : '0' + hours}:${minutes > 9 ? minutes : '0'+minutes}`;
    }else if(relax){
        endTime.textContent = `Relax until: ${hours > 9 ? hours : '0' + hours}:${minutes > 9 ? minutes : '0'+minutes}`;
    }
}

function displaySpentTime(minutes){
    if(work){
        workingMinutes += parseInt(minutes);
        if(workingMinutes >= 60){
            workingHours++;
            workingMinutes %= 60; 
        }
        workTime.textContent = `${workingHours > 9 ? workingHours : '0' + workingHours}h ${workingMinutes > 9 ? workingMinutes : '0' + workingMinutes}m`;
    }
    if(relax){
        relaxMinutes += parseInt(minutes);
        if(relaxMinutes >= 60){
            relaxHours++;
            relaxMinutes % 60;
        }
        relaxTime.textContent = `${relaxHours > 9 ? relaxHours : '0'+relaxHours}h ${relaxMinutes > 9 ? relaxMinutes : '0'+relaxMinutes}m`;
    }
}

play.addEventListener('click', playTimer);

function playTimer(){
    if(work){
        if(!start){
            state.textContent = "Working"
            start = true;
            stopped = false;
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
            stopped = false;
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

}
reset.addEventListener('click', resetTimer);

function resetTimer() {
    if(work){
        clearInterval(interval);
        displayTime(pomodoroTime.textContent * 60);
    }else if(relax){
        clearInterval(interval);
        displayTime(breakTime.textContent * 60);
    }
    state.textContent = "";
    endTime.textContent = "";
    start = false;
    stopped = true;
    play.textContent = "Start";
    time = undefined;
}

pomodoroBtn.addEventListener('click', () => {
    work = true;
    relax = false;
    start = false;
    stopped = true;
    resetTimer();


});

breakBtn.addEventListener('click', () => {
    work = false;
    relax = true;
    start = false;
    stopped = true;
    resetTimer();

});


pmdDown.addEventListener('click', () =>{   
    if(stopped){
        let currTime = parseInt(pomodoroTime.textContent);
        if(currTime > 1){
            currTime--;
        }
        pomodoroTime.textContent = `${currTime > 9 ? currTime : '0' + currTime}`;
        if(work){
            displayTime(pomodoroTime.textContent * 60);
        }
    }
   
});
pmdUp.addEventListener('click', () =>{
    if(stopped){
        let currTime = parseInt(pomodoroTime.textContent);
        if(currTime < 60){
            currTime++;
        }
        pomodoroTime.textContent = `${currTime > 9 ? currTime : '0' + currTime}`;
        if(work){
            displayTime(pomodoroTime.textContent * 60);
        }
    }
   
});
breakDown.addEventListener('click', () =>{
    if(stopped){
        let currTime = parseInt(breakTime.textContent);
        if(currTime > 1){
            currTime--;
        }
        breakTime.textContent = `${currTime > 9 ? currTime : '0' + currTime}`;
        if(relax){
            displayTime(breakTime.textContent * 60);    
        }
    }
    
});
breakUp.addEventListener('click', () =>{
    if(stopped){
        let currTime = parseInt(breakTime.textContent);
        if(currTime < 60){
            currTime++;
        }
        breakTime.textContent = `${currTime > 9 ? currTime : '0' + currTime}`;
        if(relax){
            displayTime(breakTime.textContent * 60);
        }
    }
    
});
