const ctx = document.getElementById('myChart');
const data = {
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };
  new Chart(ctx, {
    type: 'pie',
    data: data});
const ctx2 = document.getElementById('myChart2');
const data1 = {
  labels: [
    'Eating',
    'Drinking',
    'Sleeping',
    'Designing',
    'Coding',
    'Cycling',
    'Running'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 90, 81, 56, 55, 40],
    fill: true,
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderColor: 'rgb(255, 99, 132)',
    pointBackgroundColor: 'rgb(255, 99, 132)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(255, 99, 132)'
  }, {
    label: 'My Second Dataset',
    data: [28, 48, 40, 19, 96, 27, 100],
    fill: true,
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
    borderColor: 'rgb(54, 162, 235)',
    pointBackgroundColor: 'rgb(54, 162, 235)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(54, 162, 235)'
  }]
};
new Chart(ctx2,{
    type: 'radar',
    data: data1 
});
function show(){
  var drop = document.getElementById("drp");
 
  if (drop.style.display == "block") {
      drop.style.display = "none";
  } else {
      drop.style.display = "block";
  }
}
// function searchTable(){
// var input, filter, found, table, tr, td, i, j;
// input = document.getElementById("fld");
// filter = input.value.toUpperCase();
// table = document.getElementById("mytable");
// tr = table.getElementsByTagName("tr");
// for (i = 0; i < tr.length; i++) {
//     td = tr[i].getElementsByTagName("td");
//     for (j = 0; j < td.length; j++) {
//         if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
//             found = true;
//         }
//     }
//     if (found) {
//         tr[i].style.display = "";
//         found = false;
//     } else {
//         tr[i].style.display = "none";
//     }
// }
// }
// $(document).ready(function() {
//   $("#fld").on("keyup", function() {
//       var value = $(this).val().toLowerCase();
//       $("#tb tr").filter(function() {
//           $(this).toggle($(this).text()
//           .toLowerCase().indexOf(value) > -1)
//       });
//   });
// });
const pageSize = 2;
let curPage = 1;
document.querySelector('#nextButton').addEventListener('click', nextPage, false);
document.querySelector('#prevButton').addEventListener('click', previousPage, false);
function renderTable() {
  // create html
  let result = '';
  data.filter((row, index) => {
        let start = (curPage-1)*pageSize;
        let end =curPage*pageSize;
        if(index >= start && index < end) return true;
  }).forEach(c => {
     result += `<tr>
     <td>${c.name}</td>
     <td>${c.age}</td>
     <td>${c.breed}</td>
     <td>${c.gender}</td>
     </tr>`;
  });
  table.innerHTML = result;
}
function previousPage() {
  if(curPage > 1) curPage--;
  renderTable();
}

function nextPage() {
  if((curPage * pageSize) < data.length) curPage++;
  renderTable();
}
async function init() {
  
  // Select the table (well, tbody)
  table = document.querySelector('#mytable tbody');
  // get the cats
  let resp = await fetch('https://www.raymondcamden.com/.netlify/functions/get-cats');
  data = await resp.json();
  renderTable();
}
