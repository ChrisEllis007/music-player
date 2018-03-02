import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {getSongs} from "./api/itunes.service";
import SongList from "./components/songList/song-list";
import SearchBox from "./components/search-box/search-box";

class App extends Component {

    constructor(){
        super();

        this.state = {
            songList: [],
            searchQuery: ''
        }
    }

    componentWillMount(){
        // this.getSongList('tina+arena').then(songList => this.setState({songList: songList}));
    }

    /**
     * Returns a list of songs based on the given search query
     * @param searchQuery
     * @returns {Promise<any>}
     */
    getSongList(searchQuery){
       return new Promise((resolve,reject) => {
           getSongs(searchQuery)
           .then((body) => {
               resolve(body.results);
           })
           .catch(err => reject(err));
       })
    }

    /**
     * Called when any text is types into the search box
     * @param event
     * @param value
     */
    onUpdatedSearchQuery(event, value){
        // update the state of the search query
        this.setState({searchQuery: value}, () => {
            // only perform a search if more than 2 characters have been typed
            // TODO check integrity of data
            if (this.state.searchQuery.length > 2) {
                //change the spaces for +'s for the service
                const searchQuery = this.state.searchQuery.split(' ').join('+');
                this.getSongList(searchQuery).then(songList => {
                    this.setState({songList: songList})
                });
            }
        });
    }

    render() {
        return (
            <div className="App">
               <SearchBox value={this.state.searchQuery}
                          onChange={this.onUpdatedSearchQuery.bind(this)}/>
                <SongList songs={this.state.songList}/>
            </div>
        );
    }
}

export default App;
