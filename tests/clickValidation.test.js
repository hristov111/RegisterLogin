import {validatePassword_button,validateEmail_button} from "../home/settings"
import {validatePasswords,validatePasswordEquality,activateCaptcha,setError,setSuccess,validateEmail} from "../functions/functions"

jest.mock('../functions/functions', () => ({
    validatePasswords: jest.fn(),
    setError: jest.fn(),
    setSuccess: jest.fn(),
    validateEmail:jest.fn(),
    validatePasswordEquality: jest.fn(),
    activateCaptcha: jest.fn()
}));



describe("Checking the password validation", ()=> {
    let current_password,new_password,repeated_password,form

    beforeEach(()=> {
        document.body.innerHTML = `
        <form action="" class"form">
            <input class="first_password" type="password" name="password1">
            <input class="second_password" type="password" name="password2">
            <input class="third_password" type="password" name="password3">
        </form>
        
        `
        form = document.querySelector(".form");
        current_password = document.querySelector(".first_password");
        new_password = document.querySelector(".second_password");
        repeated_password = document.querySelector(".third_password");
    })

    afterEach(()=> {
        document.body.innerHTML = '';
        jest.clearAllMocks();
    })

    test("Checking if current_password's is bad,would it call setError", ()=> {
        current_password.value = "";
        validatePasswords.mockReturnValue("bad password");

        validatePassword_button(current_password,new_password,repeated_password,form,false);
        expect(validatePasswords).toHaveBeenCalledWith(current_password.value.trim());
        expect(setError).toHaveBeenCalledWith(current_password,"bad password");
        expect(setSuccess).not.toHaveBeenCalled();
        
    })
    test("Checking if current_password's avlue is good,would it call success", ()=> {
        current_password.value = "somePass";
        validatePasswords.mockReturnValue(true);

        validatePassword_button(current_password,new_password,repeated_password,form,false);
        expect(validatePasswords).toHaveBeenCalledWith(current_password.value.trim());
        expect(setSuccess).toHaveBeenCalledWith(current_password);
        
    })
    test("Checking if current_password is good and new password is bad", ()=> {
        current_password.value = "hello";
        new_password.value = "somePass";
        validatePasswords.mockReturnValueOnce(true)
                            .mockReturnValueOnce("bad password");

        validatePassword_button(current_password,new_password,repeated_password,form,false);
        expect(validatePasswords).toHaveBeenCalledWith(current_password.value.trim())
        expect(validatePasswords).toHaveBeenCalledWith(new_password.value.trim());
        expect(setError).toHaveBeenCalledWith(new_password, "bad password");
        expect(setSuccess).toHaveBeenCalledWith(current_password);
        
    })
    test("Checking if the new password is different from the current", ()=> {
        current_password.value = "hello123";
        new_password.value = "hello123";

        validatePasswords.mockReturnValue(true)

        validatePassword_button(current_password,new_password,repeated_password,form,false);
        expect(validatePasswords).toHaveBeenCalledWith(current_password.value.trim())
        expect(validatePasswords).toHaveBeenCalledWith(new_password.value.trim());
        expect(setSuccess).toHaveBeenCalledWith(current_password);
        expect(setError).toHaveBeenCalledWith(new_password,"Please enter a different password");
    })
   
    test("Checking if the new password is the same as the repeated", ()=> {
        current_password.value = "Hello13!"
        new_password.value = "Hello12!";
        repeated_password.value = "Hello1!"
        validatePasswords.mockReturnValueOnce(true).mockReturnValueOnce(true);
        validatePasswordEquality.mockReturnValue(false);

        validatePassword_button(current_password,new_password,repeated_password,form,false);
        expect(setError).toHaveBeenCalledWith(repeated_password, "Passwords must match!");
    })

})


describe("Checking the email validation", ()=> {
    let current_email,  new_email, email_from;

    beforeEach(()=> {
        document.body.innerHTML = `
            <form class="form">
                <input class="current-email" type="email"></ipnut>
                <input class="new-email" type="email"></ipnut>
            </form>
        `
        email_from = document.querySelector('.form');
        current_email = document.querySelector(".current-email")
        new_email = document.querySelector(".new-email")
    })

    afterEach(()=>{
        document.body.innerHTML = '';
        jest.clearAllMocks();
    })

    test("First email is wrong", ()=> {
        current_email.value = "";
        validateEmail.mockReturnValue("wrong email");

        validateEmail_button(current_email,new_email,email_from,false); 
        expect(validateEmail).toHaveBeenCalledWith(current_email.value.trim());
        expect(setError).toHaveBeenCalledWith(current_email,"wrong email");
        expect(setSuccess).not.toHaveBeenCalledWith(current_email);
    })
    test("second email is wrong", ()=> {
        current_email.value = "hello@abv.bg";
        new_email.value = "asf";
        validateEmail.mockReturnValueOnce(true);
        validateEmail.mockReturnValueOnce("wrong email")

        validateEmail_button(current_email,new_email,email_from,false); 
        expect(validateEmail).toHaveBeenCalledWith(current_email.value.trim());
        expect(validateEmail).toHaveBeenCalledWith(new_email.value.trim());
        expect(setSuccess).toHaveBeenCalledWith(current_email);
        expect(setError).toHaveBeenCalledWith(new_email, 'wrong email'); 
    })
    test("Both email are correct, but are equal", ()=> {
        current_email.value = "hello@abv.bg";
        new_email.value = "hello@abv.bg";
        validateEmail.mockReturnValueOnce(true);
        validateEmail.mockReturnValueOnce(true)

        validateEmail_button(current_email,new_email,email_from,false); 
        expect(validateEmail).toHaveBeenCalledWith(current_email.value.trim());
        expect(validateEmail).toHaveBeenCalledWith(new_email.value.trim());
        expect(setError).toHaveBeenCalledWith(new_email, "Please enter a different email");
        expect(setError).toHaveBeenCalledWith(current_email, ''); 
    })
})