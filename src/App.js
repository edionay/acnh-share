import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { RecoilRoot } from "recoil";

import { store } from "@risingstack/react-easy-state";

import KKSongList from "./pages/KKSongList";
import Friends from "./pages/Friends";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import BottomBar from "./components/BottomBar";

const appState = store({
	currentSong: "",
	song: new Audio(),

	stopSong: () => {
		appState.currentSong = "";
		if (appState.song) appState.song.pause();
	},

	playSong: (songTitle) => {
		if (appState.song) appState.song.pause();
		appState.currentSong = songTitle;
		appState.song = new Audio(`./assets/songs/${songTitle}.mp3`);
		appState.song.autoplay = true;
		appState.song.loop = true;
	},
});

function App() {
	return (
		<RecoilRoot>
			<Router>
				<Switch>
					<Route
						path="/"
						exact
						render={(props) => <KKSongList appState={appState} />}
					/>
					<Route path="/friends" component={Friends} />
				</Switch>
				<BottomBar appState={appState} />
			</Router>
		</RecoilRoot>
	);
}

export default App;
