const tetrominoes =
[
  {name: "I", color: "Cyan", rotations: [
  [{x: 0, y: 1}, {x:1, y: 1}, {x:2, y: 1}, {x:3, y: 1}],
  [{x: 2, y: 0}, {x:2, y: 1}, {x:2, y: 2}, {x:2, y: 3}],
  [{x: 0, y: 2}, {x:1, y: 2}, {x:2, y: 2}, {x:3, y: 2}],
  [{x: 1, y: 0}, {x:1, y: 1}, {x:1, y: 2}, {x:1, y: 3}]
  ]},
  {name: "J", color: "blue", rotations: [
  [{x: 0, y: 0}, {x:0, y: 1}, {x:1, y: 1}, {x:2, y: 1}],
  [{x: 1, y: 0}, {x:2, y: 0}, {x:1, y: 1}, {x:1, y: 2}],
  [{x: 0, y: 1}, {x:1, y: 1}, {x:2, y: 1}, {x:2, y: 2}],
  [{x: 0, y: 2}, {x:1, y: 0}, {x:1, y: 1}, {x:1, y: 2}]
  ]},
  {name: "L", color: "orange", rotations: [
  [{x: 2, y: 0}, {x:0, y: 1}, {x:1, y: 1}, {x:2, y: 1}],
  [{x: 1, y: 0}, {x:1, y: 1}, {x:1, y: 2}, {x:2, y: 2}],
  [{x: 0, y: 2}, {x:0, y: 1}, {x:1, y: 1}, {x:2, y: 1}],
  [{x: 0, y: 0}, {x:1, y: 0}, {x:1, y: 1}, {x:1, y: 2}]
  ]},
  {name: "O", color: "yellow", rotations: [
  [{x: 0, y: 0}, {x:0, y: 1}, {x:1, y: 0}, {x:1, y: 1}],
  [{x: 0, y: 0}, {x:0, y: 1}, {x:1, y: 0}, {x:1, y: 1}],
  [{x: 0, y: 0}, {x:0, y: 1}, {x:1, y: 0}, {x:1, y: 1}],
  [{x: 0, y: 0}, {x:0, y: 1}, {x:1, y: 0}, {x:1, y: 1}]
  ]},
  {name: "S", color: "green", rotations: [
  [{x: 1, y: 0}, {x:2, y: 0}, {x:0, y: 1}, {x:1, y: 1}],
  [{x: 1, y: 0}, {x:1, y: 1}, {x:2, y: 1}, {x:2, y: 2}],
  [{x: 1, y: 1}, {x:2, y: 1}, {x:0, y: 2}, {x:1, y: 2}],
  [{x: 0, y: 0}, {x:0, y: 1}, {x:1, y: 1}, {x:1, y: 2}]
  ]},
  {name: "T", color: "purple", rotations: [
  [{x: 1, y: 0}, {x:0, y: 1}, {x:1, y: 1}, {x:2, y: 1}],
  [{x: 1, y: 0}, {x:1, y: 1}, {x:2, y: 1}, {x:1, y: 2}],
  [{x: 0, y: 1}, {x:1, y: 1}, {x:2, y: 1}, {x:1, y: 2}],
  [{x: 1, y: 0}, {x:0, y: 1}, {x:1, y: 1}, {x:1, y: 2}]
  ]},
  {name: "Z", color: "red", rotations: [
  [{x: 0, y: 0}, {x:1, y: 0}, {x:1, y: 1}, {x:2, y: 1}],
  [{x: 2, y: 0}, {x:1, y: 1}, {x:2, y: 1}, {x:1, y: 2}],
  [{x: 0, y: 1}, {x:1, y: 1}, {x:1, y: 2}, {x:2, y: 2}],
  [{x: 1, y: 0}, {x:0, y: 1}, {x:1, y: 1}, {x:0, y: 2}]
  ]}
];

var   curX = 3,
      curY = 0,

      que = new Array(5),
      queRotations = new Array(5),

      tetromino = Date.now() % 7,
      rotation = 0,

      keyboardLayout = {
        "fastdown": 40,
        "rotateCounterClock": 88,
        "rotateClock": 89,
        "moveLeft": 37,
        "moveRight": 39,
        "hold": 67,
        "pause": 27
      },

      score = 0,
      linesCleared = 0,
      startLevel = 0,
      level = startLevel,
      hold = null,
      holdBlocked = true,
      holdRotation = 0,

      arr = new Array(200),

      grid = false,

      pause = null,
      placeTime = null,
      fallSpeed = 0.001,
      lastFrame = Date.now();
      timeStamp = lastFrame,
      keyDown = lastFrame,
      mouseDown = lastFrame,

      width = 1,
      height = 1,
      game_width = 1,

      canvas = createCanvas(100, 100);


function setup() {
  sizeChange();
}

function windowResized() {
  sizeChange();
}

function sizeChange() {
  if(document.body.clientWidth > document.body.clientHeight) {
    width = Math.round((3/4) * document.body.clientHeight);
    height = Math.round(document.body.clientHeight);
    document.body.style.fontSize = '5vh'; // 5% of viewhight
    textSize(0.02*document.body.clientHeight) // 3% of viewhight
  } else {
    width = document.body.clientWidth;
    height = (4/3) * document.body.clientWidth;
    document.body.style.fontSize = '5vw';
    textSize(0.02*document.body.clientWidth);
  }
  game_width = 0.5 * height;
  resizeCanvas(width, height);
}

function newTetromino() {
  curX = 3;
  curY = 0;
  if(!collisionCheck({x: 0, y: 0}))
    gameover();
  tetromino = que.shift();
  que.push(floor(Math.random()*7));
  rotation = queRotations.shift();
  queRotations.push(floor(Math.random()*4));
}

function gameover() {
  stop();
  game_over_screen();
  menu_score.innerHTML = `score: ${score}`;
}

function pauseFn() {
  stop();
  pauseMenu();
}

function collisionCheck(vector, cRotation = rotation) { // returns true if path is clear
  if(tetromino == null)
    return false
  else
    return tetrominoes[tetromino].rotations[cRotation].every( (offset) => {
  return arr[10*round(curY + offset.y + vector.y) + curX + offset.x + vector.x] == '#' &&
         arr[10* ceil(curY + offset.y + vector.y) + curX + offset.x + vector.x] == '#' && // check for placed blocks
         curX + offset.x + vector.x < 10 &&
         curX + offset.x + vector.x >= 0 &&   // check if it's still in the grid
         curY + offset.y + vector.y <= 19})
}

function drawTetromino(_tetromino = tetromino, _rotation = rotation, _x = curX, _y = curY, _width = 40, _height = _width) {
  fill(tetrominoes[_tetromino].color);
  tetrominoes[_tetromino].rotations[_rotation].forEach( (offset) => {
    rect(offset.x*_width + _x, offset.y*_height + _y, _width, _height);
  });
}

function calRotate(a) {
  a += rotation;
  a = ((a < 0) ? -a + 6 : a); // rotation must be < 4 and >= 0
  a = ((a > 3) ? a % 4 : a);
  return a;
}

function gameRoutine() {
    gameDraw();
    timeStamp = Date.now();
  let diffTime = timeStamp - lastFrame;
  if(collisionCheck({x: 0, y:diffTime * fallSpeed})) {
    curY += diffTime * fallSpeed;
    placeTime = null;
  } else if(!placeTime) {
    curY = ceil(curY);
    placeTime = Date.now();
  }

  if (placeTime != null && placeTime < Date.now() - 1000/(level+1)){
    // pushing the teromino on the array
    tetrominoes[tetromino].rotations[rotation].forEach( (offset) => {arr[curX + offset.x + 10 * (round(curY) + offset.y)] = tetrominoes[tetromino].color;});
    newTetromino();
    holdBlocked = true;
    placeTime = null;
  }

  let newLineClear = 0;
  for(let i = 0; i < 20; i++) {
    let count = 0;
    arr.slice(i*10, (i+1)*10).forEach( (a) => {if (a == '#') {count += 1;}});
    if (count == 0) {
      arr.splice(i*10, 10);
      arr = ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#',  ...arr];  // clearing a line
      newLineClear++;
    }
  }
  switch(newLineClear) {
    case 1:
      score += 40 * (level + 1);
      break;
    case 2:
      score += 100 * (level + 1);
      break;
    case 3:
      score += 300 * (level + 1);
      break;
    case 4:
      score += 1200 * (level + 1);
      break;
    default:
      break;
  }
  linesCleared += newLineClear;
  if(linesCleared >= startLevel * 10 + 10  + level * 10|| linesCleared == 100)
    level++;
  lastFrame = Date.now();

  gameKeyRoutine();
}

function gameKeyRoutine() {
  //input
  if(keyIsDown(keyboardLayout.fastdown))
    fallSpeed = 0.01 * (level + 1);
  else
    fallSpeed = 0.001 * (level + 1);

  if(lastFrame - keyDown >= 100)
  {
    if(keyIsDown(keyboardLayout.rotateCounterClock) && collisionCheck({x: 0, y: 0}, calRotate(+1)))
    {
      if(!keyIsDown(keyboardLayout.rotateClock))
      {
        rotation = calRotate(+1);
        keyDown = Date.now();
      }
    }
    else if(keyIsDown(keyboardLayout.rotateClock) && collisionCheck({x: 0, y: 0}, calRotate(-1)))
    {
      rotation = calRotate(-1);
      keyDown = Date.now();
    }
    if(keyIsDown(keyboardLayout.moveLeft))
    {
      if(!keyIsDown(keyboardLayout.moveRight) && collisionCheck({x: -1, y: 0}))
      {
        if(!tetrominoes[tetromino].rotations[rotation].every( (offset) => { return arr[10*floor(curY + offset.y) + curX + offset.x -1] == '#'})) {
          curY = round(curY);
        }
        curX -= 1;
        keyDown = Date.now();
      }
    }
    else if(keyIsDown(keyboardLayout.moveRight) && collisionCheck({x: +1, y: 0}))
    {
      curX += 1;
      keyDown = Date.now();
    }
    if(keyIsDown(keyboardLayout.hold) && holdBlocked)
    {
      if(hold == null)
      {
        rotation = holdRotation;
        hold = tetromino;
        newTetromino();
      }
     else {
      hold = [tetromino, tetromino = hold][0];
      holdRotation = [rotation, rotation = holdRotation][0]
    }
    keyDown = Date.now();
    holdBlocked = false;
    }
  }
  if(keyIsDown(keyboardLayout.pause))
    pauseFn();
}

function gameDraw() {
  //ui
  fill(16,115,196);
  rect(2/3*width, 0, 1/3*width, height);
  fill(20,6,67);
  rect(17/24*width, 1/32*height, 3/16*height, 3/16*height, 1/96*height);
  rect(3/4*width, 5/16*height,  1/6*width, 1/6*width, 3/64*width);
  rect(3/4*width, 9/20*height,  1/6*width, 1/6*width, 3/64*width);
  rect(3/4*width, 47/80*height, 1/6*width, 1/6*width, 3/64*width);
  rect(3/4*width, 29/40*height, 1/6*width, 1/6*width, 3/64*width);
  rect(3/4*width, 69/80*height, 1/6*width, 1/6*width, 3/64*width);

  //draw hold
  if(hold != null) {
    if(hold == 0) {
      if(holdRotation  % 2 == 0) {
        drawTetromino(hold, holdRotation, 17/24*width, 1.5/32*height, 3/64*height);
      } else {
        drawTetromino(hold, holdRotation, 299/576*height, 1/32*height, 3/64*height);
      }
    } else if(hold == 3) {
      drawTetromino(hold, holdRotation, 17/24*width + 3/128*height, 7/128*height, 4.5/64*height);
    } else {
      drawTetromino(hold, holdRotation, 17/24*width, 1/32*height, 1/16*height);
    }
  }

  //draw que
  for(let i = 0; i < 5; i++) {
    if(que[i] == 0) {
      drawTetromino(que[i], queRotations[i], 3/4*width, 5/16*height +(i * ((11/80)*height)), 1/24*width);
    } else if(que[i] == 3) {
      drawTetromino(que[i], queRotations[i], 19/24*width,1/24*width +  5/16*height +(i * ((11/80)*height)), 1/24*width);
    } else {
      drawTetromino(que[i], queRotations[i], 3/4*width, 5/16*height +(i * ((11/80)*height)), 1/18*width);
    }
  }

  fill(105,50,107);
  text(`Level: ${level}\nScore: ${score}\nLines: ${linesCleared}`, 17/24*width, 15/64*height, width, 16/32*height);

  for(let i = 0; i < 200; i++)
    if(arr[i] != '#') {
      fill(arr[i]);
      rect(i%10*game_width/10, floor(i/10)*height/20, game_width/10, height/20);
    }
  fill(tetrominoes[tetromino].color);
  for(let i  = 0; i < 4; i++)
    rect((curX+tetrominoes[tetromino].rotations[rotation][i].x)*game_width/10,(curY+tetrominoes[tetromino].rotations[rotation][i].y)*height/20,game_width/10,height/20);
}

function draw() {
  clear();
}

function start_new() {
  startLevel = document.getElementById('input_level').value;
  level = startLevel;
  arr.fill('#', 0, 200);
  que = Array.from(que, () => {return floor(Math.random()*7)});
  queRotations = Array.from(que, () => {return floor(Math.random()*4);})
  start();
}

function start() {
  let time_diff = Date.now() - lastFrame;
  pause = (pause == null) ? null : (pause + time_diff);
  placeTime = (placeTime == null) ? null : (placeTime + time_diff);
  timeStamp += time_diff;
  keyDown += time_diff;
  mouseDown += time_diff;
  loop();
  draw = () => {
    clear();
    gameRoutine();
  }

}

function stop() {
  clear();
  draw = () => {

  };
}
