const passwordLogin = document.getElementById("passwordLogin");
const loginBtn = document.getElementById("loginBtn");
const emailLogin = document.getElementById("emailLogin");

//localStorage section
document.addEventListener("DOMContentLoaded", () => {
    emailLogin.innerHTML = localStorage.getItem("input")
})

const checkPassword = async () => {
    const resPassword = await fetch("http://localhost:5000/checkUser", {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
            email: emailLogin.innerHTML,
            password: passwordLogin.value})
    })

    const dataPassword = await resPassword.json();
    console.log(dataPassword)

    if(resPassword.ok){
        console.log("Password correct, you can login with this ea")
    }else if(resPassword.status === 401){
        console.log("Password wrongs")
    }
    return dataPassword.passwordMatch
}


loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const isMatch = await checkPassword();
    if(isMatch){
        window.alert("Login Successful");
        window.location.href = 'http://127.0.0.1:5500/dist/index.html'
    }else{
        window.alert("Login Failed");
    }
});



