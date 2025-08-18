if(localStorage.name==undefined){
  window.location.href = "../entrancePage/login.html";
}
var h1=document.getElementById("winnerColorText");
var winnerColor = localStorage.getItem("winnerColor");

if (winnerColor == "Red Wins") 
  h1.style.color = "red";
else 
  h1.style.color = "yellow";


h1.innerHTML = winnerColor;
var divname=document.getElementById('playerWinner');
divname.innerHTML="השחקן המנצח: "+localStorage.getItem("nameWinner");
var divtime=document.getElementById('playertime');
let second=Math.floor(parseInt(localStorage.time)%60);
let minute=Math.floor(parseInt(localStorage.time)/60);
divtime.innerHTML="הזמן שלך: "+minute+" דקות ו "+second+" שניות";
window.onload=function sound(){
var music=document.getElementById('audio');
music.play();
}
function logOut(){
  localStorage.removeItem('name');
    }