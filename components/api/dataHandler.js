import axios from 'axios'
export default function dataHandler(apiUrl, method, body) {
    let ret;

    let rep = function (callback) {


        axios({
            method: method,
            url: apiUrl,
            data: body,
            //headers: {'Content-Type': '' }
        })
            .then(function (response) {
                //handle success

                if (response.data.state === 100)//success response
                    ret = true;
                else
                    ret = false;

                callback(response.data, ret);


            })
            .catch(function (response) {
                //handle error
                callback(response, false);
                console.log(response);
            });

    }
    return rep;

}
export  function dataHandlerWithFetch(apiUrl, method, body) {
    return async function (callback) {
        try {
            const response = await fetch(apiUrl, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: body ? JSON.stringify(body) : undefined
            });

            const data = await response.json();

            let ret;
            if (data.state === 100)
                ret = true;
            else
                ret = false;

            callback(data, ret);

        } catch (error) {
            console.log(error);
            callback(error, false);
        }
    };
}
