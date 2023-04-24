// const ctx = document.getElementById('myChart');
// const data = {
//     labels: [
//       'Red',
//       'Blue',
//       'Yellow'
//     ],
//     datasets: [{
//       label: 'My First Dataset',
//       data: [300, 50, 100],
//       backgroundColor: [
//         'rgb(255, 99, 132)',
//         'rgb(54, 162, 235)',
//         'rgb(255, 205, 86)'
//       ],
//       hoverOffset: 4
//     }]
//   };
//   new Chart(ctx, {
//     type: 'pie',
//     data: data});
const min = 1;
const max = 100;
yValues=[]
// yValues.push(document.getElementById('need1').value)
// yValues.push(document.getElementById('need2').value)
// yValues.push(document.getElementById('need3').value)
// yValues.push(document.getElementById('need4').value)
// yValues.push(document.getElementById('need5').value)
// yValues.push(document.getElementById('need6').value)
// yValues.push(document.getElementById('need7').value)
// yValues.push(document.getElementById('need8').value)
// yValues.push(document.getElementById('need9').value)
// yValues.push(document.getElementById('need10').value)
// yValues.push(document.getElementById('need11').value)
for(i=0;i<11;i++){
const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
yValues.push(randomNumber)
}

const xValues = [1,2,3,4,5,6,7,8,9,10,11];

new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(0,0,255,1.0)",
      borderColor: "rgba(0,0,255,0.1)",
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    scales: {
      yAxes: [{ticks: {min: 6, max:16}}],
    }
  }
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

