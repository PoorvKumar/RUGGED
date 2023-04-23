function wishlistHeartToggleFunction(passedHeart) {
    passedHeart.classList.toggle("fa-solid");
}

function popupRatingFunction(idforclass) {
    var popup = document.getElementById(idforclass);
    popup.classList.toggle("showPopup");
}