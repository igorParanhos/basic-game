import { Game } from './src/core/Game';

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/config/sw.js')
    .then((registration) => {
      console.log('SW Registered!');
      console.log(registration);
    })
    .catch((error) => {
      console.log('SW Registration Error');
      console.log(error);
    });
}

const main = () => {
  const $canvas = document.querySelector('#game');
  const $start = document.querySelector('#start');
  const $stop = document.querySelector('#stop');
  const $result = document.querySelector('#result');

  const game = new Game({ element: $canvas });

  game.initialize();

  $start.addEventListener('click', game.start);
  $stop.addEventListener('click', game.stop);
};

window.addEventListener('DOMContentLoaded', main);
