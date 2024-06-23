import { colorErrors,setError, setSuccess, validateEmail, validatePasswords, validatePasswordEquality, makeCaptcha, showCapcha ,activateCaptcha,refres_captcha} from '../functions/functions.js';

document.addEventListener("DOMContentLoaded", () => {
    // Email form
    const current_email = document.getElementById("email1");
    const new_email = document.getElementById("email2");
    // Password form
    const current_password = document.getElementById("current_password");
    const new_password = document.getElementById("new_password"); 
    const repeated_password = document.getElementById("password2");

    const errorText = document.querySelectorAll(".error");
    const successText = document.querySelectorAll(".success");
    // Buttons
    const email_button = document.getElementById("email-button");
    const password_button = document.getElementById("password-button");

    // Forms
    const email_form = document.getElementById("email-form");
    const password_form = document.getElementById("password-form");

    //Captcha
    const captcha_element = document.getElementById("captcha-element")

    const emailCaptchaPlaceHolder = document.getElementById("email-captcha-placeholder")
    const passwordCaptchaPlaceHolder = document.getElementById("password-captcha-placeholder")

    const captcha_container = document.querySelector(".captcha-container");
    const captcha_text = document.querySelector(".captcha-text");
    const captcha_refreshbutton = document.querySelector("#captcha-refresh");
    const captcha_submitButton = document.querySelector("#captcha-button");
    const captcha_userIpnut = document.querySelector("#captcha-input");
    //---------------------------------------------------------------------
    captcha_refreshbutton.addEventListener('click', e=> {
        refres_captcha(captcha_text);
    })
    const onSuccess = ()=>{
        captcha_validated = true;
    }
    colorErrors(errorText);

    let captcha_validated = false;
    email_button.addEventListener('click', e=> {
        e.preventDefault();
        validateEmail_button();
    })

    password_button.addEventListener('click', e=> {
        e.preventDefault();
        validatePassword_button();
    })

    const validatePassword_button = () => {
        const current_passwordValue = current_password.value.trim(); 
        const new_passwordValue = new_password.value.trim();
        const repeated_passwordValue = repeated_password.value.trim();

        
        const distinct_passwords = current_passwordValue !== new_passwordValue;
        let password_equality;

        const current_passwordValidation = validatePasswords(current_passwordValue);
        const new_passwordValidation = validatePasswords(new_passwordValue);
        const repeated_passwordValidation = validatePasswords(repeated_passwordValue);

        if(typeof current_passwordValidation === "string") {
            setError(current_password, current_passwordValidation);
        }else {
            setSuccess(current_password)
            if(typeof new_passwordValidation === 'string'){
                setError(new_password, new_passwordValidation);
            }else if(!distinct_passwords) {
                setError(new_password,"Please enter a different password");
            }
            else {
                setSuccess(new_password);
                if(typeof repeated_passwordValidation === "string"){
                    setError(repeated_password, repeated_passwordValidation);
                }else {
                    setSuccess(repeated_password);
                    password_equality =validatePasswordEquality(new_passwordValue, repeated_passwordValue);
                }
                
            }
        }
        if(current_passwordValidation === true 
            && new_passwordValidation === true 
            && repeated_passwordValidation === true 
            && distinct_passwords 
            && password_equality){
                if(captcha_validated){
                    password_form.submit();
                }
                activateCaptcha(passwordCaptchaPlaceHolder,captcha_element,captcha_container,captcha_text,captcha_userIpnut,captcha_submitButton,onSuccess);
        }





    }

    const validateEmail_button = () => {
        const current_emailValue = current_email.value.trim();
        const new_emailValue = new_email.value.trim(); 

        const current_emailValidation = validateEmail(current_emailValue);
        const new_emailValidation = validateEmail(new_emailValue);


        
        if(typeof current_emailValidation === "string") setError(current_email,current_emailValidation);
        else setSuccess(current_email);

        if(typeof new_emailValidation === "string") setError (new_email, new_emailValidation);
        else setSuccess(new_email)
        if(current_emailValidation === true && new_emailValidation === true){
            if(current_emailValue === new_emailValue){
                setError(new_email,"Please enter a different email");
                setError(current_email, "")
            }
            if(captcha_validated)
            {
                email_form.submit();
            }else if(current_emailValue !== new_emailValue){
                activateCaptcha(emailCaptchaPlaceHolder,captcha_element,captcha_container,captcha_text,captcha_userIpnut,captcha_submitButton,onSuccess);
            }
        }

    }
})