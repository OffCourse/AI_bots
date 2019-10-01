'use strict';

const tf = require('@tensorflow/tfjs-node')

let iterations, rows, columns, playingGrid, savedGrid, tnsr;

setupGame();
runGame(iterations);

function setupGame() {
    rows = 40;
    columns = 100;
    iterations = 100;
    savedGrid = new Array(iterations);
    playingGrid = createGrid(rows, columns);
    populateGrid(playingGrid);
}

function runGame(iterations) {
    console.log('begin playing')
    for (var i = 0; i < iterations; i++) {
        updateGrid(playingGrid);
        saveGrid(playingGrid, i);
    }
    console.log('done playing');
    tnsr = tf.tensor3d(savedGrid);
    console.log('grid saved');
    tnsr.print();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createGrid(rows, columns) {
    let grid = new Array(rows);
    for (var i = 0; i < rows; i++) {
        grid[i] = new Array(columns);
    }
    return grid;
}

function populateGrid(grid) {
    let min = 0;
    let max = 1;
    
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[i].length; j++) {
            let randomValue = getRandomInt(min, max);
            grid[i][j] = randomValue;
        }
    }
}

function saveGrid(grid, i){
    savedGrid[i] = grid;
}

function printGrid(grid) {
    let additionalStr, cell;
    let none = '';
    let space = '\n';
    let emptyCell = ' ';
    let occupiedCell = '#';

    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[i].length; j++) {

            if (j === (grid[i].length - 1)) {
                additionalStr = space;
            }
            else {
                additionalStr = none;
            }

            if (grid[i][j] === 0) {
                cell = emptyCell;
            }
            else {
                cell = occupiedCell;
            }
            process.stdout.write(cell + additionalStr);
        }
    }

    let amountOfSpaces = 5;
    for (var i = 0; i < amountOfSpaces; i++) {
        process.stdout.write(space);
    }
}

function isAlive(grid, i, j) {
    try {
        return grid[i][j];
    } catch {
        return 0;
    }
}

function updateGrid(grid) {
    let gridClone = [];

    for (var i = 0; i < grid.length; i++) {
        gridClone[i] = grid[i].slice();
    }
    
    for (var i = 0; i < grid.length; i++) {
        for (var j = 0; j < grid[i].length; j++) {
            let livingNeighbours = 0;

            livingNeighbours += isAlive(grid, i-1, j-1);
            livingNeighbours += isAlive(grid, i-1, j);
            livingNeighbours += isAlive(grid, i-1, j+1);
            
            livingNeighbours += isAlive(grid, i, j-1);
            livingNeighbours += isAlive(grid, i, j+1);
            
            livingNeighbours += isAlive(grid, i+1, j-1);
            livingNeighbours += isAlive(grid, i+1, j);
            livingNeighbours += isAlive(grid, i+1, j+1);

            if (grid[i][j] === 0) {
                switch (livingNeighbours) {
                    case 3:
                        gridClone[i][j] = 1;
                        break;
                    default:
                        gridClone[i][j] = 0;
                }
            }
            else {
                switch (livingNeighbours) {
                    case 2:
                    case 3:
                        gridClone[i][j] = 1;
                        break;
                    default:
                        gridClone[i][j] = 0;
                }
            }
        }
    }

    for (var i = 0; i < grid.length; i++) {
        grid[i] = gridClone[i].slice();
    }
}
