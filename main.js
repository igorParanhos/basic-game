import './styles/style.css'
import './styles/game.css'

import { Renderer } from './src/Renderer'

const main = () => {
  const $canvas = document.querySelector('#game');
  const renderer = new Renderer($canvas);

  const $start = document.querySelector('#start')
  const $stop = document.querySelector('#stop')
  $start.addEventListener('click', renderer.start)
  $stop.addEventListener('click', renderer.stop)
}

window.addEventListener('DOMContentLoaded', main)