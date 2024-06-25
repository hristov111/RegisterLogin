jest.mock('../functions/functions', () => {
    // Require the original module to not be mocked...
    const originalModule = jest.requireActual('../functions/functions');
  
    return { 
      __esModule: true, // Use it when dealing with esModules
      ...originalModule,
      makeCaptcha: jest.fn(),
      setError:jest.fn(),
      setSuccess:jest.fn(),
    };
  });
import { refres_captcha, makeCaptcha,activateCaptcha,showCapcha, setSuccess, setError ,colorErrors} from "../functions/functions";


describe("aa", ()=> {
    let captcha_placeholder
    ,captcha_container ,
    captcha_text, captcha_userInput,captcha_submitButton;
    
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
        makeCaptcha.mockReturnValue("hello");
        captcha_placeholder = document.querySelector(".captcha-placeholder");
        captcha_container = document.querySelector(".captcha-container");
        captcha_text = document.getElementById("captcha");
        captcha_userInput = document.getElementById("captcha-input");
        captcha_submitButton = document.getElementById("captcha-button");

    })
    afterEach(()=> {
        document.body.innerHTML = '';
        jest.clearAllMocks()
    })

    test("Should call the setError method,because there is no input from the user", ()=> {
        activateCaptcha(captcha_placeholder,captcha_container,captcha_text,captcha_userInput,captcha_submitButton,()=>true,showCapcha,setError,setSuccess);
        captcha_submitButton.click();
        expect(setError).toHaveBeenCalledWith(expect.anything(), '');
    })
    test("Should call the setError method, because the input from the user doesnt match the captcha", ()=> {
        activateCaptcha(captcha_placeholder,captcha_container,captcha_text,captcha_userInput,captcha_submitButton,()=>true,showCapcha,setError,setSuccess);
        captcha_userInput.value = "hello123";
        captcha_submitButton.click();
        expect(setError).toHaveBeenCalledWith(expect.anything(), '');
    })
    test("Should call the setSuccess method, because the input from the user match the captcha", ()=> {
        activateCaptcha(captcha_placeholder,captcha_container,captcha_text,captcha_userInput,captcha_submitButton,()=>true,showCapcha,setError,setSuccess);
        captcha_userInput.value = "hello";
        captcha_text.innerText = "hello";
        captcha_submitButton.click();
        expect(setSuccess).toHaveBeenCalledWith(expect.anything());
    })

    test("Validate if cpatcha_text is assigned properly in the refreshing_captcha", ()=> {
        refres_captcha(captcha_text, makeCaptcha);
        expect(captcha_text.innerText).toBe("hello");
    })

    test("Showing the captcha",()=> {
        showCapcha(captcha_placeholder, captcha_container, captcha_text);

        expect(captcha_container.style.display).toBe("flex");
        expect(captcha_container.style.flexDirection).toBe("row");
        expect(captcha_container.style.alignItems).toBe("center");
        expect(captcha_placeholder.children).toContain(captcha_container);
    })
    test("Seeing if captcha_text will be assigne properly in showCaptcha", ()=> {
        expect(showCapcha(captcha_placeholder, captcha_container, captcha_text, makeCaptcha)).toBe("hello");
    })

})


describe("Testing if colorErrors will set error/success to the input controls", ()=> {
    let errorText,container;
    beforeEach(()=> {
        document.body.innerHTML = `
        <div class="first">
            <div class="error-text">Hello</div>
        </div>
        <div class="second">
            <div class="error-text"></div>
        </div>
        
        
        `
        errorText = document.querySelectorAll(".error-text");
        colorErrors(errorText);
    })

    afterEach(()=> {
        document.body.innerHTML = '';
    })

    test("If the function will see the first error", ()=>{
        const FirstErrorElement = errorText[0];

        expect(FirstErrorElement.parentElement.classList.contains("error")).toBe(true);
        expect(FirstErrorElement.parentElement.classList.contains("success")).toBe(false);
    })
    test("If the function will no error", ()=>{
        const FirstErrorElement = errorText[1];

        expect(FirstErrorElement.parentElement.classList.contains("error")).toBe(false);
    })



})


// const colorErrors = (errorText) => {
//     errorText.forEach(el=> {
//         if(el.textContent.trim()){
//             el.parentElement.classList.add('error');
//             el.parentElement.classList.remove('success');
//         }
//     })
// }