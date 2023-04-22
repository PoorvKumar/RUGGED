ChangeMainPhotoTO(photo)
{

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