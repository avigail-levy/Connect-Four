 //משתמש קייים
function check() {
    var exist = false;
    var userName = document.getElementById('userName');
    var userPw = document.getElementById('userPw');
    var users = JSON.parse(localStorage.getItem('Users')) || [];
    for (var i = 0; i < users.length; i++) {
        if (users[i].email == userName.value && users[i].pw == userPw.value) {
            localStorage.name = userName.value;
            exist = true;
            break;
        }
    }

    if (exist == false) {//
        alert("פרטים לא מזוהים");
        event.preventDefault();
    }
    else {
        alert("Welcome, " +users[i].firstName +" "+ users[i].lastName+"!");
        window.location.href = "../choosing/chooseGame.html";
    }
}
//פונקציה לתאריך

function getCurrentDate() {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear();
    return `${day}/${month}/${year}`;
  }
  const date = getCurrentDate();
 
document.getElementById("date").innerHTML = date;

function redirectToPage(event) {
    event.preventDefault();
  window.location.href = "../entrancePage/sign.html";
}