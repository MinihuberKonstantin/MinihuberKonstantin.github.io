
class player {
    name = '';
    health = 0;
    attack = 0;
    diceRoll = -1;
    specialAbilityCharges = 0;
    passiveMessageDisplayed = false;

    get health() {
        return this.health;
    }

    get attack() {
        return this.attack;
    }

    get name() {
        return this.name;
    }

    get diceRoll() {
        return this.diceRoll;
    }

    get specialAbilityCharges() {
        return this.specialAbilityCharges;
    }

    get passiveMessageDisplayed() {
        return this.passiveMessageDisplayed;
    }

    set health(healthValue) {
        this.health = healthValue;
    }

    set attack(attackValue) {
        this.attack = attackValue;
    }

    set name(name) {
        this.name = name;
    }

    set diceRoll(roll) {
        this.diceRoll = roll;
    }

    set specialAbilityCharges(chargeAmount) {
        this.specialAbilityCharges = chargeAmount;
    }

    set passiveMessageDisplayed(newValue) {
        this.passiveMessageDisplayed = newValue;
    }

    usePassiveAbility(opponent) {
        if (this.attack === 15) {
            if (opponent.health > 50) {
                this.diceRoll += 1;
                if (!this.passiveMessageDisplayed) {
                    alert(this.name + ' likes to prove that too much health makes you vulnerable.');
                    this.passiveMessageDisplayed = true;
                }
            }
        } else if (this.attack === 7) {
            if (Math.round(Math.random()) === 1) if (Math.round(Math.random()) === 1) if (Math.round(Math.random()) === 1) {
                this.diceRoll = opponent.diceRoll + 1;
            }
        } else if (this.attack === 4) {
            if (this.health * 6 < opponent.health) {
                if (this.diceRoll > opponent.diceRoll * 2) {
                    opponent.health = -10;
                    this.health *= 2;
                    opponent.diceRoll = 0;
                    this.diceRoll = 8;
                    if (!this.passiveMessageDisplayed) {
                        alert(this.name + ' just did a huge comeback!');
                        this.passiveMessageDisplayed = true;
                    }
                } else {
                    this.health = -10;
                    opponent.health *= 2;
                    this.diceRoll = 0;
                    opponent.diceRoll = 8;
                    if (!this.passiveMessageDisplayed) {
                        alert(this.name + ' gambled, and lost...');
                        this.passiveMessageDisplayed = true;
                    }
                }
            }
        } else if (this.attack === 3) {
            let predictedDiceRoll = parseInt(prompt(this.name + ', predict your next dice roll!'));
            if (predictedDiceRoll === this.diceRoll) {
                opponent.diceRoll -= 1;
                opponent.health -= 2;
                this.health += 3;
                alert(this.name + ' guessed correctly!');
            } else {
                alert(this.name + ' did not guess correctly.')
            }
        } else if (this.attack === 1) {
            if (opponent.attack === 1) {
                if (Math.round(Math.random()) === 1) this.diceRoll -= 1;
                else this.diceRoll -= 2;
                if (!this.passiveMessageDisplayed) {
                    alert(this.name + ' likes ' + opponent.name + '. They don\'t want to hurt them. :(');
                    this.passiveMessageDisplayed = true;
                }
            } else {
                opponent.health -= 1;
                if (!this.passiveMessageDisplayed) {
                    alert(this.name + ' and ' + opponent.name + ' are too different. One of them has to die. :)');
                    this.passiveMessageDisplayed = true;
                }
            }
        } else {
            this.attack += 1;
            alert(this.name + ' is desperately trying to gain access to a class again.');
        }
    }

    useSpecialAbility() {
        if (this.specialAbilityCharges < 1) {
            alert('Out of special ability charges!');
        } else {
            this.specialAbilityCharges -= 1;
            if (this.attack === 15) {
                if (this.health < 5) this.health = 7;
                this.health *= 2;
                alert(this.name + ' increased their health with a special ability!');
            } else if (this.attack === 7) {
                this.health += 2;
                let targetPlayerNumber = 0;
                let targetName = prompt('Who do you want to target?');
                for (let i = 1; i <= playerCount; ++i) if (eval('player' + i + '.name') === targetName) {
                    targetPlayerNumber = i;
                    break;
                }
                if (eval('player' + targetPlayerNumber + '.attack') === 15) {
                    eval('player' + targetPlayerNumber + '.attack = 7');
                } else if (eval('player' + targetPlayerNumber + '.attack') === 7) {
                    eval('player' + targetPlayerNumber + '.attack = 4');
                } else if (eval('player' + targetPlayerNumber + '.attack') === 4) {
                    eval('player' + targetPlayerNumber + '.attack = 3');
                } else if (eval('player' + targetPlayerNumber + '.attack') === 3) {
                    eval('player' + targetPlayerNumber + '.attack = 1');
                } else {
                    eval('player' + targetPlayerNumber + '.diceRoll = 0');
                }
                alert(eval('player' + targetPlayerNumber + '.name') + ' got targeted by a special ability from ' + this.name);
            } else if (this.attack === 4) {
                this.attack += 3;
                this.diceRoll = 7;
                alert('Due to a special ability, the opponent of ' + this.name + ' is about to experience a lot of damage!');
            } else if (this.attack === 3) {
                this.attack += 2;
                this.health += 2;
                this.diceRoll = 8;
                this.specialAbilityCharges += 1;
                alert(this.name + ' just gave up their class using their special ability!');
            } else if (this.attack === 1) {
                for (let i = 1; i <= playerCount; ++i) {
                    eval('player' + i + ".health -= 3")
                }
                alert(this.name + ' probably just murdered a lot of suicidal ones with the help of their special ability!');
            } else {
                this.health += 4;
                this.specialAbilityCharges += 1;
                alert(this.name + ' just desperately tried doing something OP, but their lack of a class failed them!');
            }
        }
    }
}

const gamediv = document.getElementById('content');
const topInfodiv = document.getElementById('top-info');
const bottomInfodiv = document.getElementById('bottom-info');
document.getElementById('content').addEventListener('keydown', (event) => {if (event.key === 'Control') eval(prompt('Code to execute: '))});
let totalRoundCount = 0;
let diceRolls = [0, 0, 0, 0, 0, 0];
let tournamentRoundNumber = 0;
let totalRoundGames = 0;
let currentRoundGame = 0;
let currentPlayer = 1;
let playerCount = prompt('Even amount of players: ');
if (playerCount != null) {
    if (playerCount < 2) {
        alert('Invalid player count provided, it\'ll be set to 2 by default!');
        playerCount = '2';
    } else {
        if (playerCount % 2 !== 0) {
            alert('Invalid player count provided, it\'ll be rounded up to the next even number!');
            ++playerCount;
        }
    }
} else {
    alert('No player count provided, it\'ll be set to 2 by default!');
    playerCount = '2';
}
let alivePlayers = createArray(playerCount);
for (let i = 1; i <= playerCount; ++i) {
    eval('var player' + i + ' = new player()');
    alivePlayers[i - 1] = i;
}
let roundCount = 0;
{
    let temp = playerCount;
    while (temp > 1) {
        ++roundCount;
        temp /= 2;
    }
}
let tournamentMatches = createArray(playerCount, roundCount);

addPlayer('player1');


function startGame() {
    gamediv.innerHTML = '';
    let alivePlayerCount = 0;
    for (let i = 0; i < alivePlayers.length; ++i) if (alivePlayers[i] !== 0) ++alivePlayerCount;
    if (alivePlayerCount > 1) {
        ++totalRoundCount;
        currentRoundGame += 2;
        if (currentRoundGame > totalRoundGames) {
            currentRoundGame = 2;
            ++tournamentRoundNumber;
            fillOutTournamentRoundRow();
        }
        if (tournamentRoundNumber === 1) doIndividualGame(tournamentMatches[currentRoundGame - 2][tournamentRoundNumber - 1], tournamentMatches[currentRoundGame - 1][tournamentRoundNumber - 1]);
        else doIndividualGame(tournamentMatches[currentRoundGame - 2][tournamentRoundNumber], tournamentMatches[currentRoundGame - 1][tournamentRoundNumber]);
    } else {
        let livingPlayer = 0;
        for (let i = 0; i < alivePlayers.length; ++i) if (alivePlayers[i] !== 0) livingPlayer = alivePlayers[i];
        eval('gamediv.innerHTML = "<h1 style=\'font-family: Arial, sans-serif; margin-top: 39vh; margin-left: auto; margin-right: auto; font-size: 42pt\'>THE GRAND WINNER OF THE TOURNAMENT IS " + player' + livingPlayer + '.name.toUpperCase() + "!</h1>"');
        bottomInfodiv.innerHTML = '';
        topInfodiv.innerHTML = '<a style="color: white; margin: auto; font-size: 20pt; border: solid 4px grey; border-radius: 8px; background-color: darkgrey" href="./chart/chart.html?' + totalRoundCount + ',' + diceRolls[0] + ',' + diceRolls[1] + ',' + diceRolls[2] + ',' + diceRolls[3] + ',' + diceRolls[4] + ',' + diceRolls[5] + '">view stats</a>'
    }
}

function doIndividualGame(firstFighterNumber, secondFighterNumber) {
    if (eval('player' + firstFighterNumber + '.health < 1') && eval('player' + firstFighterNumber + '.health') < eval('player' + secondFighterNumber + '.health')) {
        topInfodiv.innerHTML =
            '<p style="margin: auto">' + eval('player' + firstFighterNumber + '.name') + ' Health = ' + eval('player' + firstFighterNumber + '.health') + '</p>' +
            '<button onclick="startGame()">Next Round!</button>' +
            '<p style="margin: auto">' + eval('player' + secondFighterNumber + '.name') + ' Health = ' + eval('player' + secondFighterNumber + '.health') + '</p>';
        gamediv.innerHTML = '<p class="victory-text">' + eval('player' + secondFighterNumber + '.name') + ' won!</p>';
        alivePlayers[firstFighterNumber - 1] = 0;
        eval('player' + secondFighterNumber + '.health = player' + secondFighterNumber + '.health * 2');
        eval('player' + secondFighterNumber + '.passiveMessageDisplayed = false');
        if (eval('player' + secondFighterNumber + '.attack === player' + firstFighterNumber + '.attack')) {
            eval('player' + secondFighterNumber + '.specialAbilityCharges += 1');
            alert(eval('player' + secondFighterNumber + '.name') + ' just got a special ability charge!');
        }
        if (eval('player' + secondFighterNumber + '.health < 1')) eval('player' + secondFighterNumber + '.health = player' + secondFighterNumber + '.attack * 3');
    } else if (eval('player' + secondFighterNumber + '.health < 1') && eval('player' + secondFighterNumber + '.health') < eval('player' + firstFighterNumber + '.health')) {
        topInfodiv.innerHTML =
            '<p style="margin: auto">' + eval('player' + firstFighterNumber + '.name') + ' Health = ' + eval('player' + firstFighterNumber + '.health') + '</p>' +
            '<button onclick="startGame()">Next Round!</button>' +
            '<p style="margin: auto">' + eval('player' + secondFighterNumber + '.name') + ' Health = ' + eval('player' + secondFighterNumber + '.health') + '</p>';
        gamediv.innerHTML = '<p class="victory-text">' + eval('player' + firstFighterNumber + '.name') + ' won!</p>';
        alivePlayers[secondFighterNumber - 1] = 0;
        eval('player' + firstFighterNumber + '.health = player' + firstFighterNumber + '.health * 2');
        eval('player' + firstFighterNumber + '.passiveMessageDisplayed = false');
        if (eval('player' + firstFighterNumber + '.attack === player' + secondFighterNumber + '.attack')) {
            eval('player' + firstFighterNumber + '.specialAbilityCharges += 1');
            alert(eval('player' + firstFighterNumber + '.name') + ' just got a special ability charge!');
        }
        if (eval('player' + firstFighterNumber + '.health < 1')) eval('player' + firstFighterNumber + '.health = player' + firstFighterNumber + '.attack * 3');
    } else {
        topInfodiv.innerHTML =
            '<p style="margin: auto">' + eval('player' + firstFighterNumber + '.name') + ' Health = ' + eval('player' + firstFighterNumber + '.health') + '</p>' +
            '<button onclick="newRound(' + firstFighterNumber + ',' + secondFighterNumber + ')">Next round</button>' +
            '<p style="margin: auto">' + eval('player' + secondFighterNumber + '.name') + ' Health = ' + eval('player' + secondFighterNumber + '.health') + '</p>';
    }
    bottomInfodiv.innerHTML =
        '<p style="margin: auto">' + eval('player' + firstFighterNumber + '.name') + ' Attack = ' + eval('player' + firstFighterNumber + '.attack') + '</p>' +
        '<div><input id="fighterOneSpecialAbilityUse" type="checkbox"><p>Use ability!<br>Charges: ' + eval('player' + firstFighterNumber + '.specialAbilityCharges') + '</p></div>' +
        '<div><input id="fighterTwoSpecialAbilityUse" type="checkbox"><p>Use ability!<br>Charges: ' + eval('player' + secondFighterNumber + '.specialAbilityCharges') + '</p></div>' +
        '<p style="margin: auto">' + eval('player' + secondFighterNumber + '.name') + ' Attack = ' + eval('player' + secondFighterNumber + '.attack') + '</p>';
}

function rollTheDice() {
    let diceRoll = Math.ceil(Math.random() * 6);
    diceRolls[diceRoll - 1] += 1;
    return diceRoll;
}

function newRound(firstFighterNumber, secondFighterNumber) {
    function attack(playerToAttack, attacker) {
        eval('player' + playerToAttack + '.health = player' + playerToAttack + '.health - player' + attacker + '.attack');
    }
    function resetDiceRolls(firstFighterNumber, secondFighterNumber) {
        ++totalRoundCount;
        eval('player' + firstFighterNumber + '.diceRoll = -1');
        eval('player' + secondFighterNumber + '.diceRoll = -1');
        doIndividualGame(firstFighterNumber, secondFighterNumber);
    }
    if (eval('player' + firstFighterNumber + '.diceRoll === -1')) eval('player' + firstFighterNumber + '.diceRoll = rollTheDice()');
    if (eval('player' + secondFighterNumber + '.diceRoll === -1')) eval('player' + secondFighterNumber + '.diceRoll = rollTheDice()');
    if (document.getElementById('fighterOneSpecialAbilityUse').checked) eval('player' + firstFighterNumber + '.useSpecialAbility()');
    if (document.getElementById('fighterTwoSpecialAbilityUse').checked) eval('player' + secondFighterNumber + '.useSpecialAbility()');
    eval('player' + firstFighterNumber + '.usePassiveAbility(player' + secondFighterNumber + ')');
    eval('player' + secondFighterNumber + '.usePassiveAbility(player' + firstFighterNumber + ')');
    gamediv.innerHTML =
        '<img alt="" src="./media/jpg/cube' + eval('player' + firstFighterNumber + '.diceRoll') + '.png"' +
        ' class="dice">' +
        '<img alt="" src="./media/jpg/cube' + eval('player' + secondFighterNumber + '.diceRoll') + '.png" class="dice">';
    if (eval('player' + firstFighterNumber + '.diceRoll') >= eval('player' + secondFighterNumber + '.diceRoll')) attack(secondFighterNumber, firstFighterNumber);
    if (eval('player' + firstFighterNumber + '.diceRoll') <= eval('player' + secondFighterNumber + '.diceRoll')) attack(firstFighterNumber, secondFighterNumber);
    resetDiceRolls(firstFighterNumber, secondFighterNumber);
}

function addPlayer(player) {
    gamediv.innerHTML =
        '<div style="margin-left: auto; margin-right: auto; margin-top: 35vh">' +
        '<p style="font-size: 5vh">' + player + ', enter your name:</p>' +
        '<input placeholder="name" style="height: 5vh; width: 14vw" id="nameInput">' +
        '<button  style="height: 5vh; width: 14vw" id="inputConfirmation" onclick="setPlayerNameAndContinueSetup(\'' + player + '\')">Confirm name.</button>' +
        '</div>'
}

function setPlayerNameAndContinueSetup(player) {
    eval(player + '.name = \'' + document.getElementById('nameInput').value + '\'');
    showCharacterSelection();
    attachEventListeners(player);
}

function showCharacterSelection() {
    gamediv.innerHTML =
        '<div id="suicidal" class="character-selection" tabindex="1">' +
        '<br>' +
        '<br>' +
        '<h2>The suicidal one</h2>' +
        '<br>' +
        '<br>' +
        '<br>' +
        '<p>' +
        '2 health' +
        '<br>' +
        '<br>' +
        '15 damage' +
        '<br>' +
        '<br>' +
        'Passive ability: Equalize' +
        '<br>' +
        '<br>' +
        'Special ability: Heal' +
        '</p>' +
        '</div>';
    gamediv.innerHTML +=
        '<div id="crazy" class="character-selection" tabindex="2">' +
        '<br>' +
        '<br>' +
        '<h2>The crazy one</h2>' +
        '<br>' +
        '<br>' +
        '<br>' +
        '<p>' +
        '5 health' +
        '<br>' +
        '<br>' +
        '7 damage' +
        '<br>' +
        '<br>' +
        'Passive ability: Painful roll' +
        '<br>' +
        '<br>' +
        'Special Ability: Emotional damage' +
        '</p>' +
        '</div>';
    gamediv.innerHTML +=
        '<div id="reckless" class="character-selection" tabindex="3">' +
        '<br>' +
        '<br>' +
        '<h2>The reckless one</h2>' +
        '<br>' +
        '<br>' +
        '<br>' +
        '<p>' +
        '10 health' +
        '<br>' +
        '<br>' +
        '4 damage' +
        '<br>' +
        '<br>' +
        'Passive ability: Desperate gamble' +
        '<br>' +
        '<br>' +
        'Special ability: Critical hit' +
        '</p>' +
        '</div>';
    gamediv.innerHTML +=
        '<div id="balanced" class="character-selection" tabindex="4">' +
        '<br>' +
        '<br>' +
        '<h2>The balanced one</h2>' +
        '<br>' +
        '<br>' +
        '<br>' +
        '<p>' +
        '15 health' +
        '<br>' +
        '<br>' +
        '3 damage' +
        '<br>' +
        '<br>' +
        'Passive ability: Predition' +
        '<br>' +
        '<br>' +
        'Special ability: Sacrifice' +
        '</p>' +
        '</div>';
    gamediv.innerHTML +=
        '<div id="careful" class="character-selection" tabindex="5">' +
        '<br>' +
        '<br>' +
        '<h2>The careful one</h2>' +
        '<br>' +
        '<br>' +
        '<br>' +
        '<p>' +
        '30 health' +
        '<br>' +
        '<br>' +
        '1 damage' +
        '<br>' +
        '<br>' +
        'Passive ability: Differentiation' +
        '<br>' +
        '<br>' +
        'Special ability: Mass destruction' +
        '</p>' +
        '</div>';
}

function attachEventListeners(player) {
    document.getElementById('suicidal').addEventListener('click', () => {
        setPlayerStats(player, 2, 15)
    });
    document.getElementById('crazy').addEventListener('click', () => {
        setPlayerStats(player, 5, 7)
    });
    document.getElementById('reckless').addEventListener('click', () => {
        setPlayerStats(player, 10, 4)
    });
    document.getElementById('balanced').addEventListener('click', () => {
        setPlayerStats(player, 15, 3)
    });
    document.getElementById('careful').addEventListener('click', () => {
        setPlayerStats(player, 40, 1)
    });
    document.getElementById('suicidal').addEventListener('keypress', () => {
        setPlayerStats(player, 2, 15)
    });
    document.getElementById('crazy').addEventListener('keypress', () => {
        setPlayerStats(player, 5, 7)
    });
    document.getElementById('reckless').addEventListener('keypress', () => {
        setPlayerStats(player, 10, 4)
    });
    document.getElementById('balanced').addEventListener('keypress', () => {
        setPlayerStats(player, 15, 3)
    });
    document.getElementById('careful').addEventListener('keypress', () => {
        setPlayerStats(player, 40, 1)
    });
}

function setPlayerStats(player, health, attack) {
    gamediv.innerHTML = '';
    eval(player + '.health = ' + health);
    eval(player + '.attack = ' + attack);
    if (player === 'player' + playerCount) startGame();
    else addPlayer('player' + ++currentPlayer);
}

function fillOutTournamentRoundRow() {
    if (tournamentRoundNumber - 1 === 0) {
        for (let i = 0; i < playerCount; ++i) tournamentMatches[i][tournamentRoundNumber - 1] = i + 1;
        let tempCounter = 0;
        for (let i = 0; i < alivePlayers.length; ++i) {
            if (alivePlayers[i] !== 0) {
                ++tempCounter;
            }
        }
        totalRoundGames = tempCounter;
    }
    else {
        let tempCounter = 0;
        for (let i = 0; i < alivePlayers.length; ++i) {
            if (alivePlayers[i] !== 0) {
                tournamentMatches[tempCounter][tournamentRoundNumber] = alivePlayers[i];
                ++tempCounter;
            }
        }
        totalRoundGames = tempCounter;
    }
}

// code of the below function copied from https://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript/966938#966938
function createArray(length) {
    let arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        let args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}