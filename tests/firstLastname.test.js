

jest.mock("../functions/functions", () => {
    const original = jest.requireActual("../functions/functions")
    return {
        ...original,
        setError: jest.fn(), 
        setSuccess: jest.fn() 
    }

});
import { validateFirstLastName, setError,setSuccess} from "../functions/functions";


describe("Testing firstname/lastname", () => {
    let firstname, lastname;
    beforeEach(() => {
        document.body.innerHTML = `
           <div>
            <input class="first-name" type="text" name="firstname">
            <span class="error"></span>
        </div>
        <div>
            <input class="last-name" type="text" name="lastname">
            <span class="error"></span>
        </div>
        `;
        firstname = document.querySelector('.first-name');
        lastname = document.querySelector('.last-name');
    });

    afterEach(() => {
        document.body.innerHTML = '';
        jest.clearAllMocks(); 
    });

    test("Check if firstname and lastname are empty strings", () => {
        firstname.value = '';
        lastname.value = '';
        validateFirstLastName(firstname, lastname,setError,setSuccess)
        expect(setError).toHaveBeenCalledWith(firstname, "FirstName required");
        expect(setError).toHaveBeenCalledWith(lastname, "LastName required");


    });
    test("Check firstname contains numbers and lastname contains numbers", () => {
        firstname.value = 'alo12';
        lastname.value = 'hello12';
        validateFirstLastName(firstname, lastname,setError,setSuccess)
        expect(setError).toHaveBeenCalledWith(firstname, "FirstName should contain only letters");
        expect(setError).toHaveBeenCalledWith(lastname, "LastName should contain only letters");


    });
    test("Check firstname is correct and lastname is empty string", () => {
        firstname.value = 'alo';
        lastname.value = '';
        validateFirstLastName(firstname, lastname,setError,setSuccess)
        expect(setSuccess).toHaveBeenCalledWith(firstname);
        expect(setError).toHaveBeenCalledWith(lastname, "LastName required");


    });
    test("Check firstname is correct and lastname is correct", () => {
        firstname.value = 'alo';
        lastname.value = 'hello';
        validateFirstLastName(firstname, lastname,setError,setSuccess)
        expect(setSuccess).toHaveBeenCalledWith(firstname);
        expect(setSuccess).toHaveBeenCalledWith(lastname);


    });
});