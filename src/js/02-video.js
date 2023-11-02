import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const LS_KEY = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

function getCurrentTime({ seconds }) {
  localStorage.setItem(LS_KEY, seconds);
}
player.on('timeupdate', throttle(getCurrentTime, 1000));
player.setCurrentTime(JSON.parse(localStorage.getItem(LS_KEY)) || 0);
