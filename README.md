# RegisterLogin Project
## How to run the app - 
1. You need to have xaamp installed -https://sourceforge.net/projects/xampp/, start the Apacheand the MySql modules.
2. PHP,phpmyAdmin and MySql required for the project to run.
3. Install vs code -https://code.visualstudio.com/
4. Make a new folder (for example myWebsite)
5. Open a terminal and cd to the folder you've just created and use -git clone https://github.com/hristov111/RegisterLogin.git
## If you want to add/modify my jest tests
5. Create a new package.json file (npm init) and delete mine from the folder
6. Then install babel - npm install --save-dev @babel/core @babel/cli @babel/preset-env
7. Then install jest for testing - npm install --save-dev jest babel-jest
8. Then add this line on the bottom of your package.json
9. "jest": {
    "testEnvironment": "jest-environment-jsdom",
    "transform": {
      "^.+\\.[t|j]sx?$": "babel-jest"
    }
  }


Overview
This project implements simple register and login pages using JavaScript for the frontend and PHP for the backend.A home page ,settings page.

Technologies Used
Frontend: JavaScript, HTML, CSS
Backend: PHP

## Files- ../register/index.php , functions/functions.js
Let's start with the register/index.php file. Here you can see in the body i have one div container for the login/register forms. The login form is hidden with a css style of ="dispay:none".
When the button with class="form-button" is clicked, the event listener in the functions js file responsible for that button removes the class hidden from the login form and
adds it to the register form.
In the register form there are four input fields for firstname,lastname,email,password,repeate password. If the user clicks the sign up button without filling a single
input field, the event listerner in the js responsible for that will be triggered and will validate the input, which ofcourse will not be true. Let's see how the validation
happens. In script.js in register folder if we scroll down we can see a function named validateInputs. The function checks whether the login or register form is
currently active. If the register form is active, then 5 variables are assigned and then 4 validations are executed,which functions are located in the ../functions.functions.js
dir.The first check is the validateFirstLastName(firstname,lastname). It takes two parameters which are the dom input elements.In that function the firstname and the last 
name are checked under two conditions each-if the input given is empty='', and if the input contains characters not located in the alphabet. Then if both inputs are
true the return is true and a function setSuccess() called which removes the error class from the div below the input field in the html is,either false and a functions 
setError is called which removes the success class from the div below the input field and adds error class.The second validation in script.js is for the email which takes the email dom el only as parameter.Its tested under two conditions-
if the input is empty or id doesn't include @.. If the two conditions are met the func returns true,either a string "Email is invalid" or "Email is required".
After that the two passwords are checked in the validatePasswords(pass,for_login=false) function.The second parameter is for the login form when the user logs in.
The password given is tested under three conditions, the first is if it's empty the second if it's below 8 chaarcters and the thirds reuires the password to have 
one special caharcter like (!@#$...). If all the conditions are met the funcion returns true.Then all these functions are assigned to variables of the sort pass_validations
.These validations are then checked if the return type is a string,if it is the setError functions is called with example: (passwordDomElement, "Password not valid"),
if it isn't a string, the setSuccess is called with only the DOm element parameter.Then if all of the conditions are met, a function validatePasswordEquality(pass1,pass2)
is called. The two passwords then are checked only if they are equal,if so then it returns true,else false.Then in the script.js if the validation is false
then the SetError() is called with the dom element and a "Passwords  must match" string, else a setSuccess() is called. Then a activateCaptcha() is called with the
registerCaptchaPlaceHolder() which is located under the "Alredy have an account?..." button. The actual captcha html is located in a different file called
captcha.html. It has all the things that a captcha needs.When all the requirements are met with the validation. This captcha is visualized on the screen. And 
untill the captcha is not correct it won't give access to the home page.When the user is authenticated the form directs the credentials to the register.php in register dir.--->

### Files- ../register-handling
Checks if the $_SERVER["REQUEST_METHOD"] === "POST" - security measures
takes user credentials and filers them with filter_input() for the email, hmtlspecialchars() for the first last name and the passwords
in a try catch block firstly i require the dbconnection, register_model, register_controller php files (Discussed below). Then i make a array that will contain all the errors, because we will compare the input from the user
if it exists(if he is signing in), or it already exist(if he is a new user). In that situation two checks are performed,if the email is invalid or the email is
already taken. We make a call to the register-controller.php file function that calls the register-model function that is related to the validation of the email.
The final output is checked in the register.php file. And if the email is invalid, a new error is added to the errors array. Then the same is done if the email is taken.
After that a new file is added config_session.php(Discussed below)
##### dbconnection.php -
Makes the connection to the database 
##### register_model - 
Functions with queries. Initialize a variable query assigned to string the contains a query like "INSERT INTO user (firstName,lastName,email,password) VALUES (:firstName,:lastName,:email, :password)".
After that i bind the filtered input from the user to the query string (sql injection prevented) and the query is executed with a $stmt->execute(), then the results are fetched and returned to the controller function
##### register_controller- 
Functions call to the model functions and filters the output if it exists or not.
##### config_session.php

##### --------------------------------------------------------------------------

