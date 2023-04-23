const form = document.querySelector("#regForm");
const submit = document.querySelector("#btn-submit");
const companyname = document.querySelector("#companyname");
const accountno = document.querySelector("#accountnumber");
const accountno1 = document.querySelector("#accountnumber1");
const pass = document.querySelector("#pass");
const error = document.querySelectorAll(".error");
const eyeIcon = document.querySelectorAll(".fa-regular");
const gstno = document.querySelector("#gstnumber");


let companyregx = /^[a-z]/i;
let passregx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/

function startWithalphabet(Name) {
    if (!(companyregx.test(Name.value))) {
        return false;
    }
    else {
        return true
    }
}

function userLength(Name) {
    if (!(Name.value.length >= 5 && Name.value.length <= 20)) {
        return false;
    }
    else {
        return true;
    }
}

function validatecompanyname() {

    if (!startWithalphabet(companyname)) {
        companyname.style.outlineColor = "red";
        error[0].innerHTML = "Company Name should start with alphabet";
    }
    else if (!userLength(companyname)) {
        error[0].innerHTML = "";
        companyname.style.outlineColor = "red";
        error[0].innerHTML = "Company Name should contain atleast 5 characters atmost 20";
    }
    else {
        error[0].innerHTML = "";
        firstname.style.outlineColor = "green";
        return true;
    }
}

function validategstno() {
    if (gstno.value.length != 15) {
        gstno.style.outlineColor = "red";
        error[1].innerHTML = "invalid GST Number";
    }
    else {
        gstno.style.outlineColor = "green";
        error[1].innerHTML = "";
        return true;
    }
}
function validateaccountno() {
    if (accountno.value.length <8 || accountno.value.length>15) {
        accountno.style.outlineColor = "red";
        error[2].innerHTML = "invalid Account Number";
    }
    else {
        accountno.style.outlineColor = "green";
        error[2].innerHTML = "";
        return true;
    }
}

function checkAccountno() {
    if (accountno.value !== accountno1.value) {
        error[3].innerHTML = "check your account no again";
        accountno1.style.outlineColor = "red";
    }
    else {
        error[3].innerHTML = "";
        accountno1.style.outlineColor = "green";
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
    if (validatecompanyname() && validategstno() && validatePassword() && validateaccountno()) {
        return true;
    }
    else {
        e.preventDefault();
        return false;
    }

})