const productName = document.querySelector("#productName");
const productPrice = document.querySelector("#productPrice");
const stockQuantity = document.querySelector("#stockQuantity");
const discountPercentage = document.querySelector("#discountPercentage");
const weight = document.querySelector("#weight");
const length = document.querySelector("#length");
const width = document.querySelector("#width");
const height = document.querySelector("heightt");
const form = document.querySelector("#form");
const submit = document.querySelector("#btn-submit");
const error = document.querySelectorAll(".error");
let userregx = /^[a-z]/i;

function startWithalphabet(Name) {
    if (!(userregx.test(Name.value))) {
        return false;
    }
    else {
        return true
    }
}

function userLength(Name) {
    if (!(Name.value.length >= 3 && Name.value.length <= 20)) {
        return false;
    }
    else {
        return true;
    }
}

function validateproductname() {

    if (!startWithalphabet(productName)) {
        productName.style.outlineColor = "red";
        error[0].innerHTML = "Name should start with alphabet";
    }
    else if (!userLength(productName)) {
        error[0].innerHTML = "";
        productName.style.outlineColor = "red";
        error[0].innerHTML = "Name should contain atleast 3 characters atmost 20";
    }
    else {
        error[0].innerHTML = "";
        productName.style.outlineColor = "green";
        return true;
    }
}
function checkNumber(pass) {
    var numbers = /[0-9]/g;
    if (pass.value.match(numbers)) {
        return true;
    } else {
        return false;
    }
}
function validatePrice(){
   if(!checkNumber(productPrice)){
    productPrice.style.outlineColor = "red";
    error[1].innerHTML = "Price must be number";
   }
   else{
    error[1].innerHTML="";
    return true;}
}
function validateStock(){
    if(!checkNumber(stockQuantity)){
        stockQuantity.style.outlineColor = "red";
     error[2].innerHTML = "Stock quantity must be number";
    }
    else{
        error[2].innerHTML="";
    return true;}
 }
 function validatePercentage(){
    if(!checkNumber(discountPercentage)){
    discountPercentage.style.outlineColor = "red";
     error[3].innerHTML = "Percentage must be a number";
    }
    else if(!checkrange(discountPercentage)){
        discountPercentage.style.outlineColor = "red";
     error[3].innerHTML = "Percentage must be between 0 to 100";
    }
    else{
        error[3].innerHTML="";
        return true;}
 }




 form.addEventListener('submit', function (e) {
    if (validateproductname() && validatePrice() && validateStock() && validatePercentage()) {
        return true;
    }
    else {
        e.preventDefault();
        return false;
    }

})