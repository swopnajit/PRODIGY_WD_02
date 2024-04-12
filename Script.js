let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;

function formatTime(ms) {
  const date = new Date(ms);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  const milliseconds = Math.floor(date.getUTCMilliseconds() / 10).toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}


function updateDisplay() {
  document.getElementById('display').textContent = formatTime(elapsedTime);
}

function startStop() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    document.getElementById('startStop').textContent = 'Start';
  } else {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(function() {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 100);
    isRunning = true;
    document.getElementById('startStop').textContent = 'Stop';
  }
}

function lapReset() {
  if (isRunning) {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    document.getElementById('laps').appendChild(lapItem);
  } else {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    updateDisplay();
    document.getElementById('startStop').textContent = 'Start';
    document.getElementById('laps').innerHTML = '';
  }
}

document.getElementById('startStop').addEventListener('click', startStop);
document.getElementById('lapReset').addEventListener('click', lapReset);