function loadGerman() {
  menu_tetris.innerHTML = '<a><h1>Tetris</h1><h6>von Fritz Walter</h6></a>';
  menu_game_over_screen.innerHTML = '<a><h1>Spiel verloren</h1></a>';
  menu_new_game.innerHTML = '<a>neues Spiel</a>';
  menu_start_game.innerHTML = '<a>Spiel starten</a>';
  menu_resume_game.innerHTML = '<a>weiter spielen</a>';
  menu_options.innerHTML = '<a>Optionen</a>';
  menu_language.innerHTML = '<a>Sprache</a>';
  menu_language_englisch.innerHTML = '<a>englisch</a>';
  menu_language_german.innerHTML = '<a>german</a>';
  menu_main_menu.innerHTML = '<a>zurück zum Hauptmenu</a>';
}
const german = {
  'fastdown': 'schneller fall: ',
  'rotateCounterClock': 'links drehen: ',
  'rotateClock': 'rechts drehen: ',
  'moveLeft': 'links: ',
  'moveRight': 'rechts: ',
  'hold': 'halten: ',
  'pause': 'pause: '
}
