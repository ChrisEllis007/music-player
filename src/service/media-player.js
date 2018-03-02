import React from 'react';

/**
 * Deals with playing audio tracks
 */
class MediaPlayer extends React.Component {

    constructor(props) {
        super(props);

        this.audio = new Audio();
        this.audio.autoplay = true;
        this.state = {
            playing: undefined
        }
    }

    /**
     * Plays a given song
     * @param audioUrl
     * @returns {Promise<void>}
     */
    playSong(audioUrl) {
        if (this.state.playing !== undefined) {
            //stop the current song
        }
        //play a song
        this.audio.src = audioUrl;
        return this.audio.play();
    }

    /**
     * Pauses the current song
     */
    pause() {
        //pause song
    }

}

export default MediaPlayer;