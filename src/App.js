import React, { Component } from 'react';
import './App.css';
import {getSongs, getSongsOfCollection} from "./api/itunes.service";
import SongList from "./components/songList/song-list";
import SearchBox from "./components/search-box/search-box";
import MediaPlayer from './components/media-player/media-player'
import Album from "./components/album/album";

class App extends Component {

    constructor(){
        super();

        this.state = {
            songList: [],
            searchQuery: '',
            currentSong: '',
            currentSongIndex: -1,
            albumSongs:[],
            currentAlbumId: -1,
            albumSongIndex: -1
        }
    }

    componentWillMount(){

        // const mp =  new MediaPlayer();
        // mp.playSong(testSong).then(_ => {console.log('working fein');
        //     console.log('mp.audio.currentTime = ', mp.audio.currentTime);
        //     console.log('!mp.audio.paused = ', !mp.audio.paused)
        // }).catch(err => console.log('err', err));
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

    /**
     * Called when a song is clicked on
     * @param index
     */
    onSongSelected(index){
        const selectedSong = this.state.songList[index];
        const songURL  = selectedSong.previewUrl;
        const albumId  = selectedSong.collectionId;
        // TODO only get album songs when in wide view
        this.setState(
            {
                currentSong: songURL,
                searchResultsSongIndex: index,
                albumSongIndex: -1,
                currentAlbumId: albumId},_ => this.getAlbumSongs());
    }

    /**
     * Gets the list of songs of a given album
     */
    getAlbumSongs(){
        getSongsOfCollection(this.state.currentAlbumId).then(songList => {
            this.setState(
                {
                    albumSongs: songList.results.filter(item => item.wrapperType === 'track'),
                    albumBoxArt: songList.results[0].artworkUrl100
                })
        });
    }

    /**
     * Called when an album song is clicked on
     * @param index
     */
    onAlbumSongSelected(index){
        const selectedSong = this.state.albumSongs[index];
        const songURL  = selectedSong.previewUrl;
        const albumId  = selectedSong.collectionId;
        this.setState(
            {
                currentSong: songURL,
                searchResultsSongIndex: -1,
                albumSongIndex: index,
                currentAlbumId: albumId
            });
    }

    render() {
        return (
            <div className="App">
                <div className="track-search">
                   <SearchBox value={this.state.searchQuery}
                              onChange={this.onUpdatedSearchQuery.bind(this)}/>
                    <SongList
                        selectedIndex={this.state.searchResultsSongIndex} songs={this.state.songList}
                        onSelection={this.onSongSelected.bind(this)}/>
                    <MediaPlayer song={this.state.currentSong}/>
                </div>
                <Album
                    boxArt={this.state.albumBoxArt}
                    selectedIndex={this.state.albumSongIndex}
                    onSelection={this.onAlbumSongSelected.bind(this)} songs={this.state.albumSongs}/>
            </div>
        );
    }
}

export default App;
