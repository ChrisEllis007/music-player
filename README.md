This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Folder Structure


For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

You can delete or rename the other files.

## Running and Building

To install dependencies run `npm install` before trying to run the app.

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

This runs a mock server on port 1337.  This is used for running tests on the backend.
It can also be used to run locally without an internet connection. 

### `npm test`

**Ensure that the mock server is running before running tests.**

To do this either run `npm start` or `node mocks/server.js` in a separate terminal.

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


## Deployment
   
   `npm run build` creates a `build` directory with a production build of your app. Set up your favorite HTTP server so that a visitor to your site is served `index.html`, and requests to static paths like `/static/js/main.<hash>.js` are served with the contents of the `/static/js/main.<hash>.js` file.
   
   ### Static Server
   
   For environments using [Node](https://nodejs.org/), the easiest way to handle this would be to install [serve](https://github.com/zeit/serve) and let it handle the rest:
   
   ```sh
   npm install -g serve
   serve -s build
   ```
   
   The last command shown above will serve your static site on the port **5000**. Like many of [serve](https://github.com/zeit/serve)’s internal settings, the port can be adjusted using the `-p` or `--port` flags.
   
   Run this command to get a full list of the options available:
   
   ```sh
   serve -h
   ```

## Supported Browsers

This demo has only been tested on the latest version of Chrome Desktop.

## Supported Features

All features identified in the brief have been addressed with the caveat of the listed known bugs and Todo's in their
respective sections below.

In both modes (wide and narrow):

* Search for a song 
* Song information is displayed in a list
* Play/Pause song 
* A song will display an icon if it playing
* A song will be highlighted when it is selected
* Searching for a new song does not stop the current song playing

### Narrow mode only
* Selecting on a song plays automatically 

### Wide mode only:
* Tapping on a song populates details in the right column without starting the song
* If a song is already playing it will continue playing
* All the songs in the album are listed below the song playing


## Known Errors
* Switching between modes (wide and narrow) causes issues with the audio.  When doing this, the browser requires a refresh 
* On searching the playing icon shows at the same index on the new search results.  It should clear.
(see **TODO** regarding refactoring the audio below)

## TODO
* Refactor Audio - A mistake was made tying the audio state to the state of the play/pause buttons.  I need to pull
out the Audio from the MediaPlayer and put it in it's own service and then change the state in App.js to have the control button states 
separate from the playing of the track.
* Add a buffering indication when waiting for song to load
* Accessibility features (keyboard navigation, colour contrast checking, adding relevant aria roles)
* Add routing so that the browser back and forward buttons work
* Check security (XSS)
* Implement and test for touch interface
* Tests increase coverage and fix issue where mock server needs to run separately.

