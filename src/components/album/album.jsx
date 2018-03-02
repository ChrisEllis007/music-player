import React from 'react';
import PropTypes from 'prop-types';
import './album.css';

/**
 * This class displays all the information about an album
 */
class Album extends React.Component{

    constructor() {
        super();
    }

    render() {
        return(<div>
            <img className='song-box-art' alt='box art' src={this.props.boxArt}/>

        </div>)
    }
}


Album.propTypes = {

};

export default Album;

