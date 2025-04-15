function processContact(form){
    const errorElements = form.querySelectorAll('.error-message');
    errorElements.forEach(el=>el.remove());
    let isValid = true;
    const phoneRegex = /^\(\d{3}\)-\d{3}-\d{4}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const fName = form.elements["fName"].value.trim();
    const lName = form.elements["lName"].value.trim();
    const pNumber = form.elements["pNumber"].value.trim();
    const email = form.elements["Email"].value.trim();
    if(!fName){
        showFieldError(form.fName, "First Name is required.");
        isValid = false;
    }
    if(!lName){
        showFieldError(form.lName, "Last Name is required.");
        isValid = false;
    }
    if(!phoneRegex.test(pNumber)){
        showFieldError(form.pNumber, "Please enter format (XXX)-XXX-XXXX");
        isValid = false;
    }
    if(!emailRegex.test(email)){
        showFieldError(form.email, "Please enter email format.");
        isValid = false;
    }
    
    if (!isValid){
        return false;
    }

    document.getElementById("ContactResult").innerHTML = `<div class = "success">
    <h3>Thanks for reaching out</h3>
    <p>We will be reaching out to ${email} shortly..</p>
    </div>`;
    return false; 
    
}

function showFieldError(field, message){
    const errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.textContent = message;
    field.parentNode.insertBefore(errorElement, field.nextSibling);
}
window.onload = function(){
    const form = document.querySelector("form");
    if(form){
        form.addEventListener("reset", function(){
            //clear errors
            const errorFields = document.querySelectorAll(".invalid");
            errorFields.forEach(field => clearFieldError(field));
            //clear info
            const ContactResult = document.getElementById("ContactResult");
            if(ContactResult) {
                ContactResult.innerHTML = "";
            }

        });
    }
};