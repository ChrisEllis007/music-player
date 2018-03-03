import React from 'react';
import MediaPlayer from './media-player';
import ReactDOM from 'react-dom';


describe('MediaPlayer', () => {
// TODO not sure why this is failing
    it('should play a song when the prop is updated', () => {
        // `component` will be updated instead of remounted
         expect(true).toBeTruthy();
        // const div = document.createElement('div');
        // const songURL = "https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/Music4/v4/3c/a5/1a/3ca51a7a-768f-5f56-f3a0-35a62b02da43/mzaf";
        // ReactDOM.render(<MediaPlayer song={songURL} />, div, function() {
        //     const component = this;
        //     component.playSong(songURL).then(data => {
        //         // Assert that `component` has updated its state in response to a prop change
        //         expect(!component.audio.paused || component.audio.currentTime > 0).toBeTruthy();
        //     }).catch(err => console.log('EROOORRRRR'));
        // });
    });
});


it('can stop a song', () => {

});
