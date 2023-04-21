function wishlistHeartToggleFunction(passedHeart) {
    passedHeart.classList.toggle("fa-solid");
}

function popupRatingFunction(idforclass) {
    console.log(idforclass);
    var popup = document.getElementById(idforclass);
    popup.classList.toggle("showPopup");
}