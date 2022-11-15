// https://developers.google.com/chart/interactive/docs/basic_load_libs

let statsArray = location.search.substring(1).split(',');
let totalAmountOfRounds = statsArray[0];
let diceRolls = [statsArray[1], statsArray[2], statsArray[3], statsArray[4], statsArray[5], statsArray[6]];

google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    // Define the chart to be drawn.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Element');
    data.addColumn('number', 'Percentage');
    data.addRows([
        ['1', parseInt(diceRolls[0])],
        ['2', parseInt(diceRolls[1])],
        ['3', parseInt(diceRolls[2])],
        ['4', parseInt(diceRolls[3])],
        ['5', parseInt(diceRolls[4])],
        ['6', parseInt(diceRolls[5])]
    ]);

    // Instantiate and draw the chart.
    var chart = new google.visualization.PieChart(document.getElementById('diceRollChart'));
    chart.draw(data, null);
}

document.getElementById('amountOfRounds').innerHTML = 'Total round amount: ' + totalAmountOfRounds;