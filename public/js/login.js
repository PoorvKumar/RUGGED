const email = document.querySelector("#email");
const pass = document.querySelector("#pass");
const form = document.querySelector("#loginForm");
const error = document.querySelectorAll(".error");
let emailregx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/i;
let passregx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/
function validateEmail() {
    if(email.value===''){
        email.style.outlineColor = "green";
        error[0].innerHTML = "";
    }
    else if (!emailregx.test(email.value)) {
        email.style.outlineColor = "red";
        email.style.position.top = "10px";
        error[0].innerHTML = "Invalid Email";
        return false;
    }
    else {
        email.style.outlineColor = "green";
        error[0].innerHTML = "";
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
        error[1].innerHTML = "password should contain atleast one Lowercase letter";
        pass.style.outlineColor = "red";
    }

    else if (!checkUpperCase()) {
        error[1].innerHTML = "password should contain atleast one Uppercase letter";
        pass.style.outlineColor = "red";
    }
    else if (!checkNumber()) {
        error[1].innerHTML = "password should contain atleast one number";
        pass.style.outlineColor = "red";
    }

    else if (!passwordStrength()) {
        error[1].innerHTML = "password should contain atleast 8 characters";
        pass.style.outlineColor = "red";
    }

    else {
        error[1].innerHTML = "";
        pass.style.outlineColor = "green";
    }


    if (passwordStrength() && checkLowerCase() && checkUpperCase() && checkNumber()) {
        return true;
    }
    else {
        return false;
    }
}

async function checkEmail(){
    try {
            const eml=email.value;
            const emails = await fetch('/login/getEmails', {method: 'GET'});
            const emails2 = await emails.json()
            const array_of_emails = emails2.map((ema)=>(ema.email));
            var index=array_of_emails.includes(eml);
            if(!index){
                document.getElementById('errorFrontEnd').innerHTML='Email does not exist';
            }
            else{
                document.getElementById('errorFrontEnd').innerHTML='';
            }
        } catch (error) {
            console.log(error);
        }
}

form.addEventListener('submit', function (e) {
    if (validatePassword() && validatePassword()) {
        return true;
    }
    else {
        e.preventDefault();
        return false;
    }

})