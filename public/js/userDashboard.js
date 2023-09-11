const firstname = document.querySelector("#firstname");
const lastname = document.querySelector("#lastname");
const mobileno = document.querySelector("#mobileno");
const email = document.querySelector("#email");
const form = document.querySelector("#updateform");
const submit = document.querySelector("#btn-submit");
const error = document.querySelectorAll(".error");
let userregx = /^[a-z]/i;
let emailregx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/i;
let passregx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/

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

function validatefirstname() {

    if (!startWithalphabet(firstname)) {
        firstname.style.outlineColor = "red";
        error[0].innerHTML = "Name should start with alphabet";
    }
    else if (!userLength(firstname)) {
        error[0].innerHTML = "";
        firstname.style.outlineColor = "red";
        error[0].innerHTML = "Name should contain atleast 3 characters atmost 20";
    }
    else {
        error[0].innerHTML = "";
        firstname.style.outlineColor = "green";
        return true;
    }
}

function validatelastname() {

    if (!startWithalphabet(lastname)) {
        lastname.style.outlineColor = "red";
        error[1].innerHTML = "Name should start with alphabet";
    }
    else if (!userLength(lastname)) {
        error[1].innerHTML = "";
        lastname.style.outlineColor = "red";
        error[1].innerHTML = "Name should contain atleast 3 characters atmost 20";
    }
    else {
        error[1].innerHTML = "";
        lastname.style.outlineColor = "green";
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
function validateMobileNumber() {
    if(mobileno.value===''){
        mobileno.style.outlineColor = "red";
        error[2].innerHTML = "Mobile numebr must not be empty";
    }
    else if ( mobileno.value.length != 10) {
        mobileno.style.outlineColor = "red";
        error[2].innerHTML = "Length must be 10";
    }
    else if(!checkNumber(mobileno)){
        mobileno.style.outlineColor = "red";
        error[2].innerHTML = "It must consist of numbers";
    }
    else {
        mobileno.style.outlineColor = "green";
        error[2].innerHTML = "";
        return true;
    }
}



function validateEmail() {
    if(email.value===''){
        email.style.outlineColor = "red";
        error[3].innerHTML = "Email must not be empty";
    }
    else if (!emailregx.test(email.value)) {
        email.style.outlineColor = "red";
        email.style.position.top = "10px";
        error[3].innerHTML = "Invalid Email";
        return false;
    }
    else {
        email.style.outlineColor = "green";
        error[3].innerHTML = "";
        return true;
    }
}
form.addEventListener('submit', function (e) {
    if (validatefirstname() && validatelastname() && validateMobileNumber() && validateEmail()) {
        return true;
    }
    else {
        e.preventDefault();
        return false;
    }

})