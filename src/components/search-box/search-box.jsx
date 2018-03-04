import React from 'react';
import PropTypes from 'prop-types';
import './search-box.css';

/**
 * This class displays a search box
 */
class SearchBox extends React.Component{


    render() {
        return(
            <div className="search-box">
            <input
                className='search-box-input'
                type="text"
                value={this.props.value}
                onChange={(event) => this.props.onChange(event,event.target.value)}
                placeholder="search for an artist..." />
            </div>
        )
    }
}


SearchBox.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}


export default SearchBox;

