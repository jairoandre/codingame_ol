// mock
'use strict';

function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function * _readLine () {
  while(true) {
    let a = getRandomInt(1, 5);
    let b = getRandomInt(1, 5);
    yield a + ' ' + b;
  }
}

const _read = _readLine();

function readline () {
  return _read.next().value;
}

function fillArray (size, value) {
  return Array(size).fill().map(() => value);
}

function Board (board) {
  if (!(this instanceof Board)) {
    return new Board(board);
  }
  this.board = board || fillArray(6, fillArray(12, '.'));
}

function height (line) {
  let height = 0;
  line.forEach((element) => {
    if (element !== '.') {
      height++;
    }
  });
  return height;
}

Board.prototype.print = function () {
  this.board.map((line) => console.log(line.reduce((previous, current) => '' + previous + current)));
};

Board.prototype.clone = function () {
  return new Board(this.board.slice(0));
};

Board.prototype.place = function (index, block) {
  let clone = this.clone();
  let line = clone.board[index];
  let aPlaced = false;
  let bPlaced = false;
  line = line.map((x) => {
    if (x === '.') {
      if (aPlaced) {
        if (bPlaced) {
          return x;
        } else {
          bPlaced = true;
          return block[1];
        }
      } else {
        aPlaced = true;
        return block[0];
      }
    } else {
      return x;
    }
  });
  clone.board[index] = line;
  return clone;
};

Board.prototype.height = function () {
  let maxHeight = 0;
  this.board.forEach((element) => {
    let lineHeight = height(element);
    if (lineHeight > maxHeight) {
      maxHeight = lineHeight;
    }
  });
  return maxHeight;
};

Board.prototype.scoreMove = function (index, block) {
  let afterBoard = this.place(index, block);
  let afterHeight = afterBoard.height();
  if (afterHeight > this.height()) {
    return 0;
  } else {
    return 1;
  }
};

function readBlock () {
  return readline().split(' ');
}

// module.exports = {Board: Board, readBlock: readBlock, board: new Board(), height: height}
