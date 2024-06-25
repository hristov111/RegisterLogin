import {validateFirstLastName, setError, setSuccess, validateEmail, validatePasswords, validatePasswordEquality ,activateCaptcha, refres_captcha, colorErrors, makeCaptcha } from '../functions/functions.js';

document.addEventListener("DOMContentLoaded", () => {
    // Login ReGISTER --------------------------------------------
    const register_form_div = document.getElementById('register-form');
    const login_form_div = document.getElementById('login-form');

    const register_form = document.getElementById('form-register');
    const login_form = document.getElementById('form-login');

    const errorText = document.querySelectorAll(".error");

    const successErrorColor = document.querySelectorAll(".input-control");
    
    const ChangeToSignUp_button = document.getElementById('for-signup');
    const ChangeToLogin_button = document.getElementById('for-signin');

    const login_button = document.getElementById('login');
    const register_button = document.getElementById('register'); 
    // -------------------------------------------------------------------
    //Captcha
    const captcha_element = document.getElementById("captcha-element")

    const loginCaptchaPlaceholder = document.getElementById("login-captcha-placeholder")
    const registerCaptchaPlaceholder = document.getElementById("register-captcha-placeholder")

    const captcha_container = document.querySelector(".captcha-container");
    const captcha_text = document.querySelector(".captcha-text");
    const captcha_refreshbutton = document.querySelector("#captcha-refresh");
    const captcha_submitButton = document.querySelector("#captcha-button");
    const captcha_userIpnut = document.querySelector("#captcha-input");
    //---------------------------------------------------------------------
    // Slagame sign up da izliza pyrvo

    // Register credentials
    const firstname = document.getElementById('firstname');
    const lastname = document.getElementById('lastname');
    const register_email = document.getElementById('email');
    const register_password = document.getElementById('password');
    const password2 = document.getElementById('password2');

    // Login Credentials
    const login_email = document.getElementById('login-email');
    const login_password = document.getElementById('login-password');

    captcha_refreshbutton.addEventListener('click', e=> {
        refres_captcha(captcha_text, makeCaptcha);
    })
    colorErrors(errorText);

    ChangeToSignUp_button.addEventListener('click', e=> {
        login_form.reset();
        resetAll();
        login_form_div.classList.add('hidden');
        register_form_div.classList.remove('hidden');
    })
    ChangeToLogin_button.addEventListener('click' ,e=> {
        register_form.reset()
        resetAll();
        login_form_div.classList.remove('hidden');
        register_form_div.classList.add('hidden');
    })
    const resetAll = () => {
        errorText.forEach(element => {
            element.innerText = null;
        });
        successErrorColor.forEach(el => {
            // el.style.border ="2px solid #f0f0f0";
            el.classList.remove("success");
            el.classList.remove("error");
        })
        captcha_container.style.display = "none";
    }

    login_button.addEventListener('click', e => {
        e.preventDefault();

        validateInputs();
    });
    register_button.addEventListener('click', e=> {
        e.preventDefault();

        validateInputs();
    })

    let captcha_validated = false;
    const validateInputs = () => {
        // REGISTER
        const onSuccess = ()=>{
            captcha_validated = true;
        }
        if(!register_form_div.classList.contains("hidden")){
            const firstNameValue = firstname.value.trim();
            const lastNameValue = lastname.value.trim();
            const register_emailValue = register_email.value.trim();
            const register_passwordValue = register_password.value.trim();
            const passwordValue2 = password2.value.trim();
            // the valdation_success must be 5

            // First Name LastName
            const firstlastname_validated = validateFirstLastName(firstname,lastname)
            const email_validation =validateEmail(register_emailValue);
            const password_validation= validatePasswords(register_passwordValue);
            const password_validation2= validatePasswords(passwordValue2);
            // Email
            if(typeof email_validation==='string'){
                setError(register_email,email_validation);
            } 
            else{
                setSuccess(register_email);
            } 

            // First password
            if(typeof password_validation==='string') {
                setError(register_password,password_validation);
            }
            else {
                setSuccess(register_password);
            }

            // Second password
            if(typeof password_validation2==='string'){
                setError(password2,password_validation2);
            } 
            else {
                setSuccess(password2);
            }
            // Check validation of all credentials
            if(password_validation === true && password_validation2 === true && email_validation === true && firstlastname_validated === true)
            {
                const password_equality = validatePasswordEquality(register_passwordValue, passwordValue2)
                if(!password_equality)setError(password2, "Passwords must match!");
                else setSuccess(password2);
                if(password_equality){
                    if(captcha_validated){
                        register_form.submit();
                    }
                    activateCaptcha(registerCaptchaPlaceholder, captcha_container, captcha_text, captcha_userIpnut, captcha_submitButton,onSuccess);

                }
            }   
        }
        else{
            const login_emailValue = login_email.value.trim();
            const login_passwordValue = login_password.value.trim(); 
            
            const password_validation = validatePasswords(login_passwordValue,true);
            const email_validation =validateEmail(login_emailValue);

            if(typeof email_validation==='string') setError(login_email,email_validation)
            else setSuccess(login_email);
            if(typeof password_validation==='string') setError(login_password,password_validation)
                else setSuccess(login_password);

            if(email_validation === true && password_validation === true){
                if(captcha_validated){
                    login_form.submit();
                }
                activateCaptcha(loginCaptchaPlaceholder, captcha_container, captcha_text, captcha_userIpnut, captcha_submitButton, onSuccess)

            }
        
        }

    
        
    };
})
