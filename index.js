let alarmTime = null;

// Update clock every second
const updateClock = () => {
  const now = new Date();

  let hours   = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  const period = hours >= 12 ? 'PM' : 'AM';

  hours   = hours % 12;
  hours   = hours === 0 ? 12 : hours;

  hours   = hours   < 10 ? '0' + hours   : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  const timeString = `${hours}:${minutes}:${seconds} ${period}`;
  document.getElementById('clock').textContent = timeString;

  // Show full date
  const days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const day    = days[now.getDay()];
  const date   = now.getDate();
  const month  = months[now.getMonth()];
  const year   = now.getFullYear();
  document.getElementById('date').textContent = `${day}, ${date} ${month} ${year}`;

  // Check if alarm should ring
  if (alarmTime && alarmTime === timeString) {
    const sound = document.getElementById('alarmSound');
    sound.play();

    const status = document.getElementById('status');
    status.textContent = '🔔 Alarm Ringing!';
    status.className = 'ringing';

    // Auto stop alarm after 30 seconds
    setTimeout(() => {
      sound.pause();
      sound.currentTime = 0;
      if (status.className === 'ringing') {
        status.textContent = 'Alarm stopped automatically.';
        status.className = 'cleared';
      }
    }, 30000);
  }
};

// Set alarm
const setAlarm = () => {
  const input = document.getElementById('alarmTime').value;

  if (!input) {
    alert('Please select a time for the alarm.');
    return;
  }

  let [h, m] = input.split(':');
  h = parseInt(h);

  const period = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  h = h === 0 ? 12 : h;
  h = h < 10 ? '0' + h : h;

  alarmTime = `${h}:${m}:00 ${period}`;

  const status = document.getElementById('status');
  status.textContent = `✅ Alarm set for ${alarmTime}`;
  status.className = 'set';
};

// Clear alarm
const clearAlarm = () => {
  alarmTime = null;

  const sound = document.getElementById('alarmSound');
  sound.pause();
  sound.currentTime = 0;

  document.getElementById('alarmTime').value = '';

  const status = document.getElementById('status');
  status.textContent = 'Alarm cleared.';
  status.className = 'cleared';
};

// Start clock
setInterval(updateClock, 1000);
updateClock(); // run immediately so there's no 1s blank delay
