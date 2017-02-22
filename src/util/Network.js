/**
 * Created by paynd on 22.02.17.
 */

const jsonServerPlaceholder = 'https://jsonplaceholder.typicode.com/photos';

export function getListOfImages() {
    return fetch(jsonServerPlaceholder)
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        });

}