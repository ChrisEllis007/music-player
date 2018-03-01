import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {getSongs} from "./api/itunes.service";
import SongList from "./components/songList/song-list";

class App extends Component {

    constructor(){
        super();

        this.state = {
            songList: []
        }
    }

    componentWillMount(){
        this.getSongList('tina+arena').then(songList => this.setState({songList: songList}));
    }

    getSongList(searchQuery){
       return new Promise((resolve,reject) => {
           getSongs(searchQuery)
           .then((body) => {
               resolve(body.results);
           })
           .catch(err => reject(err));
       })
    }

    render() {
        return (
            <div className="App">
                <SongList songs={this.state.songList}/>
            </div>
        );
    }
}

export default App;
