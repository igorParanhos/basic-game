export function addPressHoldEventButton(item, fn) {
  let timerID;

  item.addEventListener('mousedown', pressingDown, false);
  item.addEventListener('mouseup', notPressingDown, false);
  item.addEventListener('mouseleave', notPressingDown, false);

  item.addEventListener('touchstart', pressingDown, false);
  item.addEventListener('touchend', notPressingDown, false);

  function pressingDown(e) {
    requestAnimationFrame(timer);
    e.preventDefault();
  }

  function notPressingDown(e) {
    cancelAnimationFrame(timerID);
  }

  function timer() {
    fn();
    timerID = requestAnimationFrame(timer);
  }

  function cancelEvents() {
    item.removeEventListener('mousedown', pressingDown, false);
    item.removeEventListener('mouseup', notPressingDown, false);
    item.removeEventListener('mouseleave', notPressingDown, false);

    item.removeEventListener('touchstart', pressingDown, false);
    item.removeEventListener('touchend', notPressingDown, false);
  }
  return cancelEvents;
}

export function addPressHoldEventKeypress(item, fn) {
  let timerIDs = {};
  let keysPressed = [];
  const allowedKeys = 'wasd';

  item.addEventListener('keydown', pressingDown, false);
  item.addEventListener('keyup', notPressingDown, false);

  function pressingDown(e) {
    if (!allowedKeys.includes(e.key)) return;
    e.preventDefault();
    if (keysPressed.includes(e.key)) return;

    keysPressed.push(e.key);
    requestAnimationFrame(timer(e));
  }

  function notPressingDown(e) {
    keysPressed = keysPressed.filter((k) => e.key !== k);
    cancelAnimationFrame(timerIDs[e.key]);
  }

  function timer(e) {
    return () => {
      fn(e);
      timerIDs[e.key] = requestAnimationFrame(timer(e));
    };
  }

  function cancelEvents() {
    item.removeEventListener('keydown', pressingDown, false);
    item.removeEventListener('keyup', notPressingDown, false);
  }
  return cancelEvents;
}
