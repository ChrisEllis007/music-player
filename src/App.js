import React, { Component } from 'react';
import './App.css';
import {getSongs, getSongsOfCollection} from "./api/itunes.service";
import SongList from "./components/songList/song-list";
import SearchBox from "./components/search-box/search-box";
import MediaPlayer from './components/media-player/media-player'
import Album from "./components/album/album";
import Loader from "./components/loader/loader";

/**
 * Main component for iTunes app
 */
class App extends Component {

    constructor(){
        super();

        this.mql = window.matchMedia('(min-width: 800px)');
        this.mql.addListener(this.onMediaQueryChanged.bind(this));

        this.state = {
            songList: [],
            searchQuery: '',
            currentSong: '',
            currentSongIndex: -1,
            albumSongs:[],
            currentAlbumId: -1,
            albumSongIndex: -1,
            isPlaying: false,
            isPaused: false,
            forceStart: false,
            isLoading: false
        }
    }

    componentDidMount(){
        // check current width of screen to determine which mode to run in
        this.setState({ wideMode: this.mql.matches});
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
            // TODO check integrity of data
            if (!this.state.isLoading && value.length > 0) {
                //show loading screen
                this.setState({isLoading: true, searchResultsSongIndex: -1});
                //change the spaces for +'s for the service
                const searchQuery = this.state.searchQuery.split(' ').join('+');
                this.getSongList(searchQuery).then(songList => {
                    this.setState({songList: songList, isLoading: false})
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
        const songName  = selectedSong.trackName;
        const albumId  = selectedSong.collectionId;

        let newState = {
            currentSongName: songName,
            searchResultsSongIndex: index,
            albumSongIndex: -1,
            currentAlbumId: albumId
        };

        // check to see if the UX should be as per wide mode
        if(this.state.wideMode){
            if(this.state.isPlaying){
                // if a track is already playing then queue a song
                Object.assign(newState, {forceStart: true, queuedSong: index, isPaused: true});
            } else{
                // else just get a song ready
                Object.assign(newState, {forceStart: false, currentSong: songURL, isPaused: true});
            }
        }else {
            // play straight away in narrow mode
            Object.assign(newState, { currentSong: songURL , playingIndex: index});
        }

        // update state
        this.setState(newState ,_ => this.getAlbumSongs())
    }

    /**
     * Gets the list of songs of a given album
     * TODO  no need to do this in narrow mode
     */
    getAlbumSongs(){
        // if there is no associated album, just play the song
        if(this.state.currentAlbumId === undefined){
            const track = [this.state.songList[this.state.searchResultsSongIndex]];
            this.setState(
                {
                    albumSongs: track,
                    albumBoxArt: track[0].artworkUrl100
                });
        } else {
            // get album songs
            getSongsOfCollection(this.state.currentAlbumId).then(songList => {
                if (songList.resultCount > 0) {
                    this.setState(
                        {
                            albumSongs: songList.results.filter(item => item.wrapperType === 'track'),
                            albumBoxArt: songList.results[0].artworkUrl100
                        })
                }
            }).catch(err => {
                // TODO put in a placeholder graphic
                this.setState(
                    {
                        albumSongs: [],
                        albumBoxArt: ''
                    });
            });
        }
    }

    /**
     * Called when an album song is clicked on
     * @param index
     */
    onAlbumSongSelected(index){
        const selectedSong = this.state.albumSongs[index];
        const songURL  = selectedSong.previewUrl;
        const albumId  = selectedSong.collectionId;
        const songName  = selectedSong.trackName;

        this.setState(
            {
                currentSong: songURL,
                searchResultsSongIndex: -1,
                albumSongIndex: index,
                currentAlbumId: albumId,
                currentSongName: songName
            });
    }

    /**
     * Event called when a media query is triggered
     * This is used to switch from narrow to wide modes, which have different
     * users interaction models
     * @param event
     */
    onMediaQueryChanged(event) {
        this.setState({ wideMode: event.matches});
    }


    /**
     * Called when a song is paused
     * @param paused
     */
    onPausedMedia(paused){
        this.setState({isPaused: paused});
    }

    /**
     * Called when a song has started playing
     */
    onPlayingMedia(){
        this.setState({isPlaying: true, playingIndex: this.state.searchResultsSongIndex});
    }

    /**
     * Called when a song has started playing and the screen is in wide mode, which uses
     * a different UX model to narrow screens
     */
    onPlayingMediaWideMode(){
        // see if there is a queued song
        if(this.state.queuedSong >= 0){
            // update the current song with the queued one
            const newSong = this.state.songList[this.state.queuedSong].previewUrl;
            this.setState({
                currentSong: newSong,
                queuedSong: -1
            });
        }else{
            // just show the selected one
            this.setState({isPlaying: true, playingIndex: this.state.searchResultsSongIndex});
        }
    }


    render() {
        return (
            <div className="App">
                <div className="track-search">
                    <SearchBox value={this.state.searchQuery}
                               onChange={this.onUpdatedSearchQuery.bind(this)}/>
                    <SongList
                        selectedIndex={this.state.searchResultsSongIndex}
                        playingIndex={this.state.playingIndex}
                        songs={this.state.songList}
                        onSelection={this.onSongSelected.bind(this)}/>
                    {!this.state.wideMode &&
                    <MediaPlayer
                        isPaused={this.state.isPaused}
                        isPlaying={this.state.isPlaying}
                        onPause={this.onPausedMedia.bind(this)}
                        onPlay={this.onPlayingMedia.bind(this)}
                        song={this.state.currentSong}/>
                    }
                </div>

                {/* only render album in wide mode */}
                {this.state.wideMode &&
                <Album
                    isPaused={this.state.isPaused}
                    isPlaying={this.state.isPlaying}
                    onPause={this.onPausedMedia.bind(this)}
                    onPlay={this.onPlayingMediaWideMode.bind(this)}
                    boxArt={this.state.albumBoxArt}
                    selectedIndex={this.state.searchResultsSongIndex}
                    onSelection={this.onAlbumSongSelected.bind(this)}
                    currentSong={this.state.currentSong}
                    songName={this.state.currentSongName}
                    songs={this.state.albumSongs}
                    autoPlay={this.state.forceStart}
                />
                }

                <Loader showLoader={this.state.isLoading} />
            </div>
        );
    }
}

export default App;
