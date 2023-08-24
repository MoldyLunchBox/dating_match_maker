
import axios from 'axios';
const isAlphanumeric = (input) => /^[a-zA-Z0-9]+$/.test(input);
const isEmailValid = (email) => {
    const regexPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regexPattern.test(email);
};

export const fieldChecker = async (field, value) => {
    try {
        let response = {
            data: {
                msg: "good"
            }
        };
        console.log("yo", field, value)
        switch (field) {
            case "username":
                response = await axios.post('http://localhost:3001/api/fieldCheck', {
                    username: value
                });
                break
            case "fname":
            case "lname":
                console.log("eh")
                if (!isAlphanumeric(value)) {
                    response = {
                        data: {
                            error: "no special characters or digits"
                        }
                    };
                }
                else if (!value.length) {
                    response = {
                        data: {
                            error: "field must not be empty"
                        }
                    };
                }
                break;
            case "email":
                if (!isEmailValid(value)) {
                    response = {
                        data: {
                            error: "enter valid email"
                        }
                    };
                }
                else{
                    response = await axios.post('http://localhost:3001/api/emailChecker', {
                        email: value
                    });
                }
                break;
            case "gender":
                console.log("gender", value)
                if (value !== "male" && value !== "female" && value !== "other")
                response = {
                    data: {
                        error: "invalid gender choice"
                    }
                };

        }

        console.log(response)
        const divElement = document.getElementById(field);
        if (response && response.data.msg) {

            if (!divElement.classList.contains('border-green-500')) {
                divElement.classList.remove('border-red-500');
                divElement.classList.add('border-green-500');
            }
            console.log("good")
        }
        else if (response && response.data.error) {

            console.log(response.data.error)
            if (!divElement.classList.contains('border-red-500')) {
                divElement.classList.remove('border-green-500');
                divElement.classList.add('border-red-500');
            }
        }

    } catch (err) {
        console.log("error fetching interests", err)
    }
}