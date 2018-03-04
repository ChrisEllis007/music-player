import React from 'react';
import PropTypes from 'prop-types';
import Song from "../song/song";
import './song-list.css';

/**
 * This class handles displaying lists of songs
 */
class SongList extends React.Component{

    /**
     * Called when a song has been clicked on
     * @param index
     */
    onSongSelected(index){
        this.props.onSelection(index)
    }

    render() {
        const hasTracks = this.props.songs.length > 0;
            if(hasTracks) {
              return(
                <ul className='song-list'>
                    {this.props.songs.map((song, index) => {
                        return (
                            <li className="song-list-item " key={"song" + index}
                                onClick={_ => this.onSongSelected(index)}>
                                <Song
                                    class={this.props.songClassName}
                                    index={index}
                                    boxArt={song.artworkUrl60}
                                    name={song.trackName}
                                    artist={song.artistName}
                                    album={song.collectionName}
                                    isSelected={this.props.selectedIndex === index}
                                    isPlaying={this.props.playingIndex === index}
                                ></Song>
                            </li>)
                    })}
                </ul>)
            }else{
             return(
                <h4 className='song-list-empty'>Search for a song using the field above</h4>)
            }
    }
}


SongList.propTypes = {
    songs: PropTypes.array,
    onSelection: PropTypes.func.isRequired,
    selectedIndex: PropTypes.number,
    playingIndex: PropTypes.number,
    songClassName:PropTypes.string
};

export default SongList;

