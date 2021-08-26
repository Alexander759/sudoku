const cells = document.querySelectorAll("td")
const btnNums = document.querySelectorAll(".btn-nums")

let lastMarkedCell = null

cells.forEach(function(cell, i) {
    cell.addEventListener("click", function () {

        cells.forEach(function (item) {
            item.classList.remove("column-and-row-marked-cell")
        })

        if (lastMarkedCell !== null) {
            lastMarkedCell.classList.remove("marked-cell")
        }

        const indexOfStartColumn = i % 9


        let indexOfStartRow = 8

        while (indexOfStartRow < i) {
            indexOfStartRow += 9
        }

        indexOfStartRow -= 8

        //const indexOfStartRow;

        for (let j = indexOfStartColumn; j < 81; j += 9) {
            if (cells[j] !== cell) {
                cells[j].classList.add("column-and-row-marked-cell")
            }
        }

        for (let j = indexOfStartRow; j < indexOfStartRow + 9; j++) {
            if (cells[j] !== cell) {
                cells[j].classList.add("column-and-row-marked-cell")
            }
        }




        cell.classList.add("marked-cell")
        lastMarkedCell = cell
    })
})

btnNums.forEach(function (btn) {
    btn.addEventListener("click", function () {
        if (lastMarkedCell !== null) {
            lastMarkedCell.textContent = btn.textContent
        }
    })
})

/*function generateSudoku() {
    let sudoku = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]

    for (let i = 0; i < sudoku.length; i++) {

        let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9]

        for (let j = 0; j < sudoku[i].length; j++) {

            let numsUsed = []

            for (let k = 0; k < i; k++) {
                if (nums.indexOf(sudoku[k][j]) !== -1) {
                    numsUsed.push(nums.splice(nums.indexOf(sudoku[k][j]), 1)[0])
                }
            }

            let startIndexOfSquareRow = 0
            let startIndexOfSquareColumn = 0

            if (i < 3) {
                startIndexOfSquareRow = 0
            } else if (i < 6) {
                startIndexOfSquareRow = 3
            } else {
                startIndexOfSquareRow = 6
            }

            if (j < 3) {
                startIndexOfSquareColumn = 0
            } else if (j < 6) {
                startIndexOfSquareColumn = 3
            } else {
                startIndexOfSquareColumn = 6
            }

            for (let row = startIndexOfSquareRow; row < startIndexOfSquareRow + 3; row++) {
                for (let col = startIndexOfSquareColumn; col < startIndexOfSquareColumn + 3; col++) {
                    if (nums.indexOf(sudoku[row][col]) !== -1) {
                        numsUsed.push(nums.splice(nums.indexOf(sudoku[row][col]), 1)[0])
                    }
                }
            }

            if (nums.length !== 0) {
                let randomIndex = Math.floor(Math.random() * nums.length)
                sudoku[i][j] = nums[randomIndex]
                nums.splice(randomIndex, 1)
            }
            else {
                //console.log("wkwkwk" + " " + i + " " + j)
                return generateSudoku();
            }

            for (let k = 0; k < numsUsed.length; k++) {
                nums.push(numsUsed[k])
            }
            
        }
    }

    return sudoku
}*/

function sudokuSolver(sudoku, maxLength = 1000) {
    let solves = []
    function solveSudoku(sudoku) {

        if (solves.length >= maxLength) {
            return
        }

        const indexes = findFirstFreeSpace(sudoku)

        if (!indexes) {
            solves.push(JSON.parse(JSON.stringify(sudoku)))
            return
        }

        let possibleNums = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        let notUsefulNums = findNumsThatCantBeUsed(sudoku, indexes[0], indexes[1])
        //console.log(notUsefulNums)

        for (let i = 0; i < possibleNums.length; i++) {
            if (notUsefulNums.includes(possibleNums[i])) {
                possibleNums.splice(i, 1)
                i--
            }
        }
        //console.log(possibleNums.length)
        while(0 < possibleNums.length) {
            let newSudoku = sudoku.slice()
            let randomIndex = Math.floor(Math.random() * possibleNums.length)
            newSudoku[indexes[0]][indexes[1]] = possibleNums[randomIndex]

            let copy = newSudoku.slice()
            possibleNums.splice(randomIndex, 1)
            solveSudoku(JSON.parse(JSON.stringify(copy)))
        }
    }

    solveSudoku(sudoku)
    return solves
}

function findFirstFreeSpace(sudoku) {
    for (let i = 0; i < sudoku.length; i++) {
        for (let j = 0; j < sudoku[i].length; j++) {
            if (sudoku[i][j] === 0) {
                return [i, j]
                
            }
        }
    }

    return 0
}

function findNumsThatCantBeUsed(sudoku, indexOne, indexTwo) {

    let nums = []

    for (let i = 0; i < 9; i++) {
        if (sudoku[indexOne][i]) {
            nums.push(sudoku[indexOne][i])
        }
    }

    for (let i = 0; i < 9; i++) {
        if (sudoku[i][indexTwo]) {
            nums.push(sudoku[i][indexTwo])
        }
    }

    let startIndexOfSquareRow = 0
    let startIndexOfSquareColumn = 0

    if (indexOne < 3) {
        startIndexOfSquareRow = 0
    } else if (indexOne < 6) {
        startIndexOfSquareRow = 3
    } else {
        startIndexOfSquareRow = 6
    }

    if (indexTwo < 3) {
        startIndexOfSquareColumn = 0
    } else if (indexTwo < 6) {
        startIndexOfSquareColumn = 3
    } else {
        startIndexOfSquareColumn = 6
    }

    for (let row = startIndexOfSquareRow; row < startIndexOfSquareRow + 3; row++) {
        for (let col = startIndexOfSquareColumn; col < startIndexOfSquareColumn + 3; col++) {
            if (sudoku[row][col] !== 0) {
                nums.push(sudoku[row][col])
            }
        }
    }

    return nums
}

function generateSudokuPuzzle() {
    let arr = null
    do {
        let emptySudoku = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]

        arr = sudokuSolver(emptySudoku, 1000)[Math.floor(Math.random() * 1000)]

        console.log(JSON.parse(JSON.stringify(arr)))

        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0
        arr[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = 0

        console.log(JSON.parse(JSON.stringify(arr)))

    } while (sudokuSolver(JSON.parse(JSON.stringify(arr))).length > 1)

    let sudoku = []

    for (let i = 0; i < arr.length; i++) {
        sudoku = sudoku.concat(arr[i])
    }

    return sudoku
}

console.time("1")
let sudoku = generateSudokuPuzzle()

cells.forEach(function (item, i) {
    if (sudoku[i]) {
        item.textContent = sudoku[i]
    }
})
console.timeEnd("1")


function keyListener(event) {
    event = event || window.event;

    if (event.key === 1) {
        btnNums[0].click()
    }
}

document.onkeydown = function (e) {
    e = e || window.event;
    var key = e.which || e.keyCode;

    switch (key) {
        case 49:
            btnNums[0].click()
            break
        case 50:
            btnNums[1].click()
            break
        case 51:
            btnNums[2].click()
            break
        case 52:
            btnNums[3].click()
            break
        case 53:
            btnNums[4].click()
            break
        case 54:
            btnNums[5].click()
            break
        case 55:
            btnNums[6].click()
            break
        case 56:
            btnNums[7].click()
            break
        case 57:
            btnNums[8].click()
            break
    }
}