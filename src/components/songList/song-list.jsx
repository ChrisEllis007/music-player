import React from 'react';
import PropTypes from 'prop-types';
import Song from "../song/song";
import './song-list.css';

class SongList extends React.Component{

    constructor() {
        super();
    }

    render() {
        return(
        <ul className='song-list'>
            {this.props.songs.map((song, index) => {
               return(
                <li className="song-list-item" key={"song"+index} >
                    <Song
                        boxArt={song.artworkUrl60}
                        songName={song.trackName} artist={song.artistName} album={song.collectionName}></Song>
                </li>)
            })}
        </ul>
        )
    }
}


SongList.propTypes = {
    songs: PropTypes.array
}

export default SongList;

