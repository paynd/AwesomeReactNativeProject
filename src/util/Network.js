/**
 * Created by paynd on 22.02.17.
 */

const photosUrl = 'https://jsonplaceholder.typicode.com/photos';
const moviesUrl = 'https://facebook.github.io/react-native/movies.json';

export function getListOfImages() {
    // return fetch(moviesUrl)
    return fetch(photosUrl)
        .then(function (response) {
            // alert(response.headers.get('Content-Type')); // application/json; charset=utf-8
            console.log("Response: " + response.status); // 200
            return response;
        })
        // .then(data => return data;)
        .catch((error) => {
            console.error(error);
        });

}

// export async function getListOfImagesAwait() {
//     try {
//         let response = await fetch(moviesUrl);
//         let responseJson = await response.json();
//         return responseJson;
//     } catch (error) {
//         console.error(error);
//     }
// }