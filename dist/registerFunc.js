const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{5,})/;
const dobPattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;


let invisible = document.querySelectorAll("#invisible");
let visible = document.querySelectorAll("#visible");

function closedOpenEye(id){
    
    const closedEye = invisible[id];
    const openEye = visible[id];


    closedEye.classList.toggle("hidden");
    openEye.classList.toggle("hidden");
    if(id === 0){
        if(passwordInput.type === 'password'){
            passwordInput.type = 'text';
        }else if(passwordInput.type === 'text'){
            passwordInput.type = 'password';
        }
    }else if(id === 1){
        if(confirmPasswordInput.type === 'password'){
            confirmPasswordInput.type = 'text';
        }else if(confirmPasswordInput.type === 'text'){
            confirmPasswordInput.type = 'password';
        } 
    }else{
        console.log("This id is not defined yet");
    }
}

//Stay logged in box function is below


const checkBox = document.getElementById("checkBox");
const boxCheckBox = document.getElementById("boxCheckBox");
const shadowCircle = document.getElementById("shadowCircle");

checkBox.addEventListener('click', (e) => {

    e.preventDefault();
    const checkLogIn = document.getElementById("checkLogIn");
    checkLogIn.classList.toggle("hidden");

    //Style changing

    if(checkLogIn.classList.contains("hidden")){
        shadowCircle.classList.remove("bg-[#76b900]/20");
        shadowCircle.classList.remove("hover:bg-[#76b900]/10", "active:bg-[#76b900]/20");
        boxCheckBox.classList.remove("bg-[#76b900]");
        shadowCircle.classList.add("hover:bg-black/10", "active:bg-black/20");
    }else{
        shadowCircle.classList.remove("hover:bg-black/10", "active:bg-black/20");
        shadowCircle.classList.add("bg-[#76b900]/20");
        shadowCircle.classList.add("hover:bg-[#76b900]/10", "active:bg-[#76b900]/20");
        boxCheckBox.classList.add("bg-[#76b900]");
    }

})

checkBox.addEventListener('blur', () => {
    shadowCircle.classList.remove("bg-[#76b900]/20");    
});


//LocalStorage section

document.addEventListener('DOMContentLoaded', () => {
    emailValue.value = localStorage.getItem('input');
})

//Check whether there is display name in the storage
//Alert function 'Create a display name'

const takenNameAlert = document.getElementById("takenNameAlert");
const createAlert = document.getElementById("createAlert");
const displayNameInput = document.getElementById("displayNameInput");

const checkName = async () => {
    const resName = await fetch("http://localhost:5000/checkdisplayName", {
        method: 'POST',
        headers: {'Content-Type' : 'application/json' },
        body: JSON.stringify({ displayName: displayNameInput.value })
    });

    const dataName = await resName.json();

    console.log("Is this name is in the storage: ", dataName.displayNameExists)
    
    if(dataName.displayNameExists){
        takenNameAlert.classList.remove("hidden");
        displayNameValid = false;
    }else{
        takenNameAlert.classList.add("hidden");
        displayNameValid = true;
    }
}

let displayNameValid = false;

displayNameInput.addEventListener("input", (e) => {
    if(displayNameInput.value.length > 0){
        createAlert.classList.add("hidden");
        e.preventDefault();
        checkName();
    }else{
        takenNameAlert.classList.add("hidden");
        createAlert.classList.remove("hidden");
    }
})

//check dobPattern
let dobValid  = false;

const dobAlert = document.getElementById("dobAlert");
const dobInput = document.getElementById("dobInput")

dobInput.addEventListener("input", (e) => {
    
    //auto masking
    if(e.inputType !== "deleteContentBackward"){
        let values = e.target.value;
        
        if(values.length === 4 || values.length === 5){
            values = values.slice(0,4) + "-" + values.slice(4)
        }else if(values.length === 7 || values.length === 8){
            values = values.slice(0,7) + "-" + values.slice(7)
        }
        e.target.value = values;
    }

    if(e.target.value){
        if(!dobPattern.test(e.target.value)){
            dobAlert.classList.remove("hidden")
            dobValid = false;
        }else{
            dobAlert.classList.add("hidden");
            dobValid = true;
        }
    }
})

// password check with passswordPattern and strong bar

const passwordInput = document.getElementById("password");
const enterPasswordAlert = document.getElementById("enterPasswordAlert");
const strongBar = document.getElementById("strongBar");

//Weakness checker defining
const weakPasswordAlert = document.getElementById("weakPasswordAlert");
const goodAlert = document.getElementById("goodAlert");
const strongAlert = document.getElementById("strongAlert");

const levelBar = document.querySelectorAll("#levelBar")

//Thanks a lot ,Gemini. It's hard to figure this out.
function isSequential(str) {
    const sequenceLimit = 5;
    let count = 1;

    for (let i = 0; i < str.length - 1; i++) {
        const currentChar = str.charCodeAt(i);
        const nextChar = str.charCodeAt(i + 1);

        if (nextChar === currentChar + 1 || nextChar === currentChar - 1) {
            count++;
            if (count >= sequenceLimit) return true;
        } else {
            count = 1;
        }
    }
    return false;
}

let passwordValid = false;

passwordInput.addEventListener("input", (e) => {

    //strong password bar function below

    let query = [];
    let level = 0;
    query.push(/[a-z]/);
    query.push(/[A-Z]/);
    query.push(/[0-9]/);
    query.push(/[!@#$%^&*(),.?":{}|<>]/ );

    for(let i = 0; i < query.length; i++){
        if(query[i].test(e.target.value)){
            level++;
        }
    }

    if(e.target.value.length >= 9){
        level++;
    }

    if(!isSequential(e.target.value)){
        level++;
    }
    console.log(level);

    if(level < 3){
        passwordValid = false;
        levelBar[0].style.backgroundColor = "#b60017"
        levelBar[1].style.backgroundColor = "#ececec"
        levelBar[2].style.backgroundColor = "#ececec"
        levelBar[3].style.backgroundColor = "#ececec"
        strongAlert.classList.add("hidden");
        goodAlert.classList.add("hidden")
        strongBar.classList.remove("hidden")
        weakPasswordAlert.classList.remove("hidden")
    }else if(level === 3 || level === 4){
        passwordValid = false;
        levelBar[0].style.backgroundColor = "#b60017"
        levelBar[1].style.backgroundColor = "#b60017"
        levelBar[2].style.backgroundColor = "#ececec"
        levelBar[3].style.backgroundColor = "#ececec"
        if(weakPasswordAlert.classList.contains("hidden")){
            weakPasswordAlert.classList.remove("hidden")
        }

        if(!goodAlert.classList.contains("hidden")){
            goodAlert.classList.add("hidden");
        }
    }else if(level === 5){
        passwordValid = true;
        levelBar[0].style.backgroundColor = "#1052bf"
        levelBar[1].style.backgroundColor = "#1052bf"
        levelBar[2].style.backgroundColor = "#1052bf"
        levelBar[3].style.backgroundColor = "#ececec"
        weakPasswordAlert.classList.add("hidden");
        goodAlert.classList.remove("hidden")
        if(!strongAlert.classList.contains("hidden")){
            strongAlert.classList.add("hidden");
        }
    }else if(level === 6){
        passwordValid = true;
        levelBar.forEach((el) => {
            el.style.backgroundColor = "#76b900";
        })
        goodAlert.classList.add("hidden")
        strongAlert.classList.remove("hidden");
    }
})

// confirmPassword check with password .is it match or not
let confirmPasswordValid = false;

const confirmPasswordInput = document.getElementById("confirmPassword");
const matchAlert = document.getElementById("matchAlert")
const reenterPasswordAlert = document.getElementById("reenterPasswordAlert");

confirmPasswordInput.addEventListener("input", (e) => {
    if(e.target.value.length > 0){
        if(!reenterPasswordAlert.classList.contains("hidden")){
            reenterPasswordAlert.classList.add("hidden");
        }
        
        if(passwordInput.value !== confirmPasswordInput.value){
            confirmPasswordValid = false;
            matchAlert.classList.remove("hidden");
        }else{
            confirmPasswordValid = true;
            matchAlert.classList.add("hidden");
        }
    }else{
        if(!matchAlert.classList.contains("hidden")){
            matchAlert.classList.add("hidden");
        }

        reenterPasswordAlert.classList.remove("hidden");
    }
})

const createAccountBtn = document.getElementById("createAccountBtn");

inputList = [confirmPasswordInput, passwordInput, displayNameInput, dobInput]

inputList.forEach(input => {
    input.addEventListener("input", () => {
        console.log("Checking:", { displayNameValid, dobValid, passwordValid, confirmPasswordValid });
        if(displayNameValid && dobValid && passwordValid && confirmPasswordValid){
            createAccountBtn.classList.remove("bg-[#e0e0e0]", "text-[#999999]")
            createAccountBtn.classList.add("bg-[#76b900]", "text-black", "cursor-pointer")
        }else{
            createAccountBtn.classList.remove("bg-[#76b900]", "text-black")
            createAccountBtn.classList.add("bg-[#e0e0e0]", "text-[#999999]")
        }
    })
})

//Creating new user into storage
const createUser = async () => {
    const resUser = await fetch("http://localhost:5000/register", {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            email: emailValue.value,
            displayName: displayNameInput.value,
            dob: dobInput.value,
            password: passwordInput.value
        })
    })

    const dataUser = await resUser.json();

    if(resUser.ok){
        window.alert("Creating a new user successful");
        window.location.href = 'login.html';
    }else{
        window.alert("Creating a new user failure");
        console.log(dataUser.message);
    }

}

createAccountBtn.addEventListener("click", () => {
    if(displayNameValid && dobValid && passwordValid && confirmPasswordValid){
        createUser();
    }
})