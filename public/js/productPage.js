function ChangeMainPhotoTo(photoIndex,totalLength)
{
    let id1;
    let id2;
    for (let index = 0; index < totalLength; index++) {
        id1 = "carouselPhoto"+index.toString();
        id2 = "bottomButton"+index.toString();
        document.getElementById(id1).classList.remove("active");
        document.getElementById(id2).classList.remove("active");
        document.getElementById(id2).ariaCurrent=false;
    }

    id3 = "carouselPhoto"+photoIndex.toString();
    id4 = "bottomButton"+photoIndex.toString();
    // console.log(id1);
    document.getElementById(id3).classList.add("active");
    document.getElementById(id4).classList.add("active");
    document.getElementById(id4).ariaCurrent=true;
}

function wishlistHeartToggleFunction(passedHeart) {
    passedHeart.classList.toggle("fa-solid");
}
function popupRatingFunction() {
    var popup = document.getElementById("popupUserRating");
    popup.classList.toggle("showPopup");
}
function selectOption(option) {
    document.getElementById('selectedOption').value = option;
    document.getElementById('dropdownMenuButton').innerHTML=option
  }
// const dropdownItems = document.getElementsByClassName('dropdown-item')
// const dropdownButton = document.getElementsByClassName('.dropdown-toggle');

//   dropdownItems.forEach(function(item) {
//     item.addEventListener('click', function() {
//       dropdownButton.innerText = item.innerText;
//     });
//   });
//   $('.dropdown-menu a').click(function(){
//     $('#dropdownMenuButton').text($(this).text());
//   });
// const input = document.getElementById('bx');
// const selectedValue = input.value;
// document.getElementById('need').value=selectedValue
