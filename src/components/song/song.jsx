import React from 'react';
import PropTypes from 'prop-types';
import './song.css';
import songPlayingIcon from '../../common/images/speaker.png';

/**
 * This class deals with a single song
 */
class Song extends React.Component{

    constructor() {
        super();
    }

    /**
     * Click event handler
     * @param event
     */
    playSong(event){
        this.props.onSelected(this.props.songUrl, this.props.index);
    }

    render() {
        return(
            <div className={'song' + (this.props.isPlaying ? ' is-playing' : '')} onClick={this.playSong.bind(this)}>
                <img className='song-box-art' alt='box art' src={this.props.boxArt}/>
                <div className="song-body">
                    <h5 className="song-title">{this.props.name}</h5>
                    <h6 className="song-artist">{this.props.artist}</h6>
                    <h6 className="song-album">{this.props.album }</h6>
                </div>
                <img className='song-playing-icon' alt='song playing indicator' src={songPlayingIcon}/>
            </div>)
    }
}


Song.propTypes = {
    name: PropTypes.string,
    artist: PropTypes.string,
    album: PropTypes.string,
    songUrl: PropTypes.string,
    onSelected: PropTypes.func,
    isPlaying: PropTypes.bool,
    index: PropTypes.number
};

export default Song;

