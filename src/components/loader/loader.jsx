import React from 'react';
import loaderIcon from '../../assets/images/loading.gif';
import './loader.css'
import PropTypes from 'prop-types';

/**
 * This class is the loading screen
 */
class Loader extends React.Component {

    render() {
        return (
            <div className={"loader " + (this.props.showLoader ? 'show' : '')}>
                <h1>{this.props.isLoading}</h1>
                <img className='loader-icon' src={loaderIcon} alt="loading icon" />
            </div>
        )
    }
}

Loader.propTypes = {
    showLoader: PropTypes.bool
};

export default Loader;

