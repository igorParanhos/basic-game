import RAF from './RAF';

const isSmallDevice = !window.matchMedia('(min-width: 768px)').matches;
const isTouchDevice = 'ontouchstart' in window;

export function addPressHoldEventButton(item, fn) {
  let timerID;
  if (isSmallDevice && isTouchDevice) {
    item.addEventListener('touchstart', pressingDown, false);
    item.addEventListener('touchend', notPressingDown, false);
  } else {
    item.addEventListener('mousedown', pressingDown, false);
    item.addEventListener('mouseup', notPressingDown, false);
    item.addEventListener('mouseleave', notPressingDown, false);
  }

  function timer({ delta }) {
    fn(delta / 1000);
  }

  function pressingDown(e) {
    e.preventDefault();
    RAF.subscribe(timer);
  }

  function notPressingDown(e) {
    e.preventDefault();
    RAF.unsubscribe(timer);
  }

  function cancelEvents() {
    RAF.unsubscribe(timerID);
    if (isSmallDevice && isTouchDevice) {
      item.removeEventListener('touchstart', pressingDown, false);
      item.removeEventListener('touchend', notPressingDown, false);
    } else {
      item.removeEventListener('mousedown', pressingDown, false);
      item.removeEventListener('mouseup', notPressingDown, false);
      item.removeEventListener('mouseleave', notPressingDown, false);
    }
  }
  return cancelEvents;
}

export function addPressHoldEventKeypress(item, fn) {
  let fns = {
    w: ({ delta }) => fn({ key: 'w' }, delta / 1000),
    a: ({ delta }) => fn({ key: 'a' }, delta / 1000),
    s: ({ delta }) => fn({ key: 's' }, delta / 1000),
    d: ({ delta }) => fn({ key: 'd' }, delta / 1000),
  };
  let keysPressed = [];
  const allowedKeys = 'wasd';

  item.addEventListener('keydown', pressingDown, false);
  item.addEventListener('keyup', notPressingDown, false);

  function pressingDown(e) {
    if (!allowedKeys.includes(e.key)) return;
    e.preventDefault();
    if (keysPressed.includes(e.key)) return;

    keysPressed.push(e.key);
    RAF.subscribe(fns[e.key.toLowerCase()]);
  }

  function notPressingDown(e) {
    keysPressed = keysPressed.filter((k) => e.key !== k);
    RAF.unsubscribe(fns[e.key.toLowerCase()]);
  }

  function cancelEvents() {
    keysPressed.forEach((k) => RAF.unsubscribe(fns[k.toLowerCase()]));
    item.removeEventListener('keydown', pressingDown, false);
    item.removeEventListener('keyup', notPressingDown, false);
  }
  return cancelEvents;
}
