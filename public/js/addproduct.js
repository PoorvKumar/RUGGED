const productName = document.querySelector("#productName");
const productPrice = document.querySelector("#productPrice");
const stockQuantity = document.querySelector("#stockQuantity");
const discountPercentage = document.querySelector("#discountPercentage");
const weight = document.querySelector("#weight");
const length = document.querySelector("#length");
const width = document.querySelector("#width");
const height = document.querySelector("#height");
const form = document.querySelector("#form");
const submit = document.querySelector("#btn-submit");
const error = document.querySelectorAll(".error");
const tags = document.querySelector("#tagsed");
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
    // var numberPattern = /^-?\d+$/;
    var numbers =/^[0-9]+(\.[0-9]+)?$/;
    if (pass.value.match(numbers)) {
        return true;
    } 
    else {
        return false;
    }
}
function checkposint(pass) {
    var numbers = /^[0-9]\d*$/g;
    if (pass.value.match(numbers)) {
        return true;
    } else {
        return false;
    }
}
function checkrange(pass) {
    var range=/^(100(\.0*)?|\d{0,2}(\.\d*)?)$/;
    if (pass.value.match(range)) {
        return true;
    } else {
        return false;
    }
}
function validatePrice(){
    if(productPrice.value===''){
        productPrice.style.outlineColor = "red";
        error[1].innerHTML = "Price must not be empty";
       }
   else if(!checkNumber(productPrice)){
    productPrice.style.outlineColor = "red";
    error[1].innerHTML = "Price must be number";
   }
   else{
    error[1].innerHTML="";
    return true;}
}
function validateStock(){
    if(stockQuantity.value===''){
        productPrice.style.outlineColor = "red";
        error[2].innerHTML = "Stock must not be empty";
       }
    else if(!checkposint(stockQuantity)){
        stockQuantity.style.outlineColor = "red";
     error[2].innerHTML = "Stock quantity must be non-negative integer";
    }
    else{
        error[2].innerHTML="";
    return true;}
 }
 function validatePercentage(){
    if(discountPercentage.value===''){
        productPrice.style.outlineColor = "red";
        error[3].innerHTML = "Percentage must not be empty";
       }
    else if(!checkNumber(discountPercentage)){
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

function validateheight(){
    if(height.value===''){
        productPrice.style.outlineColor = "red";
        error[8].innerHTML = "Height must not be empty";
       }
     else if(!checkNumber(height)){
        height.style.outlineColor="red";
        error[8].innerHTML="Height must be a positive number"
     }
     else{
        error[8].innerHTML="";
        return true;
     }
}
function validatelength(){
    if(length.valueOf===''){
        productPrice.style.outlineColor = "red";
        error[6].innerHTML = "Length must not be empty";
       }
    else if(!checkNumber(length)){
       length.style.outlineColor="red";
       error[6].innerHTML="length must be a positive number"
    }
    else{
       error[6].innerHTML="";
       return true;
    }
}
function validateweight(){
    if(weight.value===''){
        productPrice.style.outlineColor = "red";
        error[5].innerHTML = "Weight must not be empty";
       }
    else if(!checkNumber(weight)){
       weight.style.outlineColor="red";
       error[5].innerHTML="weight must be a positive number"
    }
    else{
       error[5].innerHTML="";
       return true;
    }
}
function validatewidth(){
    if(width.value===''){
        productPrice.style.outlineColor = "red";
        error[7].innerHTML = "Width must not be empty";
       }
    else if(!checkNumber(width)){
       width.style.outlineColor="red";
       error[7].innerHTML="width must be a positive number"
    }
    else{
       error[7].innerHTML="";
       return true;
    }
}
function validatetags(){
    var inp=/^(?:[^,]+,)*[^,]+$/g;
    if(tags.value===''){
        productPrice.style.outlineColor = "red";
        error[4].innerHTML = "Tags must not be empty";
       }
    if(!tags.value.match(inp)){
        tags.style.outlineColor="red";
        error[4].innerHTML="Tags must be comma separted strings"
    }
    else{
        error[4].innerHTML=""
        return true
    }
}
 form.addEventListener('submit', function (e) {
    if (validateproductname() && validatePrice() && validateStock() && validatePercentage() && validateheight() && validatelength() && validateweight() && validatewidth() && validatetags()) {
        return true;
    }
    else {
        e.preventDefault();
        return false;
    }

})