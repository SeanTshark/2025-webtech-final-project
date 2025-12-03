const jokesCheck = document.getElementById('jokes-check');
const passwordGeneratorCheck = document.getElementById('password-generator-check');
const apiInputField = document.getElementById('input-field');
const inputFieldText = document.getElementById('input-field-text');
const apiResponseField = document.getElementById('api-response-field');

function jokesCheckBox(){
    jokesCheck.addEventListener('change', () => {
        if (jokesCheck.checked) {
            passwordGeneratorCheck.checked = false;
            apiInputField.style.display = 'none';
            inputFieldText.style.display = 'none';
            apiInputField.value = '';
            apiResponseField.textContent = '';

        }
    });
}

function passwordsCheckBox(){
    passwordGeneratorCheck.addEventListener('change', () => {
        if (passwordGeneratorCheck.checked) {
            jokesCheck.checked = false;
            apiInputField.style.display = 'initial';
            inputFieldText.style.display = 'flex';
            apiInputField.value = '';
            apiResponseField.textContent = '';

        }
    });
}


function apiResponseButton(){


    const apiRequestForm = document.getElementById('api-html-form');
    apiRequestForm.addEventListener('submit', (event) => {
        event.preventDefault();

    });

    const requestButton = document.getElementById('api-request-button');

    requestButton.addEventListener('click', () => {
        apiResponseField.textContent = 'Getting Response...';
        if (jokesCheck.checked) {
            getJokesApi();
        } else if (passwordGeneratorCheck.checked) {
            getPasswordGeneratorApi();
        } else {
            apiResponseField.textContent = 'no response';
        }

    });

}


function getJokesApi(){
    fetch('https://api.api-ninjas.com/v1/jokes', {
        headers: { 'X-Api-Key': 'INSERT-API-KEY' }
    })
        .then(response => response.json())
        .then(data => {
            if (data && data.error) {
                apiResponseField.textContent = `API Error: ${data.error}`;
                return;
            }

            if (data.length > 0) {
                apiResponseField.textContent = data[0].joke;
            } else {
                apiResponseField.textContent = 'No joke found!';
            }
        })
        .catch(error => {
            console.error('Error fetching joke:', error);
            apiResponseField.textContent = 'Failed to fetch joke.';
        });

}

function passwordInputValidation(){
    let inputBlank = apiInputField.value.trim();
    if (inputBlank === '') {
        apiResponseField.textContent = '! ! ! Input field is blank ! ! !';
        apiInputField.value = '';
        return false;
    }

    let inputString = Number(inputBlank) ;

    if (Number.isNaN(inputString)) {
        apiResponseField.textContent = '! ! ! Input was not a number ! ! !';
        apiInputField.value = '';
        return false;
    }

    if (!Number.isInteger(inputString)){
        apiResponseField.textContent = '! ! ! Input was not a whole number ! ! !';
        apiInputField.value = '';
        return false;
    }

    let inputNumber = inputString;

    if (inputNumber > 0 && inputNumber < 101 ) {
        return inputNumber;
    }
    else {
        apiResponseField.textContent = '! ! ! Input was not a number between 1-100 ! ! !';
        apiInputField.value = '';
        return false;
    }

}



function getPasswordGeneratorApi() {

    const validInput = passwordInputValidation();

    if (validInput) {

        fetch('https://api.api-ninjas.com/v1/passwordgenerator?length=' + validInput, {
            headers: {'X-Api-Key': 'INSERT-API-KEY'}
        })
            .then(response => response.json())
            .then(data => {

                if (data && data.error) {
                    apiResponseField.textContent = `API Error: ${data.error}`;
                    return;
                }

                if (data && data.random_password) {
                    apiResponseField.textContent = data.random_password;
                } else {
                    apiResponseField.textContent = 'No password found!';
                }
            })
            .catch(error => {
                console.error('Error fetching password:', error);
                apiResponseField.textContent = 'Failed to fetch password.';
            });
    }
}

jokesCheckBox();
passwordsCheckBox();
apiResponseButton();