import React from 'react';
import PropTypes from 'prop-types';
import './album.css';
import SongList from "../songList/song-list";

/**
 * This class displays all the information about an album
 */
class Album extends React.Component{

    constructor() {
        super();
    }


    render() {
        return(
            <div className={'album ' + (this.props.songs.length > 0 ? ' visible' : '')}>
                <img className='song-box-art' alt='box art' src={this.props.boxArt}/>
                <SongList
                    selectedIndex={this.props.selectedIndex}
                    onSelection={index => this.props.onSelection(index)}
                    songs={this.props.songs} songClassName='song-album'/>
            </div>
        )
    }
}


Album.propTypes = {
    onSelection: PropTypes.func.isRequired,
    selectedIndex: PropTypes.number
};

export default Album;

