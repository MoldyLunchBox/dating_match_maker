
import axios from 'axios';

export const fieldChecker = async (field,value) => {
    try {
        let response = null
        switch (field) {
            case "username":
                console.log("checkign username")
                response = await axios.post('http://localhost:3001/api/fieldCheck', {
                    username: value
                });
        }


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
        console.log("error fetching interests")
    }
}