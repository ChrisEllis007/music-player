import React from 'react';
import PropTypes from 'prop-types';
import './media-player.css'
import playBtn from '../../assets/images/play.png';
import pauseBtn from '../../assets/images/pause.png';

/**
 * Deals with playing audio tracks
 */
class MediaPlayer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            playing: undefined,
            paused: false
        }
    }


    /**
     * Plays a given song
     * @param audioUrl
     */
    playSong(audioUrl) {
        this.audio.src = audioUrl;
        this.audio.play().catch(err => console.log('error playing audio ',err));
        this.setState({playing: true, paused: false});
    }

    /**
     * Pauses the current song
     */
    pause() {
        //pause song
        this.setState({paused: true});
        this.audio.pause();
    }

    /**
     * resumes a paused song
     */
    resume(){
        this.setState({paused: false});
        this.audio.play();
    }

    // lifecycle event
    // TODO not sure why this gets called multiple times
    /**
     * Plays a song when the song property has changed
     * @param nextProps
     */
    componentWillReceiveProps(nextProps){
        if (nextProps.song !== this.props.song) {
            this.playSong(nextProps.song);
        }
    }

    render(){
        return(
            <div className={'media-player '
            + (!this.state.paused ? ' is-paused':'')
            + (this.state.playing ? ' is-playing':'') }>
                <img className='media-player-btn media-player-btn-play'
                     onClick={this.resume.bind(this)}
                     src={playBtn} alt='play button' />
                <img className='media-player-btn media-player-btn-pause'
                     onClick={this.pause.bind(this)}
                     src={pauseBtn} alt='pause button' />
                <audio crossOrigin="anonymous" ref={(el) => { this.audio = el; }} />
            </div>
        )
    }

}

MediaPlayer.propTypes = {
    song: PropTypes.string
};

export default MediaPlayer;