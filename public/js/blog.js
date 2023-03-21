url1='Images/carouselImge/joel-jasmin-forestbird-znoL1m6MD_k-unsplash.jpg'
url2='Images/carouselImge/sebastien-goldberg-BKLHxgbYFDI-unsplash.jpg'
url3='Images/carouselImge/simon-english-48nerZQCHgo-unsplash.jpg'
url4='Images/carouselImge/toomas-tartes-Yizrl9N_eDA-unsplash.jpg'
url5='Images/carouselImge/usman-omar-Q-zdaa-tVq4-unsplash.jpg'
const ele1=document.getElementById("1")
const ele2=document.getElementById("2")
const ele3=document.getElementById("3")
const ele4=document.getElementById("4")
const ele5=document.getElementById("5")
function funcc(){
    var elements = document.getElementsByClassName("activebox");
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove("activebox")
    }
}
function myFunction1() {
    funcc()
    document.getElementById("imgchng").style.backgroundImage = "url("+url1+")";
    document.getElementById("1").classList.add("activebox")
 }
 function myFunction2() {
    funcc()
    document.getElementById("imgchng").style.backgroundImage = "url("+url2+")";
    document.getElementById("2").classList.add("activebox")
 }
 function myFunction3() {
    funcc()
    document.getElementById("imgchng").style.backgroundImage = "url("+url3+")";
    document.getElementById("3").classList.add("activebox")
 }
 function myFunction4() {
    funcc()
    document.getElementById("imgchng").style.backgroundImage = "url("+url4+")";
    document.getElementById("4").classList.add("activebox")
 }
 function myFunction5() {
    funcc()
    document.getElementById("imgchng").style.backgroundImage = "url("+url5+")";
    document.getElementById("5").classList.add("activebox")
 }
 ele1.addEventListener("click",myFunction1)
 ele2.addEventListener("click",myFunction2)
 ele3.addEventListener("click",myFunction3)
 ele4.addEventListener("click",myFunction4)
 ele5.addEventListener("click",myFunction5)