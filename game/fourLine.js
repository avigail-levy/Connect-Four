
var users = JSON.parse(localStorage.getItem('Users')) || [];
var players = JSON.parse(localStorage.getItem('Players')) || [];
var winnertimes = JSON.parse(localStorage.getItem('Times')) || [];

var currPlayer = players[players.length - 1].player1.player1Color;
var currPlayerName = players[players.length - 1].player1.player1;

var board;
var currColumns;

var rows = 6;
var columns = 7;
if (localStorage.name == undefined) {
    window.location.href = "../entrancePage/login.html";
}

window.onload = function () {
    creatingNewGame();

}
//הפונקציה setGame מכינה מצב משחק חדש
function creatingNewGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];//מקומות פנויים
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            row.push(' ');
            //כתובת מתאימה לכל תא במטריצה
            tile.id = `${r.toString()}-${c.toString()}`;
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
    document.getElementById('currentPlayer').innerText = "השחקן הנוכחי-" + currPlayerName;
    timeFunction();
}

let countclicks = 0;
let gameEnded = false;//משתנה לבדיקה אם ניגמר המשחק או לא
function setPiece() {//בכל לחיצה בלוח נצבע התא בהתאם לשחקן הנוכחי ומעדכן מקום פנוי בשורות
    //האם המשחק כבר ניגמר
    if (gameEnded) {
        return;
    }
   
    let coords = this.id.split("-");
    //המרת כל ערך במערך ממחרוזת למספר שלם
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    var audioClick = new Audio('../music/blup.mp3');
    audioClick.play();
    //שווה לגובה שנשאר לעמודה
    r = currColumns[c];
    //אם נגמר השורות העמודה הגיע לסןף
    if (r < 0) {
        return;
    }
    //השחקן הראשון מתחיל
    board[r][c] = currPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());
    countclicks++;
    if (currPlayer == 'Red') {
        if (currPlayerName == players[players.length - 1].player1.player1) {
            currPlayerName = players[players.length - 1].player2.player2;
        }
        else
            currPlayerName = players[players.length - 1].player1.player1;
        tile.classList.add("red-piece");
        currPlayer = 'Yellow';
        document.getElementById('currentPlayer').innerText = "השחקן הנוכחי-" + currPlayerName;
    }
    else {
        if (currPlayerName == players[players.length - 1].player1.player1) {
            currPlayerName = players[players.length - 1].player2.player2;
        }
        else
        currPlayerName = players[players.length - 1].player1.player1;
        tile.classList.add("yellow-piece");
        currPlayer = 'Red';

        document.getElementById('currentPlayer').innerText = "השחקן הנוכחי-" + currPlayerName;
    }
    //מוריד גובה אחד לשורה
    r -= 1;
    currColumns[c] = r;
    //בדיקה בעבור כל שלב האם יש מנצחים
    if (!checkWinner()) {
        // הודעה אם המשחק נגמר ואין ניצחון
        if (countclicks == 42) {
            document.getElementById('gameOver').style.visibility = "visible";
            gameEnded = true;
        }
    }
}
//הפוקציה בודקת האם יש 4 ברצף  
function checkWinner() {
    for (let r = 0; r < rows; r++) {//שורות
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c + 1] && board[r][c + 1] == board[r][c + 2] && board[r][c + 2] == board[r][c + 3]) {
                    //אם יש מנצח 
                    clearInterval(countTimer);
                    localStorage.setItem("time", time - 1);
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
    for (let c = 0; c < columns; c++) {//עמודות
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r + 1][c] && board[r + 1][c] == board[r + 2][c] && board[r + 2][c] == board[r + 3][c]) {
                    //אם יש מנצח 
                    clearInterval(countTimmer);
                    localStorage.setItem("time", time - 1);
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
    //   אלכסונים שמאליים    בדיקה בעבור האלכסונים הראשים בדיקה מלמעלה ללמטה המקום הראשון 0,0
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r + 1][c + 1] && board[r + 1][c + 1] == board[r + 2][c + 2] && board[r + 2][c + 2] == board[r + 3][c + 3]) {
                    //אם יש מנצח 
                    clearInterval(countTimmer);
                    localStorage.setItem("time", time - 1);
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
    // אלכסונים ימניים  בדיקה בעבור האלכסון המשני בודק מלמטה ללמעלה מתחיל מ3,0
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r - 1][c + 1] && board[r - 1][c + 1] == board[r - 2][c + 2] && board[r - 2][c + 2] == board[r - 3][c + 3]) {
                    //אם יש מנצח 
                    clearInterval(countTimmer);
                    localStorage.setItem("time", time - 1);
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
}
var audioWinner = new Audio('../music/winner.mp3');
function setWinner(r, c) {//פונקציה שבודקת מי המנצח מבין שני השחקנים
    audioWinner.play();
    document.getElementById('currentPlayer').innerText = "";
    let winnerTextColor, nameOfplayerWinner, playerTimeData;
//מעדכן את הצבע המנצח מכניס מערך האובייקטים את הזמן ושם  מנצח ומשתמש
    if (board[r][c] == players[players.length-1].player1.player1Color) {
        playerTimeData = {
            playerTime: localStorage.time,
            playerWin: players[players.length - 1].player1.player1,
            user: localStorage.name
        };
        winnertimes.push(playerTimeData);
        winnerTextColor = players[players.length-1].player1.player1Color+" Wins";
        nameOfplayerWinner = players[players.length - 1].player1.player1;
    }
     else {
        playerTimeData = {
            playerTime: localStorage.time,
            playerWin: players[players.length - 1].player2.player2,
            user: localStorage.name
        };
        winnertimes.push(playerTimeData);
        winnerTextColor = players[players.length-1].player2.player2Color+" Wins";
        nameOfplayerWinner = players[players.length - 1].player2.player2;
    }

    localStorage.setItem('Times', JSON.stringify(winnertimes));
    setTimeout(() => {//בשעוצר הטיימר-
        localStorage.setItem("winnerColor", winnerTextColor);
        localStorage.setItem("nameWinner", nameOfplayerWinner);
        window.location.href = "../win/winner.html";
    }, 2000);
    gameEnded = true;
}
//פונקציה לספירת הזמן
let time = 0, countTimmer;
function timeFunction() {
    let timmer = document.getElementById("timer");
    countTimmer = setInterval(() => {
        let second = time % 60;
        let minutes = Math.floor(time / 60);

        let zero = "", zero2 = "";
        if (second < 10)
            zero = "0";
        if (minutes < 10)
            zero2 = "0";

        timmer.innerHTML = zero2 + minutes + ":" + zero + second;
        time++;
    }, 1000)
}
function logOut() {
    localStorage.removeItem('name');
}

