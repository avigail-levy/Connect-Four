
if(localStorage.name==undefined){
  window.location.href = "../entrancePage/login.html";

}
       function logOut(){
            localStorage.removeItem('name');
       }
     