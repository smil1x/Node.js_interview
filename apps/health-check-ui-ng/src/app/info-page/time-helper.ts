interface Time {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function getRamValue(val: string): number {
  return (+val.split(/[\s,/]+/)[0] / +val.split(/[\s,/]+/)[1]) * 100;
}

export function getFirstTime(time: number): Time {
  let hours = Math.floor(time / 3600);
  const days = Math.floor(hours / 24);
  if (hours > 23) {
    hours -= days * 24;
  }
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor((time % 3600) % 60);

  return { days, hours, minutes, seconds };
}

export function parseToDateTime(time: number) {
  return new Date(Date.now() - time * 1000).toUTCString();
}

export function updateTime(time: Time): Time {
  const newTime = time;
  newTime.seconds += 1;

  if (newTime.hours > 23) {
    newTime.days += 1;
    newTime.hours = 0;
  }

  if (newTime.seconds > 59) {
    newTime.minutes += 1;
    newTime.seconds = 0;
  }

  if (newTime.minutes > 59) {
    newTime.hours += 1;
    newTime.minutes = 0;
  }

  return newTime;
}

export function parseTime(time: Time): string {
  return `${time.days > 1 ? `${time.days} days, ` : ''}
    ${time.hours < 10 ? `0${time.hours}` : time.hours} :
    ${time.minutes < 10 ? `0${time.minutes}` : time.minutes} :
    ${time.seconds < 10 ? `0${time.seconds}` : time.seconds}`;
}
