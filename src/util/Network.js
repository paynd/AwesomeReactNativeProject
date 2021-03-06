/**
 * Created by paynd on 22.02.17.
 */
export default function getListOfImages() {
  const photosUrl = 'https://jsonplaceholder.typicode.com/photos'
  // return fetch(moviesUrl)
  return fetch(photosUrl)
    .then((response) => {
      // alert(response.headers.get('Content-Type')); // application/json; charset=utf-8
      console.log(`Response: ${response.status}`) // 200
      return response
    }).catch((error) => {
      console.error(error)
    })
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
