import React from 'react';
import PropTypes from 'prop-types';
import './album.css';
import SongList from "../songList/song-list";
import MediaPlayer from "../media-player/media-player";

/**
 * This class displays all the information about an album
 */
class Album extends React.Component{

    render() {
        return(
            <div className={'album ' + (this.props.songs.length > 0 ? ' visible' : '')}>
               <div className="album-details">
                    <h1 className="album-song-title">{this.props.songName}</h1>
                    <img className='album-song-box-art' alt='box art' src={this.props.boxArt}/>
               </div>
                <MediaPlayer
                    isPaused={this.props.isPaused}
                    isPlaying={this.props.isPlaying}
                    song={this.props.currentSong}
                    onPause={this.props.onPause}
                    onPlay={this.props.onPlay}
                    autoPlay={this.props.autoPlay}/>
                <SongList
                    selectedIndex={-1}
                    onSelection={index => console.log('do nothing for now')}
                    songs={this.props.songs}
                    songClassName='song-album'/>
            </div>
        )
    }
}


Album.propTypes = {
    onSelection: PropTypes.func.isRequired,
    selectedIndex: PropTypes.number,
    currentSong: PropTypes.string,
    songName: PropTypes.string,
    queuedSong: PropTypes.string,
    isPaused:PropTypes.bool,
    isPlaying:PropTypes.bool,
    onPause: PropTypes.func,
    onPlay: PropTypes.func,
    autoPlay: PropTypes.bool
};

export default Album;

