let currentPlayer = "✖";
let gameEnded = false;
let board = ["", "", "", "", "", "", "", "", ""];
const winPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
function cellClicked(cellIndex) {
    if (!gameEnded && board[cellIndex] === "") {
        const cell = document.getElementById(`cell${cellIndex}`);
        cell.textContent = currentPlayer;
        cell.setAttribute('data-value', currentPlayer);
        board[cellIndex] = currentPlayer;
        if (checkWinner(currentPlayer)) {
            document.getElementById("message").textContent = `Игрок ${currentPlayer} победил!`;
            gameEnded = true;
            offBoard();
        } else if (isBoardFull()) {
            document.getElementById("message").textContent = "Ничья!";
            gameEnded = true;
            offBoard();
        } else {
            currentPlayer = currentPlayer === "✖" ? "◯" : "✖";
            if (currentPlayer === "◯") {ai()}
        }
    }
}

function checkWinner(player) {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] === player && board[b] === player && board[c] === player) {
            return true;
        }
    }
    return false;
}

function isBoardFull() {
    return board.every(cell => cell !== "");
}

function offBoard() {
    document.querySelectorAll('.cell').forEach((cell) => {
        cell.style.cursor = 'default';
        cell.style.pointerEvents = 'none'
    });
}


function imba(n) {
    const cell = document.getElementById(`cell${n}`);
    cell.textContent = currentPlayer;
    cell.setAttribute('data-value', currentPlayer);
    board[n] = currentPlayer;
    if (checkWinner(currentPlayer)) {
        document.getElementById("message").textContent = `Игрок ${currentPlayer} победил!`;
        gameEnded = true;
        offBoard();
    } else if (isBoardFull()) {
        document.getElementById("message").textContent = "Ничья!";
        gameEnded = true;
        offBoard();
    }
    currentPlayer = currentPlayer === "✖" ? "◯" : "✖";
}

// 0 1 2
// 3 4 5
// 6 7 8

// [0, 1, 2]
// [3, 4, 5]
// [6, 7, 8]
// [0, 3, 6]
// [1, 4, 7]
// [2, 5, 8]
// [0, 4, 8]
// [2, 4, 6]






let frH = true;
let sdH = false;
let trH = false;
let foH = false;
let trdHod = [];
function ai() {
    let count;
    let countP;
    let botH = [];
    let gy = [0, 2, 6, 8];
    let playerH = [];
    let betterH = [];
    let betterBotH = [];
    let aiH = gy[Math.floor(Math.random() * gy.length)];
    board.forEach((el, id) => {
        if (el === "✖") {
            playerH.push(id);
        };
    });
    board.forEach((el, id) => {
        if (el === "◯") {
            botH.push(id);
        };
    });
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.style.cursor = 'default';
        cell.style.pointerEvents = 'none';
    });

    setTimeout(() => {
        cells.forEach((cell) => {
        cell.style.cursor = 'pointer';
        cell.style.pointerEvents = 'auto';
    });



        if (frH) {
            while (board[aiH] != "") {aiH = gy[Math.floor(Math.random() * gy.length)]}
            botH.push(aiH);
            imba(aiH);
            frH = false;
            sdH = true;




        } else if (sdH) {
            let tekHodBot = [];

            let findWinningCombinations = (numbers, winPatterns) => {
                const winningCombinations = [];
                for (const winPattern of winPatterns) {
                    if (winPattern.includes(numbers[0]) && winPattern.includes(numbers[1])) {
                        winningCombinations.push(winPattern);
                    }
                }
                return winningCombinations;
            };

            const winningCombinations = findWinningCombinations(playerH, winPatterns);
            console.log(`Выйгрышная комбинация(и) игрока: ${winningCombinations}`);

            winningCombinations.forEach(el => {
                const emptyCell = el.filter(el => !playerH.includes(el) && !botH.includes(el));
                if (emptyCell.length > 0) {
                    tekHodBot = emptyCell;
                }
            });


            console.log(`Ход может быть сделан на: ${tekHodBot}`);


            if (tekHodBot.length > 0) {
                imba(tekHodBot[0]);
                botH.push(tekHodBot[0]);
            } else if ((winningCombinations[0] == 0 && winningCombinations[1] == 4 && winningCombinations[2] == 8) || (winningCombinations[0] == 2 && winningCombinations[1] == 4 && winningCombinations[2] == 6)) {
                if (botH[0] == 0) {imba(2); botH.push(2)}
                else if (botH[0] == 2) {imba(8); botH.push(8)}
                else if (botH[0] == 6) {imba(8); botH.push(8)}
                else if (botH[0] == 8) {imba(2); botH.push(2)}
            } else if ((botH[0] == 0) && board[1] != "" && board[2] != "") {imba(6); console.log(1); botH.push(6); trdHod.push(0); trdHod.push(6);
            } else if ((botH[0] == 0) && board[3] != "" && board[6] != "") {imba(2); console.log(2); botH.push(2); trdHod.push(0); trdHod.push(2);
            } else if ((botH[0] == 2) && board[0] != "" && board[1] != "") {imba(8); console.log(3); botH.push(8); trdHod.push(2); trdHod.push(8);
            } else if ((botH[0] == 2) && board[5] != "" && board[8] != "") {imba(0); console.log(4); botH.push(0); trdHod.push(2); trdHod.push(0);
            } else if ((botH[0] == 6) && board[7] != "" && board[8] != "") {imba(0); console.log(5); botH.push(0); trdHod.push(6); trdHod.push(0);
            } else if ((botH[0] == 6) && board[0] != "" && board[3] != "") {imba(8); console.log(6); botH.push(8); trdHod.push(6); trdHod.push(8);
            } else if ((botH[0] == 8) && board[6] != "" && board[7] != "") {imba(2); console.log(7); botH.push(2); trdHod.push(8); trdHod.push(2);
            } else if ((botH[0] == 8) && board[2] != "" && board[5] != "") {imba(6); console.log(8); botH.push(6); trdHod.push(8); trdHod.push(6);            
            } else {
                botH.push(board.findIndex((element) => element === ""));
                imba(botH[1]);
            }



            sdH = false;
            trH = true;





        } else if (trH) {
            // Ход бота
            let findWinningCombinations1 = (numbers, winPatterns) => {
                const winningCombinations = [];
                for (const winPattern of winPatterns) {
                    if (winPattern.includes(numbers[0]) && winPattern.includes(numbers[1])) {
                        winningCombinations.push(winPattern);
                    }
                }
                return winningCombinations;
            };

            const winningCombinations1 = findWinningCombinations1(botH, winPatterns);
            console.log(`Выйгрышная комбинация(и) бота: ${winningCombinations1}`);


            let tekHodBot1 = [];

            winningCombinations1.forEach(el => {
                if (board[el.filter(el => !botH.includes(el))] === "") {
                    tekHodBot1 = el.filter(el => !botH.includes(el));
                }
            });

            console.log(`Ход может быть сделан на: ${tekHodBot1}`);







            // Ход игрока для перекрытия.
            const findWinningCombinationsPlayer1 = (numbers, winPatterns) => {
                const winningCombinations = [];
                for (let i = 0; i < numbers.length; i++) {
                    for (let j = i + 1; j < numbers.length; j++) {
                        for (const winPattern of winPatterns) {
                            if (winPattern.includes(numbers[i]) && winPattern.includes(numbers[j])) {
                                winningCombinations.push(winPattern);
                                break;
                            }
                        }
                    }
                }
                return winningCombinations;
            };

            const winningCombinationsBlock1 = findWinningCombinationsPlayer1(playerH, winPatterns);
            console.log(`Выйгрышная комбинация(и) игрока: ${winningCombinationsBlock1}`);

            let tekHodBotBlock1 = [];

            winningCombinationsBlock1.forEach(el => {
                if (board[el.filter(el => !playerH.includes(el))] === "") {
                    tekHodBotBlock1 = el.filter(el => !playerH.includes(el));
                }
            });

            console.log(`Ход может быть сделан на: ${tekHodBotBlock1}`);


            

            // Ход.

            if (trdHod.length > 0) {
                if (trdHod[0] === 0 && trdHod[1] == 6) {
                    if (board[3] == "") {
                        imba(3); botH.push(3)
                    } else {
                        imba(8); botH.push(8); trdHod.push(8);
                        console.log(1)
                    }                
                }
                if (trdHod[0] === 0 && trdHod[1] === 2) {
                    if (board[1] === "") {
                        imba(1); botH.push(1)
                    } else {
                        imba(8); botH.push(8); trdHod.push(8);
                        console.log(2)
                    }                
                } 
                if (trdHod[0] === 2 && trdHod[1] === 8) {
                    if (board[5] === "") {
                        imba(5); botH.push(5)
                    } else {
                        imba(6); botH.push(6); trdHod.push(6);
                        console.log(3)
                    }                
                } 
                if (trdHod[0] === 2 && trdHod[1] === 0) {
                    if (board[1] === "") {
                        imba(1); botH.push(1)
                    } else {
                        imba(6); botH.push(6); trdHod.push(6);
                        console.log(4)
                    }                
                } 
                if (trdHod[0] === 6 && trdHod[1] === 0) {
                    if (board[3] === "") {
                        imba(3); botH.push(3)
                    } else {
                        imba(2); botH.push(2); trdHod.push(2);
                        console.log(5)
                    }                
                } 
                if (trdHod[0] === 6 && trdHod[1] === 8) {
                    if (board[7] === "") {
                        imba(7); botH.push(7)
                    } else {
                        imba(2); botH.push(2); trdHod.push(2);
                        console.log(6)
                    }                
                } 
                if (trdHod[0] === 8 && trdHod[1] === 2) {
                    if (board[5] === "") {
                        imba(5); botH.push(5)
                    } else {
                        imba(0); botH.push(0); trdHod.push(0);
                        console.log(7)
                    }                
                } 
                if (trdHod[0] === 8 && trdHod[1] === 6) {
                    if (board[7] === "") {
                        imba(7); botH.push(7)
                    } else {
                        imba(0); botH.push(0); trdHod.push(0);
                        console.log(8)
                    }                
                }
            } else if (tekHodBot1.length > 0) {
                imba(tekHodBot1[0]);
                botH.push(tekHodBot1[0]);
            } else if (tekHodBotBlock1.length > 0) {
                imba(tekHodBotBlock1[0]);
                botH.push(tekHodBotBlock1[0]);
            } else {
                botH.push(board.findIndex((element) => element === ""));
                imba(botH[2]);
            }
            

            trH = false;
            foH = true;




        } else if (foH) {
            // Ход бота
            const findWinningCombinations = (numbers, winPatterns) => {
                const winningCombinations = [];
                for (let i = 0; i < numbers.length; i++) {
                    for (let j = i + 1; j < numbers.length; j++) {
                        for (const winPattern of winPatterns) {
                            if (winPattern.includes(numbers[i]) && winPattern.includes(numbers[j])) {
                            winningCombinations.push(winPattern);
                            break;
                            }
                        }
                }
                }
                return winningCombinations;
            };
            

            const winningCombinations = findWinningCombinations(botH, winPatterns);
            console.log(`Выйгрышная комбинация(и) бота: ${winningCombinations}`);
            let tekHodBot = [];

            winningCombinations.forEach(el => {
                if (board[el.filter(el => !botH.includes(el))] === "") {
                    tekHodBot = el.filter(el => !botH.includes(el));
                }
            });

            console.log(`Ход может быть сделан на: ${tekHodBot}`);




            // Ход игрока для перекрытия.
            const findWinningCombinationsPlayer = (numbers, winPatterns) => {
                const winningCombinations = [];

                for (let i = 0; i < numbers.length; i++) {
                    for (let j = i + 1; j < numbers.length; j++) {
                        for (let k = 0; k < winPatterns.length; k++) {
                            if (winPatterns[k].includes(numbers[i]) && winPatterns[k].includes(numbers[j])) {
                                winningCombinations.push(winPatterns[k]);
                            }
                        }
                    }
                }
                return winningCombinations;
            };
            
            const winningCombinationsBlock = findWinningCombinationsPlayer(playerH, winPatterns);
            console.log("Выигрышная комбинация(и) игрока:", winningCombinationsBlock);
            
            let tekHodBotBlock = [];
            
            winningCombinationsBlock.forEach((el) => {
                if (board[el.filter((el) => !playerH.includes(el))] === "") {
                tekHodBotBlock = el.filter((el) => !playerH.includes(el));
                }
            });

            console.log(`Ход может быть сделан на: ${tekHodBotBlock}`);



            // Ход.
            if (trdHod.length > 0 ) {
                if (trdHod[0] === 0 && trdHod[1] === 6 && trdHod[2] === 8) {
                    if (board[4] === "") {
                        imba(4); botH.push(4)
                    } else {
                        imba(7); botH.push(7)
                    }                
                } else if (trdHod[0] === 0 && trdHod[1] === 2 && trdHod[2] === 8) {
                    if (board[4] === "") {
                        imba(4); botH.push(4)
                    } else {
                        imba(5); botH.push(5)
                    }                
                } else if (trdHod[0] === 2 && trdHod[1] === 8 && trdHod[2] === 6) {
                    if (board[4] === "") {
                        imba(4); botH.push(4)
                    } else {
                        imba(7); botH.push(7)
                    }                
                } else if (trdHod[0] === 2 && trdHod[1] === 0 && trdHod[2] === 6) {
                    if (board[4] === "") {
                        imba(4); botH.push(4)
                    } else {
                        imba(3); botH.push(3)
                    }                
                } else if (trdHod[0] === 6 && trdHod[1] === 0 && trdHod[2] === 2) {
                    if (board[4] === "") {
                        imba(4); botH.push(4)
                    } else {
                        imba(1); botH.push(1)
                    }                
                } else if (trdHod[0] === 6 && trdHod[1] === 8 && trdHod[2] === 2) {
                    if (board[4] === "") {
                        imba(4); botH.push(4)
                    } else {
                        imba(5); botH.push(5)
                    }                
                }
                else if (trdHod[0] === 8 && trdHod[1] === 2 && trdHod[2] === 0) {
                    if (board[4] === "") {
                        imba(4); botH.push(4)
                    } else {
                        imba(1); botH.push(1)
                    }                
                } else if (trdHod[0] === 8 && trdHod[1] === 6 && trdHod[2] === 0) {
                    if (board[4] === "") {
                        imba(4); botH.push(4)
                    } else {
                        imba(3); botH.push(3)
                    }
                }
            } else if (tekHodBot.length > 0) {
                imba(tekHodBot[0]);
                botH.push(tekHodBot[0]);
            } else if (tekHodBotBlock.length > 0) {
                imba(tekHodBotBlock[0]);
                botH.push(tekHodBotBlock[0]);
            } else {
                botH.push(board.findIndex((element) => element === ""));
                imba(botH[3]);
            }
            

            foH = false;
        }
    }, 500);
};