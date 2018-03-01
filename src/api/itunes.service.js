const API = process.env.REACT_APP_API_URL;


export const getSongs = (searchQuery) => {
    // returns a promise
    return fetch(`${API}/search?term=${searchQuery}`, {method: 'GET'})
        .then(resp => resp.json());
};
