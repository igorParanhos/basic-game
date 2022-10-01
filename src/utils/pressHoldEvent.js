export function addPressHoldEventButton(item, fn) {
  let timerID;

  // Listening for the mouse and touch events
  item.addEventListener("mousedown", pressingDown, false);
  item.addEventListener("mouseup", notPressingDown, false);
  item.addEventListener("mouseleave", notPressingDown, false);

  item.addEventListener("touchstart", pressingDown, false);
  item.addEventListener("touchend", notPressingDown, false);

  function pressingDown(e) {
    requestAnimationFrame(timer);
    e.preventDefault();
    console.log("Pressing!");
  }

  function notPressingDown(e) {
    cancelAnimationFrame(timerID);
  }

  function timer() {
    fn()
    timerID = requestAnimationFrame(timer);
  }

  function cancelEvents() {
    item.removeEventListener("mousedown", pressingDown, false);
    item.removeEventListener("mouseup", notPressingDown, false);
    item.removeEventListener("mouseleave", notPressingDown, false);

    item.removeEventListener("touchstart", pressingDown, false);
    item.removeEventListener("touchend", notPressingDown, false);
  }
  return cancelEvents
}

export function addPressHoldEventKeypress(item, fn) {
  let timerID;
  let keyPressed = false

  // Listening for the mouse and touch events
  item.addEventListener("keydown", pressingDown, false);
  item.addEventListener("keyup", notPressingDown, false);

  function pressingDown(e) {
    if (keyPressed) return
    keyPressed = true
    requestAnimationFrame(timer(e));
    e.preventDefault();
    console.log("Pressing!");
  }

  function notPressingDown(e) {
    keyPressed = false
    cancelAnimationFrame(timerID);
  }

  function timer(e) {
    return () => {
      fn(e)
      timerID = requestAnimationFrame(timer(e));
    }
  }

  function cancelEvents() {
    item.removeEventListener("keydown", pressingDown, false);
    item.removeEventListener("keyup", notPressingDown, false);
  }
  return cancelEvents
}
