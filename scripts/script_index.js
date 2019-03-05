window.onload = function()
{
    const table = document.querySelector('table');
    const rows = document.querySelectorAll('tr');
    const rowsArray = Array.from(rows);

    table.addEventListener('click', (event) =>
    {
        const rowIndex = rowsArray.findIndex(row => row.contains(event.target));
        const columns = Array.from(rowsArray[rowIndex].querySelectorAll('td'));
        const columnIndex = columns.findIndex(column => column == event.target);
        console.log(rowIndex, columnIndex);
        switch_elems(rowIndex, columnIndex);
    })
}

/*
 * https://stackoverflow.com/questions/4998953/get-cell-location
 * Show how to find the location of the cells
 */
function myFunction(x)
{
    let table_tr = x.parentNode.rowIndex;
    let table_td = x.cellIndex;

    console.log("Row index: " + table_tr);
    console.log("Column index: " + table_td);
}

//The location of the blank square
let x1 = document.getElementById('0c').parentNode.rowIndex;
let x2 = document.getElementById('0c').cellIndex;

/*
 * The x1 and x2 is the location of the blank space.
 * x1+1 is the square on the right side of the blank square and x1-1 is the square on the left side of the blank space
 * x2+1 is the square on the top side of the blank square and x2-1 is the square on the bottom of the blank space
 *
 * The switch_elems function check if there is an empty addjacent square next to a tile, if it is true then a tile may
 * be slid into the empty location. When the statement is not true, then show an alert message.
 *
 */
function switch_elems(i, j)
{
    const table = document.querySelector('table');
    let right = x1+1, left = x1-1, up = x2+1, down = x2-1;

    if(left == i && x2 == j)
    {
        const val1 = table.rows[i].cells[j].innerHTML;
        const val2 = table.rows[x1].cells[x2].innerHTML;
        table.rows[i].cells[j].innerHTML = val2.toString();
        table.rows[x1].cells[x2].innerHTML = val1.toString();
        x1 = left;
        goal_reached(tableID);
    }
    else if(right == i && x2 == j)
    {
        const val1 = table.rows[i].cells[j].innerHTML;
        const val2 = table.rows[x1].cells[x2].innerHTML;
        table.rows[i].cells[j].innerHTML = val2.toString();
        table.rows[x1].cells[x2].innerHTML = val1.toString();
        x1 = right;
        goal_reached(tableID);
    }
    else if(x1 == i && up == j)
    {
        const val1 = table.rows[i].cells[j].innerHTML;
        const val2 = table.rows[x1].cells[x2].innerHTML;
        table.rows[i].cells[j].innerHTML = val2.toString();
        table.rows[x1].cells[x2].innerHTML = val1.toString();
        x2 = up;
        goal_reached(tableID);
    }
    else if(x1 == i && down == j)
    {
        const val1 = table.rows[i].cells[j].innerHTML;
        const val2 = table.rows[x1].cells[x2].innerHTML;
        table.rows[i].cells[j].innerHTML = val2.toString();
        table.rows[x1].cells[x2].innerHTML = val1.toString();
        x2 = down;
        goal_reached(tableID);
    }
    else
    {
        window.alert('You cannot move that square, it needs to be an empty adjacent square next to a tile');
    }
}

/*
 * Function which check if you reached the goal state or not.
 * Use for loop to get the values of the table from the index.html and convert it to an array call tableArray.
 * After we get the values, we check if tableArray is equal to the puzzleArray. If it is equal show an image
 * indicating you reached the goal state, if it is not equal then show an image indicating how the puzzle should be
 * solve.
 */
function goal_reached(tableID)
{
    let tableInfo = "";
    let tableArray = new Array();
    let puzzleArray = new Array(1,2,3,8,' ',4,7,6,5);
    let table1Length = document.getElementById('tableID').rows.length;
    for(let i = 0; i < table1Length; i++)
    {
        tableInfo ="";
        for(let j = 0; j < document.getElementById('tableID').rows[i].cells.length; j++)
        {
            tableInfo += document.getElementById('tableID').rows[i].cells[j].innerHTML+",";
        }
        tableInfo = tableInfo.substring(0,tableInfo.length-1);
        tableArray[i] =  tableInfo.split(",");
    }

    if(tableArray.join(',')== puzzleArray.join(','))
    {
        let gif = new Image();
        document.getElementById('gif').src = "images/you_did_it.gif?random="+new Date().getTime();
        document.body.appendChild(gif);
        let source = document.getElementById("gif");
    }
    else
    {
        document.getElementById('gif').src = "images/8-Puzzle.jpg?random="+new Date().getTime();
    }
}

/*
 * Function in which scramble the puzzle randomly when you push the button "randomize".
 * It has an easy, medium, and hard difficulty
 */
function randomize()
{
    let numbers = new Array();
    numbers[0] = "easy";
    numbers[1] = "medium";
    numbers[2] = "easy2";
    numbers[3] = "hard";
    numbers[4] = "hard2";

    let switchNumbers = numbers[Math.floor(Math.random()*5)];
    let table = document.getElementById("tableID");
    let row, td;

    switch (switchNumbers)
    {
        case "easy":
            row = table.getElementsByTagName("tr")[1];
            td = row.getElementsByTagName("td")[1];
            td.innerHTML = " ";
            row = table.getElementsByTagName("tr")[0];
            td = row.getElementsByTagName("td")[1];
            td.innerHTML = "1";
            row = table.getElementsByTagName("tr")[0];
            td = row.getElementsByTagName("td")[2];
            td.innerHTML = "2";
            row = table.getElementsByTagName("tr")[1];
            td = row.getElementsByTagName("td")[2];
            td.innerHTML = "3";
            row = table.getElementsByTagName("tr")[1];
            td = row.getElementsByTagName("td")[0];
            td.innerHTML = "4";
            row = table.getElementsByTagName("tr")[2];
            td = row.getElementsByTagName("td")[2];
            td.innerHTML = "5";
            row = table.getElementsByTagName("tr")[2];
            td = row.getElementsByTagName("td")[1];
            td.innerHTML = "6";
            row = table.getElementsByTagName("tr")[2];
            td = row.getElementsByTagName("td")[0];
            td.innerHTML = "7";
            row = table.getElementsByTagName("tr")[0];
            td = row.getElementsByTagName("td")[0];
            td.innerHTML = "8";
            break;

        case "medium":
            row = table.getElementsByTagName("tr")[1];
            td = row.getElementsByTagName("td")[1];
            td.innerHTML = " ";
            row = table.getElementsByTagName("tr")[0];
            td = row.getElementsByTagName("td")[0];
            td.innerHTML = "1";
            row = table.getElementsByTagName("tr")[0];
            td = row.getElementsByTagName("td")[2];
            td.innerHTML = "2";
            row = table.getElementsByTagName("tr")[1];
            td = row.getElementsByTagName("td")[2];
            td.innerHTML = "3";
            row = table.getElementsByTagName("tr")[2];
            td = row.getElementsByTagName("td")[2];
            td.innerHTML = "4";
            row = table.getElementsByTagName("tr")[1];
            td = row.getElementsByTagName("td")[0];
            td.innerHTML = "5";
            row = table.getElementsByTagName("tr")[0];
            td = row.getElementsByTagName("td")[1];
            td.innerHTML = "6";
            row = table.getElementsByTagName("tr")[2];
            td = row.getElementsByTagName("td")[1];
            td.innerHTML = "7";
            row = table.getElementsByTagName("tr")[2];
            td = row.getElementsByTagName("td")[0];
            td.innerHTML = "8";
            break;

        case "easy2":
            row = table.getElementsByTagName("tr")[1];
            td = row.getElementsByTagName("td")[1];
            td.innerHTML = " ";
            row = table.getElementsByTagName("tr")[2];
            td = row.getElementsByTagName("td")[0];
            td.innerHTML = "1";
            row = table.getElementsByTagName("tr")[0];
            td = row.getElementsByTagName("td")[0];
            td.innerHTML = "2";
            row = table.getElementsByTagName("tr")[0];
            td = row.getElementsByTagName("td")[2];
            td.innerHTML = "3";
            row = table.getElementsByTagName("tr")[1];
            td = row.getElementsByTagName("td")[0];
            td.innerHTML = "4";
            row = table.getElementsByTagName("tr")[1];
            td = row.getElementsByTagName("td")[2];
            td.innerHTML = "5";
            row = table.getElementsByTagName("tr")[2];
            td = row.getElementsByTagName("td")[2];
            td.innerHTML = "6";
            row = table.getElementsByTagName("tr")[2];
            td = row.getElementsByTagName("td")[1];
            td.innerHTML = "7";
            row = table.getElementsByTagName("tr")[0];
            td = row.getElementsByTagName("td")[1];
            td.innerHTML = "8";
            break;

        case "hard":
            row = table.getElementsByTagName("tr")[1];
            td = row.getElementsByTagName("td")[1];
            td.innerHTML = " ";
            row = table.getElementsByTagName("tr")[0];
            td = row.getElementsByTagName("td")[2];
            td.innerHTML = "1";
            row = table.getElementsByTagName("tr")[1];
            td = row.getElementsByTagName("td")[0];
            td.innerHTML = "2";
            row = table.getElementsByTagName("tr")[1];
            td = row.getElementsByTagName("td")[2];
            td.innerHTML = "3";
            row = table.getElementsByTagName("tr")[0];
            td = row.getElementsByTagName("td")[1];
            td.innerHTML = "4";
            row = table.getElementsByTagName("tr")[2];
            td = row.getElementsByTagName("td")[2];
            td.innerHTML = "5";
            row = table.getElementsByTagName("tr")[0];
            td = row.getElementsByTagName("td")[0];
            td.innerHTML = "6";
            row = table.getElementsByTagName("tr")[2];
            td = row.getElementsByTagName("td")[1];
            td.innerHTML = "7";
            row = table.getElementsByTagName("tr")[2];
            td = row.getElementsByTagName("td")[0];
            td.innerHTML = "8";
            break;

        default:
            row = table.getElementsByTagName("tr")[1];
            td = row.getElementsByTagName("td")[1];
            td.innerHTML = " ";
            row = table.getElementsByTagName("tr")[2];
            td = row.getElementsByTagName("td")[0];
            td.innerHTML = "1";
            row = table.getElementsByTagName("tr")[2];
            td = row.getElementsByTagName("td")[2];
            td.innerHTML = "2";
            row = table.getElementsByTagName("tr")[0];
            td = row.getElementsByTagName("td")[0];
            td.innerHTML = "3";
            row = table.getElementsByTagName("tr")[0];
            td = row.getElementsByTagName("td")[2];
            td.innerHTML = "4";
            row = table.getElementsByTagName("tr")[2];
            td = row.getElementsByTagName("td")[1];
            td.innerHTML = "5";
            row = table.getElementsByTagName("tr")[1];
            td = row.getElementsByTagName("td")[0];
            td.innerHTML = "6";
            row = table.getElementsByTagName("tr")[1];
            td = row.getElementsByTagName("td")[2];
            td.innerHTML = "7";
            row = table.getElementsByTagName("tr")[0];
            td = row.getElementsByTagName("td")[1];
            td.innerHTML = "8";
    }
}