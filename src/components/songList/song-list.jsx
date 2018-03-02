import React from 'react';
import PropTypes from 'prop-types';
import Song from "../song/song";
import './song-list.css';

/**
 * This class handles displaying lists of songs
 */
class SongList extends React.Component{

    constructor() {
        super();
    }

    /**
     * Delegated event from a Song component, called when it's been clicked on
     * @param url
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
                            <li className="song-list-item" key={"song" + index}
                                onClick={_ => this.onSongSelected(index)}>
                                <Song
                                    index={index}
                                    boxArt={song.artworkUrl60}
                                    name={song.trackName}
                                    artist={song.artistName}
                                    album={song.collectionName}
                                    isPlaying={this.props.selectedIndex === index}
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
    onSelection: PropTypes.func,
    selectedIndex: PropTypes.number
}

export default SongList;

