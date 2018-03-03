import React from 'react';
import ReactDOM from 'react-dom';
import {getSongs, getSongsOfCollection} from "./itunes.service";


describe('getSongs()', () => {

    it('should return an error if there is no search string', () => {
        expect.assertions(1);
        return getSongs().catch(err =>
            expect(err).toMatch(/missing parameter/));
    })

    it('should load some some songs', () => {
        expect.assertions(2);
        return getSongs('tina+arena')
            .then(data => {
                expect(data).toBeDefined();
                expect(data.resultCount).toBeDefined();
            })
    });
    it('should return songs in an array', () => {
        return getSongs('tina+arena')
            .then(data => {
                expect(Array.isArray(data.results)).toBe(true)
            })
    });
    it('should specify the number of songs in the collection', () => {
        return getSongs('tina+arena')
            .then(data => {
                const count = data.resultCount;
                const results = data.results.length;
                expect(count).toBe(results)
            })
    });
    it('should return an artist name for each song', () => {
        return getSongs('tina+arena')
            .then(data => {
                for(let i = 0; i < data.results; i++){
                    expect(data.results[i].artistName ).toBeDefined();
                }
            })
    });
    it('should contain a track name for each song', () => {
        return getSongs('tina+arena')
            .then(data => {
                for(let i = 0; i < data.results; i++){
                    expect(data.results[i].trackName ).toBeDefined();
                }
            })
    });
    it('should return a url to play each song', () => {
        return getSongs('tina+arena')
            .then(data => {
                for(let i = 0; i < data.results; i++){
                    expect(data.results[i].previewUrl).toBeDefined();
                }
            })
    })
});


describe('getSongsOfCollecion()', () => {

    it('should return an error if there is no collectionID', () => {
        expect.assertions(1);
            return getSongsOfCollection().catch(err =>
                expect(err).toMatch(/missing parameter/));
    });

    it('should return a list of songs in the album', () => {
        return getSongsOfCollection('879273552').then(data =>
                expect(Array.isArray(data.results)).toBe(true)
            );
    });
});
