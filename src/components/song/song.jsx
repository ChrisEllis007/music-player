import React from 'react';
import PropTypes from 'prop-types';
import './song.css';
import songPlayingIcon from '../../common/images/speaker.png';

class Song extends React.Component{

    constructor() {
        super();
    }

    render() {
        return(
            <div className='song'>
                {this.props.boxArt &&
                <img className='song-box-art' alt='box art' src={this.props.boxArt}/>
                }
                <div className="song-body">
                    <h5 className="song-title">{this.props.songName}</h5>
                    <h6 className="song-artist">{this.props.artist}</h6>
                    <h6 className="song-album">{this.props.album }</h6>
                </div>
                <img className='song-playing-icon' alt='song playing indicator' src={songPlayingIcon}/>
            </div>)
    }
}


Song.propTypes = {
    songName: PropTypes.string,
    artist: PropTypes.string,
    album: PropTypes.string
}

export default Song;

