const API = process.env.REACT_APP_API_URL;

/**
 * Return all the songs based on a search query
 * Intended use is to search for artists
 *
 * @param searchQuery
 * @returns {Promise<any>}
 */
export const getSongs = (searchQuery) => {
    if(searchQuery) {
        // returns a promise
        return fetch(`${API}/search?term=${searchQuery}`, {method: 'GET'})
            .then(resp => resp.json());
    }else{
        return new Promise((resolve,rejct) => rejct('missing parameter: searchQuery '));
    }
};

/**
 * Return all the songs in a given album
 * @param collectionID
 * @returns {Promise<any>}
 */
export const getSongsOfCollection = (collectionID) => {
    if(collectionID) {
        // returns a promise
        return fetch(`${API}/lookup?id=${collectionID}&entity=song`, {method: 'GET'})
            .then(resp => resp.json());
    }else{
        return new Promise((resolve,rejct) => rejct('missing parameter: collectionID'));
    }
};
