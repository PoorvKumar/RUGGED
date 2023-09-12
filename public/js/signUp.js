
const form = document.querySelector("#regForm");
const submit = document.querySelector("#btn-submit");
const firstname = document.querySelector("#firstname");
const lastname = document.querySelector("#lastname");
const email = document.querySelector("#email");
const pass = document.querySelector("#pass");
const cnfpass = document.querySelector("#cnf-pass");
const error = document.querySelectorAll(".error");
const eyeIcon = document.querySelectorAll(".fa-regular");
const mobileno = document.querySelector("#mobileno");

//patterns
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
function checkNumber1(pass) {
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
        error[2].innerHTML = "";
    }
    else if ( mobileno.value.length != 10) {
        mobileno.style.outlineColor = "red";
        error[2].innerHTML = "Length must be 10";
    }
    else if(!checkNumber1(mobileno)){
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
        error[3].innerHTML = "";
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
function checkLowerCase() {
    var lowerCaseLetters = /[a-z]/g;
    if (pass.value.match(lowerCaseLetters)) {
        return true;
    }
    else {
        return false;
    }
}
function passwordStrength() {
    if (pass.value.length >= 8) {
        return true;
    }
    else {
        return false;
    }
}
function checkUpperCase() {
    var upperCaseLetters = /[A-Z]/g;
    if (pass.value.match(upperCaseLetters)) {
        return true;
    }
    else {
        return false;
    }
}
function checkNumber() {
    var numbers = /[0-9]/g;
    if (pass.value.match(numbers)) {
        return true;
    } else {
        return false;
    }
}
function validatePassword() {

    if (!checkLowerCase()) {
        error[4].innerHTML = "password should contain atleast one Lowercase letter";
        pass.style.outlineColor = "red";
    }

    else if (!checkUpperCase()) {
        error[4].innerHTML = "password should contain atleast one Uppercase letter";
        pass.style.outlineColor = "red";
    }
    else if (!checkNumber()) {
        error[4].innerHTML = "password should contain atleast one number";
        pass.style.outlineColor = "red";
    }

    else if (!passwordStrength()) {
        error[4].innerHTML = "password should contain atleast 8 characters";
        pass.style.outlineColor = "red";
    }

    else {
        error[4].innerHTML = "";
        pass.style.outlineColor = "green";
    }


    if (passwordStrength() && checkLowerCase() && checkUpperCase() && checkNumber()) {
        return true;
    }
    else {
        return false;
    }
}
function checkPass() {
    if (pass.value !== cnfpass.value) {
        error[5].innerHTML = "check your password again";
        cnfpass.style.outlineColor = "red";
    }
    else {
        error[5].innerHTML = "";
        cnfpass.style.outlineColor = "green";
        return true;
    }
}
eyeIcon[4].addEventListener('click', function () {
    if (eyeIcon[4].classList.contains('fa-eye')) {
        eyeIcon[4].classList.remove("fa-eye");
        eyeIcon[4].classList.add("fa-eye-slash");
        pass.setAttribute('type', 'text');
    }
    else {
        eyeIcon[4].classList.remove('fa-eye-slash');
        eyeIcon[4].classList.add("fa-eye");
        pass.setAttribute('type', 'password');
    }
})
eyeIcon[5].addEventListener('click', function () {
    if (eyeIcon[5].classList.contains('fa-eye')) {
        eyeIcon[5].classList.remove("fa-eye");
        eyeIcon[5].classList.add("fa-eye-slash");
        cnfpass.setAttribute('type', 'text');
    }
    else {
        eyeIcon[5].classList.remove('fa-eye-slash');
        eyeIcon[5].classList.add("fa-eye");
        cnfpass.setAttribute('type', 'password');
    }
})
form.addEventListener('submit', function (e) {
    if (validatefirstname() && validatelastname() && validateMobileNumber() && validateEmail() && validatePassword() && checkPass()) {
        return true;
    }
    else {
        e.preventDefault();
        return false;
    }

})
async function checkMobile(){
    try {
        const mbno = mobileno.value;
        const dataToSend = { mobileno:mbno };
        const phno = await fetch('/signup/verifyMobile',{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
        });
        const response = await phno.json();
        if (response.length > 0) {
            document.getElementById("errorFrontEndMNo").innerHTML = "Phone Number already exists. Try Login or use a different Phone number.";
        } else {
            document.getElementById("errorFrontEndMNo").innerHTML = "";
        }
    } catch (error) {
        console.log(error);
    }
}
async function checkEmail(){
    try {
        const eml = email.value;
        const dataToSend = { email: eml };
        const emls = await fetch("/signup/verifyEmail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
        });
        const response = await emls.json();
        if (response.length > 0) {
            document.getElementById("errorFrontEnd").innerHTML = "Email already exists in our Database. Try Login or use a deifferent email.";
        } else {
            document.getElementById("errorFrontEnd").innerHTML = "";
        }
    } catch (error) {
        console.log(error);
    }
}