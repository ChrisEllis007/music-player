import React from 'react';
import MediaPlayer from './media-player';
import testSong from './../assets/test.mp3'


it('creates an audio object', () => {
    const mp = new MediaPlayer();
    expect(mp.audio).toBeDefined();
});

it('can play a song', () => {
    //TODO this is failing for some reason...
    expect.assertions(1);
    const mp = new MediaPlayer();
   return mp.playSong(testSong).then(_ => {
       expect(!mp.audio.paused || mp.audio.currentTime > 0).toBeTruthy()
   });
});


it('can stop a song', () => {

});
