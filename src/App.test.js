import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('returns an array of songs when a search query is passed in', () =>{
    // expect.assertions(1);
    // return fetchData().then(data => {
    //     expect(data).toBe('peanut butter');
    // });
});

it('does not search for songs if the search query is empty', () => {

});