// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://sudoku9x9.com/sudoku_blank_grid_9x9.php
// @grant        none
// ==/UserScript==

(async function() {
    'use strict';
    let cells = [];
    var num = 0;
    let row = 0;
    let col = 0;
    var gridnum = 0;
    var table = [
        [3, 0, 0, 2, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 7, 0, 0, 0],
        [7, 0, 6, 0, 3, 0, 5, 0, 0],
        [0, 7, 0, 0, 0, 9, 0, 8, 0],
        [9, 0, 0, 0, 2, 0, 0, 0, 4],
        [0, 1, 0, 8, 0, 0, 0, 0, 0],
        [0, 0, 9, 0, 4, 0, 3, 0, 1],
        [0, 0, 0, 7, 0, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 8, 0, 0, 6]
     ];

    function getBoard() {
        var children = document.getElementById('playtable').getElementsByTagName('TEXTAREA');
        for (var i = 0; i < children.length; i++) {
            if (col === 9) {
                col = 0;
                row++
            }
            if (row > 9) {
                console.log("Something is wrong");
            }
            if (children[i].textLength === 1){
                table[row][col] = parseInt(children[i].textContent);
                col++;
            } else if (children[i].textLength == 0) {
                table[row][col] = 0;
                col++;
            }
        }
    }

function gNumber(board, r, c, k) {
    for (let i = 0; i < 9; i++) {
        const m = 3 * Math.floor(r / 3) + Math.floor(i / 3);
        const n = 3 * Math.floor(c / 3) + i % 3;
        if (board[r][i] == k || board[i][c] == k || board[m][n] == k) {
          return false;
        }
    }
    return true;
}

function adder() {
    let Solved = localStorage.getItem('Solved')
    var count = 0;
    let numS = 0;
    numS = parseInt(Solved) + 1;
    if (Solved < 50) {
        for (var i = 0; i < 3; i++) {
            count = count + table[0][i]
            console.log(table[0][i]);
        }
        var local = localStorage.getItem('Count');
        count = parseInt(local) + count;
        localStorage.removeItem('Count')
        localStorage.removeItem('Solved')
        localStorage.setItem('Count', count);
        localStorage.setItem('Solved', numS);
    }
}

function fillSpaces() {
    var children = document.getElementById('playtable').getElementsByTagName('TEXTAREA');
    for (let i = 0; i < children.length; i++) {
                if (num === 9) {
                    num = 0;
                    gridnum++;
                }
                if (children[i].tagName == "TEXTAREA") {
                    children[i].value = table[gridnum][num]
                    num++;
                }
    }
}

function solve(t) {
    let b = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (t[r][c] != 0) {
                for (let g = 0; g < 9; g++) {
                    if (t[r][g] != 0) {
                        b[t[r][g]] = 0;
                    }
                    if (t[g][c] != 0) {
                        b[t[g][c]] = 0;
                    }
                }
                let m = 3 * Math.floor(r / 3)
                let n = 3 * Math.floor(c / 3)
                for (let i = 0; i < 3; i++) {
                    for (let z = 0; z < 3; z++){
                        if(t[z + m][z + n] != 0){
                            b[[i + m][z + n]] = 0;
                        }
                    }
                }
                }
            for(let i in b) {
                if (b[i] == 1) {
                    t[r][c] = i;
                    console.log(b);
                    if (solve(t)) {
                        return true;
                    } else {
                        t[r][c] = "0";
                    }
                }
            }
            return false;
        }
    }
    return true;
}
await solve(table);
//await getBoard();
//await solve(table)
})();