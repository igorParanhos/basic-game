import "./styles/style.css";
import "./styles/game.css";

import { Renderer } from "./src/Renderer";

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(registration => {
    console.log('SW Registered!')
    console.log(registration)
  }).catch(error => {
    console.log('SW Registration Error')
    console.log(error)
  })
}

const main = () => {
  const $canvas = document.querySelector("#game");
  const renderer = new Renderer($canvas);

  const $start = document.querySelector("#start");
  const $stop = document.querySelector("#stop");
  $start.addEventListener("click", () => {
    $start.disabled = true;
    $stop.disabled = false;
    renderer.start();
  });
  $stop.addEventListener("click", () => {
    $start.disabled = false;
    $stop.disabled = true;
    renderer.stop();
  });
};

window.addEventListener("DOMContentLoaded", main);
