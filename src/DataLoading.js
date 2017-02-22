/**
 * Created by paynd on 22.02.17.
 */

export function getListOfImages() {
    return fetch('https://jsonplaceholder.typicode.com/photos')
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });

}