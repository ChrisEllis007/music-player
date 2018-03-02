import React from 'react';
import ReactDOM from 'react-dom';
import {getSongs} from "./itunes.service";


describe('getSongs()', () => {

    it('should load some some songs', () => {
        return getSongs('tina+arena')
            .then(data => {
                expect(data).toBeDefined();
                expect(data.resultCount).toBeDefined();
            })
    });
    it('songs should be in an array', () => {
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
    it('songs should all contain an artist name', () => {
        return getSongs('tina+arena')
            .then(data => {
                for(let i = 0; i < data.results; i++){
                    expect(data.results[i].artistName ).toBeDefined();
                }
            })
    });
    it('songs should all contain a track name', () => {
        return getSongs('tina+arena')
            .then(data => {
                for(let i = 0; i < data.results; i++){
                    expect(data.results[i].trackName ).toBeDefined();
                }
            })
    });
    it('songs should all contain a url to play them', () => {
        return getSongs('tina+arena')
            .then(data => {
                for(let i = 0; i < data.results; i++){
                    expect(data.results[i].previewUrl).toBeDefined();
                }
            })
    })
});