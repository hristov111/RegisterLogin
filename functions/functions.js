export const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
};



export const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = ''
    inputControl.classList.remove("error");
    inputControl.classList.add("success");
}

export const validateEmail = (email) => {
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

export const validatePasswords =(pass, for_login=false) => {
    const badSigns = /[!@#$%^&*(),.?":{}|<>]/g;
    if(pass === ''){
        return "Password required!";
    }
    else if(pass.length <8){
        return "Password must contain atleast 8 characters";
    }
    else if(!Array.from(pass).some(char => badSigns.test(char)) && !for_login){
        return "Password must contain atlease one special charcter";
    }
    else {
        return true;
    }
} 
export const validatePasswordEquality = (pass1, pass2) => {
    if(pass1 !== pass2){
        setError(password2, "Passwords must match");
        return false
    }
    else {
        setSuccess(password2)
        return true;
    }
}

export const makeCaptcha = () => {
    const chars = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890"
    let captcha = '';
    for(let i=0;i<6;i++){
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }   
    return captcha;
}

export const showCapcha = (placeholder, captcha_element, captcha_container,captcha_text) => {
    captcha_container.style.display = "flex";
    captcha_container.style.flexDirection = "row";
    captcha_container.style.alignItems = "center";
    placeholder.appendChild(captcha_element);
    let captcha = makeCaptcha();
    captcha_text.innerText = captcha;
    return captcha_text.innerText
}

export const activateCaptcha = (registerCaptchaPlaceholder,captcha_element,captcha_container, captcha_text,captcha_userIpnut,captcha_submitButton, onSuccess) => {
    showCapcha(registerCaptchaPlaceholder,captcha_element,captcha_container, captcha_text);
    captcha_submitButton.addEventListener('click' ,e=> {
        const user_inputValue = captcha_userIpnut.value.trim();
        if(user_inputValue === ''){
            setError(captcha_userIpnut, "")
        }else if(user_inputValue === captcha_text.innerText) {
            setSuccess(captcha_userIpnut);
            onSuccess();
        }
        else {
            setError(captcha_userIpnut, "");
        }
    })
}

export const refres_captcha =  captcha_text => {
    let captcha = makeCaptcha();
    captcha_text.innerText = captcha;
}

export const colorErrors = (errorText) => {
    errorText.forEach(el=> {
        if(el.textContent.trim()){
            el.parentElement.classList.add('error');
            el.parentElement.classList.remove('success');
        }
    })
}