
const formatTime = (hours, minutes, seconds) => {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};


let displayTimeFunction = displayCurrentTime;
let updateTimeout;//(hoisting)у мене є оголошенна змінна updateTimeout в глобальному контексті, і я використовую її в середині функцій displayCurrentTime і displayUserInputTime. Це можливо завдяки hoisting. Я оголошуєтю змінну updateTimeout за межами будь-якої функції, і тому вона доступна всюди в глобальному контексті.

let alarmTimeout;

let timerTimeout;

function displayCurrentTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    const formattedTime = formatTime(hours, minutes, seconds);

 
    document.getElementById('output-container').innerText = `Поточний час: ${formattedTime}`;

  
    updateTimeout = setTimeout(displayCurrentTime, 1000);
}


function displayUserInputTime() {
    const userHoursInput = document.getElementById('user-hours-input');
    const userMinutesInput = document.getElementById('user-minutes-input');
    const userSecondsInput = document.getElementById('user-seconds-input');

    let userHours = parseInt(userHoursInput.value) || 0;
    let userMinutes = parseInt(userMinutesInput.value) || 0;
    let userSeconds = parseInt(userSecondsInput.value) || 0;

    function updateUserTime() {
        const formattedTime = formatTime(userHours, userMinutes, userSeconds);

     
        document.getElementById('output-container').innerText = `Користувацький час: ${formattedTime}`;

    
        updateTimeout = setTimeout(updateUserTime, 1000);

   
        userSeconds++;
        if (userSeconds === 60) {
            userSeconds = 0;
            userMinutes++;
            if (userMinutes === 60) {
                userMinutes = 0;
                userHours++;
                if (userHours === 24) {
                    userHours = 0;
                }
            }
        }

        localStorage.setItem('userInput', JSON.stringify({
            hours: userHours,
            minutes: userMinutes,
            seconds: userSeconds
        }));
    }

 
    clearTimeout(updateTimeout);

    updateUserTime();
}


document.getElementById('toggle-display-button').addEventListener('click', function () {

    clearTimeout(updateTimeout);

   
    displayTimeFunction = (displayTimeFunction === displayCurrentTime) ? displayUserInputTime : displayCurrentTime;


    displayTimeFunction();
});


function loadUserInput() {
    const userInput = JSON.parse(localStorage.getItem('userInput'));
    if (userInput) {
        let { hours, minutes, seconds } = userInput;

        function updateLoadedUserTime() {
            const formattedTime = formatTime(hours, minutes, seconds);

      
            document.getElementById('output-container').innerText = `Користувацький час: ${formattedTime}`;

       
            updateTimeout = setTimeout(updateLoadedUserTime, 1000);

      
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
                if (minutes === 60) {
                    minutes = 0;
                    hours++;
                    if (hours === 24) {
                        hours = 0;
                    }
                }
            }

            
            localStorage.setItem('userInput', JSON.stringify({
                hours,
                minutes,
                seconds
            }));
        }


        clearTimeout(updateTimeout);

      
        updateLoadedUserTime();

    }
}


loadUserInput();


function saveInputToLocalStorage() {
    const timerHoursInput = document.getElementById('timer-hours-input');
    const timerMinutesInput = document.getElementById('timer-minutes-input');
    const timerSecondsInput = document.getElementById('timer-seconds-input');
    const alarmTimeInput = document.getElementById('alarm-time-input');
    const userHoursInput = document.getElementById('user-hours-input');
    const userMinutesInput = document.getElementById('user-minutes-input');
    const userSecondsInput = document.getElementById('user-seconds-input');

    localStorage.setItem('inputValues', JSON.stringify({
        timerHours: timerHoursInput.value,
        timerMinutes: timerMinutesInput.value,
        timerSeconds: timerSecondsInput.value,
        alarmTime: alarmTimeInput.value,
        userHours: userHoursInput.value,
        userMinutes: userMinutesInput.value,
        userSeconds: userSecondsInput.value,
        userTimeOutput: document.getElementById('user-time-output-container').innerText
    }));
}


function loadInputFromLocalStorage() {
    const inputValues = JSON.parse(localStorage.getItem('inputValues'));
    if (inputValues) {
        const {
            timerHours,
            timerMinutes,
            timerSeconds,
            alarmTime,
            userHours,
            userMinutes,
            userSeconds,
            userTimeOutput
        } = inputValues;

     
        document.getElementById('timer-hours-input').value = timerHours;
        document.getElementById('timer-minutes-input').value = timerMinutes;
        document.getElementById('timer-seconds-input').value = timerSeconds;
        document.getElementById('alarm-time-input').value = alarmTime;
        document.getElementById('user-hours-input').value = userHours;
        document.getElementById('user-minutes-input').value = userMinutes;
        document.getElementById('user-seconds-input').value = userSeconds;
        document.getElementById('user-time-output-container').innerText = userTimeOutput;
    }
}


loadInputFromLocalStorage();


document.addEventListener('change', saveInputToLocalStorage);













function setAlarmFromForm() {

    clearTimeout(alarmTimeout);

    const alarmTimeInput = document.getElementById('alarm-time-input');
    const alarmTime = alarmTimeInput.value;
    const [alarmHours, alarmMinutes] = alarmTime.split(':').map(Number);

    function updateAlarm() {
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();

        if (hours === alarmHours && minutes === alarmMinutes) {
            document.getElementById('alarm-output-container').innerText = 'Будильник спрацював!';
        } else {
            const formattedTime = formatTime(hours, minutes);
            document.getElementById('alarm-output-container').innerText = `Будильник на: ${alarmHours}:${alarmMinutes}`;
            alarmTimeout = setTimeout(updateAlarm, 1000); 
        }
    }

   
    updateAlarm();
}








function formatTimeForTimer(hours, minutes, seconds) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}


function startTimer() {
   
    clearTimeout(timerTimeout);

    const hoursInput = document.getElementById('timer-hours-input');
    const minutesInput = document.getElementById('timer-minutes-input');
    const secondsInput = document.getElementById('timer-seconds-input');

    let timerHours = parseInt(hoursInput.value) || 0;
    let timerMinutes = parseInt(minutesInput.value) || 0;
    let timerSeconds = parseInt(secondsInput.value) || 0;

    function updateTimer() {
        if (timerHours > 0 || timerMinutes > 0 || timerSeconds > 0) {
            const formattedTime = formatTimeForTimer(timerHours, timerMinutes, timerSeconds);
            document.getElementById('timer-output-container').innerText = `Відлік: ${formattedTime}`;
            
            if (timerSeconds > 0) {
                timerSeconds--;
            } else if (timerMinutes > 0) {
                timerMinutes--;
                timerSeconds = 59;
            } else {
                timerHours--;
                timerMinutes = 59;
                timerSeconds = 59;
            }

            
            timerTimeout = setTimeout(updateTimer, 1000);
        } else {
            document.getElementById('timer-output-container').innerText = 'Відлік завершено!';
        }
    }

   
    updateTimer();
}




const setUserEnteredTime = () => {
    const userHoursInput = document.getElementById('user-hours-input');
    const userMinutesInput = document.getElementById('user-minutes-input');
    const userSecondsInput = document.getElementById('user-seconds-input');

    const userHours = parseInt(userHoursInput.value) || 0;
    const userMinutes = parseInt(userMinutesInput.value) || 0;
    const userSeconds = parseInt(userSecondsInput.value) || 0;

    const formattedUserTime = formatTimeForTimer(userHours, userMinutes, userSeconds);
    document.getElementById('user-time-output-container').innerText = `Користувачь вів час: ${formattedUserTime}`;
};


const displayUpdatedDate = (currentDate = new Date()) => {
    const formattedDate = currentDate.toLocaleString(); 

   
    document.getElementById('updated-date-container').innerText = `Змінена Дата: ${formattedDate}`;

 
    setTimeout(() => {
        const newDate = new Date(currentDate.getTime() + 1000); 
        displayUpdatedDate(newDate); 
    }, 1000);
};


displayUpdatedDate();



function showAlarmMessage(message) {
    document.getElementById('alarm-message-container').innerText = message;

  
    setTimeout(() => {
        document.getElementById('alarm-message-container').innerText = '';
    }, 10000);
}


document.getElementById('set-user-time-button').addEventListener('click', setUserEnteredTime);

document.getElementById('view-date-button').addEventListener('click', function () {
    const currentDate = new Date();
    document.getElementById('Date-container').innerText = `Current Date: ${currentDate.toDateString()}`;
});



document.getElementById('set-alarm-button').addEventListener('click', setAlarmFromForm);
document.getElementById('start-timer-button').addEventListener('click', startTimer);