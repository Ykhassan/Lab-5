// note using import to read from an external file requires the JS file to be treated as a module because because JS defines modules have special method that allows them to call each other
//  assert make sure the read are json data if not an error will be thrown

// fetch NBA players stat from externl file
// import data from './data.json' assert {type: 'json'}; broswer does not support it as it seems or iam using advanced EC6 feature that requires to set up node js 

// const data = require("./data.json"); only works locally in node.js on browseer wont work thats why fetch and import used

// this will work in the browser each then triggers another then method
// note: promise is an ovject that encapsulate the future value of an async opreation, used when working with a sync opreations as a bettter alternitave to callbacks() as it checks the status of the result then exeucte it if succifull a method then() is used when wrong catch() is used
const searchBox = document.getElementById("searchBox");
const filterTeam = document.getElementById("team-filter");

fetch('data.json') 
  .then(response => {
    return response.json(); 
  })
  .then(player => {
     // Access the players array
    const tableBody = document.getElementById("player-rows");
    populateTable(player, tableBody,searchBox.value.trim());

    // search for player
    searchBox.addEventListener("keypress", (key)=>{
      if (key.key === "Enter"){
        populateTable(player, tableBody, searchBox.value.trim());
      }
    })

  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });

  function populateTable(player, tableBody, searchValue){
    tableBody.innerHTML = "";
    player.forEach(player => {
      if(player.player.includes(searchValue)){
      const row = document.createElement("tr");
      row.innerHTML = `
      <td>${player.player}</td>
      <td>${player.team}</td>
      <td>${player.points}</td>
      <td>${player.rebounds}</td>
      `;
      tableBody.appendChild(row);
    }});
  }

    function filterByTeam(){
    let input = document.getElementById("team-filter")[1];
    let word = input.value.toLowerCase();
    let rows = document.querySelectorAll("tbody tr");
    doFilter(rows, 1, word);
  }

  function doFilter(rows, column, word){
    for (let i = 0; i < rows.length; i++) {
      let td = rows[i].getElementsByTagName("td")[column]
      let txtValue = td.innerText
      if (txtValue.toLowerCase().indexOf(word) > -1) {
        rows[i].style.display = ""
      } else {
        rows[i].style.display = "none"
      }
    }
  }
  
   // filter by team name
   filterTeam.addEventListener("change", filterByTeam);

  let darkMood = document.getElementById("dark-mode-toggle");
  darkMood.addEventListener("click",()=>{
    //change the style of the body
    let container = document.body;
    container.classList.add('dark-mode');
    // intresting the style changed also for the remaining tags only bt appending the style rule on the body

  });


// unsent 
// var xhr = new XMLHttpRequest();

// // this methods tells the XML object what action should be taken when object status changes  
// xhr.onreadystatechange = function() {
//   // if (xhr.readyState != 4) return;
//   if (xhr.status === 200) {
//     console.log(xhr.responseText);
//   }
// };

// // open here creates the request details consisting of the following method type, URL (the destination), Async flag
// xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/', true);
// // sends the created request 
// xhr.send();

// Promsies in JS 
// a mechansims that tells us when a certain a sync function finshes execution.
// When sending a request in an Async manner we must know when this request finshes to get the response or handle any error encountred. The Async request must promise us to tell us when the request if fullfiled and when errors are enountred 
// then(captures the response)
// error(shows the error occured)

// there are three methods to send request 
// XHR objects, Async fetch, Sync fetch