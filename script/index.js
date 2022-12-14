let slotMaschineValues =
    [
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    ]

let rollsCounter = 0;

function rollMaschine() {
    let result = [[],[],[]];
    for (let i = 0; i < slotMaschineValues.length; i++) {
        let temp = Math.floor(Math.random() * slotMaschineValues[i].length);
        result[1].push(slotMaschineValues[i][temp]);
        if (temp === 0) result[0].push(slotMaschineValues[i][slotMaschineValues[i].length - 1]);
        else result[0].push(slotMaschineValues[i][temp - 1]);
        if (temp === slotMaschineValues[i].length - 1) result[2].push(slotMaschineValues[i][0]);
        else result[2].push(slotMaschineValues[i][temp + 1]);
    }
    return result;
}

function setHtmlSlotMaschineValues() {
    let result = rollMaschine();
    for (let i = 0; i < slotMaschineValues.length; i++) {
        document.getElementById("top-row").children[i].innerHTML = result[0][i];
        document.getElementById("middle-row").children[i].innerHTML = result[1][i];
        document.getElementById("bottom-row").children[i].innerHTML = result[2][i];
    }

    rollsCounter++;
    document.getElementById('rollsCounter').innerHTML = rollsCounter;
}