const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{5,})/;

//LocalStorage section

document.addEventListener('DOMContentLoaded', () => {
    emailValue.value = localStorage.getItem('input');
})

//Display name check whether that there is in the Database or not. If yes, tell cilent that there are already name.
// Date Regex check
// password check with passswordPattern
// confirmPassword check with password .is it match or not