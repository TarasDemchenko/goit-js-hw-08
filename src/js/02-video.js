import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Vimeo(document.getElementById('vimeo-player'));

const savePlaybackTime = throttle(function (currentTime) {
  localStorage.setItem('videoplayer-current-time', currentTime.toString());
}, 1000);

player.on('timeupdate', function (data) {
  const currentTime = data.seconds;
  savePlaybackTime(currentTime);
});

const savedTime = localStorage.getItem('videoplayer-current-time');

if (savedTime !== null) {
  player.ready().then(function () {
    player.setCurrentTime(parseFloat(savedTime));
  });
} else {
  player.ready().then(function () {
    player.play();
  });
}
