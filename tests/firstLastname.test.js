// jest.mock('../functions/functions', () => {
//     const original = jest.requireActual('../functions/functions'); // Get the original module
//     return {
//         ...original, // Spread all original functions
//         setError: jest.fn(), // Mock only setError
//         setSuccess: jest.fn() // Mock only setSuccess
//     };
// });
// import { validateFirstLastName, setError} from "../functions/functions";



// describe("Testing firstname/lastname", () => {
//     let firstname, lastname;
//     beforeEach(() => {
//         jest.clearAllMocks();
//         document.body.innerHTML = `
//             <input class="first-name" type="text" name="firstname">
//             <input class="last-name" type="text" name="lastname">
//         `;
//         firstname = document.querySelector('.first-name');
//         lastname = document.querySelector('.last-name');
//     });

//     afterEach(() => {
//         document.body.innerHTML = '';
//         jest.resetAllMocks(); // Clears any previous mock call information
//     });

//     test("Check if firstname and lastname are empty strings", () => {
//         firstname.value = "";
//         lastname.value = "";
//         validateFirstLastName(firstname, lastname);

//         expect(setError).toHaveBeenCalledWith(firstname, "FirstName required");
//         expect(setError).toHaveBeenCalledWith(lastname, "LastName required");
//     });
// });
