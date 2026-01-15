const quickLinksClicked = document.getElementById("quickLinksClicked")

function quickLinks(){
    quickLinksClicked.classList.toggle("hidden");
    quickLinksClicked.classList.toggle("block");
}

const quickLinksClicked2 = document.getElementById("quickLinksClicked2")

function quickLinks2(){
    quickLinksClicked2.classList.toggle("hidden");
    quickLinksClicked2.classList.toggle("block");
}

const quickLinksClicked3 = document.getElementById("quickLinksClicked3")

function quickLinks3(){
    quickLinksClicked3.classList.toggle("hidden");
    quickLinksClicked3.classList.toggle("block");
}

const quickLinksClicked4= document.getElementById("quickLinksClicked4")

function quickLinks4(){
    quickLinksClicked4.classList.toggle("hidden");
    quickLinksClicked4.classList.toggle("block");
}


function scrollSlideLeft(id){

    const carousel = document.getElementById(id)

    const firstCard = carousel.firstElementChild;
    const cardWidth = firstCard.offsetWidth;

    const gap = 20;

    const scrollAmount = gap + cardWidth;

    if(carousel.scrollLeft === 0){
        carousel.scrollTo({
            left: scrollAmount*5,
            behavior: "smooth"
        })
    }else{
        carousel.scrollBy({
            left: -scrollAmount,
            behavior: "smooth"
        })
    }
}

function scrollSlideRight(id){

    const carousel = document.getElementById(id)


    const firstCard = carousel.firstElementChild;
    const cardWidth = firstCard.offsetWidth;

    const gap = 20;

    const scrollAmount = gap + cardWidth;

    if(carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth - 1){
        carousel.scrollTo({
            left: 0, 
            behavior: "smooth"
        })
    }else if(carousel.scrollLeft >= 0){
        carousel.scrollBy({
            left: scrollAmount,
            behavior: "smooth"
        })
    }else{
        console.log("Scroll error, please check again.")
    }

}

//effectSignIn below

const signInBtn = document.getElementById("signInButton");

if(signInBtn){
    signInBtn.addEventListener("click", (e) => {
    
        e.preventDefault();
    
        const eff1 = document.getElementById("effectSignIn1");
        const eff2 = document.getElementById("effectSignIn2");
        eff1.classList.toggle("!block");
        eff2.classList.toggle("!block");
    
    })
}

//LocalStorage emailValue.value after we click 'Continue' Button

const continueBtn = document.getElementById("continueBtn");
const emailValue = document.getElementById("email");


continueBtn.addEventListener('click', () =>{

    localStorage.setItem('input', emailValue.value)
    if(window.location.href === "register.html"){
        emailValue.value = localStorage.getItem('input');
    }
})


//Email validation

const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const validErrMsg = document.getElementById("validErrMsg");
const enterEmailMsg = document.getElementById("enterEmailMsg");

function validContinueBtn(){
    continueBtn.classList.remove("bg-[#e0e0e0]", "text-[#999999]");
    continueBtn.classList.add("bg-[#76b900]", "cursor-pointer");
    enterEmailMsg.classList.remove("inline-block");
    enterEmailMsg.classList.add("hidden");
    validErrMsg.classList.add("hidden");
    validErrMsg.classList.remove("inline-block");
    emailValue.classList.add("focus:border-[#76b900]");
    emailValue.classList.remove("border-red-600");  
}

function enterYourEmail(){
    emailValue.classList.remove("focus:border-[#76b900]");
    emailValue.classList.add("border-red-600");
    enterEmailMsg.classList.remove("hidden");
    enterEmailMsg.classList.add("inline-block");
    validErrMsg.classList.remove("inline-block");
    validErrMsg.classList.add("hidden");
    continueBtn.classList.remove("bg-[#76b900]", "cursor-pointer");
    continueBtn.classList.add("bg-[#e0e0e0]", "text-[#999999]");
}

function enterValidEmail(){
    emailValue.classList.remove("focus:border-[#76b900]");
    emailValue.classList.add("border-red-600");
    validErrMsg.classList.remove("hidden");
    validErrMsg.classList.add("inline-block");
    enterEmailMsg.classList.remove("inline-block");
    enterEmailMsg.classList.add("hidden");
    continueBtn.classList.remove("bg-[#76b900]", "cursor-pointer");
    continueBtn.classList.add("bg-[#e0e0e0]", "text-[#999999]");
}

emailValue.addEventListener('input', (e) => {
    if(regEx.test(e.target.value)){
        validContinueBtn();
    }else{
        if(e.target.value == ""){
            enterYourEmail();
        }else{
            enterValidEmail();
        }
    }
})

emailValue.addEventListener("blur", (e) => {
    if(e.target.value == ""){
        emailValue.classList.add("focus:border-[#76b900]");
        emailValue.classList.remove("border-red-600");
        enterEmailMsg.classList.remove("inline-block");
        enterEmailMsg.classList.add("hidden");
        continueBtn.classList.remove("bg-[#76b900]", "cursor-pointer");
        continueBtn.classList.add("bg-[#e0e0e0]", "text-[#999999]");
    }
})

//Check whether that there is user in storage.

const checkUser = async () => {
    const response = await fetch("http://localhost:5000/test", {
        method: 'POST',
        headers: {'Content-Type' : 'application/json' },
        body: JSON.stringify({ email: emailValue.value })
    });

    const data = await response.json();

    console.log("Is email exists?:", data.exists);

    if(data.exists){
        window.location.href = 'login.html';
    }else{
        window.location.href = 'register.html';
    }
}

continueBtn.addEventListener('click', (e) => {
    e.preventDefault();
    checkUser();
})

//invisible-visible eye function is below

const invisible = document.querySelectorAll("#invisible");
const visible = document.querySelectorAll("#visible");
const password = document.querySelectorAll('#confirmPassword');

function closedOpenEye(id){
    
    const closedEye = invisible[id];
    const openEye = visible[id];
    const currentPasswordInput = password[id];

    closedEye.classList.toggle("hidden");
    openEye.classList.toggle("hidden");
    if(currentPasswordInput.type === 'password'){
        currentPasswordInput.type = 'text';
    }else if(currentPasswordInput.type === 'text'){
        currentPasswordInput.type = 'password';
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