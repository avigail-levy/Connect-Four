var table=document.createElement('table');
var winnertimes = JSON.parse(localStorage.getItem('Times')) || [];
table.id="table";
let count=0;
let topTime=winnertimes[0].playerTime;
let th=document.createElement('tr');

    let cell=document.createElement('th');
    cell.textContent='מספר משחק';
    th.appendChild(cell);

    cell=document.createElement('th');
    cell.textContent='שחקן מנצח';
    th.appendChild(cell);

    cell=document.createElement('th');
    cell.textContent='זמן משחק';
    th.appendChild(cell);

    table.appendChild(th);
    
for(let i=0; i<winnertimes.length; i++)
{
   //מעדכן את הזמן הקצר ביותר מכל המשתמשים 
        if(winnertimes[i].playerTime<topTime)
       {
        topTime=winnertimes[i].playerTime;
       }
       //מציג את המשחקים של המשתמש הנוכחי בלבד
    if(localStorage.name==winnertimes[i].user)
    {
        count++;
        let row=document.createElement('tr');
    for(let j=0;j<3;j++)
   {
    
    let cell=document.createElement('td');
    if(j==0)
    {
        cell.textContent=count;
        row.appendChild(cell);
    }
    if(j==1)
    {
        cell.textContent=winnertimes[i].playerWin;
        row.appendChild(cell);
    }
    if (j == 2) {
       
        cell.textContent = convertToMinutes(winnertimes[i].playerTime);
        row.appendChild(cell);
    }
    }
      table.appendChild(row);
    }
    
    document.getElementById('topTime').innerText = 'הזמן הטוב ביותר: ' + convertToMinutes(topTime);
}
      document.body.appendChild(table);
      //פונקציה שממירה לדקות ושניות
      function convertToMinutes(timeInSeconds) {
        let minutes = Math.floor(timeInSeconds / 60);
        let seconds = (timeInSeconds % 60);
        return minutes + " דקות ו " + seconds + " שניות";
    }
      function logOut(){
        localStorage.removeItem('name');
          }
          if(localStorage.name==undefined){
            window.location.href = "../entrancePage/login.html";
        
        }



          
      