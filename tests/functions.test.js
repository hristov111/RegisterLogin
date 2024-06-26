import {setError, setSuccess, validateEmail, validatePasswords, validatePasswordEquality,makeCaptcha, showCapcha, activateCaptcha, refres_captcha, colorErrors } from '../functions/functions';


test("Validates a password", () => {
    expect(validatePasswords('')).toBe("Password required!");
    expect(validatePasswords('asfasffas')).toBe("Password must have atleast one uppercase letter!");
    expect(validatePasswords('Asfasf')).toBe("Password must contain atleast 8 characters")
    expect(validatePasswords("Alohahaa")).toBe("Password must contain one special character");
    expect(validatePasswords("Kalata6767@")).toBe(true);
    expect(validatePasswords('Keloa12',true)).toBe("Password must contain atleast 8 characters");
    expect(validatePasswords('Heloa12g@',true)).toBe(true);
})




test("Validate email", () => {
    expect(validateEmail('')).toBe("Email required!");
    expect(validateEmail('email.com')).toBe("Email Invalid!");
    expect(validateEmail('aloha@bg')).toBe("Email Invalid!");
    expect(validateEmail("aloha@.abv.bg")).toBe(true);
    expect(validateEmail("aloha@gmail.bg")).toBe(true);
});



test("Validate password equality", ()=> {
    expect(validatePasswordEquality('asfsaf','agag')).toBe(false);
    expect(validatePasswordEquality("alo123", "alo123")).toBe(true);
})

describe("Validate set success/error functions", ()=> {
    let inputElelement, inputControl, errorDisplay;
    beforeEach(()=>{
        document.body.innerHTML = `
        <div class="input-control">
            <input id="test-input">
            <div class="error"></div>
        </div>    
        `
        inputElelement = document.getElementById("test-input");
        inputControl = inputElelement.parentElement;
        errorDisplay = inputControl.querySelector(".error");
    })
    afterEach(()=> {
        document.body.innerHTML = '';
    })

    test("Set error test", ()=> {
        setError(inputElelement,"Error message");

        expect(errorDisplay.innerText).toBe("Error message");
        expect(inputControl.classList.contains("error")).toBe(true);
        expect(inputControl.classList.contains("success")).toBe(false);

    })
    test("Set success test", ()=> {
        setSuccess(inputElelement);

        expect(errorDisplay.innerText).toBe('');
        expect(inputControl.classList.contains("error")).toBe(false);
        expect(inputControl.classList.contains("success")).toBe(true);
    })


    

})

describe("Making captcha/Refreshing captcha", ()=> {
    let captcha_placeholder, captcha_container,captcha_text
    beforeEach(()=> {
        document.body.innerHTML = `
        <div class="captcha-placeholder" id="register-captcha-placeholder">
            <div id="captcha-element"  class="input-control captcha-container">
                <div class="captcha-text-conainer">
                    <button type="button" id="captcha-refresh">🔃</button>
                    <span class="captcha-text" id="captcha"></span>
                    
                </div>
                <div class="captcha-input-container input-control">
                    <div class="error" id="captcha-error"></div>
                    <label for="captcha-input">Enter text</label>
                    <input type="text" id="captcha-input" name="captcha" required><br>
                </div>
                <button type="button" id="captcha-button">Submit</button>
            </div>
        </div>
        
        `;
        captcha_placeholder = document.querySelector(".captcha-placeholder");
        captcha_container = document.querySelector(".captcha-container");
        captcha_text = document.querySelector(".captcha-text");

    })
    afterEach(()=> {
        document.body.innerHTML = '';
    })




    test("Should return a string of length 6", ()=> {
        const captcha = makeCaptcha();
        expect(captcha).toHaveLength(6);
    })


    test("Should return only valid characters", ()=> {
        const validchars = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890";
        const captcha = makeCaptcha();

        for(let i =0;i<makeCaptcha.length;i++){
            expect(validchars).toContain(captcha[i]);
        }

    })
    test("Should retrun unique string everytime it is called", ()=> {
        const firstCaptcha = makeCaptcha();
        const secondCaptcha = makeCaptcha();

        expect(firstCaptcha).not.toBe(secondCaptcha);
    });
})
