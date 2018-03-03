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
    }


    /**
     * Plays a given song
     * @param audioUrl
     */
    playSong(audioUrl) {
        this.audio.src = audioUrl;
        if (this.props.autoPlay !== false) {
            this.startSong();
        }
    }

    /**
     * starts a song playing
     */
    startSong(){
        // call the onplay handler
        this.audio.play().catch(err => console.log('error playing audio ',err));
        this.props.onPlay(true);
        // this.setState({playing: true, paused: false});
    }

    /**
     * Pauses the current song
     */
    pause(event) {
        //pause song
        event.stopPropagation();
        event.preventDefault();
        this.props.onPause(true);
        // this.setState({paused: true});
        this.audio.pause();
    }

    /**
     * resumes a paused song
     */
    resume(event){
        event.stopPropagation();
        event.preventDefault();
        this.props.onPause(false);
        this.startSong();
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
            + (!this.props.isPaused ? ' is-paused':'')
            + (this.props.isPlaying ? ' is-playing':'') }>
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
    song: PropTypes.string,
    autoPlay: PropTypes.bool,
    onPause: PropTypes.func,
    onPlay: PropTypes.func,
    isPaused:PropTypes.bool,
    isPlaying:PropTypes.bool

};

export default MediaPlayer;