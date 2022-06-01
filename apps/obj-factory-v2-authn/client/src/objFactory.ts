const objectsEndpoints = {
    getObjects: `${process.env.REACT_APP_SERVER_URL}/api/objects`,
};


export async function fetchObjectsFromFactory(accessToken) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers,
    };

    return fetch(objectsEndpoints.getObjects, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}