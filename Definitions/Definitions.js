
if(localStorage.name==undefined){
    window.location.href = "../entrancePage/login.html";

}
function check(){
    var player1 = document.getElementById('player-1');
    var player2 = document.getElementById('player-2');
    var player1Color = document.getElementById('player1Color');
    var player2Color = document.getElementById('player2Color');
    if(player1Color.value==player2Color.value){
         alert('נא בחרו צבעים שונים!');
         event.preventDefault();
    }
    var players = JSON.parse(localStorage.getItem('Players')) || [];
    var playerData = {
        player1:{
           player1: player1.value,
           player1Color:player1Color.value
        },
        player2:
        {
           player2: player2.value,
           player2Color:player2Color.value
        }
    };
    players.push(playerData);
    console.log(players);
    localStorage.setItem('Players', JSON.stringify(players));
}
    function logOut(){
    localStorage.removeItem('name');
      }
     