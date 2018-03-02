import React from 'react';
import MediaPlayer from './media-player';
import ReactDOM from 'react-dom';
let node, component;


// TODO not sure why this is failing
it('should play a song when the prop is updated', function(done){
    // `component` will be updated instead of remounted
    const div = document.createElement('div');
    const songURL = "https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/Music4/v4/3c/a5/1a/3ca51a7a-768f-5f56-f3a0-35a62b02da43/mzaf";
    ReactDOM.render(<MediaPlayer song={songURL} />, div, function() {
        component = this;
        // Assert that `component` has updated its state in response to a prop change
        expect(!component.audio.paused || component.audio.currentTime > 0).toBeTruthy();
        done();
    });
});


it('can stop a song', () => {

});
