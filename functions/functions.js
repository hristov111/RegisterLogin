const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
};



const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = ''
    inputControl.classList.remove("error");
    inputControl.classList.add("success");
}

const validateEmail = (email) => {
    if(email === ''){
        return "Email required!";
    }
    else if(!/\S+@\S+\.\S+/.test(email)){
        return "Email Invalid!";
    }
    else {
        return true
    }
}

const validatePasswords =(pass, for_login=false) => {
    const badSigns = /[!@#$%^&*(),.?":{}|<>]/g;
    if(pass === ''){
        return "Password required!";
    }
    else if(pass.length <8){
        return "Password must contain atleast 8 characters";
    }
    else if(!Array.from(pass).some(char => badSigns.test(char)) && !for_login){
        return "Password must contain one special character";
    }
    else {
        return true;
    }
} 
const validatePasswordEquality = (pass1, pass2) => {
    if(pass1 !== pass2){
        return false
    }
    else {
        return true;
    }
}

const makeCaptcha = () => {
    const chars = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890"
    let captcha = '';
    for(let i=0;i<6;i++){
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }   
    return captcha;
}

const showCapcha = (placeholder, captcha_container,captcha_text, dependancyCaptcha = makeCaptcha) => {
    captcha_container.style.display = "flex";
    captcha_container.style.flexDirection = "row";
    captcha_container.style.alignItems = "center";
    placeholder.appendChild(captcha_container);
    let captcha = dependancyCaptcha();
    captcha_text.innerText = captcha;
    return captcha_text.innerText
}

const activateCaptcha = (registerCaptchaPlaceholder
    ,captcha_container,
     captcha_text,captcha_userIpnut,captcha_submitButton, onSuccess,
     dependancyShow=showCapcha,dependancyError=setError,dependancySuccess= setSuccess) => {
    dependancyShow(registerCaptchaPlaceholder,captcha_container, captcha_text);
    captcha_submitButton.addEventListener('click' ,e=> {
        const user_inputValue = captcha_userIpnut.value.trim();
        if(user_inputValue === ''){
            dependancyError(captcha_userIpnut, "")
        }else if(user_inputValue === captcha_text.innerText) {
            dependancySuccess(captcha_userIpnut);
            onSuccess();
        }
        else {
            dependancyError(captcha_userIpnut, "");
        }
    })
}
const validateFirstLastName = (firstnameEl,lastNameEl) => {
    const firstNameValue = firstnameEl.value.trim();
    const lastNameValue = lastNameEl.value.trim(); 
    let firsNameValidated = false;
    let lastNameValidated = false;
    if(firstNameValue === ''){
        setError(firstnameEl, "FirstName required"); 
    }
    else if(!/^[a-zA-Z]+$/.test(firstNameValue)){
        setError(firstnameEl, "FirstName should contain only letters");
    }
    else {
        setSuccess(firstnameEl)
        firsNameValidated = true; 
    }
    if(lastNameValue === ''){
        setError(lastNameEl, "LastName required"); 
    }
    else if(!/^[a-zA-Z]+$/.test(lastNameValue)){
        setError(lastNameEl, "LastName should contain only letters");
    }
    else {
        setSuccess(lastNameEl)
        lastNameValidated = true;
    }
    if(lastNameValidated && firsNameValidated) return true
    else return false
}

const refres_captcha =  (captcha_text, callback) => {
    captcha_text.innerText = callback();
}

const colorErrors = (errorText) => {
    errorText.forEach(el=> {
        if(el.textContent.trim()){
            el.parentElement.classList.add('error');
            el.parentElement.classList.remove('success');
        }
    })
}

export{ 
    validateFirstLastName,
    validateEmail,
    validatePasswordEquality,
    validatePasswords,
    setError,
    setSuccess,colorErrors ,refres_captcha,activateCaptcha,makeCaptcha,showCapcha};