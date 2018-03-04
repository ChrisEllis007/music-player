import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

describe("Test", () => {
    beforeAll(() => {
        global.window.matchMedia = jest.fn(() =>
        { return { matches: false, addListener: jest.fn(), removeListener: jest.fn() } })
    });


    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('returns an array of songs when a search query is passed in', () => {
    });

    it('does not search for songs if the search query is empty', () => {

    });
    it('when a search query of 3 or more characters has been entered it calls the search query service', () => {
    });
});