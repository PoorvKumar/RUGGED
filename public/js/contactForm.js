
const form = document.querySelector("#contactForm");
const submit = document.querySelector("#btn-submit");
const firstname = document.querySelector("#name");

const email = document.querySelector("#email");


const error = document.querySelectorAll(".error");

const mobileno = document.querySelector("#phn");

const namelabel = document.querySelector("#namelabel");
const phnlabel = document.querySelector("#phnlabel");
const emaillabel = document.querySelector("#emaillabel");


let userregx = /^[a-z]/i;
let emailregx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
let phnregex = /^\d{10}$/;

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
        namelabel.innerHTML = "Name:Name should start with alphabet";
        namelabel.style.color="red"
        
    }
    else if (!userLength(firstname)) {
        namelabel.innerHTML = "";
        namelabel.style.outlineColor = "red";
        namelabel.innerHTML = "Name:Name should contain atleast 3 characters atmost 20";
        namelabel.style.color="red"
        
    }
    else {
        namelabel.innerHTML = "Name:";
        firstname.style.outlineColor = "green";
        namelabel.style.color="black"

        return true;
    }
}


function validateMobileNumber() {
    if (!(phnregex.test(mobileno.value))) {
        mobileno.style.outlineColor = "red";
        phnlabel.innerHTML = "Phn: invalid number";
        phnlabel.style.color="red"
    }
    else {
        mobileno.style.outlineColor = "green";
        phnlabel.innerHTML = "Phn:";
        phnlabel.style.color="black"
        return true;
    }
}



function validateEmail() {
    if (!emailregx.test(email.value)) {
        email.style.outlineColor = "red";
        email.style.position.top = "10px";
        emaillabel.innerHTML = "Email:Invalid Email";
        emaillabel.style.color="red"
        
        return false;
    }
    else {
        email.style.outlineColor = "green";
        emaillabel.innerHTML = "Email:";
        emaillabel.style.color="black"
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