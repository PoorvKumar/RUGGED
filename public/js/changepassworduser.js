const form = document.querySelector("#passform");
const submit = document.querySelector("#btn-submit");
const oldpass = document.querySelector("#oldpass");
const pass = document.querySelector("#pass");
const cnfpass = document.querySelector("#cnf-pass");
const error = document.querySelectorAll(".error");
let passregx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/

function checkLowerCase(pass) {
    var lowerCaseLetters = /[a-z]/g;
    if (pass.value.match(lowerCaseLetters)) {
        return true;
    }
    else {
        return false;
    }
}


function passwordStrength(pass) {
    if (pass.value.length >= 8) {
        return true;
    }
    else {
        return false;
    }
}



function checkUpperCase(pass) {
    var upperCaseLetters = /[A-Z]/g;
    if (pass.value.match(upperCaseLetters)) {
        return true;
    }
    else {
        return false;
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



function validatePassword() {

    if (!checkLowerCase(oldpass)) {
        error[0].innerHTML = "password should contain atleast one Lowercase letter";
        pass.style.outlineColor = "red";
    }

    else if (!checkUpperCase(oldpass)) {
        error[0].innerHTML = "password should contain atleast one Uppercase letter";
        pass.style.outlineColor = "red";
    }
    else if (!checkNumber(oldpass)) {
        error[0].innerHTML = "password should contain atleast one number";
        pass.style.outlineColor = "red";
    }

    else if (!passwordStrength(oldpass)) {
        error[0].innerHTML = "password should contain atleast 8 characters";
        pass.style.outlineColor = "red";
    }

    else {
        error[0].innerHTML = "";
        pass.style.outlineColor = "green";
    }


    if (passwordStrength(oldpass) && checkLowerCase(oldpass) && checkUpperCase(oldpass) && checkNumber(oldpass)) {
        return true;
    }
    else {
        return false;
    }
}

function validatePasswordnew() {

    if (!checkLowerCase(pass)) {
        error[1].innerHTML = "password should contain atleast one Lowercase letter";
        pass.style.outlineColor = "red";
    }

    else if (!checkUpperCase(pass)) {
        error[1].innerHTML = "password should contain atleast one Uppercase letter";
        pass.style.outlineColor = "red";
    }
    else if (!checkNumber(pass)) {
        error[1].innerHTML = "password should contain atleast one number";
        pass.style.outlineColor = "red";
    }

    else if (!passwordStrength(pass)) {
        error[1].innerHTML = "password should contain atleast 8 characters";
        pass.style.outlineColor = "red";
    }

    else {
        error[1].innerHTML = "";
        pass.style.outlineColor = "green";
    }


    if (passwordStrength(pass) && checkLowerCase(pass) && checkUpperCase(pass) && checkNumber(pass)) {
        return true;
    }
    else {
        return false;
    }
}
function checkPass(pass) {
    if (pass.value !== cnfpass.value) {
        error[2].innerHTML = "check your password again";
        cnfpass.style.outlineColor = "red";
    }
    else {
        error[2].innerHTML = "";
        cnfpass.style.outlineColor = "green";
        return true;
    }
}

form.addEventListener('submit', function (e) {
    if (validatePassword() && validatePasswordnew() && checkPass(pass)) {
        return true;
    }
    else {
        e.preventDefault();
        return false;
    }

})