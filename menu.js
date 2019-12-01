var language = englisch;

function hideAll() {
  for(let i = 0; i < list.children.length; i++) {
    list.children[i].style.display = 'none';
  }
}

function showAll() {
  for(let i = 0; i < list.children.length; i++) {
    list.children[i].style.display = null;
  }
}

function language_menu() {
  hideAll();
  menu_language_englisch.style.display = null;
  menu_language_german.style.display = null;
}

function new_game() {
  hideAll();
  menu_start_game.style.display = null;
  menu_level.style.display = null;
}

function new_game_start() {
  hideAll();
  start_new();
}

function options() {
  hideAll();
  //todo
}

function game_over_screen() {
  hideAll();
  menu_game_over_screen.style.display = null;
  menu_score.style.display = null;
  menu_main_menu.style.display = null;
}

function menu_main() {
  hideAll();
  menu_tetris.style.display = null;
  menu_new_game.style.display = null;
  menu_options.style.display = null;
  menu_language.style.display = null;
}

function pauseMenu() {
  menu_resume_game.style.display = null;
}

function resume() {
  hideAll();
  start();
}

function keyToChar(char) {
  if(char >= 65 && char <= 90)
    return String.fromCharCode(char);
  switch (char) {
    case 38:
      return '↑';
    case 39:
      return '→';
    case 37:
      return '←';
    case 40:
      return '↓';
    case 27:
      return 'esc';
    default:
      return '~~~~';
  }
}

function options() {
  hideAll();
  menu_options_fastdown.style.display = null;
  menu_options_fastdown.innerHTML = language['fastdown'] + keyToChar(keyboardLayout.fastdown);
  menu_options_rotateCounterClock.style.display = null;
  menu_options_rotateCounterClock.innerHTML = language['rotateCounterClock'] + keyToChar(keyboardLayout.rotateCounterClock);
  menu_options_rotateClock.style.display = null;
  menu_options_rotateClock.innerHTML = language['rotateClock'] + keyToChar(keyboardLayout.rotateClock);
  menu_options_moveLeft.style.display = null;
  menu_options_moveLeft.innerHTML = language['moveLeft'] + keyToChar(keyboardLayout.moveLeft);
  menu_options_moveRight.style.display = null;
  menu_options_moveRight.innerHTML = language['moveRight'] + keyToChar(keyboardLayout.moveRight);
  menu_options_hold.style.display = null;
  menu_options_hold.innerHTML = language['hold'] + keyToChar(keyboardLayout.hold);
  menu_options_pause.style.display = null;
  menu_options_pause.innerHTML = language['pause'] + keyToChar(keyboardLayout.pause);
  menu_main_menu.style.display = null;
}

function keyPressed() {}
function keychange(o) {
  keyPressed = () => {
    keyboardLayout[o] = keyCode;
    keyPressed = null;
    options();
  };
}


menu_main();
