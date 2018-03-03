import React from 'react';
import loaderIcon from '../../assets/images/loading.gif';
import './loader.css'
import PropTypes from 'prop-types';

/**
 * This class is the loading screen
 */
class Loader extends React.Component {

    constructor() {
        super();
    }

    show() {
    }

    hide() {
    }

    render() {
        return (
            <div className={"loader " + (this.props.isLoading ? 'show' : '')}>
                <img className='loader-icon' src={loaderIcon} alt="loading icon" />
            </div>
        )
    }
}

Loader.propTypes = {
    isLoading: PropTypes.bool
};

export default Loader;

