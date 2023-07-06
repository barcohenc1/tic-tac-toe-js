const gameBoard = document.getElementById('gameboard');
const infoDisplay = document.getElementById('info');
const startCells = ["", "", "", "", "", "", "", "", ""];
const playAgain = document.getElementById('rest');

playAgain.addEventListener('click', resetGame)

function resetGame() {
    gameBoard.innerHTML = ''; // מאפס את תוכן לוח המשחק
    infoDisplay.textContent = "Circle goes first";
    go = "circle"; // מגדיר את הסמל של השחקן הנוכחי כעיגול
    document.body.style.background = ""; // מנקה את צבע הרקע של הדף
    infoDisplay.style.color = "";
    createBoard(); // יוצר את לוח המשחק מחדש
}

let go = "circle"; // משתנה המציין את הסמל של השחקן הנוכחי, בהתחלה נקבע לעיגול
infoDisplay.textContent = "Circle goes first"; 

function createBoard() {
    startCells.forEach((_cell, index) => {
        const cellElement = document.createElement('div'); // יצירת אלמנט div חדש
        cellElement.classList.add('square'); // הוספת המחלקה square לאלמנט
        cellElement.id = index; // הגדרת ID של האלמנט למספר המחיקה במערך startCells
        cellElement.addEventListener('click', addGo); // הוספת מאזין לחיצה על התא שיקרא לפונקציה addGo
        gameBoard.append(cellElement); // הוספת התא ללוח המשחק
    });
}

createBoard(); // יצירת לוח המשחק בפעם הראשונה

function addGo(e) {
    const goDisplay = document.createElement('div'); // יצירת אלמנט div חדש
    goDisplay.classList.add(go); // הוספת הקלאס המתאים לאלמנט
    go = go === "circle" ? "cross" : "circle"; // החלפת הסמל לשחקן הבא בתור
    e.target.append(goDisplay); // הוספת הסמל לתא הנלחץ
    infoDisplay.textContent = `It is now ${go}'s turn.`; // עדכון ההודעה המציגה את התור הנוכחי
    e.target.removeEventListener('click', addGo); // הסרת האירוע של התא
    checkScore(); // בדיקת התוצאה לאחר התור
}


function checkScore() {
    let allSquares = document.querySelectorAll('.square');
    console.log()
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    winningCombos.forEach(array => {
        const crossWins = array.every(cell => 
            allSquares[cell].firstChild?.classList.contains('cross')); // בדיקה האם כל התאים בשלשה שייכים לסמל הצלב

        if (crossWins) {
            infoDisplay.textContent = "Cross Wins! :)"; // הצגת הודעת ניצחון לאיקס
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true))); // שיטה להסרת אירועים מכל הלחצנים שנותרו
            document.body.style.background = "linear-gradient(to top, #09203f 0%, #537895 100%)"; // שינוי צבע רקע הדף
            infoDisplay.style.color = "White"; // שינוי צבע הטקסט של ההודעות
            return; // סיום בדיקת התוצאה
        }
    });

    winningCombos.forEach(array => { //אותו דבר רק לעיגול
        const crossWins = array.every(cell => 
            allSquares[cell].firstChild?.classList.contains('cross'))

        if(crossWins){
            infoDisplay.textContent = "Cross Wins! :)"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))
            document.body.style.background = "linear-gradient(to top, #09203f 0%, #537895 100%)"
            infoDisplay.style.color = "White"
            crossWins = false;
            return;
        }
    })
}