  //משתמש חדש
  function register() {
    var firstName = document.getElementById('firstName');
    var lastName = document.getElementById('lastName');
    var email = document.getElementById('email');
    var pw = document.getElementById('pw');
    var number = document.getElementById('tel');
    var flag = true, emailFlag = false;
    var i;
    //בדיקות תקינות
     if (pw.value.length!= 8) {
        alert('חובה סיסמה באורך שמונה תווים');
        flag = false;
        event.preventDefault();
    }
     if (!validateEmail(email.value)) {
        alert("המייל אינו תקין");
        flag=false;
        event.preventDefault();
    }
    //אם הנתונים תקינים - מכניס את המידע למערך
    if (flag) {
        var users = JSON.parse(localStorage.getItem('Users')) || [ ];
        //בדיקת האם כבר קיימת כתובת מייל כזאת
        for (i = 0; i < users.length; i++) {
            if (users[i].email == email.value) {
                flag = false;
                alert('כתובת מייל בשימוש');
                event.preventDefault();
                break;
            }
        if (users[i].pw == pw.value) {
                    flag = false;
                    alert('הסיסמא כבר שמורה במערכת');
                    event.preventDefault();
                    break;
                }
        }
        var userData = {
            firstName:firstName.value,
            lastName:lastName.value,
            email: email.value,
            pw: pw.value,
        };
        users.push(userData);
        localStorage.name = email.value;// שמור את שם המשתמש בדף המשחק
        if (flag) {
            localStorage.setItem('Users', JSON.stringify(users));
            alert("Welcome, " +users[i].firstName +" "+ users[i].lastName+"!");
            window.location.href ="../choosing/chooseGame.html";
        }
    }
}
function validateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

