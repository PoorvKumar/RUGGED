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