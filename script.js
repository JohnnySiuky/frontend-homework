const form = document.getElementById('signupform');
const usernameInput = document.getElementById('username');
const phoneInput = document.getElementById('phone');
const accountInput = document.getElementById('account');

function clearErrors(inputElement) {
    inputElement.addEventListener('input', function() {
        inputElement.style.borderColor = "#e0e0e0";
        inputElement.style.borderColor = "#e0e0e0";
        inputElement.style.borderColor = "#e0e0e0";
    });
}

clearErrors(usernameInput);
clearErrors(phoneInput);
clearErrors(accountInput);

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    const username = usernameInput.value.trim();   // trim whitespace
    const phone = phoneInput.value.trim();
    const account = accountInput.value.trim();

    let errors = "";
    let isValid = true;

    usernameInput.style.borderColor = "#e0e0e0";
    phoneInput.style.borderColor = "#e0e0e0";
    accountInput.style.borderColor = "#e0e0e0";

    if (username === "") {
        usernameInput.style.borderColor = "red";
        errors += "Name cannot be empty.\n";
        isValid = false;
    }

    if (phone === "") {
        phoneInput.style.borderColor = "red";
        errors += "Phone number cannot be empty.\n";
        isValid = false;
    } else if (isNaN(phone)) {
        phoneInput.style.borderColor = "red";
        errors += "Phone number must be numeric.\n";
        isValid = false;
    } else if (phone.length < 8) {
        phoneInput.style.borderColor = "red";
        errors += "Phone number must be at least 8 digits long.\n";
        isValid = false;
    }

    if (account === "") {
        accountInput.style.borderColor = "red";
        errors += "Dulux account cannot be empty.\n";
        isValid = false;
    }

    if (isValid) {
        alert("Sign up successful!");
        form.reset(); // Clear the form
    } else {
        alert(errors);
    }
});